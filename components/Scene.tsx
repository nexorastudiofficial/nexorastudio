"use client";
"use no memo";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

function DeformedGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const geomRef = useRef<THREE.PlaneGeometry>(null);

  // Grid dimensions & resolution
  const width = 16;
  const height = 14;
  const segX = 46;
  const segY = 42;

  // Cache initial (x, y) coordinates for smooth trigonometric deformation
  const initialPositions = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, height, segX, segY);
    const pos = geo.attributes.position;
    const coords: [number, number][] = [];
    for (let i = 0; i < pos.count; i++) {
      coords.push([pos.getX(i), pos.getY(i)]);
    }
    geo.dispose();
    return coords;
  }, []);

  useFrame((state) => {
    if (!geomRef.current || !groupRef.current) return;

    const t = state.clock.getElapsedTime();
    const { pointer } = state;
    const pos = geomRef.current.attributes.position;

    // Subtle parallax tilt based on cursor
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -Math.PI / 3 - pointer.y * 0.15,
      0.05
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      pointer.x * 0.12,
      0.05
    );

    // Mouse influence target on grid plane
    const mouseX = pointer.x * 6;
    const mouseY = pointer.y * 4;

    for (let i = 0; i < pos.count; i++) {
      const [x, y] = initialPositions[i];

      // Multi-frequency wave deformation
      const wave1 = Math.sin(x * 0.75 + t * 1.25) * 0.38;
      const wave2 = Math.cos(y * 0.85 + t * 0.95) * 0.32;
      const wave3 = Math.sin((x + y) * 0.5 + t * 1.5) * 0.22;

      // Mouse ripple effect
      const dx = x - mouseX;
      const dy = y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mouseWave = Math.sin(Math.max(0, 4 - dist) * 2 - t * 3) * Math.max(0, 1 - dist / 4) * 0.35;

      const z = wave1 + wave2 + wave3 + mouseWave;
      pos.setZ(i, z);
    }

    pos.needsUpdate = true;
    geomRef.current.computeVertexNormals();
  });

  return (
    <group ref={groupRef} position={[0, -0.6, -0.2]}>
      {/* Dynamic wavy grid mesh (wireframe) */}
      <mesh ref={meshRef}>
        <planeGeometry ref={geomRef} args={[width, height, segX, segY]} />
        <meshStandardMaterial
          wireframe
          color="#38bdf8"
          emissive="#7c3aed"
          emissiveIntensity={0.65}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Subtle glowing surface layer underneath */}
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[width, height, 18, 18]} />
        <meshBasicMaterial
          color="#4c1d95"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 48 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#c084fc" />
      <pointLight position={[-6, 2, 2]} color="#818cf8" intensity={40} />
      <pointLight position={[6, -2, 2]} color="#06b6d4" intensity={40} />

      <DeformedGrid />

      <Sparkles
        count={80}
        scale={10}
        size={2.2}
        speed={0.3}
        opacity={0.5}
        color="#a5b4fc"
      />
      <Sparkles
        count={45}
        scale={8}
        size={3}
        speed={0.2}
        opacity={0.35}
        color="#38bdf8"
      />
    </Canvas>
  );
}
