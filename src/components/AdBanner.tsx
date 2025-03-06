
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
  const [adClient] = useState("ca-pub-6062398972709628");

  useEffect(() => {
    // Only run once
    if (adAttempted) return;
    setAdAttempted(true);

    // Clear any existing ads first
    if (adContainerRef.current) {
      const existingAds = adContainerRef.current.querySelectorAll('ins.adsbygoogle');
      existingAds.forEach(ad => {
        if (ad.parentNode) {
          ad.parentNode.removeChild(ad);
        }
      });
    }

    const loadAdSenseScript = () => {
      return new Promise<void>((resolve) => {
        // Check if script already exists
        const existingScript = document.querySelector(
          `script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}"]`
        );
        
        if (existingScript) {
          console.log("AdSense script already exists");
          resolve();
          return;
        }
        
        const adScript = document.createElement('script');
        adScript.async = true;
        adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
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

    const createAdElement = () => {
      if (!adContainerRef.current) return null;
      
      // Create a new ins element
      const insElement = document.createElement('ins');
      insElement.className = `adsbygoogle ${responsive ? 'w-full' : ''}`;
      insElement.style.display = 'block';
      insElement.style.minHeight = height;
      insElement.style.width = width;
      insElement.style.backgroundColor = '#f0f0f0';
      insElement.style.transition = 'background-color 0.3s';
      insElement.setAttribute('data-ad-client', adClient);
      insElement.setAttribute('data-ad-slot', slot);
      insElement.setAttribute('data-ad-format', format);
      insElement.setAttribute('data-full-width-responsive', responsive ? 'true' : 'false');
      
      // Append to container
      adContainerRef.current.appendChild(insElement);
      return insElement;
    };

    const initializeAd = () => {
      if (!adContainerRef.current) return;
      
      // Make sure container has dimensions
      if (adContainerRef.current.clientWidth === 0) {
        console.log("Setting minimum width for ad container");
        adContainerRef.current.style.minWidth = "300px";
      }

      // Create the ad element
      createAdElement();

      try {
        // Check if adsbygoogle is available
        if (window.adsbygoogle) {
          console.log("Pushing ad to adsbygoogle");
          window.adsbygoogle = window.adsbygoogle || [];
          window.adsbygoogle.push({});
          setIsAdLoaded(true);
        } else {
          console.warn("adsbygoogle not available, will retry");
          // If adsbygoogle isn't available, wait a bit and try again
          setTimeout(() => {
            if (window.adsbygoogle) {
              console.log("Retrying: Pushing ad to adsbygoogle");
              window.adsbygoogle.push({});
              setIsAdLoaded(true);
            } else {
              console.error("adsbygoogle still not available after retry");
            }
          }, 1000);
        }
      } catch (error) {
        console.error("Error initializing ad:", error);
      }
    };

    const loadAd = async () => {
      try {
        await loadAdSenseScript();
        // Use a longer timeout to ensure AdSense is fully initialized
        setTimeout(initializeAd, 500);
      } catch (error) {
        console.error("Error in ad loading process:", error);
      }
    };

    loadAd();

    return () => {
      // Cleanup when component unmounts
    };
  }, [adAttempted, adClient, format, height, responsive, slot, width]);

  return (
    <div 
      ref={adContainerRef} 
      className={`ad-container ${printHidden ? 'print:hidden' : ''} ${className}`}
      style={{ 
        minHeight: height, 
        width: width, 
        overflow: 'hidden',
        display: 'block',
        margin: '10px auto',
        position: 'relative'
      }}
      aria-label="إعلان"
    />
  );
};

// Add TypeScript declaration for adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default AdBanner;
