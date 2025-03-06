
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
  slot = "9507751550", 
  format = "auto", 
  className = "", 
  responsive = true,
  printHidden = true,
  width = "100%",
  height = "280px"
}: AdBannerProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [adAttempted, setAdAttempted] = useState(false);

  useEffect(() => {
    // Only run once
    if (adAttempted) return;
    setAdAttempted(true);

    const loadAdSenseScript = () => {
      return new Promise<void>((resolve) => {
        // Check if script already exists
        if (document.querySelector(
          'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6062398972709628"]'
        )) {
          resolve();
          return;
        }
        
        const adScript = document.createElement('script');
        adScript.async = true;
        adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6062398972709628";
        adScript.crossOrigin = "anonymous";
        adScript.onload = () => {
          console.log("AdSense script loaded successfully");
          resolve();
        };
        adScript.onerror = (e) => {
          console.error("Error loading AdSense script:", e);
          resolve(); // Resolve anyway to continue the flow
        };
        document.head.appendChild(adScript);
      });
    };

    const initializeAd = () => {
      if (!adContainerRef.current) return;
      
      // Make sure container has dimensions
      if (adContainerRef.current.clientWidth === 0) {
        console.warn("Ad container has no width, setting minimum width");
        adContainerRef.current.style.minWidth = "300px";
      }

      // Find the ins element
      const adElement = adContainerRef.current.querySelector('.adsbygoogle');
      if (!adElement) {
        console.error("Ad element not found");
        return;
      }

      try {
        // Push the ad
        if (window.adsbygoogle) {
          window.adsbygoogle = window.adsbygoogle || [];
          window.adsbygoogle.push({});
          setIsAdLoaded(true);
          console.log("Ad pushed to adsbygoogle");
        } else {
          console.warn("adsbygoogle not available");
        }
      } catch (error) {
        console.error("Error initializing ad:", error);
      }
    };

    const loadAd = async () => {
      try {
        await loadAdSenseScript();
        // Give some time for AdSense to initialize
        setTimeout(initializeAd, 300);
      } catch (error) {
        console.error("Error in ad loading process:", error);
      }
    };

    loadAd();

    return () => {
      // Cleanup when component unmounts
    };
  }, [adAttempted]);

  return (
    <div 
      ref={adContainerRef} 
      className={`ad-container ${printHidden ? 'print:hidden' : ''} ${className}`}
      style={{ 
        minHeight: height, 
        width: width, 
        overflow: 'hidden',
        display: 'block'
      }}
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
