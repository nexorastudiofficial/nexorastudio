"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function ExplodedSneakerMesh({ separation }: { separation: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  // separation ranges from 0 to 1
  const s = separation;

  return (
    <group ref={groupRef} position={[0, -0.1, 0]} rotation={[0.2, 0.4, 0]}>
      {/* LAYER 1: UPPER (Separates upwards) */}
      <group position={[0, 0.4 + s * 1.0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.8, 0.7, 1.15]} />
          <meshStandardMaterial color="#141517" roughness={0.8} />
        </mesh>
        {/* Tongue / Laces */}
        <mesh position={[-0.3, 0.55, 0]} rotation={[0, 0, -0.25]}>
          <boxGeometry args={[0.9, 0.6, 0.85]} />
          <meshStandardMaterial color="#222426" roughness={0.7} />
        </mesh>
        <mesh position={[0.2, 0.4, 0]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[1.1, 0.1, 0.7]} />
          <meshStandardMaterial color="#D6FF3F" roughness={0.4} />
        </mesh>
      </group>

      {/* LAYER 2: NITRO-PULSE FOAM MIDSOLE */}
      <group position={[0, 0 + s * 0.35, 0]}>
        <mesh castShadow>
          <boxGeometry args={[3.0, 0.28, 1.22]} />
          <meshStandardMaterial
            color="#EAE8E2"
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* LAYER 3: CARBON-GLIDE PROPULSION PLATE */}
      <group position={[0, -0.25 - s * 0.2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.7, 0.08, 1.26]} />
          <meshStandardMaterial
            color="#D6FF3F"
            emissive="#D6FF3F"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>
      </group>

      {/* LAYER 4: HIGH-TRACTION OUTSOLE (Separates downwards) */}
      <group position={[0, -0.55 - s * 0.85, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.1, 0.18, 1.25]} />
          <meshStandardMaterial color="#101112" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

const layers = [
  {
    step: "01",
    name: "الجزء العلوي (Engineered Monomesh)",
    desc: "نسيج شبكي خفيف ومرن يتنفس مع قدمك ويمنع تراكم الحرارة أثناء الجري المكثف.",
    tag: "خفة وتهوية 100%",
  },
  {
    step: "02",
    name: "وسادة الفوم النتروجيني (NitroPulse Foam)",
    desc: "فوم مشبع بجزيئات النتروجين يوفر استجابة فورية وامتصاصاً استثنائياً للصدمات.",
    tag: "استرجاع طاقة 85%",
  },
  {
    step: "03",
    name: "لوح الدفع الكربوني (Carbon-Glide Plate)",
    desc: "لوح من ألياف الكربون المنحنية ثلاثية الأبعاد يعمل كنابض يدفعك للأمام مع كل خطوة.",
    tag: "دفع أمامي متواصل",
  },
  {
    step: "04",
    name: "نعل التماسك العالي (High-Grip Outsole)",
    desc: "مطاط مركب مفرغ بمداس هندسي يوفر ثباتاً مطلقاً في المنعطفات والأسطح الرطبة.",
    tag: "ثبات في كل اتجاه",
  },
];

export default function Exploded3DView() {
  const [separation, setSeparation] = useState(0.6); // 0 (assembled) to 1 (fully exploded)

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-center rounded-2xl bg-[#101112] p-6 sm:p-10 border border-[#222426] text-[#F4F2ED]">
      {/* Left / Top: 3D Exploded Canvas */}
      <div className="lg:col-span-7 flex flex-col items-center">
        <div className="relative h-[380px] sm:h-[450px] w-full cursor-grab active:cursor-grabbing">
          <Canvas
            shadows
            camera={{ position: [2.6, 1.5, 3.2], fov: 45 }}
            className="h-full w-full"
          >
            <ambientLight intensity={0.9} />
            <directionalLight position={[4, 7, 4]} intensity={1.8} castShadow />
            <directionalLight position={[-4, 2, -4]} intensity={0.5} />
            <spotLight position={[0, 5, 0]} intensity={1.0} />

            <Suspense fallback={null}>
              <ExplodedSneakerMesh separation={separation} />
              <ContactShadows
                position={[0, -1.2, 0]}
                opacity={0.5}
                scale={7}
                blur={2}
              />
            </Suspense>

            <OrbitControls
              enablePan={false}
              minDistance={2.4}
              maxDistance={5.5}
              maxPolarAngle={Math.PI / 2 + 0.2}
              minPolarAngle={Math.PI / 6}
            />
          </Canvas>

          <div className="absolute top-3 right-3 rounded-full bg-white/10 px-3 py-1 text-[10px] font-mono text-[#D6FF3F] backdrop-blur-md">
            EXPLODED 3D VIEW
          </div>
        </div>

        {/* Explosion Range Slider */}
        <div className="mt-4 flex w-full max-w-sm items-center gap-3 bg-[#171817] px-4 py-2.5 rounded-full border border-[#222426]">
          <span className="text-[10px] font-mono text-zinc-400">تجميع</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={separation}
            onChange={(e) => setSeparation(parseFloat(e.target.value))}
            className="w-full accent-[#D6FF3F] cursor-pointer"
          />
          <span className="text-[10px] font-mono text-[#D6FF3F]">تفكيك</span>
        </div>
      </div>

      {/* Right: Layer Explanations */}
      <div className="lg:col-span-5 space-y-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D6FF3F]">
            ANATOMY OF SPEED
          </span>
          <h3 className="mt-1 text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            مبني بدقة من الأساس إلى الأعلى
          </h3>
          <p className="mt-2 text-xs text-zinc-400">
            حرك المؤشر لتفكيك طبقات الحذاء واكتشاف التقنيات المدمجة داخل كل طبقة.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {layers.map((l, idx) => (
            <div
              key={l.step}
              className={`rounded-xl p-3.5 border transition-all ${
                separation > idx * 0.22
                  ? "bg-[#171817] border-[#D6FF3F]/40 shadow-xs"
                  : "bg-black/30 border-[#222426] opacity-70"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#D6FF3F]">
                  {l.step}
                </span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-mono text-zinc-300">
                  {l.tag}
                </span>
              </div>
              <h4 className="mt-1 text-xs font-bold text-white">{l.name}</h4>
              <p className="mt-1 text-[11px] text-zinc-400 leading-relaxed">
                {l.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
