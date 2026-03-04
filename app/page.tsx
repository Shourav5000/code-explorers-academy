"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  GraduationCap,
  Laptop,
  Lock,
  Menu,
  Play,
  ShieldCheck,
  Star,
  X,
  Sparkles,
} from "lucide-react";

const BRAND = {
  name: "Code Explorers Academy",
  tagline:
    "Fun, live coding classes for ages 5–18 — Scratch, Python, App Inventor, p5.js, and Arduino Robotics.",
  primaryCta: "Book a Free Trial",
  secondaryCta: "Explore Courses",
  email: "hello@codeexplorers.academy",
};

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Courses", href: "#courses" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const HERO_SLIDES = [
  {
    label: "Ages 5–18",
    headline: "Coding for Kids & Teens (Ages 5–18)",
    sub: "Beginner → intermediate paths. Kids build real projects. Parents get clear progress updates (no mystery).",
    image: "/images/coding_image4.png",
    badges: ["Ages 5–18", "Beginner → Intermediate", "Project-based"],
  },
  {
    label: "Scratch",
    headline: "Scratch: Games, Stories, Animations",
    sub: "Learn loops, conditionals, variables, and events by building arcade games and interactive stories.",
    image: "/images/coding_image1.png",
    badges: ["Ages 5–18", "Logic foundations", "Creative builds"],
  },
  {
    label: "MIT App Inventor",
    headline: "Build Mobile Apps with MIT App Inventor",
    sub: "Design UI + app logic. Build real phone apps like quizzes, timers, and mini utilities.",
    image: "/images/coding_image2.png",
    badges: ["Ages 5–18", "UI + Logic", "Phone testing"],
  },
  {
    label: "Python",
    headline: "Python: Real Programming Skills",
    sub: "Learn functions, lists, loops, and debugging. Build mini-games, simulations, and beginner automation.",
    image: "/images/coding_image3.png",
    badges: ["Ages 5–18", "Strong fundamentals", "Games + tools"],
  },
  {
    label: "p5.js",
    headline: "p5.js: Creative Coding with JavaScript",
    sub: "Make interactive art and animations while learning real JavaScript fundamentals.",
    image: "/images/coding_image6.png",
    badges: ["Ages 5–18", "JavaScript", "Art + interactivity"],
  },
  {
    label: "Arduino Robotics",
    headline: "Arduino Robotics: Code + Electronics",
    sub: "Learn sensors, circuits, and coding logic. Build motion alarms, LED patterns, and simple robot behaviors.",
    image: "/images/coding_image7.png",
    badges: ["Ages 5–18", "Hardware + code", "Engineering mindset"],
  },
];

type Course = {
  title: string;
  desc: string;
  image: string;
  tags: string[];
  level: string;
  duration: string;
  difficulty: number; // 1-5
  projects: string[];
  skills: string[];
  tools: string[];
  highlight: string;
};

