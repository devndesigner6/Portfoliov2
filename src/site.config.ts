/**
 * ────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — single source of truth
 * ────────────────────────────────────────────────────────────────────────────
 *  Edit this file to make the portfolio your own. Every identity, link,
 *  SEO string, nav entry, and content list is read from here.
 *
 *  After cloning:
 *    1. Update `identity`, `contact`, `assets`, and `socials` below.
 *    2. Edit `seo` defaults and `nav` items.
 *    3. Replace `experiences`, `projects`, `hackathons`, `research`.
 *
 *  Runtime-only values (API keys, etc.) still live in `.env.local`.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type SocialPlatform =
  | "twitter"
  | "github"
  | "linkedin"
  | "leetcode"
  | "tryhackme"
  | "codeforces"
  | "medium";

export const siteConfig = {
  // ── Identity ──────────────────────────────────────────────────────────────
  identity: {
    name: "Hemanth Peddada",
    firstName: "Hemanth",
    title: "Product Engineer",
    tagline: "Software Engineer",
    bio: "Give me a blank slate, and I'll take it to production with end-to-end ownership of the front end, back end, and everything in between. I create software that is useful, dependable, and long-lasting.",
    age: "20",
    intros: [
      "Product Engineer",
      "Full-Stack Developer",
      "Open Source Contributor",
      "ML Enthusiast",
    ],
  },

  // ── Contact & URL ─────────────────────────────────────────────────────────
  contact: {
    email: "mesurya.builds@gmail.com",
    url: "https://hemanthme.in",
    calUrl: "https://cal.com/hemanthdevn6",
    resumeUrl: "/hemanth-resume.pdf",
  },

  // ── Assets (Local hosting) ────────────────────────────────────────────────
  assetsUrl: "",
  assets: {
    ogImage: "/default-image.webp",
    blogOgImage: "/default-image-blogs.webp",
    favicon: "/favicon.ico",
    banner: "/banner.jpg",
  },

  // ── Socials (platform → username + url) ───────────────────────────────────
  // Set empty username/url to disable rendering on the hero section.
  socials: {
    twitter: {
      label: "Twitter",
      username: "hemanttbuilds",
      url: "https://x.com/hemanttbuilds",
    },
    github: {
      label: "Github",
      username: "devndesigner6",
      url: "https://github.com/devndesigner6",
    },
    linkedin: {
      label: "LinkedIn",
      username: "me-hemanth",
      url: "https://www.linkedin.com/in/me-hemanth",
    },
    medium: {
      label: "Medium",
      username: "peddadahemanth6",
      url: "https://medium.com/@peddadahemanth6",
    },
    leetcode: {
      label: "LeetCode",
      username: "",
      url: "",
    },
    tryhackme: {
      label: "TryHackMe",
      username: "",
      url: "",
    },
    codeforces: {
      label: "Codeforces",
      username: "",
      url: "",
    },
  } satisfies Record<SocialPlatform, { label: string; username: string; url: string }>,

  // ── SEO defaults ──────────────────────────────────────────────────────────
  seo: {
    titleTemplate: "%s | Hemanth Peddada",
    defaultTitle: "Hemanth Peddada",
    defaultDescription:
      "Product Engineer portfolio showcasing software development, machine learning, and open-source contributions",
    keywords: [
      "Hemanth Peddada",
      "Product Engineer",
      "Full Stack Developer",
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Web Development",
      "Portfolio",
      "Software Engineer",
      "AI Engineer",
    ],
    twitterHandle: "",
    locale: "en_US",
    themeColor: "#0B0D0E",
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  nav: [
    { path: "/", name: "About" },
    { path: "/projects", name: "Projects" },
    { path: "/experience", name: "Experience" },
    { path: "/hackathons", name: "Hacks" },
    { path: "/blogs", name: "Blogs" },
  ],

  // ── Content: Experiences ──────────────────────────────────────────────────
  experiences: [
    {
      role: "AIML Intern",
      year: "Jan 2025 - Apr 2025",
      company: "Inspire Leap",
      type: "Internship",
      location: "Hyderabad, Telangana",
      logo: "/logos/inspire.jpg",
      responsibility: [
        [
          { text: "Engineered an end-to-end diabetes risk prediction system using " },
          { text: "Python and Flask", bold: true },
          { text: ", implementing a custom machine learning algorithm analyzing 8 parameters to provide real-time risk assessments." },
        ],
        [
          { text: "Built a web app with " },
          { text: "RESTful API", bold: true },
          { text: " architecture featuring interactive prediction forms and batch processing capabilities using a Bootstrap UI." },
        ],
        [
          { text: "Deployed healthcare analytics platform utilizing the " },
          { text: "Pima Indians Diabetes Dataset", bold: true },
          { text: " to deliver accurate risk classifications and probability metrics." },
        ],
      ],
      techstacks: ["Python", "Flask", "Machine Learning", "Bootstrap", "REST APIs"],
    },
    {
      role: "GSoC 2025 Contributor & Maintainer",
      company: "AOSSIE (Google Summer of Code)",
      year: "May 2025 - Aug 2025",
      type: "Open-Source",
      location: "Remote",
      logo: "/logos/gsoc.png",
      responsibility: [
        [
          { text: "Selected as a contributor to the AOSSIE organisation to work on the project " },
          { text: "PictoPy", bold: true },
          { text: ", delivering major enhancements and new features under GSoC 2025 with 20+ pull requests." },
        ],
        [
          { text: "Served as the " },
          { text: "maintainer of PictoPy", bold: true },
          { text: ", overseeing issues, assigning tasks, and reviewing PRs." },
        ],
        [
          { text: "Optimized frontend memory usage by " },
          { text: "6 times", bold: true },
          { text: "." },
        ],
        [
          { text: "Created CI/CD workflows to generate builds for " },
          { text: "Windows, Mac, and Linux", bold: true },
          { text: ", adding caching to reduce pipeline execution time by " },
          { text: "2 times", bold: true },
          { text: "." },
        ],
        [
          { text: "Set up " },
          { text: "Redux Toolkit", bold: true },
          { text: " for proper state management and implemented an auto-updater for the desktop app." },
        ],
      ],
      techstacks: ["Deep Learning", "Tauri", "React", "FastAPI", "Redux Toolkit", "GitHub Actions"],
    },
    {
      role: "Open Source Contributor",
      company: "AOSSIE",
      year: "May 2025 - Aug 2025",
      type: "Open-Source",
      location: "Remote",
      logo: "/logos/aossie.png",
      responsibility: [
        [
          { text: "Selected as contributor to " },
          { text: "AOSSIE", bold: true },
          { text: " for " },
          { text: "PictoPy", bold: true },
          { text: "; delivered 20+ pull requests with major frontend performance and CI/CD enhancements." }
        ],
        [
          { text: "Set up " },
          { text: "Redux Toolkit", bold: true },
          { text: ", implemented auto-updater, revamped UI/UX using React, and resolved critical bugs." }
        ],
        [
          { text: "Serving as " },
          { text: "project maintainer", bold: true },
          { text: ", overseeing issues and reviewing PRs from contributors." }
        ]
      ],
      techstacks: ["Tauri", "React", "FastAPI"],
    },
  ],

  // ── Content: Projects ─────────────────────────────────────────────────────
  projects: [
    {
      title: "Unsubscribely",
      category: "DeFi · AI Agent Platform",
      description:
        "DeFi subscription management platform where users lock ALGO in escrow smart contracts and an autonomous agent handles payments, cancellations, and on-chain proofs.",
      techstacks: ["TypeScript", "React", "PuyaPy", "Algorand", "Node.js", "Supabase", "Playwright"],
      status: "building",
      link: "https://unsubly.xyz",
      preview: "/projects/unsubscribely.png",
    },
    {
      title: "Ephera Note",
      category: "Web Application · Productivity",
      description:
        "Modern, secure, and intuitive web-based note-taking application designed for ultimate developer and student productivity.",
      techstacks: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
      status: "live",
      link: "https://ephera.in",
      github: "devndesigner6/ephera-note",
      preview: "/projects/ephera.png",
    },
    {
      title: "Useglimmer",
      category: "Open Source · React Components",
      description:
        "Free premium animated React components and micro-interactions built with Framer Motion and Tailwind CSS.",
      techstacks: ["React", "Framer Motion", "Tailwind CSS", "TypeScript"],
      status: "active",
      link: "https://github.com/devndesigner6/useglimmer",
      github: "devndesigner6/useglimmer",
      preview: "/projects/useglimmer.png",
    },
    {
      title: "Focuslive",
      category: "Open Source · Productivity",
      description:
        "Focus and session tracking dashboard designed for developers to manage task state, integrate playlists, and optimize workspace attention.",
      techstacks: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      status: "building",
      link: "https://github.com/devndesigner6/focuslive",
      github: "devndesigner6/focuslive",
      preview: "",
    },
    {
      title: "Project 5 (Coming Soon)",
      category: "Upcoming Project",
      description:
        "A brand new project currently in development. Visuals and details will be shared soon!",
      techstacks: ["AI", "TypeScript"],
      status: "building",
      link: "",
      preview: "",
    },
  ],

  // ── Content: Hackathons ───────────────────────────────────────────────────
  hackathons: [
    {
      title: "AlgoBharat Hack Series 3.0",
      event: "Algorand Foundation Hack Series",
      year: "Apr 2026",
      placement: "Top 30 (invited to Goa)",
      college: "Developer Retreat, Goa",
      body: [
        { text: "Selected in the top " },
        { text: "30 out of 500+", bold: true },
        { text: " applicants for AlgoBharat Hack Series 3.0. Invited to the India Developer Retreat in Goa for semifinal judging across technical, business, and scalability panels." },
        { text: " Presented " },
        { text: "Unsubscribely", bold: true },
        { text: " to judges, competed in the x402 Tech Challenge build sprint, and participated in a 4-day intensive." }
      ],
      techstacks: ["React", "PuyaPy", "Algorand", "TypeScript", "Node.js"],
      link: "https://unsubly.xyz",
    },
    {
      title: "Amazon ML Summer School 2025",
      event: "Machine Learning Intensive",
      year: "2025",
      placement: "Selected Student",
      college: "Amazon India",
      body: [
        { text: "Selected out of " },
        { text: "6,000 applicants", bold: true },
        { text: " to participate in the Amazon ML Summer School 2025." },
        { text: " Guided by Amazon's top scientists, studied " },
        { text: "Supervised & Unsupervised Learning, Deep Neural Networks, Generative AI & LLMs, and Reinforcement Learning", bold: true },
        { text: "." }
      ],
      techstacks: ["Machine Learning", "Deep Learning", "Generative AI", "LLMs"],
    },
  ],

  // ── Content: Research ─────────────────────────────────────────────────────
  research: [] as Array<{
    title: string;
    year: string;
    authors?: string[];
    venue?: string;
    link?: string;
    description?: string;
  }>,
};

export type SiteConfig = typeof siteConfig;
