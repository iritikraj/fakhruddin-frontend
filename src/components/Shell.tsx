"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export default function OrigamiShell({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    CustomEase.create("silk", "M0,0 C0.05,0 0.133,0.166 0.166,0.266 C0.208,0.388 0.233,0.6 0.5,0.75 C0.702,0.862 0.938,1 1,1");

    // ─── THREE.JS PARTICLE JOURNEY ────────────────────────────────────────────
    let animId: number;
    let THREE: any;
    let renderer: any, scene: any, camera: any;
    let particles: any, particleMaterial: any;
    let cityLines: any[] = [];
    let clock: any;

    const W = window.innerWidth;
    const H = window.innerHeight;

    // Dynamically import Three.js to keep initial bundle light
    import("three").then((T) => {
      THREE = T;
      clock = new THREE.Clock();

      // Renderer — power preference "low-power" = smoother on integrated GPUs
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: false,         // off for perf
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(W, H);
      renderer.setClearColor(0x08080c, 1);

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x08080c, 0.025);

      camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
      camera.position.set(0, 4, 28);
      camera.lookAt(0, 1, 0);

      // ── STAR FIELD (cheap, instanced) ──
      const starCount = 600;
      const starGeo = new THREE.BufferGeometry();
      const starPos = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount * 3; i++) {
        starPos[i * 3] = (Math.random() - 0.5) * 120;
        starPos[i * 3 + 1] = Math.random() * 40 - 5;
        starPos[i * 3 + 2] = Math.random() * -80 - 5;
      }
      // Fix: assign correct indices
      for (let i = 0; i < starCount; i++) {
        starPos[i * 3] = (Math.random() - 0.5) * 120;
        starPos[i * 3 + 1] = Math.random() * 40 - 5;
        starPos[i * 3 + 2] = Math.random() * -80 - 5;
      }
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
      const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.7, sizeAttenuation: true });
      scene.add(new THREE.Points(starGeo, starMat));

      // ── GOLDEN PARTICLE CLOUD (dust / travel feel) ──
      const pCount = 800; // lean count for smooth 60fps
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3] = (Math.random() - 0.5) * 40;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 15;
        pPos[i * 3 + 2] = Math.random() * -60 - 2;
        // warm gold to cream
        pCol[i * 3] = 0.77 + Math.random() * 0.23;
        pCol[i * 3 + 1] = 0.65 + Math.random() * 0.15;
        pCol[i * 3 + 2] = 0.35 + Math.random() * 0.25;
      }
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
      particleMaterial = new THREE.PointsMaterial({
        size: 0.18,
        vertexColors: true,
        transparent: true,
        opacity: 0,
        sizeAttenuation: true,
        depthWrite: false,
      });
      particles = new THREE.Points(pGeo, particleMaterial);
      scene.add(particles);

      // ── DUBAI SKYLINE (procedural wire city) ──
      // Burj Khalifa-ish silhouette as a series of LineSegments
      const goldMat = new THREE.LineBasicMaterial({
        color: 0xc5a572,
        transparent: true,
        opacity: 0,
        linewidth: 1,
      });

      const buildingProfiles = [
        // [x, groundY, width, height, hasTaper]
        [-18, 0, 2.5, 5, false],
        [-14, 0, 2, 7, false],
        [-10, 0, 2.5, 9, true],
        [-6, 0, 3, 6, false],
        [-2, 0, 4, 22, true],  // Burj Khalifa centrepiece
        [3, 0, 3, 8, false],
        [7, 0, 2.5, 6, false],
        [11, 0, 2, 10, true],
        [15, 0, 2.5, 5, false],
        [19, 0, 2, 7, false],
      ];

      buildingProfiles.forEach(([x, y, w, h, taper]) => {
        const pts: number[] = [];
        const hw = (w as number) / 2;
        const bx = x as number;
        const bh = h as number;
        const by = y as number;

        // base outline
        pts.push(bx - hw, by, -5, bx - hw, by + bh * 0.85, -5);
        pts.push(bx + hw, by, -5, bx + hw, by + bh * 0.85, -5);
        pts.push(bx - hw, by, -5, bx + hw, by, -5);

        if (taper) {
          // taper to spire
          pts.push(bx - hw, by + bh * 0.85, -5, bx, by + bh, -5);
          pts.push(bx + hw, by + bh * 0.85, -5, bx, by + bh, -5);
        } else {
          pts.push(bx - hw, by + bh * 0.85, -5, bx + hw, by + bh * 0.85, -5);
        }

        // a few horizontal detail lines
        [0.3, 0.55, 0.72].forEach((frac) => {
          const fy = by + bh * frac * 0.85;
          pts.push(bx - hw, fy, -5, bx + hw, fy, -5);
        });

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
        const mat = goldMat.clone();
        const line = new THREE.LineSegments(geo, mat);
        scene.add(line);
        cityLines.push(line);
      });

      // ── GROUND REFLECTION PLANE ──
      const groundGeo = new THREE.PlaneGeometry(80, 40);
      const groundMat = new THREE.MeshBasicMaterial({
        color: 0x0d0d14,
        transparent: true,
        opacity: 0.9,
      });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.set(0, -0.1, -5);
      scene.add(ground);

      // ── GSAP ORCHESTRATION ──────────────────────────────────────────────────
      const tl = gsap.timeline({ onComplete: () => onComplete() });

      // Phase 1 (0–2s): Camera starts far, dust particles appear → feeling of approach
      tl.to(particleMaterial, { opacity: 0.85, duration: 2.5, ease: "power2.out" }, 0);

      // Phase 2 (1–5s): City reveals — lines draw up one by one
      cityLines.forEach((line, i) => {
        tl.to(line.material, { opacity: 0.0 + 0.55, duration: 1.6, ease: "power3.out" }, 0.8 + i * 0.12);
      });

      // Phase 3 (3.5s): Title materialises
      tl.to(titleRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 2, ease: "silk" }, 3.4);
      tl.to(lineRef.current, { scaleX: 1, opacity: 1, duration: 1.4, ease: "power3.out" }, 4.6);
      tl.to(subRef.current, { opacity: 0.7, y: 0, filter: "blur(0px)", duration: 1.4, ease: "power2.out" }, 5);

      // Phase 4 (+=2s hold) → fade everything out to cream/light BG
      tl.to(particleMaterial, { opacity: 0, duration: 1.6, ease: "power2.in" }, "+=1.8");
      cityLines.forEach((line) => {
        tl.to(line.material, { opacity: 0, duration: 1.4, ease: "power2.in" }, "-=1.5");
      });
      tl.to(titleRef.current, { opacity: 0, y: -20, filter: "blur(6px)", duration: 1.2, ease: "power3.in" }, "-=1.2");
      tl.to(subRef.current, { opacity: 0, duration: 1, ease: "power2.in" }, "-=1");
      tl.to(lineRef.current, { opacity: 0, duration: 0.8 }, "-=0.8");
      tl.to(containerRef.current, { backgroundColor: "#F2F0EA", duration: 1.8, ease: "power3.inOut" }, "-=1.4");
      tl.to(overlayRef.current, { opacity: 1, duration: 1.8, ease: "power3.inOut" }, "-=1.4");

      // ── RENDER LOOP ──────────────────────────────────────────────────────────
      let t = 0;
      const pPositions = particles.geometry.attributes.position.array as Float32Array;

      function animate() {
        animId = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        t += delta;

        // Gentle camera drift — feels like gliding over Dubai
        camera.position.x = Math.sin(t * 0.08) * 1.5;
        camera.position.y = 4 + Math.sin(t * 0.12) * 0.4;
        camera.position.z = 28 - t * 1.1; // slow fly-in
        camera.position.z = Math.max(camera.position.z, 8); // clamp so we don't overshoot
        camera.lookAt(0, 2, -5);

        // Particle drift — golden dust flowing
        for (let i = 0; i < pCount; i++) {
          pPositions[i * 3 + 2] += delta * 0.5; // drift toward camera
          if (pPositions[i * 3 + 2] > 10) pPositions[i * 3 + 2] = -60; // reset far
          pPositions[i * 3 + 1] += Math.sin(t * 0.3 + i) * 0.002;
        }
        particles.geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      }
      animate();
    });

    return () => {
      cancelAnimationFrame(animId);
      if (renderer) renderer.dispose();
      gsap.killTweensOf("*");
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#08080C" }}
    >
      {/* THREE.JS CANVAS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />

      {/* VIGNETTE */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(8,8,12,0.85) 100%)",
        }}
      />

      {/* TITLE OVERLAY — centred, over canvas */}
      <div className="relative z-20 flex flex-col items-center justify-center select-none pointer-events-none">
        {/* Main brand wordmark */}
        <div
          ref={titleRef}
          style={{
            opacity: 0,
            transform: "translateY(32px)",
            filter: "blur(12px)",
          }}
        >
          <h1
            className="text-center text-[13vw] md:text-[7vw] leading-none tracking-[0.08em]"
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              fontWeight: 300,
              color: "#F2EDE4",
              textShadow: "0 0 60px rgba(197,165,114,0.3), 0 2px 40px rgba(0,0,0,0.8)",
            }}
          >
            FAKHR<span style={{ color: "#C5A572", fontStyle: "italic" }}>UDDIN</span>
          </h1>
        </div>

        {/* Gold line separator */}
        <div
          ref={lineRef}
          style={{
            opacity: 0,
            width: "120px",
            height: "1px",
            background: "linear-gradient(to right, transparent, #C5A572, transparent)",
            margin: "18px auto",
            transform: "scaleX(0)",
            transformOrigin: "center",
          }}
        />

        {/* Sub-text */}
        <p
          ref={subRef}
          style={{
            opacity: 0,
            transform: "translateY(10px)",
            filter: "blur(4px)",
            fontFamily: "'Helvetica Neue', 'Montserrat', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            color: "#9B8C78",
            fontWeight: 300,
          }}
        >
          Real Estate Development &nbsp;·&nbsp; Since 1963
        </p>
      </div>

      {/* FADE-OUT OVERLAY (cream) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "#F2F0EA", opacity: 0 }}
      />
    </div>
  );
}