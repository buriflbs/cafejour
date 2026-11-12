"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, ShieldCheck, Clock, Users, Calendar, MapPin } from "lucide-react";

interface LiveDossierProps {
  occasion?: string;
  guests?: string;
  date?: string;
  location?: string;
}

export function CateringVisualizer3D({
  dossier,
}: {
  dossier: LiveDossierProps;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isVisibleRef = useRef(false);
  const animationFrameId = useRef<number | null>(null);

  // Subtle Mouse Parallax Tilt (max 3 degrees)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * 3,
      y: x * 3,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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
      setTimeout(() => setHasWebGL(false), 0);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.6, 3.6);

    // Warm Ambient and Directional Champagne Lights
    const ambientLight = new THREE.AmbientLight(0xf3eee6, 0.8);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xc6ad83, 2.5);
    goldKeyLight.position.set(2, 4, 3);
    scene.add(goldKeyLight);

    const rimLight = new THREE.PointLight(0xa98e63, 2.0, 10);
    rimLight.position.set(-2, 2, -2);
    scene.add(rimLight);

    // Group for 3D Luxury Catering Cloche / Pedestal
    const clocheGroup = new THREE.Group();

    // 1. Brushed Champagne Brass Platter Base
    const platterBaseGeo = new THREE.CylinderGeometry(1.2, 1.0, 0.08, 64);
    const goldMetalMat = new THREE.MeshStandardMaterial({
      color: 0xc6ad83, // Champagne brass
      roughness: 0.28,
      metalness: 0.88,
    });
    const platterBase = new THREE.Mesh(platterBaseGeo, goldMetalMat);
    platterBase.position.y = -0.4;
    clocheGroup.add(platterBase);

    // Platter Outer Ring
    const platterRingGeo = new THREE.TorusGeometry(1.18, 0.025, 16, 64);
    const platterRing = new THREE.Mesh(platterRingGeo, goldMetalMat);
    platterRing.rotation.x = Math.PI / 2;
    platterRing.position.y = -0.36;
    clocheGroup.add(platterRing);

    // Dark Obsidian Ceramic Insert
    const insertGeo = new THREE.CylinderGeometry(1.05, 1.05, 0.04, 64);
    const obsidianMat = new THREE.MeshStandardMaterial({
      color: 0x181816,
      roughness: 0.35,
      metalness: 0.1,
    });
    const insert = new THREE.Mesh(insertGeo, obsidianMat);
    insert.position.y = -0.35;
    clocheGroup.add(insert);

    // 2. Translucent Glass Cloche Dome
    const domeGeo = new THREE.SphereGeometry(0.78, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.52);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 0.9,
      transparent: true,
      roughness: 0.08,
      ior: 1.5,
      reflectivity: 0.9,
      thickness: 0.5,
    });
    const dome = new THREE.Mesh(domeGeo, glassMat);
    dome.position.y = -0.33;
    clocheGroup.add(dome);

    // Gold Cloche Top Handle Knob
    const knobStemGeo = new THREE.CylinderGeometry(0.04, 0.06, 0.14, 24);
    const knobStem = new THREE.Mesh(knobStemGeo, goldMetalMat);
    knobStem.position.y = 0.48;
    clocheGroup.add(knobStem);

    const knobSphereGeo = new THREE.SphereGeometry(0.1, 32, 32);
    const knobSphere = new THREE.Mesh(knobSphereGeo, goldMetalMat);
    knobSphere.position.y = 0.58;
    clocheGroup.add(knobSphere);

    // 3. Floating Champagne Light Sparkles inside & around
    const sparkleCount = 35;
    const sparkleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(sparkleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < sparkleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1.5;
      positions[i * 3 + 1] = -0.3 + Math.random() * 1.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
      velocities.push({
        x: (Math.random() - 0.5) * 0.0015,
        y: 0.002 + Math.random() * 0.002,
        z: (Math.random() - 0.5) * 0.0015,
      });
    }

    sparkleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const sparkleMat = new THREE.PointsMaterial({
      color: 0xc6ad83,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
    clocheGroup.add(sparkles);

    // Tilt slightly forward
    clocheGroup.rotation.x = 0.28;
    scene.add(clocheGroup);

    // IntersectionObserver to pause loop off-screen
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

      // Gentle continuous rotation
      clocheGroup.rotation.y = Math.sin(elapsedTime * 0.25) * 0.35 + elapsedTime * 0.1;

      // Animate sparkles
      const posAttr = sparkleGeo.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < sparkleCount; i++) {
        array[i * 3 + 1] += velocities[i].y;
        array[i * 3] += velocities[i].x;

        if (array[i * 3 + 1] > 1.3) {
          array[i * 3 + 1] = -0.3;
          array[i * 3] = (Math.random() - 0.5) * 1.5;
          array[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

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
      className="space-y-6"
    >
      {/* 3D Interactive Stage Card */}
      <div
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-[#181816] via-[#141412] to-[#0D0D0C] border border-[#2A2A26] shadow-2xl p-5 flex flex-col justify-between transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Subtle Radial Amber/Champagne Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#C6AD83]/10 rounded-full blur-3xl pointer-events-none" />

        {/* 3D Canvas */}
        {hasWebGL && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-10"
          />
        )}

        {/* Floating Top Header */}
        <div className="relative z-20 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center space-x-1.5 text-[10px] uppercase tracking-[0.25em] text-[#C6AD83] font-mono bg-black/70 px-3 py-1.5 rounded-full backdrop-blur-md border border-[#C6AD83]/20 shadow">
            <Sparkles className="w-3 h-3 text-[#C6AD83]" />
            <span>3D Anlass Visualisierung</span>
          </span>
          <span className="text-[10px] text-[#B8B0A4] font-mono bg-white/5 px-2.5 py-1 rounded">
            Allschwil · Basel-Landschaft
          </span>
        </div>

        {/* Floating Bottom Atmosphere Text */}
        <div className="relative z-20 pointer-events-none bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 rounded-xl -mx-3 -mb-3 border-t border-white/5">
          <p className="font-serif text-xl text-[#F3EEE6] font-normal leading-tight">
            Massgeschneiderte Festkultur
          </p>
          <p className="text-xs text-[#B8B0A4] font-light mt-1">
            Persönlich kuratierte Apéro- und Menükompositionen für Gesellschaften in Allschwil.
          </p>
        </div>
      </div>

      {/* Live "Event Dossier" Summary Card */}
      <div className="bg-[#181816]/90 border border-[#2A2A26] rounded-2xl p-6 sm:p-7 backdrop-blur-xl shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#2A2A26]">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#C6AD83] animate-pulse" />
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#F3EEE6] font-mono">
              Live Anfrage-Dossier
            </h4>
          </div>
          <span className="text-[10px] text-[#A98E63] font-mono bg-[#29201B] px-2 py-0.5 rounded">
            Entwurf
          </span>
        </div>

        {/* Live Data Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs font-light">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#A98E63] font-mono flex items-center">
              <Sparkles className="w-3 h-3 mr-1" /> Anlass
            </span>
            <p className="text-[#F3EEE6] font-medium font-serif text-sm truncate">
              {dossier.occasion || "Noch nicht gewählt"}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#A98E63] font-mono flex items-center">
              <Users className="w-3 h-3 mr-1" /> Gästeanzahl
            </span>
            <p className="text-[#F3EEE6] font-medium font-serif text-sm">
              {dossier.guests ? `${dossier.guests} Personen` : "Offen"}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#A98E63] font-mono flex items-center">
              <Calendar className="w-3 h-3 mr-1" /> Wunschdatum
            </span>
            <p className="text-[#F3EEE6] font-medium font-serif text-sm">
              {dossier.date || "Nach Vereinbarung"}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#A98E63] font-mono flex items-center">
              <MapPin className="w-3 h-3 mr-1" /> Veranstaltungsort
            </span>
            <p className="text-[#F3EEE6] font-medium font-serif text-sm truncate">
              {dossier.location || "Allschwil / Region Basel"}
            </p>
          </div>
        </div>

        {/* Assurance Pills */}
        <div className="pt-2 border-t border-[#2A2A26] flex flex-col space-y-2 text-[11px] text-[#B8B0A4]">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C6AD83] shrink-0" />
            <span>100% unverbindliche & diskrete Offertenerstellung</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-[#C6AD83] shrink-0" />
            <span>Persönliche Kontaktaufnahme zur Detailabstimmung</span>
          </div>
        </div>
      </div>
    </div>
  );
}
