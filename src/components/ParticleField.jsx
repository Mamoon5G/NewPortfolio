import { useRef, useMemo, useEffect, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count, isLowPower }) {
  const meshRef = useRef(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cyan = new THREE.Color("hsl(185, 80%, 55%)");
    const violet = new THREE.Color("hsl(275, 70%, 60%)");

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const t = Math.random();
      const color = cyan.clone().lerp(violet, t);

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += 0.0008; // 🔥 smoother
    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
  });

  // 🔥 CLEANUP (this fixes crashes)
  useEffect(() => {
    return () => {
      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        meshRef.current.material.dispose();
      }
    };
  }, []);

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={isLowPower ? 0.02 : 0.025}
        vertexColors
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}

// 🔥 prevent re-renders
const MemoParticles = memo(Particles);

export const ParticleField = memo(({ count = 1500, isLowPower = false }) => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={isLowPower ? 1 : [1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <MemoParticles count={count} isLowPower={isLowPower} />
        <ambientLight intensity={0.15} />
      </Canvas>
    </div>
  );
});

export default ParticleField;