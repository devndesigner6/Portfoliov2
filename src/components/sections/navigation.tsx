"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { navLinks } from "@/constants";
import { motion, AnimatePresence } from "framer-motion";
import { navTranslations } from "@/lib/translations";
import MoonIcon from "@/components/icons/moon";
import SunIcon from "@/components/icons/sun";
import HouseIcon from "@/components/icons/house";
import SuitcaseIcon from "@/components/icons/briefcase";
import MagnifierIcon from "@/components/icons/beaker";
import StarSparkleIcon from "@/components/icons/star-sparkle";
import BookIcon from "@/components/icons/book";
import { Monitor, Sun, Moon, Check, SkipBack, Play, Pause, SkipForward, Airplay, Settings } from "lucide-react";
import { toast } from "sonner";
import {
  Tabs,
  TabsList,
  TabsHighlight,
  TabsHighlightItem,
  TabsTrigger,
} from "@/components/animate-ui/primitives/animate/tabs";
import { vibrate, vibrateSelection, playClickSound } from "@/lib/haptics";

const TerminalIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const iconMap = {
  "/": HouseIcon,
  "/projects": TerminalIcon,
  "/experience": SuitcaseIcon,
  "/blogs": BookIcon,
  "/hackathons": StarSparkleIcon,
  "/research": MagnifierIcon,
};

const englishSongs = [
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    url: "/songs/track_final.mp3",
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    url: "/songs/track3_no_dialogue.mp3",
  },
  {
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    url: "/songs/track3.mp3",
  },
  {
    title: "As It Was",
    artist: "Harry Styles",
    url: "/songs/track3_dialogue.mp3",
  },
  {
    title: "Starboy",
    artist: "The Weeknd",
    url: "/songs/track_final.mp3",
  },
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    url: "/songs/track3_no_dialogue.mp3",
  },
  {
    title: "Sweater Weather",
    artist: "The Neighbourhood",
    url: "/songs/track3.mp3",
  },
  {
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    url: "/songs/track3_dialogue.mp3",
  },
  {
    title: "Another Love",
    artist: "Tom Odell",
    url: "/songs/track_final.mp3",
  },
  {
    title: "Lovely",
    artist: "Billie Eilish & Khalid",
    url: "/songs/track3_no_dialogue.mp3",
  },
];

const hindiSongs = [
  {
    title: "Kesaria (Brahmastra)",
    artist: "Arijit Singh",
    url: "/songs/bulle.mp3",
  },
  {
    title: "Tum Hi Ho (Aashiqui 2)",
    artist: "Arijit Singh",
    url: "/songs/track_final.mp3",
  },
  {
    title: "Apna Bana Le",
    artist: "Arijit Singh",
    url: "/songs/track3_no_dialogue.mp3",
  },
  {
    title: "Channa Mereya",
    artist: "Arijit Singh",
    url: "/songs/track3.mp3",
  },
  {
    title: "Kabira (YJHD)",
    artist: "Arijit Singh & Harshdeep",
    url: "/songs/bulle.mp3",
  },
  {
    title: "Chaleya (Jawan)",
    artist: "Anirudh Ravichander",
    url: "/songs/track_final.mp3",
  },
  {
    title: "Heeriye",
    artist: "Jasleen Royal & Arijit Singh",
    url: "/songs/bulle.mp3",
  },
  {
    title: "Raataan Lambiyan",
    artist: "Jubin Nautiyal & Asees Kaur",
    url: "/songs/track3_no_dialogue.mp3",
  },
  {
    title: "Phir Aur Kya Chahiye",
    artist: "Arijit Singh & Sachin-Jigar",
    url: "/songs/track3.mp3",
  },
  {
    title: "Shayad (Love Aaj Kal)",
    artist: "Arijit Singh & Pritam",
    url: "/songs/bulle.mp3",
  },
];

