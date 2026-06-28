"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import XTwitterIcon from "@/components/icons/x-twitter";
import GithubIcon from "@/components/icons/github";
import LinkedinIcon from "@/components/icons/linkedin";
import { IoIosMail } from "react-icons/io";
import { SiLeetcode, SiCodeforces, SiTryhackme, SiMedium } from "react-icons/si";
import { FileText, Check, Calendar, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { GeistPixelSquare } from "geist/font/pixel";
import GitHubContributionGraph from "./contribution-graph";
import SkillsSection from "./skills";
import { CornerBrackets } from "@/components/ui/corner-brackets";
import { siteConfig, type SocialPlatform } from "@/site.config";
import { vibrateSelection, playClickSound } from "@/lib/haptics";
import { useTheme } from "next-themes";

const socialIcons: Record<SocialPlatform, React.ReactNode> = {
  twitter: <XTwitterIcon className="h-3.5 w-3.5" />,
  github: <GithubIcon className="h-3.5 w-3.5" />,
  linkedin: <LinkedinIcon className="h-3.5 w-3.5" />,
  leetcode: <SiLeetcode className="h-3.5 w-3.5" />,
  tryhackme: <SiTryhackme className="h-3.5 w-3.5" />,
  codeforces: <SiCodeforces className="h-3.5 w-3.5" />,
  medium: <SiMedium className="h-3.5 w-3.5" />,
};

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import LocationIcon from "@/components/icons/location";

const fadeUp = (delay = 0): any => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] },
});

const socialLinks = (Object.entries(siteConfig.socials) as [SocialPlatform, typeof siteConfig.socials[SocialPlatform]][])
  .filter(([_, s]) => s.username && s.url)
  .map(([platform, s]) => ({
    label: s.label,
    href: s.url,
    icon: socialIcons[platform],
    external: true,
    platform,
    username: s.username,
  }));

const connectLinks = [
  siteConfig.contact.calUrl && {
    label: "schedule a meet",
    href: siteConfig.contact.calUrl,
    icon: <Calendar className="h-3.5 w-3.5" />,
    endIcon: <ArrowUpRight className="h-3 w-3" />,
    external: true,
  },
  {
    label: "Email",
    icon: <IoIosMail size="14px" />,
    copyText: siteConfig.contact.email,
  },
  {
    label: "Resume",
    href: siteConfig.contact.resumeUrl,
    icon: <FileText className="h-3.5 w-3.5" />,
    external: true,
  },
].filter(Boolean);

