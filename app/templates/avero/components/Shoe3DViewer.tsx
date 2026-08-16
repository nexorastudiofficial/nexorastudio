"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

export type Colorway = "volt" | "black" | "white" | "sand";

const colorThemes: Record<
  Colorway,
  {
    name: string;
    upper: string;
    sole: string;
    accent: string;
    laces: string;
    collar: string;
  }
> = {
  volt: {
    name: "Volt Lime / Black",
    upper: "#1A1C1E",
    sole: "#D6FF3F",
    accent: "#D6FF3F",
    laces: "#D6FF3F",
    collar: "#101112",
  },
  black: {
    name: "Triple Black",
    upper: "#141517",
    sole: "#1F2124",
    accent: "#373A40",
    laces: "#101112",
    collar: "#0A0B0C",
  },
  white: {
    name: "Cloud White / Silver",
    upper: "#EAE8E2",
    sole: "#F4F2ED",
    accent: "#D6FF3F",
    laces: "#FFFFFF",
    collar: "#D8D5CC",
  },
  sand: {
    name: "Desert Sand / Earth",
    upper: "#C5B9A5",
    sole: "#E9E3D8",
    accent: "#8C7E6C",
    laces: "#544C43",
    collar: "#A89C89",
  },
};

function ProceduralSneaker({
  colorway,
  activeHotspot,
}: {
  colorway: Colorway;
  activeHotspot: number | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const theme = colorThemes[colorway];

  useFrame((state, delta) => {
    if (groupRef.current && !activeHotspot) {
      // Subtle idle breathing
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} rotation={[0.15, -0.4, 0]}>
      {/* 1. OUTSOLE / MIDSOLE (Curved athletic running sole) */}
      <mesh position={[0, -0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.35, 1.25]} />
        <meshStandardMaterial
          color={theme.sole}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Sole Curved Front Toe-Spring */}
      <mesh position={[1.4, -0.32, 0]} rotation={[0, 0, 0.35]} castShadow>
        <boxGeometry args={[0.75, 0.28, 1.15]} />
        <meshStandardMaterial color={theme.sole} roughness={0.4} />
      </mesh>

      {/* Carbon-Glide Plate Inset (Neon/Dark accent strip) */}
      <mesh position={[0.1, -0.42, 0]} castShadow>
        <boxGeometry args={[2.6, 0.08, 1.3]} />
        <meshStandardMaterial
          color={theme.accent}
          emissive={theme.accent}
          emissiveIntensity={colorway === "volt" ? 0.35 : 0.05}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* 2. MAIN UPPER BODY */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.7, 1.15]} />
        <meshStandardMaterial
          color={theme.upper}
          roughness={0.7}
          metalness={0.15}
        />
      </mesh>

      {/* Upper Toe Box Contour */}
      <mesh position={[1.1, -0.05, 0]} rotation={[0, 0, -0.15]} castShadow>
        <boxGeometry args={[1.0, 0.52, 1.08]} />
        <meshStandardMaterial color={theme.upper} roughness={0.75} />
      </mesh>

      {/* 3. HEEL CUP & STABILIZER */}
      <mesh position={[-1.2, 0.25, 0]} rotation={[0, 0, 0.2]} castShadow>
        <boxGeometry args={[0.7, 0.85, 1.1]} />
        <meshStandardMaterial
          color={theme.collar}
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>

      {/* Heel TPU Clip */}
      <mesh position={[-1.35, 0.05, 0]} castShadow>
        <boxGeometry args={[0.25, 0.45, 1.16]} />
        <meshStandardMaterial
          color={theme.accent}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      {/* 4. TONGUE & ANKLE COLLAR */}
      <mesh position={[-0.3, 0.6, 0]} rotation={[0, 0, -0.25]} castShadow>
        <boxGeometry args={[0.9, 0.65, 0.88]} />
        <meshStandardMaterial color={theme.collar} roughness={0.8} />
      </mesh>

      {/* 5. LACES & EYELETS */}
      <mesh position={[0.2, 0.45, 0]} rotation={[0, 0, -0.2]} castShadow>
        <boxGeometry args={[1.1, 0.12, 0.7]} />
        <meshStandardMaterial color={theme.laces} roughness={0.5} />
      </mesh>

      {/* 6. AVERO BRAND LOGO SWOOSH / STREAK */}
      <mesh position={[0, 0.1, 0.6]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[1.3, 0.16, 0.04]} />
        <meshStandardMaterial
          color={theme.accent}
          emissive={theme.accent}
          emissiveIntensity={0.25}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0.1, -0.6]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[1.3, 0.16, 0.04]} />
        <meshStandardMaterial
          color={theme.accent}
          emissive={theme.accent}
          emissiveIntensity={0.25}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

