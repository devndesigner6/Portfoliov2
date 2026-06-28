"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiExpo,
  SiDjango,
  SiExpress,
  SiNodedotjs,
  SiBun,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiReactquery,
  SiPostman,
  SiTailwindcss,
  SiShadcnui,
  SiFramer,
  SiGsap,
  SiJavascript,
  SiTypescript,
  SiOpenjdk,
  SiPython,
  SiCplusplus,
  SiGit,
  SiGithub,
  SiFigma,
  SiDocker,
  SiLinux,
} from "react-icons/si";
import { Database, Boxes } from "lucide-react";

const SKILLS = [
  // Row 1
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "Expo", Icon: SiExpo, color: "#ffffff" },
  { name: "Django", Icon: SiDjango, color: "#092E20" },
  { name: "Express", Icon: SiExpress, color: "#ffffff" },
  { name: "Node", Icon: SiNodedotjs, color: "#339933" },
  { name: "Bun", Icon: SiBun, color: "#F9F1E7" },
  // Row 2
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Redis", Icon: SiRedis, color: "#DC382D" },
  { name: "Prisma", Icon: SiPrisma, color: "#2D3748" },
  { name: "Zustand", Icon: Boxes, color: "#3B82F6" },
  { name: "Tanstack Query", Icon: SiReactquery, color: "#FF4154" },
  // Row 3
  { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "shadcn", Icon: SiShadcnui, color: "#ffffff" },
  { name: "Motion", Icon: SiFramer, color: "#ffffff" },
  { name: "GSAP", Icon: SiGsap, color: "#88CE02" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  // Row 4
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Java", Icon: SiOpenjdk, color: "#ED8B00" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "C/C++", Icon: SiCplusplus, color: "#00599C" },
  { name: "SQL", Icon: Database, color: "#003B57" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "Github", Icon: SiGithub, color: "#ffffff" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  // Row 5
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Linux", Icon: SiLinux, color: "#FCC624" },
];

export default function SkillsSection() {
  return (
    <div className="mx-auto mt-12 w-full max-w-4xl font-space-mono">
      <h5 className="mb-4 font-doto text-2xl font-medium md:text-3xl">
        Skills & Technologies
      </h5>

      <div className="flex flex-wrap justify-center gap-x-2.5 gap-y-3">
        {SKILLS.map((skill, index) => {
          const { name, Icon, color } = skill;
          return (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.015, duration: 0.25 }}
              whileHover={{ scale: 1.04, y: -2 }}
              className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-3 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 shadow-sm transition-all hover:border-neutral-400 dark:hover:border-neutral-700 hover:bg-white dark:hover:bg-neutral-800 md:px-3.5 md:py-2 md:text-xs"
            >
              <Icon className="h-3.5 w-3.5 shrink-0" style={{ color }} />
              <span className="font-medium">{name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