function SocialPreviewCard({ loading, data, platform, username }: any) {


  if (loading) {
    return (
      <div className="flex w-[320px] flex-col gap-4 font-space-mono animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-full bg-muted"></div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 rounded-sm bg-muted"></div>
            <div className="h-3 w-20 rounded-sm bg-muted"></div>
          </div>
        </div>
        <div className="h-10 w-full rounded-sm bg-muted"></div>
        <div className="h-4 w-24 rounded-sm bg-muted"></div>
        <div className="mt-2 flex gap-4">
          <div className="h-4 w-16 rounded-sm bg-muted"></div>
          <div className="h-4 w-16 rounded-sm bg-muted"></div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex w-[320px] flex-col gap-2 font-space-mono text-left">
      {data.banner && (
        <div className="-mx-4 -mt-4 mb-2 h-20 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.banner} alt="Banner" className="h-full w-full object-cover" />
        </div>
      )}
      <div className={`flex gap-3 relative z-10 ${data.banner ? "flex-col items-start -mt-12" : "items-center"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.avatar || "https://github.com/devndesigner6.png"}
          alt={data.name}
          className={`rounded-full object-cover bg-background ${data.banner ? "h-[68px] w-[68px] border-[3px] border-card" : "h-14 w-14 border border-border"}`}
        />
        <div className={`flex flex-col ${data.banner ? "-mt-1" : ""}`}>
          <span className="font-doto text-base font-bold text-foreground">
            {data.name}
          </span>
          <span className="text-sm text-muted-foreground">
            {data.username}
          </span>
        </div>
      </div>
      {data.bio && (
        <p className="text-sm text-foreground line-clamp-3">
          {data.bio}
        </p>
      )}
      {data.location && (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <LocationIcon className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1">{data.location}</span>
        </div>
      )}
      {data.stats && data.stats.length > 0 && (
        <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
          {data.stats.map((stat: any, i: number) => (
            <span key={i}>
              <strong className="font-doto font-semibold text-foreground">
                {stat.value}
              </strong>{" "}
              {stat.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function SocialButton({ label, href, icon, endIcon, external, platform, username, data, loading, copyText }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX - 160);
    y.set(e.clientY + 12);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    // Jump the spring immediately to current cursor so it doesn't fly in from top-left
    x.set(e.clientX - 160);
    y.set(e.clientY + 12);
    springX.jump(e.clientX - 160);
    springY.jump(e.clientY + 12);
    setIsHovered(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    toast.success("Copied to clipboard", {
      description: copyText,
      icon: <Check className="h-4 w-4" />,
      classNames: { description: "font-space-mono" },
    });
  };

  const content = copyText ? (
    <CornerBrackets>
      <Button size="sm" variant="noShadow" onClick={handleCopy}>
        {icon}
        <span className="ml-1.5">{label}</span>
        {endIcon && <span className="ml-1.5">{endIcon}</span>}
      </Button>
    </CornerBrackets>
  ) : (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <CornerBrackets>
        <Button size="sm" variant="noShadow">
          {icon}
          <span className="ml-1.5">{label}</span>
          {endIcon && <span className="ml-1.5">{endIcon}</span>}
        </Button>
      </CornerBrackets>
    </Link>
  );

  if (platform && username) {
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative"
      >
        {content}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex w-[320px] flex-col gap-3 rounded-xl overflow-hidden bg-background/30 backdrop-blur-2xl backdrop-saturate-150 p-4 shadow-2xl border border-white/20 dark:border-white/10"
              style={{
                position: "fixed",
                left: springX,
                top: springY,
                zIndex: 9999,
                pointerEvents: "none",
              }}
            >
              <SocialPreviewCard platform={platform} username={username} data={data} loading={loading} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return content;
}

const WaveEmoji = () => {
  const [phase, setPhase] = useState<string>("idle");
  const [key, setKey] = useState(0);

  useEffect(() => {
    setPhase("waving");
    const timer = setTimeout(() => setPhase("grayscale"), 700);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setKey((k) => k + 1);
    setPhase("hover-wave");
  };

  const handleMouseLeave = () => {
    setPhase("grayscale");
  };

  const isWaving = phase === "waving" || phase === "hover-wave";
  const isGrayscale = phase === "grayscale";

  return (
    <span
      key={key}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block origin-[70%_70%] cursor-default transition-all duration-500 ${isWaving ? "animate-wave-slow" : ""} ${isGrayscale ? "grayscale" : ""}`}
    >
      👋🏻
    </span>
  );
};

const translations: Record<string, any> = {
  english: {
    welcome: "Hola I'm",
    aboutHeader: "About Me",
    bio: "Give me a blank slate, and I'll take it to production with end-to-end ownership of the front end, back end, and everything in between. I create software that is useful, dependable, and long-lasting.",
    bullet1: "I'm excited about web applications, autonomous agents, and DeFi.",
    bullet2: "I put my code where my mouth is because I think that deeds speak louder than words.",
    bullet3Suffix: " is being built right now.",
    socialTitle: "My social links if you wish to connect with me",
    ageText: "20",
    titles: ["Product Engineer", "Full Stack Engineer"]
  },
  hindi: {
    welcome: "नमस्ते, मैं हूँ",
    aboutHeader: "मेरे बारे में",
    bio: "मुझे एक कोरा कागज़ दो, और मैं इसे फ्रंट एंड, बैक एंड और बीच की हर चीज़ के एंड-टू-एंड स्वामित्व के साथ उत्पादन में ले जाऊँगा। मैं व्यावहारिक, विश्वसनीय और टिकाऊ सॉफ़्टवेयर बनाता हूँ।",
    bullet1: "मैं वेब एप्लिकेशन, स्वायत्त एजेंटों और डेफी को लेकर उत्साहित हूं।",
    bullet2: "मैं अपने कोड को अपनी बातों की जगह रखता हूँ क्योंकि मेरा मानना है कि कर्म शब्दों से अधिक बोलते हैं।",
    bullet3Suffix: " वर्तमान में बनाई जा रही है।",
    socialTitle: "यदि आप मुझसे जुड़ना चाहते हैं तो मेरे सोशल लिंक्स",
    ageText: "20",
    titles: ["उत्पाद अभियंता", "पूर्ण-स्टैक डेवलपर"]
  },
  telugu: {
    welcome: "నమస్తే, నేను",
    aboutHeader: "నా గురించి",
    bio: "నాకు ఖాళీ కాగితం ఇవ్వండి, నేను దానిని ఫ్రంట్ ఎండ్, బ్యాక్ ఎండ్ మరియు మధ్యలో ఉన్న ప్రతిదాని యొక్క ఎండ్-టు-ఎండ్ యాజమాన్యంతో ప్రొడక్షన్‌కి తీసుకువెళతాను. నేను ఆచరణాత్మకమైన, నమ్మదగిన మరియు మన్నికైన సాఫ్ట్‌వేర్‌ను తయారు చేస్తాను.",
    bullet1: "నేను వెబ్ అప్లికేషన్‌లు, అటానమస్ ఏజెంట్‌లు మరియు డీఫై గురించి ఉత్సాహంగా ఉన్నాను.",
    bullet2: "నేను మాటల కంటే చేతలు మిన్న అని నమ్ముతాను, అందుకే నా కోడ్‌ని నా మాటల స్థానంలో ఉంచుతాను.",
    bullet3Suffix: " ప్రస్తుతం నిర్మించబడుతోంది.",
    socialTitle: "మీరు నాతో కనెక్ట్ కావాలనుకుంటే నా సోషల్ లింకులు",
    ageText: "20",
    titles: ["ప్రొడక్ట్ ఇంజనీర్", "ఫుల్-స్టాక్ డెవలపర్"]
  }
};

interface HeroProps {
  contributionData?: any[];
  lifetimeTotal?: number;
}

const playGlitchSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = ctx.currentTime;
    
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = i % 2 === 0 ? "sawtooth" : "square";
      osc.frequency.setValueAtTime(200 + Math.random() * 600, now + i * 0.04);
      osc.frequency.exponentialRampToValueAtTime(80 + Math.random() * 50, now + i * 0.04 + 0.035);
      
      gain.gain.setValueAtTime(0.05, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.035);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.038);
    }
  } catch (e) {
    console.warn("AudioContext block", e);
  }
};

