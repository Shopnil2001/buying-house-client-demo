"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SilkRibbonMesh from "./SilkRibbonMesh";
import { CameraState } from "./useScrollCamera";

interface SceneProps {
  scrollProgress: number;
  cameraStateRef: React.MutableRefObject<CameraState>;
  mousePos: { x: number; y: number };
}

function CameraRig({
  cameraStateRef,
  mousePos,
}: {
  cameraStateRef: React.MutableRefObject<CameraState>;
  mousePos: { x: number; y: number };
}) {
  useFrame((state) => {
    const cs = cameraStateRef.current;

    // Smooth camera position interpolation with pointer parallax
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      cs.posX + mousePos.x * 0.4,
      0.08
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      cs.posY - mousePos.y * 0.4,
      0.08
    );
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      cs.posZ,
      0.08
    );

    // Look at animated focal target
    const target = new THREE.Vector3(cs.targetX, cs.targetY, cs.targetZ);
    state.camera.lookAt(target);
  });

  return null;
}

export default function SpatialVisualizerScene({
  scrollProgress,
  cameraStateRef,
  mousePos,
}: SceneProps) {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 9.5], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
        className="w-full h-full"
      >
        <CameraRig cameraStateRef={cameraStateRef} mousePos={mousePos} />

        {/* 1. Warm Amber Key Light (Brand Gold Accent #E0B27A) */}
        <directionalLight
          position={[6, 8, 5]}
          intensity={2.8}
          color="#FFE5B4"
          castShadow={false}
        />

        {/* 2. Cool Bengal Indigo Rim Light (#1B2A4A / #24426B) */}
        <directionalLight
          position={[-7, -4, -4]}
          intensity={3.2}
          color="#6B9BD2"
        />

        {/* 3. Subtle Warm Ambient Fill */}
        <ambientLight intensity={0.45} color="#182335" />

        {/* 4. Top Down Spotlight for Silk Sheen Specularity */}
        <spotLight
          position={[0, 10, 2]}
          intensity={1.8}
          angle={0.6}
          penumbra={0.8}
          color="#FAF7F2"
        />

        {/* 5. 3D Silk Ribbon Centerpiece & Floating Fiber Particles */}
        <SilkRibbonMesh
          scrollProgress={scrollProgress}
          mousePos={mousePos}
        />
      </Canvas>

      {/* Atmospheric Film Grain Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Depth Vignette Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-80" />
    </div>
  );
}
