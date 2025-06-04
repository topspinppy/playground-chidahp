"use client";

import { useEffect, useRef } from "react";
import axios from "axios";
import { getDeviceType, getBrowserName, getOSName, getQueryParam, getBrowserVersion, getOSVersion } from "@/lib/utils";

export function useTrackView(postId: number | string) {
  const hasTracked = useRef(false); // ป้องกันยิงซ้ำ

  useEffect(() => {
    if (!postId) return;
    if (typeof window === "undefined") return;

    const key = `viewed-${postId}`;
    const lastViewed = localStorage.getItem(key);
    const now = Date.now();

    // ป้องกันซ้ำภายใน 1 ชั่วโมง
    if (lastViewed && now - Number(lastViewed) < 60 * 60 * 1000) return;

    const start = Date.now();

    const triggerTrack = async () => {
      if (hasTracked.current) return;
      hasTracked.current = true;

      const end = Date.now();
      const duration = Math.round((end - start) / 1000);
      const isDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;

      await axios.post("https://api.playground.chidahp.com/wp-json/playground/v1/view", {
        postId,
        referrer: document.referrer,
        duration,
        device: getDeviceType(),
        browser: getBrowserName(),
        browserVersion: getBrowserVersion(),
        os: getOSName(),
        osVersion: getOSVersion(),
        language: navigator.language,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        darkMode: isDark,
        pathname: window.location.pathname,
        utmSource: getQueryParam("utm_source"),
        utmMedium: getQueryParam("utm_medium"),
        utmCampaign: getQueryParam("utm_campaign"),
        meta: {
          refId: getQueryParam("ref"),
        },
      });

      console.log("✅ View tracked for post:", postId);
      localStorage.setItem(key, now.toString());
    };

    // Trigger 1: อยู่ครบ 10 วินาที
    const timer = setTimeout(() => {
      triggerTrack();
    }, 10_000); // 10 วินาที

    // Trigger 2: scroll เกิน 50%
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.body.scrollHeight;

      if (scrollPosition / pageHeight > 0.5) {
        triggerTrack();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [postId]);
}
