"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { messageService } from "@/service/message.service";
import { CONTACT_LINKS } from "@/config/contact";
import {
  Mail,
  ArrowRight,
  GitHub,
  Facebook,
  Outlook,
  Gmail,
  Linkedin,
  Check,
  AlertCircle,
} from "@/components/icons";
import * as d3 from "d3";
import { feature } from "topojson-client";
import type { GeoPermissibleObjects } from "d3";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Gmail: Gmail,
  Outlook: Outlook,
  Facebook: Facebook,
  Github: GitHub,
  Linkedin: Linkedin,
};

const CONTACT_LINKS_DISPLAY = CONTACT_LINKS.map((link) => ({
  icon: ICON_MAP[link.label] || Mail,
  label: link.value,
  href: link.href,
}));

interface GeoFeature {
  type: string;
  geometry: unknown;
  properties: Record<string, unknown>;
}

interface WorldAtlasTopology {
  type: string;
  objects: {
    countries: {
      type: string;
      geometries: unknown[];
    };
  };
}

interface GlobeWireframeProps {
  width?: number;
  height?: number;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  graticuleColor?: string;
  graticuleOpacity?: number;
  sphereOutlineColor?: string;
  sphereOutlineWidth?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  rotateToLocation?: string | [number, number];
  rotateCities?: string[];
  rotationSpeed?: number;
  initialRotation?: [number, number];
  enableInteraction?: boolean;
  showGraticule?: boolean;
  animationDuration?: number;
  startAsGlobe?: boolean;
  countryFillColor?: string;
  countryHoverColor?: string;
  variant?: "wireframe" | "wireframesolid" | "solid";
  scale?: number;
  backgroundColor?: string;
}

const cityCoordinates: Record<string, [number, number]> = {
  "san francisco": [37.7749, -122.4194],
  "new york": [40.7128, -74.006],
  london: [51.5074, -0.1278],
  tokyo: [35.6762, 139.6503],
  paris: [48.8566, 2.3522],
  moscow: [55.7558, 37.6176],
  dubai: [25.2048, 55.2708],
  singapore: [1.3521, 103.8198],
  sydney: [-33.8688, 151.2093],
  mumbai: [19.076, 72.8777],
  "los angeles": [34.0522, -118.2437],
  chicago: [41.8781, -87.6298],
};


