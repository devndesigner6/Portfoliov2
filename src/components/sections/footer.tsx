"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LocationIcon from "@/components/icons/location";
import BoltIcon from "@/components/icons/bolt";
import CloudSunIcon from "@/components/icons/cloud-sun";
import SeikoWatchModal from "@/components/watch-modal";
import IconTelescopeTripod from "@/components/icons/telescope-tripod";
import { siteConfig } from "@/site.config";

const Footer = () => {
  const [time, setTime] = useState<Date | null>(null);
  const [battery, setBattery] = useState<number | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [weather, setWeather] = useState<string | null>(null);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const tick = () => setTime(new Date());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nav = navigator as Navigator & { getBattery?: () => Promise<any> };
    if (nav.getBattery) {
      nav.getBattery().then((batt: any) => {
        const update = () => setBattery(Math.round(batt.level * 100));
        update();
        batt.addEventListener("levelchange", update);
      });
    }
  }, []);

  useEffect(() => {
    // Prevent double counting asset requests (favicon, webp images, maps, etc.)
    const isAsset = /\.[a-zA-Z0-9]+$/.test(pathname || "");
    if (isAsset) return;

    const hasVisited = sessionStorage.getItem("has-visited-session");
    const url = hasVisited ? "/api/visitors?hit=false" : "/api/visitors?hit=true";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === "number") {
          setVisitorCount(data.count);
          sessionStorage.setItem("has-visited-session", "true");
        }
      })
      .catch(() => {});
  }, [pathname]);

  useEffect(() => {
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => {
        const city = data.city || "";
        const country = data.country || "";
        if (city && country) {
          setLocation(`${city}, ${country}`);
        } else {
          setLocation(city || country || null);
        }
        if (data.weather) {
          setWeather(`${data.weather.temperature}${data.weather.unit}`);
        }
      })
      .catch(() => setLocation(null));
  }, []);

  const formattedDate = time
    ? time.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const formattedTime = time
    ? time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "";

  return (
    <footer className="mx-auto mb-24 w-full max-w-4xl px-6 md:mb-6 md:px-0">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1 font-cera text-xs text-muted-foreground/60">
          {time && (
            <SeikoWatchModal>
              <button
                type="button"
                className="w-fit cursor-pointer text-left transition-colors hover:text-foreground focus:outline-hidden focus-visible:text-foreground"
                aria-label="Open Seiko analog watch"
              >
                {formattedDate} &middot; {formattedTime}
              </button>
            </SeikoWatchModal>
          )}
          {location && (
            <span className="flex items-center gap-1">
              <LocationIcon className="h-3 w-3" />
              {location}
              {weather && (
                <>
                  <span>&middot;</span>
                  <CloudSunIcon className="h-3 w-3" />
                  {weather}
                </>
              )}
            </span>
          )}
          {(battery !== null || visitorCount !== null) && (
            <span className="flex items-center gap-3">
              {visitorCount !== null && (
                <span className="flex items-center gap-1.5 text-muted-foreground/80 font-space-mono">
                  <span>🎉</span>
                  <span>
                    You&apos;re the{" "}
                    <strong className="font-semibold text-foreground underline decoration-neutral-600/80 decoration-1 underline-offset-4">
                      {visitorCount.toLocaleString()}
                      {(() => {
                        const j = visitorCount % 10,
                              k = visitorCount % 100;
                        if (j === 1 && k !== 11) return "st";
                        if (j === 2 && k !== 12) return "nd";
                        if (j === 3 && k !== 13) return "rd";
                        return "th";
                      })()}
                    </strong>{" "}
                    visitor
                  </span>
                </span>
              )}
              {battery !== null && (
                <span className="flex items-center gap-1.5 text-muted-foreground/80 font-space-mono">
                  <BoltIcon className="h-3 w-3" />
                  {battery}%
                </span>
              )}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground/60">
          &copy; {new Date().getFullYear()} {siteConfig.identity.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