const COURSES: Course[] = [
  {
    title: "Scratch Coding",
    desc: "Blocks-based coding: events, loops, conditionals, variables, and game design. Build platformers, maze games, animations, and story worlds.",
    image: "/images/coding_image1.png",
    tags: ["Logic", "Creativity", "Games"],
    level: "Beginner → Intermediate",
    duration: "8–12 weeks",
    difficulty: 2,
    projects: ["Maze Runner", "Platformer Boss Level", "Story Animation"],
    skills: ["Loops", "Conditionals", "Variables", "Events"],
    tools: ["Scratch", "Sprite Editor"],
    highlight: "Most popular for beginners",
  },
  {
    title: "Python Programming",
    desc: "Real coding: variables, loops, functions, lists, debugging. Build text adventures, mini tools, simple simulations, and beginner automation.",
    image: "/images/coding_image3.png",
    tags: ["Fundamentals", "Problem Solving", "Projects"],
    level: "Beginner → Intermediate",
    duration: "10–14 weeks",
    difficulty: 3,
    projects: ["Guessing Game+", "Mini Calculator", "Battle Simulator"],
    skills: ["Functions", "Lists", "Debugging", "Loops"],
    tools: ["Python", "Replit / VS Code"],
    highlight: "Great foundation for future CS",
  },
  {
    title: "Creative Coding (p5.js)",
    desc: "JavaScript through visuals: drawing, animation, interaction, and simple physics. Build generative art, interactive sketches, and mini visual games.",
    image: "/images/coding_image6.png",
    tags: ["JavaScript", "Art", "Interactivity"],
    level: "Beginner → Intermediate",
    duration: "8–10 weeks",
    difficulty: 3,
    projects: ["Particle Galaxy", "Interactive Paint", "Bouncing World"],
    skills: ["Animation", "Input events", "Math basics", "JS fundamentals"],
    tools: ["p5.js", "Browser"],
    highlight: "Perfect for creative kids",
  },
  {
    title: "MIT App Inventor",
    desc: "Mobile apps: UI layout, events, variables, lists, logic flows. Build quiz apps, habit trackers, timers, and simple utilities.",
    image: "/images/coding_image2.png",
    tags: ["Apps", "UI", "Mobile"],
    level: "Beginner → Intermediate",
    duration: "6–10 weeks",
    difficulty: 2,
    projects: ["Quiz App", "Habit Tracker", "Timer + Sounds"],
    skills: ["UI layout", "Events", "Variables", "Logic flows"],
    tools: ["MIT App Inventor", "Android/iOS testing"],
    highlight: "Kids love building real phone apps",
  },
  {
    title: "AI - Robotics (Arduino)",
    desc: "Code + electronics: LEDs, sensors, buzzers, motors, serial monitor. Build smart lights, obstacle alarms, and robot behaviors.",
    image: "/images/coding_image7.png",
    tags: ["Hardware", "Sensors", "STEM"],
    level: "Beginner → Intermediate",
    duration: "8–12 weeks",
    difficulty: 4,
    projects: ["Motion Alarm", "Smart Night Light", "Obstacle Beeper Bot"],
    skills: ["Sensors", "Circuits", "Logic", "Debugging"],
    tools: ["Arduino", "Starter Kit"],
    highlight: "Hands-on engineering energy",
  },
  {
    title: "Game Dev & Animations",
    desc: "Game mechanics: movement, collisions, scoring, levels, animations. Build playable games and polish with effects, sound, and menus.",
    image: "/images/coding_image5.png",
    tags: ["Game Design", "Animation", "Creators"],
    level: "Beginner → Intermediate",
    duration: "8–12 weeks",
    difficulty: 3,
    projects: ["Endless Runner", "Boss Fight", "Level Select Menu"],
    skills: ["Collisions", "Scoring", "Animation", "Game loops"],
    tools: ["Scratch / Python / p5.js"],
    highlight: "For kids who want to build games",
  },
];

const TESTIMONIALS = [
  {
    name: "Parent of a 9-year-old",
    quote:
      "The classes are super engaging. My kid now explains loops and variables like a tiny professor.",
    rating: 5,
  },
  {
    name: "Parent of a 12-year-old",
    quote:
      "The instructor is patient and structured. The projects feel real, not just random exercises.",
    rating: 5,
  },
  {
    name: "Student, age 11",
    quote: "I made a game where my cat shoots laser cookies. Best day ever.",
    rating: 5,
  },
];

const FAQ = [
  {
    q: "What ages do you teach?",
    a: "Ages 5–18. We place students by experience and comfort (beginner → intermediate), not just age.",
  },
  {
    q: "Are classes 1:1 or group?",
    a: "Both. 1:1 is fastest for progress. Small groups (3–6) are more social and fun.",
  },
  {
    q: "What do students need?",
    a: "A laptop/desktop, stable internet, and curiosity. For AI -Robotics (Arduino), we recommend a starter kit.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes — we assess level, set goals, and build a mini-project in the trial session.",
  },
  {
    q: "Do you give homework?",
    a: "Light, optional practice. The goal is progress without burnout. Kids already have enough quests in life.",
  },
];

