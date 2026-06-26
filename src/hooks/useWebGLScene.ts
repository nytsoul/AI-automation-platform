import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface UseWebGLSceneOptions {
  onInit: (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => void;
  onUpdate?: (scene: THREE.Scene, camera: THREE.PerspectiveCamera, time: number, delta: number, pointer: THREE.Vector2) => void;
  onDispose?: () => void;
  onResize?: (width: number, height: number, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => void;
  disablePointer?: boolean;
}

export function useWebGLScene({ onInit, onUpdate, onDispose, onResize, disablePointer = false }: UseWebGLSceneOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use a ref for visibility to avoid re-triggering the useEffect
  const isVisibleRef = useRef(false);
  const [isRendered, setIsRendered] = useState(false); // Just to force a react render if needed
  
  // Internal refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointerRef = useRef(new THREE.Vector2(0, 0));
  const frameRef = useRef<number>(0);
  const clockRef = useRef(new THREE.Clock());

  // Intersection Observer
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Pointer tracking
  useEffect(() => {
    if (disablePointer) return;
    const handleMouseMove = (e: MouseEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [disablePointer]);

  // Main Lifecycle
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    onInit(scene, camera, renderer);
    setIsRendered(true);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        if (onResize) onResize(width, height, camera, renderer);
      }
    });
    resizeObserver.observe(container);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      // Only render if visible
      if (isVisibleRef.current) {
        const delta = clockRef.current.getDelta();
        const elapsedTime = clockRef.current.getElapsedTime();
        
        if (onUpdate) {
          onUpdate(scene, camera, elapsedTime, delta, pointerRef.current);
        }
        
        renderer.render(scene, camera);
      } else {
        // keep clock running so delta isn't huge when it comes back into view
        clockRef.current.getDelta();
      }
    };
    
    clockRef.current.start();
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
      
      if (onDispose) onDispose();
      
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((m) => m.dispose());
            } else {
              object.material.dispose();
            }
            if ('map' in object.material && object.material.map) {
                object.material.map.dispose();
            }
          }
        }
      });
      
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { containerRef, isRendered };
}
