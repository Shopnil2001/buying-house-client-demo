"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

interface SilkRibbonProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
}

export default function SilkRibbonMesh({ scrollProgress, mousePos }: SilkRibbonProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.InstancedMesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  // Generate 3D Catmull-Rom Curve for the silk ribbon
  const { geometry, curve } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const count = 16;
    for (let i = 0; i <= count; i++) {
      const t = (i / count) * Math.PI * 4;
      const x = Math.sin(t) * 3.2 + Math.sin(t * 2) * 1.2;
      const y = (i / count - 0.5) * 6.5 + Math.cos(t * 1.5) * 0.8;
      const z = Math.cos(t) * 2.8 + Math.sin(t * 0.5) * 1.5;
      points.push(new THREE.Vector3(x, y, z));
    }

    const catmullCurve = new THREE.CatmullRomCurve3(points, false, "centripetal", 0.5);
    const tubeGeo = new THREE.TubeGeometry(catmullCurve, 120, 0.45, 16, false);

    return { geometry: tubeGeo, curve: catmullCurve };
  }, []);

  // Foreground & Midground floating fiber motes (InstancedMesh)
  const particleCount = 75;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < particleCount; i++) {
      data.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10
        ),
        speed: Math.random() * 0.008 + 0.003,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        scale: Math.random() * 0.08 + 0.03,
      });
    }
    return data;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;

    // Smooth subtle pointer-parallax
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mousePos.x * 0.35 + scrollProgress * Math.PI * 1.5,
      0.06
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mousePos.y * 0.25 + Math.sin(scrollProgress * Math.PI) * 0.4,
      0.06
    );

    // Subtle organic breathing undulation
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.z = Math.sin(time * 0.4) * 0.08;

    // Update floating fiber motes
    if (particlesRef.current) {
      particleData.forEach((p, i) => {
        p.pos.y += Math.sin(time * 0.8 + i) * 0.006;
        p.pos.x += Math.cos(time * 0.5 + i) * 0.003;
        dummy.position.copy(p.pos);
        dummy.rotation.x = time * p.rotSpeed;
        dummy.rotation.y = time * p.rotSpeed * 1.5;
        dummy.scale.setScalar(p.scale);
        dummy.updateMatrix();
        particlesRef.current.setMatrixAt(i, dummy.matrix);
      });
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Woven Silk Ribbon Core */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color="#D49A62" // Warm raw silk gold
          emissive="#2A1B0E"
          emissiveIntensity={0.15}
          roughness={0.32}
          metalness={0.12}
          clearcoat={0.65}
          clearcoatRoughness={0.2}
          sheen={1.0}
          sheenColor="#E0B27A"
          sheenRoughness={0.3}
          iridescence={0.35}
          iridescenceIOR={1.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Secondary Fine Accent Thread */}
      <mesh geometry={geometry} scale={[1.02, 1.02, 1.02]}>
        <meshStandardMaterial
          color="#FAF7F2"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Floating Fiber Dust Motes */}
      <instancedMesh
        ref={particlesRef}
        args={[undefined, undefined, particleCount]}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial
          color="#E0B27A"
          emissive="#D4AF37"
          emissiveIntensity={0.6}
          roughness={0.2}
        />
      </instancedMesh>
    </group>
  );
}