function classNames(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

function useInterval(callback: () => void, delay: number | null) {
  const cbRef = useRef(callback);
  useEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay == null) return;
    const id = setInterval(() => cbRef.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <div className={classNames("flex items-center gap-2", className)}>
      <img
        src="/images/logo.png"
        alt="Code Explorers Academy logo"
        className="h-16 sm:h-20 md:h-26 w-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]"
      />
      <div className="flex flex-col justify-center leading-[1.0]">
        <div className="text-[16px] sm:text-[18px] md:text-[22px] font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
          Code Explorers Academy
        </div>
        <div className="text-[11px] sm:text-xs font-medium text-indigo-200/80">
          Where Kids Build the Future
        </div>
      </div>
    </div>
  );
}

function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-white/30";
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };
  const variants = {
    primary:
      "bg-white text-slate-900 hover:bg-white/90 shadow-[0_14px_40px_rgba(0,0,0,0.28)]",
    ghost:
      "bg-white/10 text-white hover:bg-white/15 ring-1 ring-white/20 backdrop-blur",
    dark:
      "bg-slate-900/70 text-white hover:bg-slate-900/85 ring-1 ring-white/10 backdrop-blur",
  };
  return (
    <button
      className={classNames(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs text-white/90 ring-1 ring-white/15">
      {children}
    </span>
  );
}

function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <motion.div
            initial={{ y: 14, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 14, opacity: 0, scale: 0.98 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-slate-950/80 ring-1 ring-white/10 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="text-white font-semibold">{title}</div>
              <button
                onClick={onClose}
                className="rounded-xl p-2 hover:bg-white/10 text-white/80"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="text-xs text-white/70 mb-1">{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
      />
    </label>
  );
}

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 text-white/70 text-sm">
        <Sparkles className="h-4 w-4" />
        {eyebrow}
      </div>
      <div className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-white">
        {title}
      </div>
      {desc ? (
        <div className="mt-3 text-white/70 leading-relaxed">{desc}</div>
      ) : null}
    </div>
  );
}

function StarRow({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={classNames(
            "h-4 w-4",
            i < rating ? "text-white" : "text-white/25"
          )}
          fill={i < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

function DifficultyMeter({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Difficulty ${n} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={classNames(
            "h-2.5 w-6 rounded-full ring-1 ring-white/10",
            i < n ? "bg-white/70" : "bg-white/10"
          )}
        />
      ))}
    </div>
  );
}

