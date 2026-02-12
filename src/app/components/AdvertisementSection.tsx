import GoogleAdsense from "./GoogleAdsense";

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
  return (
    <div className={`mt-2 md:mt-8 mb-8 hidden md:block ${className}`}>
      <div>
        {!isCloseText && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Advertisement</span>
          </div>
        )}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl min-h-[250px]">
            <GoogleAdsense 
              adSlot={adSlot} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
