import GoogleAdsense from "./GoogleAdsense";

interface AdvertisementSectionProps {
  adSlot: string;
  className?: string;
}

export default function AdvertisementSection({ 
  adSlot, 
  className = "" 
}: AdvertisementSectionProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <span className="text-sm font-medium text-yellow-700 uppercase tracking-wide">โฆษณา</span>
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <GoogleAdsense 
              adSlot={adSlot} 
              className="rounded-lg overflow-hidden shadow-sm w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
