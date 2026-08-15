"use client";
"use no memo";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function Core() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const { pointer } = state;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.6,
      0.06
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointer.y * 0.4,
      0.06
    );
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.4}>
        <mesh>
          <icosahedronGeometry args={[1.5, 12]} />
          <MeshDistortMaterial
            color="#6d28d9"
            emissive="#4c1d95"
            emissiveIntensity={0.4}
            roughness={0.15}
            metalness={0.9}
            distort={0.38}
            speed={1.4}
          />
        </mesh>
        <mesh scale={1.55}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.16} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.9}>
          <torusGeometry args={[2.15, 0.015, 8, 128]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.7} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0.4, 0]} scale={1.9}>
          <torusGeometry args={[2.5, 0.01, 8, 128]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-6, -3, -4]} color="#a855f7" intensity={45} />
      <pointLight position={[6, 3, 2]} color="#22d3ee" intensity={45} />
      <Core />
      <Sparkles
        count={110}
        scale={9}
        size={2}
        speed={0.3}
        opacity={0.6}
        color="#a5b4fc"
      />
      <Sparkles
        count={55}
        scale={6}
        size={3}
        speed={0.2}
        opacity={0.4}
        color="#22d3ee"
      />
    </Canvas>
  );
}
