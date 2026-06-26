import React from 'react';
import * as THREE from 'three';
import { useWebGLScene } from '../../hooks/useWebGLScene';

const HeroNeuralScene: React.FC = () => {
  const { containerRef } = useWebGLScene({
    onInit: (scene, camera) => {
      camera.position.z = 10;
      
      const PARTICLE_COUNT = 150;
      const BOUNDS = 5;

      // Particles
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const velocities = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * BOUNDS * 2;
        positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS * 2;
        positions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS * 2;
        velocities.push(new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ));
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Circular gradient texture
      const createCircleTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        if (context) {
          const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
          gradient.addColorStop(0, 'rgba(255, 200, 1, 1)');      
          gradient.addColorStop(0.2, 'rgba(255, 153, 50, 0.8)'); 
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          context.fillStyle = gradient;
          context.fillRect(0, 0, 32, 32);
        }
        return new THREE.CanvasTexture(canvas);
      };

      const material = new THREE.PointsMaterial({
        size: 0.15,
        map: createCircleTexture(),
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Lines
      const MAX_LINES = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;
      const linePositions = new Float32Array(MAX_LINES * 6);
      const lineColors = new Float32Array(MAX_LINES * 6);

      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

      const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.4
      });

      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lines);

      // Save to userData for update loop
      scene.userData = {
        particles,
        lines,
        velocities,
        PARTICLE_COUNT,
        BOUNDS,
      };

      // Add Ambient Light & Emissive Depth Illusion
      scene.fog = new THREE.FogExp2(0x114c5a, 0.05); // Creates depth of field illusion
    },
    onUpdate: (scene, camera, time, _delta, pointer) => {
      const { particles, lines, velocities, PARTICLE_COUNT, BOUNDS } = scene.userData;
      if (!particles || !lines) return;

      const positions = particles.geometry.attributes.position.array as Float32Array;
      
      // Update particle positions
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        positions[i3] += velocities[i].x;
        positions[i3 + 1] += velocities[i].y;
        positions[i3 + 2] += velocities[i].z;

        // Bounce off bounds
        if (Math.abs(positions[i3]) > BOUNDS) velocities[i].x *= -1;
        if (Math.abs(positions[i3 + 1]) > BOUNDS) velocities[i].y *= -1;
        if (Math.abs(positions[i3 + 2]) > BOUNDS) velocities[i].z *= -1;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Update lines
      const linePositions = lines.geometry.attributes.position.array as Float32Array;
      const lineColors = lines.geometry.attributes.color.array as Float32Array;
      let lineIndex = 0;
      let colorIndex = 0;

      const forsythia = new THREE.Color(0xffc801);
      const arctic = new THREE.Color(0xf1f6f4);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 2.25) { // 1.5 squared
            linePositions[lineIndex++] = positions[i * 3];
            linePositions[lineIndex++] = positions[i * 3 + 1];
            linePositions[lineIndex++] = positions[i * 3 + 2];
            
            linePositions[lineIndex++] = positions[j * 3];
            linePositions[lineIndex++] = positions[j * 3 + 1];
            linePositions[lineIndex++] = positions[j * 3 + 2];

            // Smooth fade out as nodes move apart (Additive blending means black = transparent)
            const intensity = 1.0 - (distSq / 2.25);
            
            lineColors[colorIndex++] = forsythia.r * intensity;
            lineColors[colorIndex++] = forsythia.g * intensity;
            lineColors[colorIndex++] = forsythia.b * intensity;
            
            lineColors[colorIndex++] = arctic.r * intensity;
            lineColors[colorIndex++] = arctic.g * intensity;
            lineColors[colorIndex++] = arctic.b * intensity;
          }
        }
      }

      lines.geometry.setDrawRange(0, lineIndex / 3);
      lines.geometry.attributes.position.needsUpdate = true;
      lines.geometry.attributes.color.needsUpdate = true;

      // Enhanced Pulse, Rotation, and Parallax
      const pulse = 1 + Math.sin(time * 2) * 0.05; // Subtle scale pulse
      particles.scale.set(pulse, pulse, pulse);
      lines.scale.set(pulse, pulse, pulse);

      // Mouse parallax (more pronounced with depth)
      camera.position.x += (pointer.x * 4 - camera.position.x) * 0.05;
      camera.position.y += (pointer.y * 4 - camera.position.y) * 0.05;
      camera.position.z += ((10 - pointer.y * 2) - camera.position.z) * 0.05;
      camera.lookAt(0, 0, 0);

      // Slow elegant rotation
      particles.rotation.y = time * 0.05;
      lines.rotation.y = time * 0.05;
      particles.rotation.x = time * 0.02;
      lines.rotation.x = time * 0.02;

      // Opacity pulse for the nodes to make it feel "glowing"
      const material = particles.material as THREE.PointsMaterial;
      material.opacity = 0.6 + Math.sin(time * 3) * 0.4;

      const breath = Math.sin(time * 0.5) * 0.5;
      particles.position.y = breath;
      lines.position.y = breath;
    }
  });

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 opacity-60 mix-blend-screen pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default HeroNeuralScene;
