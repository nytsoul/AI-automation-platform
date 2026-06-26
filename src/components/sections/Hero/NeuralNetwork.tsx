// ============================================================
// NeuralNetwork — Lightweight Three.js Background Visualization
// GPU accelerated, Lazy Loaded, Minimal Bundle impact
// ============================================================

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const NeuralNetwork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Configuration ---
    const PARTICLE_COUNT = 150;
    const MAX_DISTANCE = 1.5;
    const BOUNDS = 5;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 10;

    // Renderer setup (alpha: true for transparent background)
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    
    // Attach to DOM
    const currentContainer = containerRef.current;
    renderer.setSize(currentContainer.clientWidth, currentContainer.clientHeight);
    currentContainer.appendChild(renderer.domElement);

    // --- Geometry & Materials ---
    const particlesData: { velocity: THREE.Vector3 }[] = [];
    
    // Create particles
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * BOUNDS * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS * 2;

      particlesData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        )
      });
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Simple glowing dot material (using canvas to generate a soft circle, avoiding external image requests)
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const context = canvas.getContext('2d');
      if (context) {
        const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 200, 1, 1)');      // Forsythia
        gradient.addColorStop(0.2, 'rgba(255, 153, 50, 0.8)'); // Saffron
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      map: createCircleTexture(),
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particleSystem);

    // Create lines geometry
    // Max lines = (N * (N - 1)) / 2
    const MAX_LINES = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;
    const linePositions = new Float32Array(MAX_LINES * 6);
    const lineColors = new Float32Array(MAX_LINES * 6);

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(linesMesh);

    // --- Interaction ---
    let mouseX = 0;
    let mouseY = 0;
    const target = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // --- Animation Loop ---
    let animationFrameId: number;

    const animate = () => {
      // Mouse Parallax easing
      target.x = mouseX * 0.5;
      target.y = mouseY * 0.5;
      camera.position.x += (target.x - camera.position.x) * 0.05;
      camera.position.y += (target.y - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      const positions = particleSystem.geometry.attributes.position.array as Float32Array;
      
      // Update particle positions
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const particleData = particlesData[i];
        
        positions[i * 3] += particleData.velocity.x;
        positions[i * 3 + 1] += particleData.velocity.y;
        positions[i * 3 + 2] += particleData.velocity.z;

        // Bounce off bounds
        if (Math.abs(positions[i * 3]) > BOUNDS) particleData.velocity.x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > BOUNDS) particleData.velocity.y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > BOUNDS) particleData.velocity.z *= -1;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      // Update lines based on distance
      let vertexPos = 0;
      let colorPos = 0;
      let numConnected = 0;

      const pPos = new THREE.Vector3();
      const pPos2 = new THREE.Vector3();

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pPos.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          pPos2.set(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
          
          const distSq = pPos.distanceToSquared(pPos2);
          
          if (distSq < MAX_DISTANCE * MAX_DISTANCE) {
            // Draw line
            linePositions[vertexPos++] = pPos.x;
            linePositions[vertexPos++] = pPos.y;
            linePositions[vertexPos++] = pPos.z;

            linePositions[vertexPos++] = pPos2.x;
            linePositions[vertexPos++] = pPos2.y;
            linePositions[vertexPos++] = pPos2.z;

            // Fade alpha based on distance
            const alpha = 1.0 - Math.sqrt(distSq) / MAX_DISTANCE;
            
            // Base color is a mix of Forsythia and Saffron
            const r = 1.0;
            const g = 0.7 + (alpha * 0.1); 
            const b = 0.1;

            lineColors[colorPos++] = r * alpha;
            lineColors[colorPos++] = g * alpha;
            lineColors[colorPos++] = b * alpha;

            lineColors[colorPos++] = r * alpha;
            lineColors[colorPos++] = g * alpha;
            lineColors[colorPos++] = b * alpha;

            numConnected++;
          }
        }
      }

      linesMesh.geometry.setDrawRange(0, numConnected * 2);
      linesMesh.geometry.attributes.position.needsUpdate = true;
      linesMesh.geometry.attributes.color.needsUpdate = true;

      // Slow global rotation
      scene.rotation.y += 0.001;
      scene.rotation.x += 0.0005;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      if (!currentContainer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentContainer.clientWidth, currentContainer.clientHeight);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      
      // Dispose Three.js objects to prevent memory leaks
      particlesGeometry.dispose();
      particleMaterial.map?.dispose();
      particleMaterial.dispose();
      linesGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      
      if (currentContainer && currentContainer.contains(renderer.domElement)) {
        currentContainer.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />;
};

export default React.memo(NeuralNetwork);
