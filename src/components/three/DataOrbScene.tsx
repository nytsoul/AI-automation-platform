import React from 'react';
import * as THREE from 'three';
import { useWebGLScene } from '../../hooks/useWebGLScene';

const DataOrbScene: React.FC = () => {
  const { containerRef } = useWebGLScene({
    onInit: (scene, camera) => {
      camera.position.z = 8;

      const group = new THREE.Group();
      scene.add(group);

      // Core Orb
      const geo1 = new THREE.SphereGeometry(2.5, 32, 32);
      const mat1 = new THREE.MeshPhysicalMaterial({
        color: 0x114c5a, // noctural
        transmission: 0.9,
        opacity: 1,
        metalness: 0.1,
        roughness: 0.1,
        ior: 1.5,
        thickness: 2.0,
      });
      const orb = new THREE.Mesh(geo1, mat1);
      group.add(orb);

      // Wireframe overlay
      const geo2 = new THREE.SphereGeometry(2.6, 16, 16);
      const mat2 = new THREE.MeshBasicMaterial({
        color: 0xffc801, // forsythia
        wireframe: true,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending
      });
      const wireframe = new THREE.Mesh(geo2, mat2);
      group.add(wireframe);

      // Inner Particles
      const particleGeo = new THREE.BufferGeometry();
      const count = 200;
      const positions = new Float32Array(count * 3);
      for(let i=0; i<count; i++) {
        // Random point inside sphere
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = Math.cbrt(Math.random()) * 2.3;
        
        positions[i*3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i*3+2] = r * Math.cos(phi);
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, 'rgba(109,228,181,1)'); // mint
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      const map = new THREE.CanvasTexture(canvas);

      const particleMat = new THREE.PointsMaterial({
        size: 0.2,
        map: map,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      group.add(particles);

      scene.userData = { group, wireframe, particles };

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0xffc801, 2, 20);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);
    },
    onUpdate: (scene, _camera, time, delta, pointer) => {
      const { group, wireframe, particles } = scene.userData;
      if (!group) return;

      wireframe.rotation.y += delta * 0.2;
      wireframe.rotation.x += delta * 0.1;

      particles.rotation.y -= delta * 0.1;
      particles.rotation.z += delta * 0.05;

      group.rotation.y = pointer.x * 0.5;
      group.rotation.x = pointer.y * 0.5;

      const pulse = 1 + Math.sin(time * 3) * 0.05;
      group.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
      style={{ opacity: 0.5 }}
      aria-hidden="true"
    />
  );
};

export default DataOrbScene;
