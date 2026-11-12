"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";

export function InteractiveSpotlight3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isVisibleRef = useRef(false);
  const animationFrameId = useRef<number | null>(null);

  // 3D Perspective Tilt on Mouse Movement (Desktop only, max 4 degrees)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // max 4 degrees
    setTilt({
      x: -y * 4,
      y: x * 4,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
    } catch {
      setTimeout(() => {
        setHasWebGL(false);
      }, 0);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.4, 3.2);

    // Warm Ambient and Directional Brass Lights
    const ambientLight = new THREE.AmbientLight(0xf3eee6, 0.9);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xc6ad83, 2.5, 8);
    goldPointLight.position.set(1.5, 1.8, 1.5);
    scene.add(goldPointLight);

    const espressoBackLight = new THREE.PointLight(0x29201b, 1.5, 6);
    espressoBackLight.position.set(-1.5, -1, -1);
    scene.add(espressoBackLight);

    // 3D Procedural Ceramic Espresso Cup & Saucer Group
    const cupGroup = new THREE.Group();

    // 1. Saucer
    const saucerGeo = new THREE.CylinderGeometry(0.9, 0.6, 0.08, 48);
    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0x181816, // Obsidian dark ceramic
      roughness: 0.25,
      metalness: 0.15,
    });
    const saucer = new THREE.Mesh(saucerGeo, ceramicMat);
    saucer.position.y = -0.45;
    cupGroup.add(saucer);

    // Saucer Gold Rim
    const rimGeo = new THREE.TorusGeometry(0.88, 0.015, 16, 64);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc6ad83, // Champagne brass
      roughness: 0.3,
      metalness: 0.85,
    });
    const saucerRim = new THREE.Mesh(rimGeo, goldMat);
    saucerRim.rotation.x = Math.PI / 2;
    saucerRim.position.y = -0.41;
    cupGroup.add(saucerRim);

    // 2. Cup Body
    const cupGeo = new THREE.CylinderGeometry(0.55, 0.38, 0.65, 48, 1, true);
    const cup = new THREE.Mesh(cupGeo, ceramicMat);
    cup.position.y = -0.12;
    cupGroup.add(cup);

    // Cup Base Inside
    const cupBaseGeo = new THREE.CircleGeometry(0.38, 32);
    const cupBase = new THREE.Mesh(cupBaseGeo, ceramicMat);
    cupBase.rotation.x = -Math.PI / 2;
    cupBase.position.y = -0.44;
    cupGroup.add(cupBase);

    // 3. Crema / Coffee Surface Inside Cup
    const coffeeGeo = new THREE.CircleGeometry(0.51, 32);
    const coffeeMat = new THREE.MeshStandardMaterial({
      color: 0x3d281a, // Rich espresso brown
      roughness: 0.4,
      metalness: 0.05,
    });
    const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
    coffee.rotation.x = -Math.PI / 2;
    coffee.position.y = 0.12;
    cupGroup.add(coffee);

    // Gold Rim on Cup Lip
    const cupLipGeo = new THREE.TorusGeometry(0.55, 0.016, 16, 64);
    const cupLip = new THREE.Mesh(cupLipGeo, goldMat);
    cupLip.rotation.x = Math.PI / 2;
    cupLip.position.y = 0.2;
    cupGroup.add(cupLip);

    // Cup Handle
    const handleGeo = new THREE.TorusGeometry(0.24, 0.045, 16, 32, Math.PI * 1.2);
    const handle = new THREE.Mesh(handleGeo, ceramicMat);
    handle.position.set(0.6, -0.12, 0);
    handle.rotation.z = -Math.PI / 2;
    cupGroup.add(handle);

    // 4. Subtle Rising Steam Particles (Procedural Vapor)
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.4;
      positions[i * 3 + 1] = 0.2 + Math.random() * 0.8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      velocities.push({
        x: (Math.random() - 0.5) * 0.002,
        y: 0.003 + Math.random() * 0.003,
        z: (Math.random() - 0.5) * 0.002,
      });
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xf3eee6,
      size: 0.035,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const steam = new THREE.Points(particleGeo, particleMat);
    cupGroup.add(steam);

    // Tilt cup slightly toward camera for cinematic view
    cupGroup.rotation.x = 0.32;
    scene.add(cupGroup);

    // IntersectionObserver to pause rendering loop when outside screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      // Gentle continuous 3D idle rotation
      cupGroup.rotation.y = Math.sin(elapsedTime * 0.35) * 0.25;

      // Animate steam particles upwards
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        array[i * 3 + 1] += velocities[i].y;
        array[i * 3] += velocities[i].x;

        // Reset particle when it rises beyond top
        if (array[i * 3 + 1] > 1.2) {
          array[i * 3 + 1] = 0.2;
          array[i * 3] = (Math.random() - 0.5) * 0.35;
          array[i * 3 + 2] = (Math.random() - 0.5) * 0.35;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-b from-[#181816] to-[#111110] border border-[#2A2A26] shadow-2xl p-4 flex flex-col justify-between group transition-transform duration-300 ease-out"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {/* 3D WebGL Canvas */}
      {hasWebGL ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-10"
        />
      ) : (
        /* High-quality Static Fallback */
        <Image
          src="/images/coffee-art.jpg"
          alt="Spezialitätenkaffee im Cafe Jour"
          fill
          className="object-cover"
        />
      )}

      {/* Top Floating Badge */}
      <div className="relative z-20 flex items-center justify-between pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6AD83] font-mono bg-black/60 px-3 py-1 rounded backdrop-blur-sm border border-white/5">
          3D Handwerk Visualisierung
        </span>
        <span className="text-[10px] text-[#B8B0A4] font-mono">
          Spitzwaldstrasse 4
        </span>
      </div>

      {/* Bottom Information Overlay */}
      <div className="relative z-20 pointer-events-none bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 rounded-lg -mx-2 -mb-2 border-t border-white/5">
        <h4 className="font-serif text-lg text-[#F3EEE6] font-normal">
          Die Kunst der Espresso-Zubereitung
        </h4>
        <p className="text-xs text-[#B8B0A4] font-light mt-0.5">
          Interaktive 3D-Studie: Präziser Mahlgrad, gleichmässiger Druck und samtige Crema.
        </p>
      </div>
    </div>
  );
}
