"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "./utils.ts";

interface AnimatedGradientBackgroundProps {
    className?: string;
    intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    angle: number;
    speed: number;
    opacity: number;
    hue: number;
    pulse: number;
    pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
    const angle = -35 + Math.random() * 10;
    return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 35 + Math.random() * 20, // 🔥 Slightly wider (35-55px)
        length: height * 3,
        angle: angle,
        speed: 1.5 + Math.random() * 1.6, // 🚀 Slightly faster
        opacity: 0.35 + Math.random() * 0.2, // 🎨 A touch stronger
        hue: 200 + Math.random() * 50,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.035 + Math.random() * 0.05, // 🔄 More noticeable pulsing
    };
}

function BeamsBackground({ className, intensity = "medium" }: AnimatedGradientBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const animationFrameRef = useRef<number>(0);
    const MINIMUM_BEAMS = 22; // ✨ Slightly more beams

    const opacityMap = {
        subtle: 0.65,
        medium: 0.85,
        strong: 1,
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);

            beamsRef.current = Array.from({ length: MINIMUM_BEAMS }, () =>
                createBeam(canvas.width, canvas.height)
            );
        };

        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);

        function resetBeam(beam: Beam, index: number) {
            if (!canvas) return beam;
            beam.y = canvas.height + 100;
            beam.x = Math.random() * canvas.width;
            beam.width = 35 + Math.random() * 20; // 🔥 Slightly wider
            beam.speed = 1.5 + Math.random() * 1.6;
            beam.hue = 200 + (index * 50) / MINIMUM_BEAMS;
            beam.opacity = 0.35 + Math.random() * 0.2;
            return beam;
        }

        function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate((beam.angle * Math.PI) / 180);

            const pulsingOpacity =
                beam.opacity *
                (0.75 + Math.sin(beam.pulse) * 0.25) *
                opacityMap[intensity];

            const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
            gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 75%, 0)`);
            gradient.addColorStop(0.2, `hsla(${beam.hue}, 85%, 75%, ${pulsingOpacity * 0.6})`);
            gradient.addColorStop(0.5, `hsla(${beam.hue}, 85%, 75%, ${pulsingOpacity})`);
            gradient.addColorStop(0.8, `hsla(${beam.hue}, 85%, 75%, ${pulsingOpacity * 0.6})`);
            gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 75%, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx.restore();
        }

        function animate() {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = "blur(20px)"; // 🔥 Slightly stronger glow

            beamsRef.current.forEach((beam, index) => {
                beam.y -= beam.speed;
                beam.pulse += beam.pulseSpeed;

                if (beam.y + beam.length < -100) {
                    resetBeam(beam, index);
                }

                drawBeam(ctx, beam);
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [intensity]);

    return (
        <div className={cn("absolute top-0 left-0 w-full min-h-screen overflow-hidden bg-white", className)}>
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-auto" style={{ filter: "blur(14px)" }} />

            <motion.div
                className="absolute inset-0 bg-gray-950/12" // 🔥 Slightly more contrast
                animate={{ opacity: [0.1, 0.18, 0.1] }}
                transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
                style={{ backdropFilter: "blur(15px)" }} // 🎭 Slightly stronger blur
            />
        </div>
    );
}

export default BeamsBackground;
