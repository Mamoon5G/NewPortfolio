import { memo, useRef, Suspense, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Ring, Icosahedron, Stars } from "@react-three/drei";
import * as THREE from "three";

const useIsMobile = () => {
  const { viewport } = useThree();
  return viewport.width < 5;
};

const Planet = memo(({ position, radius, color, rotationSpeed, hasRing, ringColor }) => {
  const meshRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += rotationSpeed * 0.5;
    }
  });

  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[radius, 64, 64]} />
          <meshStandardMaterial
            color={color}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
      </Float>
      {hasRing && (
        <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[radius * 1.4, radius * 1.8, 64]} />
          <meshStandardMaterial
            color={ringColor}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
});

const FloatingParticle = memo(({ position, size, speed }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed;
      meshRef.current.rotation.y += speed * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#00d4ff"
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
});

const CosmicRing = memo(({ radius, tubeRadius, rotation, color }) => {
  const ref = useRef();
  
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.002;
    }
  });

  return (
    <Torus ref={ref} args={[radius, tubeRadius, 16, 100]} rotation={rotation}>
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.3}
        wireframe
      />
    </Torus>
  );
});

const NebulaOrb = memo(({ position, scale, color }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = t * 0.1;
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.scale.setScalar(scale * (1 + Math.sin(t * 0.5) * 0.1));
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
});

const Asteroid = memo(({ position, scale, rotationAxis }) => {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation[rotationAxis] += 0.01;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#4a5568"
          roughness={0.9}
          metalness={0.3}
        />
      </mesh>
    </Float>
  );
});

const SpaceDust = memo(({ count }) => {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  const pointRef = useRef();

  useFrame((state) => {
    if (pointRef.current) {
      pointRef.current.rotation.y += 0.0005;
      pointRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <points ref={pointRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
});

const Scene = memo(({ isDark }) => {
  const isMobile = useIsMobile();

  if (!isDark) {
    return (
      <>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#0891b2" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#f59e0b" />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      </>
    );
  }

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ec4899" />
      <pointLight position={[0, 5, 5]} intensity={0.5} color="#8b5cf6" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.3} color="#00d4ff" />

      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

      {!isMobile && (
        <>
          <NebulaOrb position={[-3, 1, -2]} scale={0.5} color="#00d4ff" />
          <NebulaOrb position={[3, -1, -1]} scale={0.4} color="#8b5cf6" />
          <NebulaOrb position={[2, 2, -3]} scale={0.3} color="#ec4899" />
          <NebulaOrb position={[-2, -2, -2]} scale={0.35} color="#3b82f6" />
          
          <CosmicRing radius={2} tubeRadius={0.02} rotation={[0.5, 0.3, 0]} color="#00d4ff" />
          <CosmicRing radius={2.5} tubeRadius={0.015} rotation={[1, 0.5, 0.3]} color="#8b5cf6" />
          <CosmicRing radius={3} tubeRadius={0.01} rotation={[2, 1, 0.5]} color="#ec4899" />

          <Planet position={[-4, 0, -3]} radius={0.4} color="#00d4ff" rotationSpeed={0.005} hasRing={true} ringColor="#00d4ff" />
          <Planet position={[4, 1, -2]} radius={0.3} color="#ec4899" rotationSpeed={0.008} hasRing={false} />
          <Planet position={[0, -3, -4]} radius={0.5} color="#8b5cf6" rotationSpeed={0.003} hasRing={true} ringColor="#8b5cf6" />

          <FloatingParticle position={[-2, 3, -2]} size={0.1} speed={0.02} />
          <FloatingParticle position={[3, 2, -1]} size={0.08} speed={0.025} />
          <FloatingParticle position={[1, -2, -3]} size={0.12} speed={0.015} />
          <FloatingParticle position={[-3, -1, -2]} size={0.06} speed={0.03} />
          <FloatingParticle position={[2, 0, -4]} size={0.09} speed={0.018} />

          <Asteroid position={[-1, -4, -3]} scale={0.5} rotationAxis="x" />
          <Asteroid position={[2, 3, -2]} scale={0.4} rotationAxis="y" />
          <Asteroid position={[-3, 2, -4]} scale={0.6} rotationAxis="z" />

          <SpaceDust count={500} />
        </>
      )}

      <mesh position={[0, -5, -8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30, 32, 32]} />
        <meshStandardMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.05}
        />
      </mesh>
    </>
  );
});

const FallbackCanvas = memo(({ isDark }) => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-nebula-purple/5" />
    <div 
      className="absolute w-64 h-64 rounded-full blur-[100px] animate-pulse"
      style={{ 
        background: isDark ? 'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(8,145,178,0.1) 0%, transparent 70%)',
        top: '20%',
        left: '10%',
      }}
    />
    <div 
      className="absolute w-96 h-96 rounded-full blur-[150px] animate-pulse"
      style={{ 
        background: isDark ? 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' : 'transparent',
        bottom: '10%',
        right: '10%',
        animationDelay: '2s',
      }}
    />
  </div>
));

export const Hero3D = memo(({ isDark }) => {
  const canvasRef = useRef(null);
  
  const hasWebGL = useMemo(() => {
    if (typeof window === 'undefined') return true;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch (e) {
      return false;
    }
  }, []);

  if (!hasWebGL) {
    return <FallbackCanvas isDark={isDark} />;
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" ref={canvasRef}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Scene isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
});

export default Hero3D;
