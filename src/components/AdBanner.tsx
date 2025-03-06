
import { useEffect, useRef, useState } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  responsive?: boolean;
  printHidden?: boolean;
  width?: string;
  height?: string;
  fallbackBgColor?: string;
  fallbackText?: string;
  showFallback?: boolean;
}

const AdBanner = ({ 
  slot = "9507751550", 
  format = "auto", 
  className = "", 
  responsive = true,
  printHidden = true,
  width = "100%",
  height = "280px",
  fallbackBgColor = "#f9f9f9",
  fallbackText = "مساحة إعلانية",
  showFallback = true
}: AdBannerProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [adAttempted, setAdAttempted] = useState(false);
  const [adClient] = useState("ca-pub-6062398972709628");
  const [adError, setAdError] = useState(false);
  const [adBlockerDetected, setAdBlockerDetected] = useState(false);

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
        // Remove any existing AdSense scripts first to avoid conflicts
        const existingScripts = document.querySelectorAll(
          `script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]`
        );
        
        existingScripts.forEach(script => {
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
        });
        
        // Create and add a new script
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
          setAdError(true);
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
      insElement.style.minWidth = '300px';
      insElement.style.width = width;
      insElement.style.backgroundColor = '#f0f0f0';
      insElement.style.transition = 'background-color 0.3s';
      insElement.setAttribute('data-ad-client', adClient);
      insElement.setAttribute('data-ad-slot', slot);
      insElement.setAttribute('data-ad-format', format);
      insElement.setAttribute('data-full-width-responsive', responsive ? 'true' : 'false');
      
      // Clear container before appending
      if (adContainerRef.current) {
        adContainerRef.current.innerHTML = '';
      }
      
      // Append to container
      adContainerRef.current.appendChild(insElement);
      return insElement;
    };

    const checkAdBlocker = () => {
      return new Promise<boolean>((resolve) => {
        const test = document.createElement('div');
        test.innerHTML = '&nbsp;';
        test.className = 'adsbox';
        test.style.position = 'absolute';
        test.style.fontSize = '0px';
        test.style.opacity = '0';
        document.body.appendChild(test);
        
        setTimeout(() => {
          const isBlocked = test.offsetHeight === 0;
          if (test.parentNode) {
            test.parentNode.removeChild(test);
          }
          
          if (isBlocked) {
            setAdBlockerDetected(true);
          }
          
          resolve(isBlocked);
        }, 100);
      });
    };

    const initializeAd = async () => {
      if (!adContainerRef.current) return;
      
      // Check for ad blockers
      const adBlocked = await checkAdBlocker();
      if (adBlocked) {
        console.warn("Ad blocker detected");
        setAdError(true);
        return;
      }
      
      // Make sure container has dimensions
      if (adContainerRef.current.clientWidth === 0) {
        console.log("Setting minimum width for ad container");
        adContainerRef.current.style.minWidth = "300px";
      }

      // Create the ad element
      createAdElement();

      const pushAd = () => {
        try {
          // Check if adsbygoogle is available
          if (window.adsbygoogle) {
            console.log("Pushing ad to adsbygoogle");
            
            // Force array initialization
            window.adsbygoogle = window.adsbygoogle || [];
            
            // Push the ad
            window.adsbygoogle.push({});
            
            // Mark as loaded
            setIsAdLoaded(true);
            
            return true;
          }
          return false;
        } catch (error) {
          console.error("Error pushing ad:", error);
          setAdError(true);
          return false;
        }
      };

      // Try immediately
      if (!pushAd()) {
        console.log("Initial push failed, retrying...");
        
        // Retry a few times with increasing delays
        let attempts = 0;
        const maxAttempts = 3;
        const retryInterval = setInterval(() => {
          attempts++;
          if (attempts > maxAttempts) {
            clearInterval(retryInterval);
            setAdError(true);
            console.error("Max retry attempts reached for adsbygoogle push");
            return;
          }
          
          console.log(`Retry attempt ${attempts}/${maxAttempts}`);
          if (pushAd()) {
            clearInterval(retryInterval);
          }
        }, 1000);
      }
    };

    const loadAd = async () => {
      try {
        await loadAdSenseScript();
        // Use a longer timeout to ensure AdSense is fully initialized
        setTimeout(initializeAd, 1000);
      } catch (error) {
        console.error("Error in ad loading process:", error);
        setAdError(true);
      }
    };

    loadAd();

    return () => {
      // Cleanup function
    };
  }, [adAttempted, adClient, format, height, responsive, slot, width]);

  // Enhanced fallback display
  const renderFallback = () => {
    if (!showFallback) return null;
    
    return (
      <div 
        className="flex flex-col items-center justify-center w-full h-full p-4 rounded-md"
        style={{ backgroundColor: fallbackBgColor }}
      >
        <div className="text-gray-500 mb-2 text-sm font-medium flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-2"
          >
            <rect width="18" height="12" x="3" y="6" rx="2" />
            <path d="M3 10h18" />
          </svg>
          {fallbackText}
        </div>
        
        {adBlockerDetected && (
          <div className="text-amber-500 text-xs text-center max-w-[250px]">
            تم اكتشاف مانع إعلانات. يرجى تعطيله لدعم المحتوى المجاني.
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      ref={adContainerRef} 
      className={`ad-container ${printHidden ? 'print:hidden' : ''} ${className}`}
      style={{ 
        minHeight: height, 
        width: width,
        minWidth: "300px",
        overflow: 'hidden',
        display: 'block',
        margin: '10px auto',
        position: 'relative',
        border: adError ? '1px dashed #f0f0f0' : 'none',
        borderRadius: '8px',
      }}
      aria-label="إعلان"
      data-ad-status={isAdLoaded ? "loaded" : "loading"}
    >
      {(adError || adBlockerDetected) && renderFallback()}
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
