import React from 'react';
import * as THREE from 'three';
import { useWebGLScene } from '../../hooks/useWebGLScene';

const FloatingCubesScene: React.FC = () => {
  const { containerRef } = useWebGLScene({
    onInit: (scene, camera) => {
      camera.position.z = 15;

      const group = new THREE.Group();
      scene.add(group);

      const cubeGeo = new THREE.BoxGeometry(2, 2, 2);
      const cubeMat = new THREE.MeshPhysicalMaterial({
        color: 0x6de4b5, // mint
        transmission: 0.8,
        opacity: 1,
        metalness: 0.1,
        roughness: 0.2,
        ior: 1.5,
        thickness: 1.0,
      });

      const cubes: THREE.Mesh[] = [];
      const count = 12;

      for (let i = 0; i < count; i++) {
        const mesh = new THREE.Mesh(cubeGeo, cubeMat);
        mesh.position.set(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5
        );
        mesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          0
        );
        group.add(mesh);
        cubes.push(mesh);
      }

      scene.userData = { group, cubes };

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0xffc801, 1.5, 30);
      pointLight.position.set(0, 0, 10);
      scene.add(pointLight);
    },
    onUpdate: (scene, _camera, time, delta, pointer) => {
      const { group, cubes } = scene.userData;
      if (!group) return;

      cubes.forEach((cube: THREE.Mesh, i: number) => {
        cube.rotation.x += delta * (0.1 + i * 0.01);
        cube.rotation.y += delta * (0.15 + i * 0.01);
        cube.position.y += Math.sin(time + i) * 0.01;
      });

      group.rotation.y = pointer.x * 0.05;
      group.rotation.x = pointer.y * 0.05;
    }
  });

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.4 }}
      aria-hidden="true"
    />
  );
};

export default FloatingCubesScene;