const teluguSongs = [
  {
    title: "Jersey Theme (BGM)",
    artist: "Anirudh Ravichander",
    url: "/songs/maata_vinaali.mp3",
  },
  {
    title: "Arjun Reddy (Violin BGM)",
    artist: "Radhan",
    url: "/songs/track_final.mp3",
  },
  {
    title: "KGF 2 (Toofan BGM)",
    artist: "Ravi Basrur",
    url: "/songs/track3_no_dialogue.mp3",
  },
  {
    title: "Baahubali (Sivuni BGM)",
    artist: "M. M. Keeravani",
    url: "/songs/track3.mp3",
  },
  {
    title: "RRR (Dosti Theme)",
    artist: "M. M. Keeravani",
    url: "/songs/maata_vinaali.mp3",
  },
  {
    title: "Pushpa (Rise BGM)",
    artist: "Devi Sri Prasad",
    url: "/songs/track_final.mp3",
  },
  {
    title: "Salaar (Rebel BGM)",
    artist: "Ravi Basrur",
    url: "/songs/maata_vinaali.mp3",
  },
  {
    title: "Guntur Kaaram (BGM)",
    artist: "Thaman S",
    url: "/songs/track3_no_dialogue.mp3",
  },
  {
    title: "Kushi (Love BGM)",
    artist: "Hesham Abdul Wahab",
    url: "/songs/track3.mp3",
  },
  {
    title: "Ala Vaikunthapurramuloo BGM",
    artist: "Thaman S",
    url: "/songs/maata_vinaali.mp3",
  },
];

