import { useState, useEffect } from "react";

export function useLanguage() {
  const [lang, setLang] = useState("english");

  useEffect(() => {
    const saved = localStorage.getItem("lang") || "english";
    setLang(saved);

    const handleLangChange = (e: Event) => {
      const newLang = (e as CustomEvent).detail;
      setLang(newLang);
    };

    window.addEventListener("lang-change", handleLangChange);
    return () => window.removeEventListener("lang-change", handleLangChange);
  }, []);

  return lang;
}
