'use client';

import { useState } from "react";
import GoogleAdsense from "./GoogleAdsense";

function isLocal(): boolean {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1';
}

interface AdvertisementSectionProps {
  adSlot: string;
  className?: string;
  isCloseText?: boolean;
}

export default function AdvertisementSection({ 
  adSlot, 
  className = "",
  isCloseText = false
}: AdvertisementSectionProps) {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const handleAdLoad = () => {
    setShowPlaceholder(false);
  };

  return (
    <div className={`mt-2 md:mt-8 mb-0 block ${className}`}>
      <div>
        {!isCloseText && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Advertisement</span>
          </div>
        )}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl min-h-[250px] relative">
            {showPlaceholder || !isLocal() && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-gray-100 border border-gray-200 rounded"
                aria-hidden="true"
              >
                <span className="text-sm text-gray-500">ลงโฆษณา ติดต่อ chidahp@gmail.com</span>
              </div>
            )}
            <div className="relative z-10 min-h-[250px]">
              <GoogleAdsense 
                adSlot={adSlot}
                onAdLoad={handleAdLoad}
                onAdFail={() => setShowPlaceholder(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