function NavigationBar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);
  const { theme, setTheme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const [language, setLanguage] = useState("english");
  const navContainerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const songsList = language === "hindi" ? hindiSongs : language === "telugu" ? teluguSongs : englishSongs;

  // Music states
  const [isPlaying, setIsPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync audio source when changing playlists (languages)
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.pause();
      
      const currentList = language === "hindi" ? hindiSongs : language === "telugu" ? teluguSongs : englishSongs;
      audioRef.current.src = currentList[0].url;
      audioRef.current.load();
      setSongIndex(0);
      setCurrentTime(0);

      if (wasPlaying) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  }, [language]);

  // Click outside and lazy cursor exit handler to auto-close Settings panel
  useEffect(() => {
    const handleMouseEnter = () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };

    const handleMouseLeave = () => {
      closeTimerRef.current = setTimeout(() => {
        setShowSettings(false);
      }, 400);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setShowSettings(false);
      }
    };

    const container = navContainerRef.current;
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [showSettings]);

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  // Sync language state
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "english";
    setLanguage(savedLang);
  }, []);

  const handleNavigation = (val) => {
    vibrateSelection();
    setActiveTab(val);
  };

  const changeLanguage = (lang: string) => {
    vibrateSelection();
    setLanguage(lang);
    localStorage.setItem("lang", lang);
    window.dispatchEvent(new CustomEvent("lang-change", { detail: lang }));
    toast.success(`Language set to ${lang.toUpperCase()}`);
    setShowSettings(false);

    // Swap toast alert
    const currentList = lang === "hindi" ? hindiSongs : lang === "telugu" ? teluguSongs : englishSongs;
    toast.success("Playlist Swapped", {
      description: `${currentList[0].title} — ${currentList[0].artist}`,
      icon: <Play className="h-3.5 w-3.5 fill-current" />,
      classNames: { description: "font-space-mono text-[10px]" },
    });
  };

  // Setup audio listeners
  const setupAudioListeners = (audio: HTMLAudioElement) => {
    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration || 0);
    });
    audio.addEventListener("ended", () => {
      playNext();
    });
  };

  // Lazy-create or get active Audio instance
  const getAudio = (srcUrl?: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio(srcUrl || songsList[songIndex].url);
      audioRef.current.loop = false;
      setupAudioListeners(audioRef.current);
    } else if (srcUrl) {
      // Direct source remapping keeps the listeners intact!
      audioRef.current.src = srcUrl;
      audioRef.current.load();
    }
    return audioRef.current;
  };

  // Music controls
  const togglePlay = () => {
    vibrate();
    const audio = getAudio();

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    vibrate();
    const nextIdx = (songIndex + 1) % songsList.length;
    setSongIndex(nextIdx);
    
    const audio = getAudio(songsList[nextIdx].url);
    if (isPlaying) {
      audio.play().catch(() => {});
    }

    toast.success("Now Playing", {
      description: `${songsList[nextIdx].title} — ${songsList[nextIdx].artist}`,
      icon: <Play className="h-3.5 w-3.5 fill-current" />,
      classNames: { description: "font-space-mono text-[10px]" },
    });
  };

  const playPrevious = () => {
    vibrate();
    const prevIdx = (songIndex - 1 + songsList.length) % songsList.length;
    setSongIndex(prevIdx);
    
    const audio = getAudio(songsList[prevIdx].url);
    if (isPlaying) {
      audio.play().catch(() => {});
    }

    toast.success("Now Playing", {
      description: `${songsList[prevIdx].title} — ${songsList[prevIdx].artist}`,
      icon: <Play className="h-3.5 w-3.5 fill-current" />,
      classNames: { description: "font-space-mono text-[10px]" },
    });
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = clickX / rect.width;
    const newTime = pct * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Theme change circular wipe animation trigger using View Transition API
  const handleThemeChange = (newTheme: string, e: React.MouseEvent<HTMLButtonElement>) => {
    vibrateSelection();
    setShowSettings(false);

    const doc = document as any;
    if (!doc.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      setTheme(newTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ],
        },
        {
          duration: 350,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  // Helper formatting for time
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  const formatRemainingTime = (time: number, total: number) => {
    if (isNaN(time) || isNaN(total)) return "0:00";
    const rem = Math.max(0, total - time);
    const mins = Math.floor(rem / 60);
    const secs = Math.floor(rem % 60);
    return `-${mins}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <nav ref={navContainerRef} className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 w-[92%] max-w-[420px] md:w-auto md:bottom-6">

      {/* Settings Popover - Fully Adapting to Active Theme */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-4 md:right-0 w-[275px] rounded-2xl border border-neutral-200/20 dark:border-neutral-800/10 bg-white/95 dark:bg-black/90 p-4 shadow-2xl backdrop-blur-xl z-55 flex flex-col gap-4 overflow-hidden font-space-mono text-xs select-none text-neutral-800 dark:text-neutral-200"
          >
            {/* Ambient Refraction Glow Backing */}
            <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl opacity-40 dark:opacity-30 pointer-events-none">
              <motion.div
                animate={{
                  x: [0, 15, -15, 0],
                  y: [0, -15, 15, 0],
                  scale: [1, 1.2, 0.9, 1],
                  rotate: [0, 120, 240, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-tr from-pink-500 via-purple-600 to-amber-500 blur-3xl"
              />
            </div>

            {/* THEME Section */}
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
                Theme
              </span>
              <div className="grid grid-cols-3 gap-1 bg-neutral-100/50 dark:bg-neutral-900/40 p-1 rounded-lg border border-neutral-200/20 dark:border-neutral-200/5">
                {[
                  { id: "system", label: "System", Icon: Monitor },
                  { id: "light", label: "Light", Icon: Sun },
                  { id: "dark", label: "Dark", Icon: Moon },
                ].map((t) => {
                  const IconComp = t.Icon;
                  const isActive = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={(e) => handleThemeChange(t.id, e)}
                      className={`flex flex-col items-center gap-1 py-1.5 px-0.5 rounded-md transition-all duration-200 ${isActive ? "bg-neutral-200 text-black dark:bg-white/10 dark:text-white font-semibold shadow-xs" : "text-neutral-600 dark:text-muted-foreground/75 hover:bg-neutral-200/30 dark:hover:bg-white/5"}`}
                    >
                      <motion.div
                        animate={isActive ? { rotate: 360, scale: 1.15 } : { rotate: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 220, damping: 15 }}
                      >
                        <IconComp className="h-3 w-3" />
                      </motion.div>
                      <span className="text-[8px]">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LANGUAGE Section */}
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
                Language
              </span>
              <div className="flex flex-col gap-1 bg-neutral-100/50 dark:bg-neutral-900/40 p-1 rounded-lg border border-neutral-200/20 dark:border-neutral-200/5">
                {[
                  { id: "english", label: "English", flag: "🇬🇧" },
                  { id: "hindi", label: "हिन्दी", flag: "🇮🇳" },
                  { id: "telugu", label: "తెలుగు", flag: "🇮🇳" },
                ].map((l) => {
                  const isActive = language === l.id;
                  return (
                    <button
                      key={l.id}
                      onClick={() => changeLanguage(l.id)}
                      className={`flex items-center justify-between py-1 px-2 rounded-md transition-all duration-200 ${isActive ? "bg-neutral-200 text-black dark:bg-white/10 dark:text-white font-semibold" : "text-neutral-600 dark:text-muted-foreground/75 hover:bg-neutral-200/30 dark:hover:bg-white/5"}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs">{l.flag}</span>
                        <span className="text-[9px]">{l.label}</span>
                      </div>
                      {isActive && <Check className="h-3 w-3 text-neutral-800 dark:text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SONGS (ARCTIC MONKEYS STYLE) Section */}
            <div className="flex flex-col gap-2 border-t border-neutral-200/20 dark:border-neutral-200/5 pt-3">
              <span className="text-[9px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
                Now Playing
              </span>
              
              {/* Premium music card container */}
              <div className="bg-neutral-100/70 dark:bg-neutral-900/50 p-3 rounded-2xl border border-neutral-200/20 dark:border-neutral-800/20 flex flex-col gap-2.5 shadow-sm">
                <div className="flex items-center gap-3">
                  {/* Arctic Monkeys waveform style Album Cover */}
                  <div className="h-12 w-12 rounded-xl bg-black flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
                    <div className="flex items-center gap-[1.5px] px-1">
                      {[1.2, 2.5, 3.8, 4.2, 3.0, 1.8, 1.0, 2.0, 3.5, 4.0, 3.2, 2.0, 1.1].map((h, i) => (
                        <motion.span
                          key={i}
                          animate={isPlaying ? { height: [h * 3, h * 7, h * 3] } : { height: h * 3 }}
                          transition={isPlaying ? { duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 } : {}}
                          className="w-[1.2px] bg-white rounded-full"
                          style={{ height: h * 3 }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Track Info */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[11px] font-bold text-neutral-900 dark:text-white truncate">
                      {songsList[songIndex].title}
                    </span>
                    <span className="text-[9.5px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                      {songsList[songIndex].artist}
                    </span>
                  </div>

                  {/* Tiny animated visualizer wave */}
                  <div className="flex items-end gap-0.5 h-3 shrink-0 px-1 opacity-80">
                    {[1.1, 0.8, 1.4, 0.9, 1.2].map((speed, i) => (
                      <motion.span
                        key={i}
                        animate={isPlaying ? { height: [2, 10, 2] } : { height: 2 }}
                        transition={isPlaying ? { duration: speed, repeat: Infinity, ease: "easeInOut" } : {}}
                        className="w-[1.5px] bg-neutral-600 dark:bg-white rounded-full"
                      />
                    ))}
                  </div>
                </div>

                {/* Progress bar scrubber */}
                <div className="flex flex-col gap-1 px-0.5">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={(e) => {
                      const newTime = parseFloat(e.target.value);
                      if (audioRef.current) {
                        audioRef.current.currentTime = newTime;
                      }
                      setCurrentTime(newTime);
                    }}
                    className="w-full h-[3.5px] rounded-full cursor-pointer accent-neutral-950 dark:accent-white text-neutral-950 dark:text-white music-scrubber"
                    style={{
                      background: `linear-gradient(to right, currentColor ${(currentTime / (duration || 1)) * 100}%, ${
                        theme === "dark" ? "#262626" : "#e5e5e5"
                      } ${(currentTime / (duration || 1)) * 100}%)`,
                    }}
                  />
                  <div className="flex items-center justify-between text-[8px] text-neutral-400 dark:text-neutral-500 font-space-mono font-medium">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatRemainingTime(currentTime, duration)}</span>
                  </div>
                </div>

                {/* Centered music controls & Airplay */}
                <div className="flex items-center justify-between pt-1 px-1">
                  <div className="w-4 shrink-0" /> {/* spacer balancing Airplay */}
                  <div className="flex items-center gap-5 justify-center flex-1">
                    <button onClick={playPrevious} className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition">
                      <SkipBack className="h-4 w-4 fill-current" />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="h-8 w-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm shrink-0"
                    >
                      {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}
                    </button>
                    <button onClick={playNext} className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition">
                      <SkipForward className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                  <button className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition shrink-0">
                    <Airplay className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock Bar Container */}
      <div className="flex items-center justify-between w-full md:w-auto rounded-full border border-zinc-800/50 dark:border-neutral-800/60 bg-[#121212] md:bg-black/60 px-3 py-1.5 md:px-2 md:py-1.5 md:backdrop-blur-xl shadow-2xl relative z-50">
        <Tabs value={activeTab} onValueChange={handleNavigation} className="w-full md:w-auto">
          <TabsHighlight
            className="absolute z-0 inset-0 rounded-full bg-white/10"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <TabsList className="flex items-center justify-around w-full md:w-auto gap-0.5">
              {navLinks.map((link) => {
                const Icon = iconMap[link.path];
                const isActive = activeTab === link.path;
                const translatedName = navTranslations[language]?.[link.name] || link.name;

                return (
                  <TabsHighlightItem key={link.path} value={link.path}>
                    <TabsTrigger value={link.path} asChild>
                      <Link
                        href={link.path}
                        className="group flex flex-col md:flex-row items-center justify-center rounded-full px-2.5 py-1 md:px-4 md:py-2 text-neutral-500 data-[state=active]:text-white dark:text-neutral-500 dark:data-[state=active]:text-white md:text-white/50 md:dark:text-white/40 gap-0.5 md:gap-0"
                      >
                        {Icon && (
                          <Icon className="h-4.5 w-4.5 md:h-4 md:w-4 shrink-0" strokeWidth={1.5} />
                        )}
                        
                        {/* Mobile view label: stacked below icon */}
                        <span className="text-[8px] font-medium font-space-mono text-neutral-500 group-data-[state=active]:text-white block md:hidden leading-none mt-0.5">
                          {translatedName}
                        </span>

                        {/* Desktop view label: active indicator animation */}
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.span
                              initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                              animate={{ width: "auto", opacity: 1, marginLeft: 6 }}
                              exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="hidden md:inline-block overflow-hidden whitespace-nowrap text-[10px] font-semibold font-space-mono text-white"
                            >
                              {translatedName}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Link>
                    </TabsTrigger>
                  </TabsHighlightItem>
                );
              })}
            </TabsList>
          </TabsHighlight>
        </Tabs>

        {/* Settings Gear trigger styled exactly like tab list */}
        <button
          onClick={() => {
            vibrateSelection();
            setShowSettings(!showSettings);
          }}
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 ml-1 md:ml-1.5 ${showSettings ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/5"}`}
        >
          <Settings
            className={`h-4 w-4 transition-transform duration-300 ${showSettings ? "rotate-45" : "rotate-0"}`}
          />
          <span className="sr-only">Settings</span>
        </button>
      </div>
    </nav>
  );
}

export default NavigationBar;
