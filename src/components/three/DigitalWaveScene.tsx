import React from 'react';
import * as THREE from 'three';
import { useWebGLScene } from '../../hooks/useWebGLScene';

const DigitalWaveScene: React.FC = () => {
  const { containerRef } = useWebGLScene({
    onInit: (scene, camera) => {
      camera.position.set(0, 5, 10);
      camera.lookAt(0, 0, 0);

      // Procedural mesh
      const geometry = new THREE.PlaneGeometry(30, 20, 64, 64);
      geometry.rotateX(-Math.PI / 2);
      
      const material = new THREE.MeshStandardMaterial({
        color: 0x114c5a, // noctural
        emissive: 0x0a2a35,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      
      // Save for update loop
      scene.userData.waveMesh = mesh;

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0xffc801, 2, 20); // forsythia glow
      pointLight.position.set(0, 3, 0);
      scene.add(pointLight);
    },
    onUpdate: (scene, _camera, time, _delta, pointer) => {
      const mesh = scene.userData.waveMesh as THREE.Mesh;
      if (!mesh) return;
      
      const positions = mesh.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const z = positions.getZ(i);
        // Wave function
        const y = Math.sin(x * 0.5 + time) * Math.cos(z * 0.5 + time * 0.8) * 1.5;
        positions.setY(i, y);
      }
      positions.needsUpdate = true;
      
      // Gentle rotation with pointer
      mesh.rotation.y = pointer.x * 0.1;
      mesh.rotation.x = pointer.y * 0.1;
    }
  });

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  );
};

export default DigitalWaveScene;
