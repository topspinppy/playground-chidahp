"use client";

import { useEffect, useState } from "react";
import GoogleAnalytics from "./front/GoogleAnalytics";
import Link from "next/link";

export default function CookieConsent() {
  const [accepted, setAccepted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent === "true") {
      setAccepted(true);
    }
    setIsReady(true); // mark as ready to render
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setAccepted(true);
  };

  if (!isReady) return null;
  if (accepted) return <GoogleAnalytics />;

  return (
    <div className="fixed bottom-5 right-5 w-72 sm:w-80 bg-yellow-100 border border-yellow-300 text-yellow-900 px-4 py-3 rounded-xl shadow-md z-50 animate-fade-in">
      <p className="text-sm">
        เราใช้คุกกี้เพื่อวิเคราะห์การใช้งานเว็บไซต์ เพื่อปรับปรุงประสบการณ์ของคุณ 🍪
        <br />
        โดยท่านสามารถอ่าน{" "}
        <Link
          href="/page/privacy-policy"
          className="text-yellow-800 font-semibold underline underline-offset-2 hover:text-yellow-600 transition"
        >
          นโยบายความเป็นส่วนตัวได้ที่นี่
        </Link>
      </p>
      <div className="mt-3 text-right">
        <button
          onClick={handleAccept}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-1 rounded text-sm cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
        >
          ยอมรับคุกกี้
        </button>
      </div>
    </div>
  );
}
