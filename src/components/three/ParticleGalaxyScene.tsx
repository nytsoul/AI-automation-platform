import React from 'react';
import * as THREE from 'three';
import { useWebGLScene } from '../../hooks/useWebGLScene';

const ParticleGalaxyScene: React.FC = () => {
  const { containerRef } = useWebGLScene({
    onInit: (scene, camera) => {
      camera.position.z = 20;

      const count = 1000;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const phases = new Float32Array(count);

      // Create a galaxy shape
      for (let i = 0; i < count; i++) {
        // distribute along a spiral
        const radius = Math.random() * 15;
        const theta = radius * 0.5 + (Math.random() * Math.PI * 2);
        const y = (Math.random() - 0.5) * 3;
        
        positions[i * 3] = Math.cos(theta) * radius;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = Math.sin(theta) * radius;

        phases[i] = Math.random() * Math.PI * 2;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

      // Circular texture
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      const map = new THREE.CanvasTexture(canvas);

      const material = new THREE.PointsMaterial({
        color: 0xf1f6f4, // arctic
        size: 0.3,
        map: map,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.6
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);
      
      scene.userData.points = points;
      scene.userData.originalPositions = new Float32Array(positions);
    },
    onUpdate: (scene, _camera, time, _delta, pointer) => {
      const points = scene.userData.points as THREE.Points;
      if (!points) return;

      points.rotation.y = time * 0.05;
      points.rotation.z = pointer.x * 0.1;
      points.rotation.x = pointer.y * 0.1;

      // Pulse effect
      const phases = points.geometry.attributes.phase.array as Float32Array;
      const positions = points.geometry.attributes.position.array as Float32Array;
      const original = scene.userData.originalPositions as Float32Array;

      for (let i = 0; i < phases.length; i++) {
        const i3 = i * 3;
        const phase = phases[i];
        const offset = Math.sin(time * 2 + phase) * 0.2;
        positions[i3 + 1] = original[i3 + 1] + offset;
      }
      points.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 opacity-50 mix-blend-screen pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ParticleGalaxyScene;
