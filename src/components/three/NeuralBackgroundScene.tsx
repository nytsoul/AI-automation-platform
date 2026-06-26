import React from 'react';
import * as THREE from 'three';
import { useWebGLScene } from '../../hooks/useWebGLScene';

const NeuralBackgroundScene: React.FC = () => {
  const { containerRef } = useWebGLScene({
    onInit: (scene, camera) => {
      camera.position.z = 10;

      const PARTICLE_COUNT = 80;
      const BOUNDS = 10;
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const velocities = [];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * BOUNDS * 2;
        positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS * 2;
        positions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS * 2;
        velocities.push(new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005
        ));
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0x6de4b5, // mint
        size: 0.1,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      const MAX_LINES = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;
      const linePositions = new Float32Array(MAX_LINES * 6);
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x6de4b5,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending
      });

      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lines);

      scene.userData = { particles, lines, velocities, PARTICLE_COUNT, BOUNDS };
    },
    onUpdate: (scene, _camera, time, _delta, pointer) => {
      const { particles, lines, velocities, PARTICLE_COUNT, BOUNDS } = scene.userData;
      if (!particles) return;

      const positions = particles.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        positions[i3] += velocities[i].x;
        positions[i3 + 1] += velocities[i].y;
        positions[i3 + 2] += velocities[i].z;

        if (Math.abs(positions[i3]) > BOUNDS) velocities[i].x *= -1;
        if (Math.abs(positions[i3 + 1]) > BOUNDS) velocities[i].y *= -1;
        if (Math.abs(positions[i3 + 2]) > BOUNDS) velocities[i].z *= -1;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      const linePositions = lines.geometry.attributes.position.array as Float32Array;
      let lineIndex = 0;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 4.0) {
            linePositions[lineIndex++] = positions[i * 3];
            linePositions[lineIndex++] = positions[i * 3 + 1];
            linePositions[lineIndex++] = positions[i * 3 + 2];
            
            linePositions[lineIndex++] = positions[j * 3];
            linePositions[lineIndex++] = positions[j * 3 + 1];
            linePositions[lineIndex++] = positions[j * 3 + 2];
          }
        }
      }

      lines.geometry.setDrawRange(0, lineIndex / 3);
      lines.geometry.attributes.position.needsUpdate = true;

      particles.rotation.y = time * 0.02 + pointer.x * 0.05;
      lines.rotation.y = time * 0.02 + pointer.x * 0.05;
      particles.rotation.x = pointer.y * 0.05;
      lines.rotation.x = pointer.y * 0.05;
    }
  });

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
      style={{ opacity: 0.3 }}
      aria-hidden="true"
    />
  );
};

export default NeuralBackgroundScene;
