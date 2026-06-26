import React from 'react';
import * as THREE from 'three';
import { useWebGLScene } from '../../hooks/useWebGLScene';

const FeatureDecorations: React.FC = () => {
  const { containerRef } = useWebGLScene({
    onInit: (scene, camera) => {
      camera.position.z = 15;

      // Group to rotate everything together
      const group = new THREE.Group();
      scene.add(group);

      // Wireframe Icosahedron
      const geo1 = new THREE.IcosahedronGeometry(2, 0);
      const mat1 = new THREE.MeshBasicMaterial({ 
        color: 0xffc801, // forsythia
        wireframe: true, 
        transparent: true, 
        opacity: 0.15 
      });
      const mesh1 = new THREE.Mesh(geo1, mat1);
      mesh1.position.set(-6, 2, -5);
      group.add(mesh1);

      // Floating Holographic Cube
      const geo2 = new THREE.BoxGeometry(3, 3, 3);
      const mat2 = new THREE.MeshPhysicalMaterial({
        color: 0x114c5a, // noctural
        transmission: 0.9,
        opacity: 1,
        metalness: 0,
        roughness: 0,
        ior: 1.5,
        thickness: 0.5,
      });
      const mesh2 = new THREE.Mesh(geo2, mat2);
      mesh2.position.set(6, -3, -2);
      group.add(mesh2);

      // Orbiting particles
      const particleGeo = new THREE.BufferGeometry();
      const count = 50;
      const positions = new Float32Array(count * 3);
      for(let i=0; i<count; i++) {
        positions[i*3] = (Math.random() - 0.5) * 20;
        positions[i*3+1] = (Math.random() - 0.5) * 20;
        positions[i*3+2] = (Math.random() - 0.5) * 5 - 5;
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0x6de4b5, // mint
        size: 0.2,
        transparent: true,
        opacity: 0.4
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      group.add(particles);

      scene.userData = { mesh1, mesh2, group };

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0xffc801, 2, 20);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);
    },
    onUpdate: (scene, _camera, time, delta, pointer) => {
      const { mesh1, mesh2, group } = scene.userData;
      if (!mesh1) return;

      mesh1.rotation.x += delta * 0.2;
      mesh1.rotation.y += delta * 0.3;
      
      mesh2.rotation.x -= delta * 0.1;
      mesh2.rotation.y -= delta * 0.15;
      mesh2.position.y = -3 + Math.sin(time) * 0.5;

      group.rotation.y = pointer.x * 0.1;
      group.rotation.x = pointer.y * 0.1;
    }
  });

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default FeatureDecorations;
