import GoogleAdsense from "./GoogleAdsense";

interface AdvertisementSectionProps {
  adSlot: string;
  className?: string;
  style?: React.CSSProperties;
  isCloseText?: boolean;
}

export default function AdvertisementSection({ 
  adSlot, 
  className = "",
  style = {},
  isCloseText = false
}: AdvertisementSectionProps) {
  return (
    <div className={`mb-8 hidden md:block ${className}`}>
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
              className="rounded-lg overflow-hidden shadow-sm w-full"
              style={{
                minHeight: '250px',
                minWidth: '300px',
                ...style
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