const Hero = ({ contributionData = [], lifetimeTotal = 0 }: HeroProps) => {
  const [socialData, setSocialData] = useState<any>(null);
  const [socialsLoading, setSocialsLoading] = useState(true);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  
  const { resolvedTheme } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [renderedFace, setRenderedFace] = useState<"pfp1" | "pfp2">("pfp1");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFullName, setShowFullName] = useState(false);

  // Sync profile picture defaults to light / dark theme with halftone transition
  useEffect(() => {
    setIsFlipped(resolvedTheme === "dark");
  }, [resolvedTheme]);

  useEffect(() => {
    setIsTransitioning(true);
    playGlitchSound();
    
    const swapTimer = setTimeout(() => {
      setRenderedFace(isFlipped ? "pfp2" : "pfp1");
    }, 225);

    const endTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 550);

    return () => {
      clearTimeout(swapTimer);
      clearTimeout(endTimer);
    };
  }, [isFlipped]);

  const [titleIndex, setTitleIndex] = useState(0);
  const [stars, setStars] = useState<any[]>([]);
  const [lang, setLang] = useState("english");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved) {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const newLang = (e as CustomEvent).detail;
      setLang(newLang);
    };
    window.addEventListener("lang-change", handleLangChange);
    return () => window.removeEventListener("lang-change", handleLangChange);
  }, []);

  const currentTranslation = translations[lang] || translations.english;
  const titles = currentTranslation.titles;

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles]);

  useEffect(() => {
    const starList = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 70 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      size: Math.random() * 3 + 2, // 2px to 5px
      delay: `${Math.random() * 3}s`,
      duration: `${Math.random() * 2 + 2}s`,
    }));
    setStars(starList);
  }, []);

  const handleBannerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / (rect.width / 2)) * 6;
    const rotateX = -(y / (rect.height / 2)) * 6;
    setRotate({ x: rotateX, y: rotateY });

    const spotlightX = ((e.clientX - rect.left) / rect.width) * 100;
    const spotlightY = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mouse-x", `${spotlightX}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${spotlightY}%`);
  };

  const handleBannerMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  useEffect(() => {
    let mounted = true;
    fetch("/api/socials")
      .then((res) => res.json())
      .then((data) => {
        if (mounted && !data.error) {
          setSocialData(data);
        }
        if (mounted) setSocialsLoading(false);
      })
      .catch(() => {
        if (mounted) setSocialsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="mx-auto flex flex-col gap-6 md:gap-10 md:max-w-4xl px-2 md:px-0">
      <motion.div className="flex flex-col gap-5" {...fadeUp(0)}>
        <p className="font-doto text-xs text-muted-foreground md:text-sm">
          {currentTranslation.welcome} <WaveEmoji />
        </p>

        {/* 3D Starry Grid cover banner - Desktop only */}
        <div className="hidden md:block relative [perspective:1000px] w-full select-none group">
          <motion.div
            onMouseMove={handleBannerMouseMove}
            onMouseLeave={handleBannerMouseLeave}
            animate={{ rotateX: rotate.x, rotateY: rotate.y }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative h-28 w-full overflow-hidden rounded-2xl border border-neutral-200/20 dark:border-neutral-800/80 bg-white md:h-40 cursor-pointer shadow-md"
          >
            {/* Tech grid scanning lines overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-10" />

            {/* Interactive Spotlight radial gradient */}
            <div
              className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none z-15"
              style={{
                background: `radial-gradient(130px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.04), transparent 80%)`
              }}
            />

            {/* Background image of hands pointing to folder */}
            <Image
              src="/hands-banner.jpg"
              alt="Cover banner"
              fill
              priority
              className="object-cover object-center w-full h-full pointer-events-none select-none rounded-2xl filter brightness-95 transition-all duration-300 group-hover:brightness-100"
              style={{ transform: "translateZ(10px) scale(1.02)" }}
            />
          </motion.div>
        </div>

        {/* Profile Avatar layout alignment */}
        <div className="relative z-20 flex justify-start md:px-6">
          {/* Circular/Sleek cropped square profile avatar with direct border and no extra padding */}
          <div
            onClick={() => {
              vibrateSelection();
              playClickSound();
              setIsFlipped(!isFlipped);
            }}
            className="group/pfp cursor-pointer h-24 w-24 md:h-28 md:w-28 shrink-0 mt-2 md:-mt-14 rounded-2xl overflow-hidden border border-neutral-300/35 dark:border-neutral-800/80 bg-neutral-100 dark:bg-neutral-950 shadow-md relative z-30 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
          >
            {/* Active Rendered Profile Image with Glitch displacement */}
            <motion.div
              animate={isTransitioning ? {
                x: [0, -6, 6, -3, 3, -5, 0],
                y: [0, 2, -2, 1, -1, 3, 0],
                skewX: [0, 6, -6, 3, -3, 0],
                filter: [
                  "hue-rotate(0deg) contrast(1)",
                  "hue-rotate(60deg) contrast(1.3) saturate(1.4)",
                  "hue-rotate(120deg) contrast(0.8)",
                  "hue-rotate(240deg) contrast(1.5) saturate(1.7)",
                  "hue-rotate(360deg) contrast(1)",
                ]
              } : { x: 0, y: 0, skewX: 0, filter: "none" }}
              transition={{
                duration: 0.35,
                ease: "easeInOut"
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={renderedFace === "pfp1" ? "/pfp1.png" : "/pfp2.webp"}
                alt={siteConfig.identity.name}
                fill
                priority
                className="object-cover filter brightness-95 group-hover/pfp:brightness-100 transition-all duration-300"
              />
            </motion.div>

            {/* Premium Staggered Halftone Dissolve Grid Portal */}
            <AnimatePresence>
              {isTransitioning && (
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none z-40 bg-transparent">
                  {Array.from({ length: 36 }).map((_, i) => {
                    const col = i % 6;
                    const row = Math.floor(i / 6);
                    const dist = Math.hypot(col - 2.5, row - 2.5);
                    return (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.5, 1.5, 0] }}
                        exit={{ scale: 0 }}
                        transition={{
                          duration: 0.5,
                          times: [0, 0.45, 0.55, 1],
                          ease: "easeInOut",
                          delay: dist * 0.035,
                        }}
                        className="w-full h-full rounded-full bg-neutral-950 dark:bg-neutral-50"
                      />
                    );
                  })}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Name and titles block layout alignment */}
        <div className="min-w-0 flex flex-col mt-1 select-none md:px-6">
          <div className="flex items-center gap-3 flex-wrap">
            <h1
              onClick={() => {
                vibrateSelection();
                playClickSound();
                setShowFullName(!showFullName);
              }}
              className="text-2xl font-bold tracking-tight md:text-4xl text-foreground font-cera flex items-center gap-2 cursor-pointer select-none hover:text-foreground/90 transition-colors"
            >
              <motion.span layout="position">Hemanth</motion.span>
              <AnimatePresence mode="popLayout">
                {showFullName && (
                  <motion.span
                    initial={{ width: 0, opacity: 0, scale: 0.8 }}
                    animate={{ width: "auto", opacity: 0.6, scale: 1 }}
                    exit={{ width: 0, opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="overflow-hidden whitespace-nowrap text-muted-foreground font-space-mono text-sm md:text-xl font-semibold px-1"
                  >
                    S V S S
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.span layout="position">Peddada</motion.span>
            </h1>

          </div>
          
          {/* Inline Age and Rotator Slider */}
          <div className="flex flex-row items-center gap-2 mt-1.5 font-space-mono text-xs md:text-sm text-muted-foreground">
            <span>{currentTranslation.ageText}</span>
            <span className="text-foreground/20 select-none">|</span>
            <div className="h-5 w-40 relative overflow-hidden flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleIndex}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute font-semibold text-foreground/90 font-space-mono"
                >
                  {titles[titleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Custom minimalist divider line */}
          <div className="h-[1px] w-20 bg-gradient-to-r from-border/80 via-border/30 to-transparent mt-2.5" />
        </div>
      </motion.div>

      <div className="space-y-8">
        <motion.div {...fadeUp(0.15)}>
          <h5 className="mb-4 font-doto text-2xl font-medium md:text-3xl">
            {currentTranslation.aboutHeader}
          </h5>
          <p className="text-xs font-space-mono md:text-base md:leading-relaxed text-muted-foreground">
            {currentTranslation.bio}
          </p>
          <div className="mt-6 text-xs font-space-mono md:text-base md:leading-relaxed text-muted-foreground space-y-3">
            <div className="flex items-start gap-2.5">
              <span className="text-foreground/40 mt-1.5 select-none text-[8px]">&bull;</span>
              <p>
                {currentTranslation.bullet1}
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-foreground/40 mt-1.5 select-none text-[8px]">&bull;</span>
              <p>
                {currentTranslation.bullet2}
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-foreground/40 mt-1.5 select-none text-[8px]">&bull;</span>
              <p>
                <strong className="font-semibold text-foreground"><a href="https://unsubly.xyz" target="_blank" className="underline">Unsubscribely</a></strong>{currentTranslation.bullet3Suffix}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.25)}>
          <p className="mb-3 text-xs text-muted-foreground md:text-sm">
            {currentTranslation.socialTitle}
          </p>
          <div className="flex flex-wrap gap-2 p-1">
            {socialLinks.map(({ label, href, icon, external, platform, username, copyText }: any) => (
              <SocialButton
                key={label}
                label={label}
                href={href}
                icon={icon}
                external={external}
                platform={platform}
                username={username}
                copyText={copyText}
                data={socialData?.[platform]}
                loading={socialsLoading}
              />
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.35)}>
          <GitHubContributionGraph
            data={contributionData}
            lifetimeTotal={lifetimeTotal}
          />
        </motion.div>

        <motion.div {...fadeUp(0.4)}>
          <SkillsSection />
        </motion.div>

        <motion.div {...fadeUp(0.45)}>
          <h5 className="mb-4 font-doto text-2xl font-medium md:text-3xl">
            Let&apos;s connect
          </h5>
          <p className="mb-4 font-space-mono text-xs leading-relaxed text-muted-foreground md:text-sm">
            Interested in working together? Feel free to schedule a meet!
          </p>
          <div className="flex flex-wrap gap-2 p-1">
            {connectLinks.map(({ label, href, icon, endIcon, external, copyText }: any) => (
              <SocialButton
                key={label}
                label={label}
                href={href}
                icon={icon}
                endIcon={endIcon}
                external={external}
                copyText={copyText}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox full-screen modal preview of profile photo (shutter sound & haptics click) */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playClickSound();
              vibrateSelection();
              setShowLightbox(false);
            }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md cursor-zoom-out p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={isFlipped ? "/pfp2.webp" : "/pfp1.png"}
                alt={siteConfig.identity.name}
                fill
                priority
                className="object-cover"
              />
              
              {/* Shutter Close trigger on top-right */}
              <button
                onClick={() => {
                  playClickSound();
                  vibrateSelection();
                  setShowLightbox(false);
                }}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/60 text-white/80 hover:text-white flex items-center justify-center border border-white/10 hover:bg-black/80 transition"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Hero;
