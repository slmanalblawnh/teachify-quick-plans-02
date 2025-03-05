
import { useEffect, useRef, useState } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  responsive?: boolean;
  printHidden?: boolean;
  width?: string;
  height?: string;
}

const AdBanner = ({ 
  slot = "4748618583", 
  format = "auto", 
  className = "", 
  responsive = true,
  printHidden = true,
  width = "100%",
  height = "280px"
}: AdBannerProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  useEffect(() => {
    // Ensure the ad container has dimensions before loading ads
    if (adContainerRef.current && adContainerRef.current.clientWidth > 0) {
      // Ensure this runs only in the browser
      if (typeof window !== 'undefined') {
        try {
          // Ensure the AdSense script is loaded
          const loadAdSenseScript = () => {
            if (!document.querySelector(
              'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6062398972709628"]'
            )) {
              const adScript = document.createElement('script');
              adScript.async = true;
              adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6062398972709628";
              adScript.crossOrigin = "anonymous";
              document.head.appendChild(adScript);
            }
          };

          loadAdSenseScript();
          
          // Add a small delay to ensure the script has time to initialize
          setTimeout(() => {
            // Initialize the ad
            if (window.adsbygoogle) {
              window.adsbygoogle = window.adsbygoogle || [];
              window.adsbygoogle.push({});
              setIsAdLoaded(true);
              console.log("تم محاولة تحميل الإعلان بنجاح");
            } else {
              console.warn("لم يتم العثور على adsbygoogle");
            }
          }, 200);
        } catch (error) {
          console.error("خطأ في تحميل الإعلان:", error);
        }
      }
    } else {
      console.warn("حاوية الإعلان ليس لها أبعاد محددة");
    }
    
    return () => {
      // Cleanup when component unmounts
    };
  }, []);

  return (
    <div 
      ref={adContainerRef} 
      className={`ad-container ${printHidden ? 'print:hidden' : ''} ${className}`}
      style={{ minHeight: height, width: width }}
    >
      <ins
        className={`adsbygoogle ${responsive ? 'w-full' : ''}`}
        style={{ 
          display: 'block', 
          minHeight: height,
          width: width,
          backgroundColor: isAdLoaded ? 'transparent' : '#f0f0f0',
          transition: 'background-color 0.3s'
        }}
        data-ad-client="ca-pub-6062398972709628"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};

// Add TypeScript declaration for adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default AdBanner;
