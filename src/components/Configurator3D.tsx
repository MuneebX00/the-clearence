"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  depth: number;
  width: number;
  cladding: string;
}

function GardenRoom({ depth, width, cladding }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Slow rotation for presentation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1 - 0.2;
    }
  });

  // Calculate scaled dimensions (1 unit = 1 meter approx)
  const w = width;
  const d = depth;
  const h = 2.5; // Fixed height under 2.5m

  // Determine material color based on cladding
  const claddingColor = cladding === "Premium Cedar" ? "#8A5A44" : cladding === "Treated Redwood" ? "#6B4423" : "#4A4A4A";

  return (
    <group ref={groupRef} position={[0, -h/2, 0]}>
      {/* Main Structure */}
      <mesh castShadow receiveShadow position={[0, h/2, -d/2 + 1]}>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={claddingColor} roughness={0.9} />
      </mesh>
      
      {/* Front Glazing / Frame */}
      <mesh position={[0, h/2, 1 + 0.1]}>
        <boxGeometry args={[w - 0.2, h - 0.2, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Glass */}
      <mesh position={[0, h/2, 1 + 0.12]}>
        <boxGeometry args={[w - 0.4, h - 0.4, 0.05]} />
        <meshPhysicalMaterial 
          color="#a0c0d0"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.1}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>

      {/* Roof Canopy Overhang */}
      <mesh castShadow receiveShadow position={[0, h + 0.1, -d/2 + 1.25]}>
        <boxGeometry args={[w + 0.4, 0.2, d + 0.5]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
      </mesh>
      
      {/* Interior Floor (Visible through glass) */}
      <mesh position={[0, 0.1, -d/2 + 1]}>
        <boxGeometry args={[w - 0.2, 0.1, d - 0.2]} />
        <meshStandardMaterial color="#d4c3b3" roughness={0.6} />
      </mesh>
    </group>
  );
}

export default function Configurator3D({ depth, width, cladding }: { depth: string, width: string, cladding: string }) {
  const d = parseFloat(depth) || 4;
  const w = parseFloat(width) || 4;

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [6, 3, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight 
          castShadow 
          position={[5, 10, 5]} 
          intensity={1.5} 
          shadow-mapSize={[1024, 1024]}
        />
        <Environment preset="city" />
        
        <GardenRoom depth={d} width={w} cladding={cladding} />
        
        <ContactShadows 
          position={[0, -1.25, 0]} 
          opacity={0.7} 
          scale={15} 
          blur={2.5} 
          far={4}
        />
        
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={5}
          maxDistance={12}
        />
      </Canvas>
      <div className="absolute bottom-4 right-4 pointer-events-none bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded text-xs">
        Interactive Illustrative Model
      </div>
    </div>
  );
}