const hotspots = [
  {
    id: 1,
    title: "AirFlow Sole Cushioning",
    titleAr: "نعل الفوم النتروجيني AirFlow",
    descAr: "فوم فائق الخفة مدمج مع لوح كربوني لامتصاص الصدمات والدفع للأمام.",
  },
  {
    id: 2,
    title: "Engineered Monomesh Upper",
    titleAr: "نسيج شبكي أحادي Monomesh",
    descAr: "تهوية مستمرة وتثبيت مريح خالي من الدرزات يمنع الاحتكاك.",
  },
  {
    id: 3,
    title: "TPU Heel Lock",
    titleAr: "مثبت الكعب التشريحي TPU",
    descAr: "حماية للكاحل واستقرار مثالي أثناء المنعطفات وتغيير السرعة.",
  },
];

export default function Shoe3DViewer() {
  const [colorway, setColorway] = useState<Colorway>("volt");
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <div className="relative flex flex-col h-full w-full select-none">
      {/* 3D Canvas Canvas container */}
      <div className="relative h-[420px] sm:h-[500px] w-full cursor-grab active:cursor-grabbing">
        <Canvas
          shadows
          camera={{ position: [2.8, 1.2, 3.2], fov: 45 }}
          className="h-full w-full"
        >
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize={1024}
          />
          <directionalLight position={[-5, 3, -5]} intensity={0.6} />
          <spotLight
            position={[0, 6, 0]}
            intensity={0.8}
            angle={0.6}
            penumbra={1}
          />

          <Suspense fallback={null}>
            <Float
              speed={1.5}
              rotationIntensity={0.2}
              floatIntensity={0.4}
              floatingRange={[-0.05, 0.05]}
            >
              <ProceduralSneaker
                colorway={colorway}
                activeHotspot={activeHotspot}
              />
            </Float>
            <ContactShadows
              position={[0, -0.8, 0]}
              opacity={0.45}
              scale={6}
              blur={1.8}
              far={4}
            />
          </Suspense>

          <OrbitControls
            enablePan={false}
            minDistance={2.5}
            maxDistance={5.5}
            maxPolarAngle={Math.PI / 2 + 0.1}
            minPolarAngle={Math.PI / 6}
          />
        </Canvas>

        {/* 3D Interaction Hint Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3.5 py-1.5 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-[#171817] shadow-xs">
          <span className="inline-block h-2 w-2 animate-ping rounded-full bg-[#D6FF3F]" />
          <span>3D INTERACTIVE · اسحب للتدوير 360°</span>
        </div>
      </div>

      {/* Colorway & Hotspot HUD Controls */}
      <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D8D5CC] pt-4 px-2">
        {/* Colorway Swatches */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#777873]">
            اللون:
          </span>
          <div className="flex gap-2">
            {(["volt", "black", "white", "sand"] as Colorway[]).map((c) => (
              <button
                key={c}
                onClick={() => setColorway(c)}
                title={colorThemes[c].name}
                className={`h-7 w-7 rounded-full border transition-all ${
                  colorway === c
                    ? "ring-2 ring-[#101112] ring-offset-2 ring-offset-[#F4F2ED] scale-110"
                    : "border-black/20 hover:scale-105"
                }`}
                style={{
                  backgroundColor:
                    c === "volt"
                      ? "#D6FF3F"
                      : c === "black"
                        ? "#141517"
                        : c === "white"
                          ? "#FFFFFF"
                          : "#C5B9A5",
                }}
              />
            ))}
          </div>
          <span className="text-xs font-mono font-medium text-[#171817]">
            {colorThemes[colorway].name}
          </span>
        </div>

        {/* Interactive Feature Hotspot Buttons */}
        <div className="flex flex-wrap gap-1.5">
          {hotspots.map((h) => (
            <button
              key={h.id}
              onClick={() => setActiveHotspot(activeHotspot === h.id ? null : h.id)}
              className={`rounded-full px-3 py-1 text-[11px] font-medium transition-all ${
                activeHotspot === h.id
                  ? "bg-[#101112] text-[#D6FF3F] shadow-xs"
                  : "bg-white/80 border border-[#D8D5CC] text-[#171817] hover:bg-white"
              }`}
            >
              0{h.id} · {h.titleAr.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Active Hotspot Info Card */}
      {activeHotspot && (
        <div className="mt-3 rounded-xl bg-[#101112] p-4 text-[#F4F2ED] border border-[#222426] animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D6FF3F]">
              TECH INNOVATION 0{activeHotspot}
            </span>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-xs text-zinc-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <h4 className="mt-1 text-sm font-bold text-white">
            {hotspots.find((h) => h.id === activeHotspot)?.titleAr}
          </h4>
          <p className="mt-1 text-xs text-zinc-300">
            {hotspots.find((h) => h.id === activeHotspot)?.descAr}
          </p>
        </div>
      )}
    </div>
  );
}