// ========= NEW: motion helpers + PricingCard =========
function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function PricingCard({
  plan,
  highlighted,
  onCta,
}: {
  plan: {
    name: string;
    price: string;
    cadence: string;
    desc: string;
    features: string[];
    cta: string;
  };
  highlighted?: boolean;
  onCta: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);

  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = React.useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1

    const ry = clamp((px - 0.5) * 10, -8, 8);
    const rx = clamp(-(py - 0.5) * 10, -8, 8);

    setTilt({ rx, ry });
  };

  const onLeave = () => {
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={false}
      animate={
        reduced
          ? {}
          : {
              rotateX: tilt.rx,
              rotateY: tilt.ry,
              y: hovered ? -6 : 0,
            }
      }
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.6 }}
      style={{ transformStyle: "preserve-3d" }}
      className={classNames(
        "relative rounded-[2rem] p-6 ring-1 overflow-hidden",
        highlighted
          ? "bg-white/10 ring-white/25 shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
          : "bg-white/5 ring-white/10"
      )}
    >
      {/* Animated glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-24 opacity-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          background: highlighted
            ? "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18), transparent 55%), radial-gradient(circle at 70% 60%, rgba(168,85,247,0.22), transparent 55%)"
            : "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.12), transparent 55%), radial-gradient(circle at 70% 60%, rgba(34,211,238,0.18), transparent 55%)",
        }}
      />

      {/* Sheen */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          background:
            "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.10) 25%, transparent 55%)",
        }}
      />

      <div style={{ transform: "translateZ(20px)" }} className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-white font-semibold text-lg">{plan.name}</div>
            <div className="mt-2 text-sm text-white/70">{plan.desc}</div>
          </div>

          {highlighted ? (
            <motion.span
              className="rounded-full bg-white/15 px-3 py-1 text-xs text-white/80 ring-1 ring-white/20"
              animate={
                reduced
                  ? {}
                  : {
                      boxShadow: hovered
                        ? "0 0 0 rgba(255,255,255,0)"
                        : "0 0 18px rgba(255,255,255,0.10)",
                    }
              }
              transition={{ duration: 0.4 }}
            >
              <motion.span
                animate={reduced ? {} : { opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              >
                Most popular
              </motion.span>
            </motion.span>
          ) : null}
        </div>

        <div className="mt-6 flex items-end gap-2">
          <div className="text-4xl font-semibold tracking-tight">{plan.price}</div>
          <div className="text-white/60 pb-1">{plan.cadence}</div>
        </div>

        <motion.div
          className="mt-5 grid gap-2"
          initial={false}
          animate={hovered && !reduced ? "show" : "rest"}
          variants={{ rest: { opacity: 1 }, show: { opacity: 1 } }}
        >
          {plan.features.map((f, i) => (
            <motion.div
              key={f}
              className="flex items-center gap-2 text-sm text-white/75"
              initial={false}
              animate={
                hovered && !reduced
                  ? { y: 0, opacity: 1 }
                  : { y: 0, opacity: 1 }
              }
              transition={{
                delay: hovered && !reduced ? i * 0.05 : 0,
                duration: 0.2,
              }}
            >
              <Check className="h-4 w-4" />
              {f}
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-6">
          <motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.12 }}>
            <Button
              variant={highlighted ? "primary" : "ghost"}
              className="w-full"
              onClick={onCta}
            >
              {plan.cta}
            </Button>
          </motion.div>

          <div className="mt-3 text-xs text-white/50">
            Cancel anytime • Switch plans anytime
          </div>
        </div>
      </div>

      {highlighted ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-6 text-white/40"
          animate={reduced ? {} : { y: [0, -6, 0], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 3.2, repeat: Infinity }}
        >
          <Sparkles className="h-5 w-5" />
        </motion.div>
      ) : null}
    </motion.div>
  );
}
// ========= END NEW =========

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);

  // Course Preview modal
  const [courseOpen, setCourseOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const openCourse = (c: Course) => {
    setSelectedCourse(c);
    setCourseOpen(true);
  };

  const [slide, setSlide] = useState(0);
  const slideCount = HERO_SLIDES.length;
  const active = HERO_SLIDES[slide];

  useInterval(() => setSlide((s) => (s + 1) % slideCount), 6500);

  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadChildAge, setLeadChildAge] = useState("");
  const [leadInterest, setLeadInterest] = useState(active?.label ?? "");

  useEffect(() => setLeadInterest(active?.label ?? ""), [active?.label]);

  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");

  const pricing = useMemo(
    () => [
      {
        name: "Starter",
        price: "$79",
        cadence: "/week",
        desc: "Small group learning (3–6 students).",
        features: [
          "Live class (60 min)",
          "Weekly project",
          "Progress notes",
          "Kid-safe resources",
        ],
        cta: "Start Starter",
      },
      {
        name: "Pro",
        price: "$149",
        cadence: "/week",
        desc: "1:1 coaching for fast progress.",
        features: [
          "1:1 live class (60 min)",
          "Personal learning plan",
          "Homework review",
          "Flexible schedule",
        ],
        highlight: true,
        cta: "Start Pro",
      },
      {
        name: "Project Pack",
        price: "$299",
        cadence: "/month",
        desc: "A focused monthly sprint with a portfolio project.",
        features: [
          "4 live classes",
          "Capstone project",
          "Portfolio checklist",
          "Certificate",
        ],
        cta: "Start Pack",
      },
    ],
    []
  );

  const submitLead = () => {
    alert(
      `Thanks, ${leadName || "friend"}! We'll reach out to ${
        leadEmail || "your email"
      } to schedule the free trial.`
    );
    setTrialOpen(false);
    setLeadName("");
    setLeadEmail("");
    setLeadChildAge("");
  };

  const submitLogin = () => {
    alert(`Login submitted for ${userEmail}. (Hook up your auth provider next.)`);
    setLoginOpen(false);
    setUserEmail("");
    setUserPass("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-[110px]" />
        <div className="absolute top-40 left-1/4 h-[520px] w-[680px] rounded-full bg-cyan-400/15 blur-[110px]" />
        <div className="absolute top-[38%] right-0 h-[560px] w-[720px] rounded-full bg-violet-500/15 blur-[110px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between gap-6">
            <a href="#home" className="shrink-0">
              <LogoMark />
            </a>

            <nav className="hidden md:flex items-center gap-4 lg:gap-5">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="text-sm whitespace-nowrap px-2 py-1 text-white/70 hover:text-white transition"
                >
                  {n.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLoginOpen(true)}
                className="whitespace-nowrap"
              >
                <Lock className="h-4 w-4" />
                Login
              </Button>
              <Button
                size="sm"
                onClick={() => setTrialOpen(true)}
                className="whitespace-nowrap"
              >
                <Play className="h-4 w-4" />
                {BRAND.primaryCta}
              </Button>
            </div>

            <button
              className="md:hidden rounded-2xl p-2 hover:bg-white/10"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <AnimatePresence>
            {mobileOpen ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden pb-4"
              >
                <div className="grid gap-2 pt-2">
                  {NAV.map((n) => (
                    <a
                      key={n.href}
                      href={n.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-2xl px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                    >
                      {n.label}
                    </a>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onClick={() => setLoginOpen(true)}
                  >
                    <Lock className="h-4 w-4" />
                    Login
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => setTrialOpen(true)}
                  >
                    <Play className="h-4 w-4" />
                    Free Trial
                  </Button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </header>

      {/* Hero */}
      <main id="home" className="relative">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 pb-16">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-white/15">
                <ShieldCheck className="h-4 w-4" />
                Ages 5–18 • Beginner → Intermediate
              </div>

              <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
                <span className="text-white">{active.headline}</span>
              </h1>

              <p className="mt-4 text-white/70 leading-relaxed max-w-xl">
                {active.sub} <span className="text-white/80">{BRAND.tagline}</span>
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {active.badges.map((b) => (
                  <Chip key={b}>{b}</Chip>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button size="lg" onClick={() => setTrialOpen(true)}>
                  <Play className="h-5 w-5" />
                  {BRAND.primaryCta}
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={() =>
                    document.querySelector("#courses")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <GraduationCap className="h-5 w-5" />
                  {BRAND.secondaryCta}
                </Button>
              </div>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-semibold">Flexible times</span>
                  </div>
                  <div className="mt-2 text-xs text-white/60">Weekdays + weekends</div>
                </div>
                <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <Laptop className="h-4 w-4" />
                    <span className="text-sm font-semibold">Project-based</span>
                  </div>
                  <div className="mt-2 text-xs text-white/60">Games, apps, robotics</div>
                </div>
                <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm font-semibold">Online</span>
                  </div>
                  <div className="mt-2 text-xs text-white/60">Learn from anywhere</div>
                </div>
              </div>

              {/* Slider controls */}
              <div className="mt-8 flex items-center gap-3">
                <button
                  className="rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 p-2"
                  onClick={() => setSlide((s) => (s - 1 + slideCount) % slideCount)}
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-2">
                  {HERO_SLIDES.map((s, i) => (
                    <button
                      key={s.label}
                      onClick={() => setSlide(i)}
                      className={classNames(
                        "h-2.5 w-2.5 rounded-full transition",
                        i === slide ? "bg-white" : "bg-white/25 hover:bg-white/40"
                      )}
                      aria-label={`Go to ${s.label}`}
                    />
                  ))}
                </div>

                <button
                  className="rounded-2xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 p-2"
                  onClick={() => setSlide((s) => (s + 1) % slideCount)}
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div className="ml-2 text-xs text-white/60">{active.label}</div>
              </div>
            </div>

            {/* Right */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-white/10 bg-white/5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.image}
                    initial={{ opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.01 }}
                    transition={{ duration: 0.35 }}
                    className="relative"
                  >
                    <img
                      src={active.image}
                      alt={active.headline}
                      className="w-full h-[340px] sm:h-[420px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-full bg-slate-950/60 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10 backdrop-blur">
                        {active.label}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="rounded-3xl bg-slate-950/55 ring-1 ring-white/10 backdrop-blur px-4 py-3">
                        <div className="text-white font-semibold">What kids build</div>
                        <div className="mt-1 text-sm text-white/70">
                          Games, apps, interactive art, and robotics projects they’re proud to show
                          off.
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Courses */}
        <section
          id="courses"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16"
        >
          <SectionTitle
            eyebrow="Courses"
            title="A path for every kind of learner (ages 5–18)"
            desc="Pick a track, start at beginner or intermediate, and build projects that feel like real wins."
          />

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COURSES.map((c) => (
              <motion.button
                key={c.title}
                type="button"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.18 }}
                onClick={() => openCourse(c)}
                className="group text-left rounded-[2rem] overflow-hidden bg-white/5 ring-1 ring-white/10 hover:ring-white/20 hover:bg-white/7 transition relative"
              >
                <div className="relative">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="h-56 sm:h-60 w-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
                  />

                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {c.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-slate-950/55 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10 backdrop-blur"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300">
                    <div className="rounded-3xl bg-slate-950/55 ring-1 ring-white/10 backdrop-blur px-4 py-3">
                      <div className="text-white font-semibold flex items-center justify-between gap-3">
                        <span>Top projects</span>
                        <span className="text-xs text-white/70">{c.highlight}</span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {c.projects.slice(0, 3).map((p) => (
                          <span
                            key={p}
                            className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/85 ring-1 ring-white/10"
                          >
                            {p}
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="text-xs text-white/60">
                          Difficulty
                          <div className="mt-1">
                            <DifficultyMeter n={c.difficulty} />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/70 hidden sm:inline">Preview</span>
                          <ChevronRight className="h-4 w-4 text-white/80" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-white font-semibold text-lg">{c.title}</div>
                  <div className="mt-2 text-white/70 text-sm leading-relaxed">{c.desc}</div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3">
                      <div className="text-xs text-white/60">Level</div>
                      <div className="text-sm text-white/85 font-semibold">{c.level}</div>
                    </div>
                    <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3">
                      <div className="text-xs text-white/60">Typical length</div>
                      <div className="text-sm text-white/85 font-semibold">{c.duration}</div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-white/50">Tap for details • Live • Interactive</span>
                    <span className="text-xs text-white/60 group-hover:text-white/80 transition">
                      View
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <div className="rounded-[2.5rem] bg-white/5 ring-1 ring-white/10 p-6 md:p-10">
            <SectionTitle
              eyebrow="How it works"
              title="From free trial to real progress"
              desc="Simple steps. Clear goals. Fun projects. No chaos required (we try)."
            />

            <div className="mt-8 grid md:grid-cols-3 gap-5">
              {[
                {
                  n: 1,
                  title: "Free Trial + Placement",
                  body: "We assess level, set goals, and build a mini-project on day one.",
                },
                {
                  n: 2,
                  title: "Live Classes",
                  body: "Guided lessons with lots of building. Beginner → intermediate pathways.",
                },
                {
                  n: 3,
                  title: "Projects + Feedback",
                  body: "Kids finish with shareable projects and parents get progress notes.",
                },
              ].map((s) => (
                <div
                  key={s.n}
                  className="rounded-3xl bg-slate-950/40 ring-1 ring-white/10 p-5"
                >
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <span className="h-8 w-8 rounded-2xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center">
                      {s.n}
                    </span>
                    {s.title}
                  </div>
                  <div className="mt-3 text-sm text-white/70 leading-relaxed">{s.body}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={() => setTrialOpen(true)}>
                <Play className="h-5 w-5" />
                Book a Free Trial
              </Button>
              <div className="text-sm text-white/60">Or email: {BRAND.email}</div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <SectionTitle
            eyebrow="Parents & students"
            title="Tiny humans. Big confidence."
            desc="Curiosity → confusion → breakthrough → proud smile. Repeat."
          />
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="rounded-[2rem] bg-white/5 ring-1 ring-white/10 p-6">
                <StarRow rating={t.rating} />
                <div className="mt-4 text-white/85 leading-relaxed">“{t.quote}”</div>
                <div className="mt-5 text-sm text-white/60">— {t.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing (UPDATED: interactive cards + section reveal) */}
        <section id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
          >
            <SectionTitle
              eyebrow="Pricing"
              title="Simple plans that grow with your kid"
              desc="Clear options. Switch anytime. Cancel anytime."
            />

            <div className="mt-8 grid lg:grid-cols-3 gap-5">
              {pricing.map((p) => (
                <PricingCard
                  key={p.name}
                  plan={p}
                  highlighted={(p as any).highlight}
                  onCta={() => setTrialOpen(true)}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <SectionTitle
            eyebrow="FAQ"
            title="Questions, answered"
            desc="Anything else? Email us and we’ll help right away."
          />
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="rounded-[2rem] bg-white/5 ring-1 ring-white/10 p-6 open:bg-white/7"
              >
                <summary className="cursor-pointer text-white font-semibold">{f.q}</summary>
                <div className="mt-3 text-white/70 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
          <div className="rounded-[2.5rem] bg-white/5 ring-1 ring-white/10 p-6 md:p-10">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <SectionTitle
                  eyebrow="Contact"
                  title="Ready to start?"
                  desc="Book a free trial and we’ll place your child, set goals, and start building something fun right away."
                />
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button size="lg" onClick={() => setTrialOpen(true)}>
                    <Play className="h-5 w-5" />
                    Book a Free Trial
                  </Button>
                  <Button size="lg" variant="ghost" onClick={() => setLoginOpen(true)}>
                    <Lock className="h-5 w-5" />
                    Parent Login
                  </Button>
                </div>
                <div className="mt-5 text-sm text-white/60">
                  Email: <span className="text-white/80">{BRAND.email}</span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-[2rem] overflow-hidden ring-1 ring-white/10 bg-slate-950/35">
                  <img
                    src="/images/coding_image4.png"
                    alt="Coding class"
                    className="h-56 w-full object-cover object-top"
                  />
                  <div className="p-5">
                    <div className="text-white font-semibold">What you get</div>
                    <div className="mt-3 grid gap-2">
                      {[
                        "Placement by level (beginner → intermediate)",
                        "Live, interactive teaching",
                        "Projects that build confidence",
                        "Progress updates for parents",
                      ].map((x) => (
                        <div key={x} className="flex items-center gap-2 text-sm text-white/75">
                          <Check className="h-4 w-4" />
                          {x}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <img src="/images/favicon.png" alt="favicon" className="h-12 w-12 object-contain" />
                <div className="text-white font-semibold">{BRAND.name}</div>
              </div>
              <div className="mt-2 text-sm text-white/60 max-w-xl">{BRAND.tagline}</div>
            </div>

            <div className="flex flex-wrap gap-3">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className="text-sm text-white/60 hover:text-white/85">
                  {n.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 text-xs text-white/40">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal open={trialOpen} onClose={() => setTrialOpen(false)} title="Book a Free Trial">
        <div className="grid gap-4">
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 text-sm text-white/70">
            Quick note: this is a front-end placeholder. Hook it to your backend / email service later.
          </div>

          <Field label="Parent name" placeholder="Your name" value={leadName} onChange={setLeadName} />
          <Field
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={leadEmail}
            onChange={setLeadEmail}
          />

          <div className="grid grid-cols-2 gap-3">
            <Field label="Child age" placeholder="e.g., 9" value={leadChildAge} onChange={setLeadChildAge} />
            <label className="block">
              <div className="text-xs text-white/70 mb-1">Interested in</div>
              <select
                value={leadInterest}
                onChange={(e) => setLeadInterest(e.target.value)}
                className="w-full rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                {COURSES.map((c) => (
                  <option key={c.title} value={c.title} className="bg-slate-950">
                    {c.title}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <Button onClick={submitLead}>
            <Play className="h-4 w-4" />
            Request Trial
          </Button>

          <div className="text-xs text-white/50">
            Replace the alert() with a real submit (API route, Formspree, etc.).
          </div>
        </div>
      </Modal>

      <Modal open={loginOpen} onClose={() => setLoginOpen(false)} title="Login">
        <div className="grid gap-4">
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 text-sm text-white/70">
            UI-only login modal. Connect to NextAuth/Clerk/Firebase/Supabase later.
          </div>

          <Field
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={userEmail}
            onChange={setUserEmail}
          />
          <Field
            label="Password"
            type="password"
            placeholder="••••••••"
            value={userPass}
            onChange={setUserPass}
          />

          <Button variant="primary" onClick={submitLogin}>
            <Lock className="h-4 w-4" />
            Login
          </Button>

          <div className="text-xs text-white/50">
            Next: Parent Dashboard (schedule, invoices, progress reports).
          </div>
        </div>
      </Modal>

      {/* Course Preview Modal */}
      <Modal
        open={courseOpen}
        onClose={() => setCourseOpen(false)}
        title={selectedCourse?.title ?? "Course"}
      >
        {selectedCourse ? (
          <div className="grid gap-4">
            <img
              src={selectedCourse.image}
              alt={selectedCourse.title}
              className="h-44 w-full rounded-2xl object-cover object-top ring-1 ring-white/10"
            />

            <div className="text-white/80 text-sm leading-relaxed">{selectedCourse.desc}</div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3">
                <div className="text-xs text-white/60">Level</div>
                <div className="text-sm font-semibold text-white/90">{selectedCourse.level}</div>
              </div>
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-3">
                <div className="text-xs text-white/60">Typical length</div>
                <div className="text-sm font-semibold text-white/90">{selectedCourse.duration}</div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
              <div className="text-white font-semibold">What they’ll build</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedCourse.projects.map((p) => (
                  <span
                    key={p}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/85 ring-1 ring-white/10"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
                <div className="text-white font-semibold text-sm">Skills</div>
                <div className="mt-2 grid gap-1 text-sm text-white/70">
                  {selectedCourse.skills.map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
                <div className="text-white font-semibold text-sm">Tools</div>
                <div className="mt-2 grid gap-1 text-sm text-white/70">
                  {selectedCourse.tools.map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-white/60">
                Difficulty
                <div className="mt-1">
                  <DifficultyMeter n={selectedCourse.difficulty} />
                </div>
              </div>

              <div className="text-xs text-white/60">{selectedCourse.highlight}</div>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => {
                  setCourseOpen(false);
                  setTrialOpen(true);
                }}
              >
                <Play className="h-4 w-4" />
                Book a Free Trial
              </Button>
              <Button variant="ghost" className="flex-1" onClick={() => setCourseOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}