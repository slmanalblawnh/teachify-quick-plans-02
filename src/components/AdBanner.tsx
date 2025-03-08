
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
  const [adClient] = useState("ca-pub-6062398972709628");
  const [showFallbackState, setShowFallbackState] = useState(false);
  const [attemptingToLoadAd, setAttemptingToLoadAd] = useState(false);

  useEffect(() => {
    // Prevent multiple initialization attempts
    if (attemptingToLoadAd) return;
    setAttemptingToLoadAd(true);
    
    const loadAd = async () => {
      try {
        // Ensure the AdSense script is loaded
        await ensureAdSenseScriptLoaded();
        
        // Create the ad element
        createAdElement();
        
        // Push the ad
        pushAd();
      } catch (error) {
        console.error("Error loading ad:", error);
        setShowFallbackState(true);
      }
    };
    
    // Start loading with a delay
    const timer = setTimeout(loadAd, 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [attemptingToLoadAd, adClient, format, height, responsive, slot, width]);

  // Create the ad element
  const createAdElement = () => {
    if (!adContainerRef.current) return;
    
    // Clear container before creating new ad
    adContainerRef.current.innerHTML = '';
    
    // Create the ins element for AdSense
    const insElement = document.createElement('ins');
    insElement.className = `adsbygoogle`;
    insElement.style.display = 'block';
    insElement.style.width = width;
    insElement.style.height = height;
    insElement.style.transition = 'opacity 0.3s ease';
    insElement.setAttribute('data-ad-client', adClient);
    insElement.setAttribute('data-ad-slot', slot);
    insElement.setAttribute('data-ad-format', format);
    
    if (responsive) {
      insElement.setAttribute('data-full-width-responsive', 'true');
    }
    
    // Append to container
    adContainerRef.current.appendChild(insElement);
    return insElement;
  };
  
  // Make sure AdSense script is loaded
  const ensureAdSenseScriptLoaded = () => {
    return new Promise<void>((resolve) => {
      // Check if AdSense is already loaded
      if (typeof window.adsbygoogle !== 'undefined') {
        console.log("AdSense already loaded");
        resolve();
        return;
      }
      
      // Load AdSense script
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      
      script.onload = () => {
        console.log("AdSense script loaded successfully");
        resolve();
      };
      
      script.onerror = () => {
        console.log("AdSense script failed to load, but continuing");
        resolve(); // Resolve anyway to try the ad
      };
      
      document.head.appendChild(script);
    });
  };
  
  // Push ad to AdSense
  const pushAd = () => {
    try {
      if (window.adsbygoogle) {
        console.log("Pushing ad to AdSense");
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        
        // Set a timeout to check if ad loaded successfully
        setTimeout(() => {
          const adElement = adContainerRef.current?.querySelector('ins.adsbygoogle');
          if (adElement && adElement.innerHTML.trim() !== '') {
            setIsAdLoaded(true);
            setShowFallbackState(false);
          } else {
            // If ad doesn't seem to have content, show fallback
            setShowFallbackState(true);
          }
        }, 2000);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error pushing ad:", error);
      setShowFallbackState(true);
      return false;
    }
  };

  // Render fallback content
  const renderFallback = () => {
    if (!showFallback) return null;
    
    return (
      <div 
        className="flex items-center justify-center w-full h-full p-4 rounded-md"
        style={{ backgroundColor: fallbackBgColor }}
      >
        <div className="text-gray-500 text-sm font-medium flex items-center justify-center">
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
        borderRadius: '8px',
      }}
      aria-label="إعلان"
      data-ad-status={isAdLoaded ? "loaded" : "loading"}
    >
      {showFallbackState && renderFallback()}
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
