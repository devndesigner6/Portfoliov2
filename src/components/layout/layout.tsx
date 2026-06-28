"use client";

import React, { useState, useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  title?: string;
  subtitle?: string;
}

const layoutTranslations: Record<string, Record<string, { title: string; subtitle: string }>> = {
  english: {
    "Projects": { title: "Projects", subtitle: "A collection of things I've built." },
    "Experience": { title: "Experience", subtitle: "My professional journey & open source timeline." },
    "Hackathons": { title: "Hackathons", subtitle: "Events and software hackathons I participated in." },
    "Blogs": { title: "Blogs", subtitle: "Latest articles and tutorials" },
    "Research": { title: "Research", subtitle: "Academic studies and technical investigations." },
  },
  hindi: {
    "Projects": { title: "परियोजनाएं", subtitle: "मेरे द्वारा बनाई गई चीज़ों का एक संग्रह।" },
    "Experience": { title: "अनुभव", subtitle: "मेरी व्यावसायिक यात्रा और ओपन सोर्स टाइमलाइन।" },
    "Hackathons": { title: "हैकथॉन", subtitle: "ईवेंट्स और सॉफ़्टवेयर हैकथॉन जिनमें मैंने भाग लिया।" },
    "Blogs": { title: "ब्लॉग", subtitle: "नवीनतम लेख और ट्यूटोरियल" },
    "Research": { title: "अनुसंधान", subtitle: "शैक्षणिक अध्ययन और तकनीकी जांच।" },
  },
  telugu: {
    "Projects": { title: "ప్రాజెక్ట్స్", subtitle: "నేను నిర్మించిన వాటి సేకరణ." },
    "Experience": { title: "అనుభవం", subtitle: "నా వృత్తిపరమైన ప్రయాణం & ఓపెన్ సోర్స్ టైమ్‌లైన్." },
    "Hackathons": { title: "హ్యాకథాన్స్", subtitle: "నేను పాల్గొన్న ఈవెంట్‌లు మరియు సాఫ్ట్‌వేర్ హ్యాకథాన్‌లు." },
    "Blogs": { title: "బ్లాగ్స్", subtitle: "తాజా కథనాలు మరియు ట్యుటోరియల్స్" },
    "Research": { title: "పరిశోధన", subtitle: "విద్యాసంబంధ అధ్యయనాలు మరియు సాంకేతిక పరిశోధనలు." },
  }
};

const Layout = ({ children, showHeader, title, subtitle }: LayoutProps) => {
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

  const currentTrans = layoutTranslations[lang]?.[title || ""] || { title, subtitle };
  const displayTitle = currentTrans.title;
  const displaySubtitle = currentTrans.subtitle;

  return (
    <div className="my-2 md:my-6">
      {showHeader && (
        <header className="md:max-w-4xl md:mx-auto px-2 md:px-0 space-y-2 my-2 md:my-6 font-doto">
          <h1 className="text-2xl uppercase">{displayTitle}</h1>
          <p>{displaySubtitle}</p>
        </header>
      )}
      <div className="flex flex-col md:max-w-4xl mx-auto px-4 md:px-0">{children}</div>
    </div>
  );
};

export default Layout;
