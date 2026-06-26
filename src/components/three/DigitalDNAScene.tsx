import React from 'react';
import * as THREE from 'three';
import { useWebGLScene } from '../../hooks/useWebGLScene';

const DigitalDNAScene: React.FC = () => {
  const { containerRef } = useWebGLScene({
    onInit: (scene, camera) => {
      camera.position.z = 15;

      const group = new THREE.Group();
      scene.add(group);

      const count = 100;
      const geo1 = new THREE.BufferGeometry();
      const geo2 = new THREE.BufferGeometry();
      const geoLines = new THREE.BufferGeometry();
      
      const pos1 = new Float32Array(count * 3);
      const pos2 = new Float32Array(count * 3);
      const posLines = new Float32Array(count * 6);
      
      const phases = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const y = (i - count / 2) * 0.3;
        const phase = i * 0.2;
        phases[i] = phase;

        const x1 = Math.sin(phase) * 3;
        const z1 = Math.cos(phase) * 3;
        
        const x2 = Math.sin(phase + Math.PI) * 3;
        const z2 = Math.cos(phase + Math.PI) * 3;

        pos1[i*3] = x1; pos1[i*3+1] = y; pos1[i*3+2] = z1;
        pos2[i*3] = x2; pos2[i*3+1] = y; pos2[i*3+2] = z2;

        posLines[i*6] = x1; posLines[i*6+1] = y; posLines[i*6+2] = z1;
        posLines[i*6+3] = x2; posLines[i*6+4] = y; posLines[i*6+5] = z2;
      }

      geo1.setAttribute('position', new THREE.BufferAttribute(pos1, 3));
      geo2.setAttribute('position', new THREE.BufferAttribute(pos2, 3));
      geo1.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
      geo2.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
      
      geoLines.setAttribute('position', new THREE.BufferAttribute(posLines, 3));

      const particleMat = new THREE.PointsMaterial({
        color: 0xffc801, // forsythia
        size: 0.2,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });

      const lineMat = new THREE.LineBasicMaterial({
        color: 0x6de4b5, // mint
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
      });

      const p1 = new THREE.Points(geo1, particleMat);
      const p2 = new THREE.Points(geo2, particleMat);
      const lines = new THREE.LineSegments(geoLines, lineMat);

      group.add(p1);
      group.add(p2);
      group.add(lines);

      scene.userData = { group, p1, p2, lines, count };

      group.rotation.z = Math.PI / 4;
    },
    onUpdate: (scene, _camera, time, _delta, pointer) => {
      const { group, p1, p2, lines, count } = scene.userData;
      if (!group) return;

      // Update positions to simulate flowing
      const pos1 = p1.geometry.attributes.position.array as Float32Array;
      const pos2 = p2.geometry.attributes.position.array as Float32Array;
      const posLines = lines.geometry.attributes.position.array as Float32Array;
      const phases = p1.geometry.attributes.phase.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const i6 = i * 6;
        
        // Flow phase over time
        const currentPhase = phases[i] + time * 0.5;

        const x1 = Math.sin(currentPhase) * 3;
        const z1 = Math.cos(currentPhase) * 3;
        
        const x2 = Math.sin(currentPhase + Math.PI) * 3;
        const z2 = Math.cos(currentPhase + Math.PI) * 3;

        pos1[i3] = x1; pos1[i3+2] = z1;
        pos2[i3] = x2; pos2[i3+2] = z2;

        posLines[i6] = x1; posLines[i6+2] = z1;
        posLines[i6+3] = x2; posLines[i6+5] = z2;
      }

      p1.geometry.attributes.position.needsUpdate = true;
      p2.geometry.attributes.position.needsUpdate = true;
      lines.geometry.attributes.position.needsUpdate = true;

      // Parallax
      group.rotation.y = time * 0.1 + pointer.x * 0.2;
      group.rotation.x = pointer.y * 0.2;
    }
  });

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
      style={{ opacity: 0.2 }}
      aria-hidden="true"
    />
  );
};

export default DigitalDNAScene;
