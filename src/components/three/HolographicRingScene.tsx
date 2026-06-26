import React from 'react';
import * as THREE from 'three';
import { useWebGLScene } from '../../hooks/useWebGLScene';

const HolographicRingScene: React.FC = () => {
  const { containerRef } = useWebGLScene({
    onInit: (scene, camera) => {
      camera.position.z = 10;

      const group = new THREE.Group();
      scene.add(group);

      // Main Ring
      const ringGeo = new THREE.TorusGeometry(4, 0.1, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffc801, // forsythia
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.5;
      group.add(ring);

      // Outer thin ring
      const outerRingGeo = new THREE.TorusGeometry(4.5, 0.02, 16, 100);
      const outerRingMat = new THREE.MeshBasicMaterial({
        color: 0x6de4b5, // mint
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      });
      const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
      outerRing.rotation.x = Math.PI / 2.5;
      group.add(outerRing);

      scene.userData = { group, ring, outerRing };
    },
    onUpdate: (scene, _camera, time, _delta, pointer) => {
      const { group, ring, outerRing } = scene.userData;
      if (!group) return;

      // Rotate rings
      ring.rotation.z = time * 0.2;
      outerRing.rotation.z = -time * 0.15;

      // Parallax
      group.rotation.y = pointer.x * 0.1;
      group.rotation.x = pointer.y * 0.1;

      // Pulse opacity
      const opacity = 0.2 + Math.sin(time * 2) * 0.1;
      (ring.material as THREE.Material).opacity = opacity;
    }
  });

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
};

export default HolographicRingScene;
