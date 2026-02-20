"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import * as THREE from "three";

const slides = [
  { title: "Cordless", highlight: "Hammer Drills", subtitle: "120Nm brushless motor technology with 20V Li-Ion power system", shape: "drill" },
  { title: "Industrial", highlight: "Circular Saws", subtitle: "2200W precision cutting with laser guide alignment system", shape: "saw" },
  { title: "Heavy-Duty", highlight: "Angle Grinders", subtitle: "1400W anti-kickback clutch for safe metalwork operations", shape: "grinder" },
  { title: "Professional", highlight: "Impact Wrenches", subtitle: "350Nm torque for automotive and structural assembly", shape: "wrench" },
];

function DrillShape() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.3;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 2.5, 32]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.08, 0.04, 1.2, 16]} />
        <meshStandardMaterial color="#F4C430" metalness={0.95} roughness={0.05} />
      </mesh>
      <mesh position={[0, -0.5, 0.4]}>
        <boxGeometry args={[0.35, 1.2, 0.6]} />
        <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <torusGeometry args={[0.52, 0.04, 8, 32]} />
        <meshStandardMaterial color="#F4C430" metalness={0.95} roughness={0.1} emissive="#F4C430" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function SawShape() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.3;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 0.8, 1.2]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.85} roughness={0.15} />
      </mesh>
      <mesh position={[1.2, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.05, 48]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.95} roughness={0.05} />
      </mesh>
      <mesh position={[1.2, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.03, 8, 48]} />
        <meshStandardMaterial color="#F4C430" metalness={0.95} roughness={0.1} emissive="#F4C430" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-1, -0.2, 0]}>
        <boxGeometry args={[0.6, 0.5, 0.8]} />
        <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function GrinderShape() {
  const group = useRef<THREE.Group>(null);
  const discRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (discRef.current) {
      discRef.current.rotation.z = state.clock.elapsedTime * 4;
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.35, 0.3, 2.8, 32]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.85} roughness={0.15} />
      </mesh>
      <mesh ref={discRef} position={[0.8, 1.2, 0]} rotation={[Math.PI / 2, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.8, 0.8, 0.06, 48]} />
        <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.5, 0.8, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.38, 0.36, 0.4, 32]} />
        <meshStandardMaterial color="#F4C430" metalness={0.95} roughness={0.1} emissive="#F4C430" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

function WrenchShape() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.3;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.35, 2, 32]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.85} roughness={0.15} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.32, 0.42, 0.8, 6]} />
        <meshStandardMaterial color="#111827" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.3, 0.35]}>
        <boxGeometry args={[0.3, 1, 0.5]} />
        <meshStandardMaterial color="#111827" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.43, 0.03, 8, 32]} />
        <meshStandardMaterial color="#F4C430" metalness={0.95} roughness={0.1} emissive="#F4C430" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <torusGeometry args={[0.38, 0.03, 8, 32]} />
        <meshStandardMaterial color="#F4C430" metalness={0.95} roughness={0.1} emissive="#F4C430" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

function GlowOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
      <mesh ref={ref} position={[0, 0, -2]}>
        <sphereGeometry args={[3, 32, 32]} />
        <MeshDistortMaterial color="#F4C430" emissive="#F4C430" emissiveIntensity={0.05} transparent opacity={0.03} distort={0.3} speed={2} />
      </mesh>
    </Float>
  );
}

function ToolScene({ shapeIndex }: { shapeIndex: number }) {
  const shapes = [DrillShape, SawShape, GrinderShape, WrenchShape];
  const Shape = shapes[shapeIndex % shapes.length];

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#F4C430" />
      <directionalLight position={[-3, 3, -3]} intensity={0.5} color="#94A3B8" />
      <pointLight position={[0, 3, 0]} intensity={0.8} color="#F4C430" distance={10} />
      <GlowOrb />
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Shape />
      </Float>
      <Environment preset="warehouse" />
    </>
  );
}

export default function Hero3D() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => setCurrentSlide(index);
  const goPrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  const slide = slides[currentSlide];

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-bg-primary">
      {/* 3D Canvas */}
      {isClient && (
        <div className="absolute inset-0 hidden md:block">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
            <Suspense fallback={null}>
              <ToolScene shapeIndex={currentSlide} />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/80 to-transparent md:via-bg-primary/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/50" />

      {/* Content */}
      <div className="relative flex min-h-[90vh] items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block rounded-sm border border-border-accent bg-accent-muted px-3 py-1 text-xs font-bold tracking-widest uppercase text-accent"
            >
              Manufacturer Direct
            </motion.span>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-balance text-4xl font-bold uppercase tracking-tight text-text-primary md:text-5xl lg:text-7xl">
                  {slide.title}{" "}
                  <span className="text-accent">{slide.highlight}</span>
                </h1>
                <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-text-secondary md:text-lg">
                  {slide.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 rounded-md bg-accent px-8 py-4 text-sm font-bold tracking-wider uppercase text-bg-primary transition-colors hover:bg-accent-hover"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-border-primary px-8 py-4 text-sm font-bold tracking-wider uppercase text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                <span>Request Quote</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${i === currentSlide ? "w-8 bg-accent" : "w-4 bg-text-muted/30 hover:bg-text-muted/50"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={goPrev}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border-primary text-text-secondary transition-colors hover:border-accent hover:text-accent"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border-primary text-text-secondary transition-colors hover:border-accent hover:text-accent"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