function GlobeWireframe({
  width,
  height,
  className = "aspect-square w-full max-w-150",
  strokeColor = "currentColor",
  strokeWidth = 1.0,
  graticuleColor = "currentColor",
  graticuleOpacity = 0.2,
  sphereOutlineColor = "currentColor",
  sphereOutlineWidth = 1,
  autoRotate = true,
  autoRotateSpeed = 0.5,
  rotateToLocation,
  rotateCities = [],
  rotationSpeed = 3000,
  initialRotation = [0, 0],
  enableInteraction = true,
  showGraticule = true,
  startAsGlobe = true,
  countryFillColor,
  countryHoverColor,
  variant = "wireframe",
  scale = 1,
  backgroundColor,
}: GlobeWireframeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const rotationRef = useRef<[number, number]>(initialRotation);
  const progressRef = useRef(startAsGlobe ? 0 : 100);
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef([0, 0]);
  const isVisibleRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const worldDataRef = useRef<GeoFeature[]>([]);

  const useResponsive = !width && !height;
  const finalWidth = useResponsive ? dimensions.width : width || 800;
  const finalHeight = useResponsive ? dimensions.height : height || 500;

  const defaultStrokeColor = strokeColor || "currentColor";
  const defaultGraticuleColor = graticuleColor || "currentColor";
  const defaultSphereOutlineColor = sphereOutlineColor || "currentColor";
  const defaultCountryFillColor =
    countryFillColor || (variant === "solid" ? "currentColor" : "none");

  useEffect(() => {
    const loadWorldData = async () => {
      try {
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
        );
        const world = (await response.json()) as WorldAtlasTopology;
        const countries = (feature(world, world.objects.countries) as { features: GeoFeature[] }).features;
        worldDataRef.current = countries;
      } catch (error) {
        console.error("Error loading world data:", error);
      }
    };
    loadWorldData();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const updateDimensions = () => {
      if (container && useResponsive) {
        const w = container.offsetWidth || 300;
        setDimensions({ width: w, height: w });
      }
    };
    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (useResponsive) resizeObserver.observe(container);

    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
      },
      { threshold: 0.1 },
    );
    observer.observe(container);

    return () => {
      resizeObserver.disconnect();
      observer.unobserve(container);
    };
  }, [useResponsive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const w = finalWidth;
    const h = finalHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const handleMouseDown = (e: MouseEvent) => {
      if (!enableInteraction) return;
      isDraggingRef.current = true;
      const rect = canvas.getBoundingClientRect();
      lastMouseRef.current = [e.clientX - rect.left, e.clientY - rect.top];
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !enableInteraction) return;
      const rect = canvas.getBoundingClientRect();
      const currentMouse = [e.clientX - rect.left, e.clientY - rect.top];
      const dx = currentMouse[0] - lastMouseRef.current[0];
      const dy = currentMouse[1] - lastMouseRef.current[1];

      const t = progressRef.current / 100;
      const sensitivity =
        variant === "wireframe" ? (t < 0.5 ? 0.5 : 0.25) : 0.5;

      rotationRef.current = [
        rotationRef.current[0] + dx * sensitivity,
        Math.max(-90, Math.min(90, rotationRef.current[1] - dy * sensitivity)),
      ];
      lastMouseRef.current = currentMouse;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleMouseLeave = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let autoRotateActive = autoRotate && rotateCities.length === 0;

    let cityIndex = 0;
    let cityInterval: ReturnType<typeof setInterval> | null = null;

    if (rotateCities.length > 0) {
      autoRotateActive = false;
      const rotateToCity = (city: string) => {
        const coords = cityCoordinates[city.toLowerCase()];
        if (coords) {
          const target: [number, number] = [-coords[1], -coords[0]];
          const start = [...rotationRef.current] as [number, number];
          const startTime = performance.now();
          const duration = rotationSpeed * 0.6;

          const animate = (time: number) => {
            const elapsed = time - startTime;
            const t = Math.min(elapsed / duration, 1);
            const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            rotationRef.current = [
              start[0] + (target[0] - start[0]) * eased,
              start[1] + (target[1] - start[1]) * eased,
            ];
            if (t < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      };

      const firstCity = rotateCities[0].toLowerCase();
      const firstCoords = cityCoordinates[firstCity];
      if (firstCoords) {
        rotationRef.current = [-firstCoords[1], -firstCoords[0]];
      }

      cityInterval = setInterval(() => {
        cityIndex = (cityIndex + 1) % rotateCities.length;
        rotateToCity(rotateCities[cityIndex]);
      }, rotationSpeed);
    }

    if (rotateToLocation) {
      let coords: [number, number];
      if (typeof rotateToLocation === "string") {
        const city = rotateToLocation.toLowerCase();
        coords = cityCoordinates[city] || [0, 0];
      } else {
        coords = rotateToLocation;
      }
      rotationRef.current = [-coords[1], -coords[0]];
    }

    const render = () => {
      if (!isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      if (autoRotateActive && !isDraggingRef.current) {
        rotationRef.current = [
          (rotationRef.current[0] + autoRotateSpeed) % 360,
          rotationRef.current[1],
        ];
      }

      const w = finalWidth;
      const h = finalHeight;
      const cx = w / 2;
      const cy = h / 2;
      const baseRadius = (Math.min(w, h) / 2) * scale * 0.9;

      ctx.clearRect(0, 0, w, h);

      if (backgroundColor && backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      let projection: d3.GeoProjection;
      const path = d3.geoPath();

      const t = progressRef.current / 100;
      const alpha = Math.pow(t, 0.5);

      if (variant === "wireframe") {
        projection = d3
          .geoOrthographic()
          .scale(baseRadius * scale * (1 - alpha * 0.4))
          .translate([cx, cy])
          .rotate([rotationRef.current[0], rotationRef.current[1]])
          .precision(0.1);
      } else {
        projection = d3
          .geoOrthographic()
          .scale(baseRadius * scale)
          .translate([cx, cy])
          .rotate([rotationRef.current[0], rotationRef.current[1]])
          .precision(0.1);
      }

      path.projection(projection);

      let finalCountryFill = "none";
      let finalStrokeWidth = strokeWidth;
      let finalOpacity = 1.0;
      let renderGraticule = showGraticule;
      let finalGraticuleOpacity = graticuleOpacity;
      let finalSphereOutlineWidth = sphereOutlineWidth;

      if (variant === "wireframe") {
        finalCountryFill = "none";
        finalStrokeWidth = strokeWidth;
        finalOpacity = 1.0;
        renderGraticule = showGraticule;
        finalGraticuleOpacity = graticuleOpacity;
        finalSphereOutlineWidth = sphereOutlineWidth;
      } else if (variant === "wireframesolid") {
        finalCountryFill = "none";
        finalStrokeWidth = strokeWidth;
        finalOpacity = 1.0;
        renderGraticule = false;
        finalGraticuleOpacity = 0;
        finalSphereOutlineWidth = 1.5;
      } else if (variant === "solid") {
        finalCountryFill = defaultCountryFillColor;
        finalStrokeWidth = strokeWidth * 0.5;
        finalOpacity = 0.3;
        renderGraticule = false;
        finalGraticuleOpacity = 0;
        finalSphereOutlineWidth = 1.5;
      }

      if (renderGraticule && finalGraticuleOpacity > 0) {
        ctx.strokeStyle = defaultGraticuleColor;
        ctx.lineWidth = 1;
        ctx.globalAlpha = finalGraticuleOpacity;
        ctx.beginPath();
        const graticule = d3.geoGraticule();
        const graticulePath = path(graticule());
        if (graticulePath) {
          const p = new Path2D(graticulePath);
          ctx.stroke(p);
        }
        ctx.globalAlpha = 1;
      }

      ctx.strokeStyle = defaultStrokeColor;
      ctx.lineWidth = finalStrokeWidth;
      ctx.globalAlpha = finalOpacity;
      ctx.fillStyle = finalCountryFill;

      for (const d of worldDataRef.current) {
        try {
          const pathString = path(d as unknown as GeoPermissibleObjects);
          if (
            !pathString ||
            pathString.includes("NaN") ||
            pathString.includes("Infinity")
          ) {
            continue;
          }
          const p = new Path2D(pathString);
          if (finalCountryFill !== "none") {
            ctx.fill(p);
          }
          ctx.stroke(p);
        } catch {}
      }
      ctx.globalAlpha = 1;

      try {
        const spherePath = path({ type: "Sphere" });
        if (spherePath) {
          ctx.strokeStyle = defaultSphereOutlineColor;
          ctx.lineWidth = finalSphereOutlineWidth;
          ctx.globalAlpha = variant === "wireframe" ? 1.0 : 0.8;
          const p = new Path2D(spherePath);
          ctx.stroke(p);
          ctx.globalAlpha = 1;
        }
      } catch {}

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (cityInterval) clearInterval(cityInterval);
    };
  }, [
    finalWidth,
    finalHeight,
    defaultStrokeColor,
    strokeWidth,
    defaultGraticuleColor,
    graticuleOpacity,
    defaultSphereOutlineColor,
    sphereOutlineWidth,
    showGraticule,
    defaultCountryFillColor,
    countryHoverColor,
    variant,
    scale,
    backgroundColor,
    enableInteraction,
    autoRotate,
    autoRotateSpeed,
    rotateToLocation,
    rotateCities,
    rotationSpeed,
    initialRotation,
    startAsGlobe,
  ]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className={useResponsive ? "w-full h-full" : ""}
        style={{ display: "block" }}
      />
    </div>
  );
}

interface ContactWithGlobeProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function ContactWithGlobe({
  title = "Let's talk",
  description = "Have a project in mind or a question? Feel free to reach out.",
  className,
}: ContactWithGlobeProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setErrorMsg(null);

    try {
      await messageService.sendMessage({
        name: form.name,
        email: form.email,
        subject: form.subject || "No Subject",
        message: form.message,
      });
      setForm({ name: "", email: "", subject: "", message: "" });
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      const e = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      setErrorMsg(e?.response?.data?.message || e?.message || "Failed to send");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  const isSending = status === "sending";

  return (
    <section
      className={cn(
        "relative w-full bg-transparent overflow-hidden py-20",
        className,
      )}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary">
            {title}
          </h2>

          <p className="text-base text-text-secondary max-w-md">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto items-start">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-semibold text-text-primary">
                Get in touch
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                You can reach me through email or connect with me on social
                media.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {CONTACT_LINKS_DISPLAY.map(({ icon: Icon, label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="group flex items-center gap-3 w-fit text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <div className="w-8 h-8 border border-border bg-subtle flex items-center justify-center shrink-0 transition-all duration-200 rounded-full">
                    <Icon className="w-3.5 h-3.5 text-text-secondary group-hover:text-accent transition-colors duration-200" />
                  </div>
                  {label}
                </a>
              ))}
            </div>

            <div className="relative overflow-hidden h-52">
              <GlobeWireframe
                className="w-full aspect-square max-w-full absolute top-0 left-0"
                variant="wireframesolid"
                autoRotate
                autoRotateSpeed={0.45}
                strokeWidth={0.6}
                graticuleOpacity={0.12}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-transparent to-transparent" />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="border border-border bg-background p-6 sm:p-8 flex flex-col gap-5 rounded-lg"
          >
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-0.5">
                Send me a message
              </h3>
              <p className="text-sm text-text-secondary">
                Leave your details and a message, and I&apos;ll get back to you.
              </p>
            </div>

            <div className="h-px w-full bg-border" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold tracking-widest uppercase text-text-secondary">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  disabled={isSending}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/60 outline-none focus:border-accent transition-all duration-200 disabled:opacity-60"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold tracking-widest uppercase text-text-secondary">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={isSending}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/60 outline-none focus:border-accent transition-all duration-200 disabled:opacity-60"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold tracking-widest uppercase text-text-secondary">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                disabled={isSending}
                value={form.subject}
                onChange={handleChange}
                placeholder="What is this about"
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/60 outline-none focus:border-accent transition-all duration-200 disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold tracking-widest uppercase text-text-secondary">
                Message
              </label>
              <textarea
                name="message"
                required
                disabled={isSending}
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Type your message here"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/60 outline-none focus:border-accent resize-none transition-all duration-200 disabled:opacity-60"
              />
            </div>

            {errorMsg && (
              <p className="text-xs font-mono text-destructive">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="inline-flex items-center justify-center gap-2 w-fit h-11 px-8 font-semibold text-sm bg-text-primary hover:opacity-90 text-background group rounded-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                  Sending…
                </>
              ) : status === "success" ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Sent
                </>
              ) : status === "error" ? (
                <>
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  Failed
                </>
              ) : (
                <>
                  Send message
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
