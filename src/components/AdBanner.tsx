
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

  useEffect(() => {
    // Direct ad insertion approach
    const loadAd = () => {
      if (!adContainerRef.current) return;
      
      // Clear any existing content
      adContainerRef.current.innerHTML = '';
      
      try {
        // Create the ins element
        const insElement = document.createElement('ins');
        insElement.className = 'adsbygoogle';
        insElement.style.display = 'block';
        insElement.style.width = width;
        insElement.style.height = height;
        insElement.setAttribute('data-ad-client', adClient);
        insElement.setAttribute('data-ad-slot', slot);
        insElement.setAttribute('data-ad-format', format);
        
        if (responsive) {
          insElement.setAttribute('data-full-width-responsive', 'true');
        }
        
        // Add to DOM
        adContainerRef.current.appendChild(insElement);
        
        // Force push the ad
        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          console.log("Ad push attempted");
          setIsAdLoaded(true);
        } else {
          // If adsbygoogle isn't available yet, wait for it
          const waitForAdsense = setInterval(() => {
            if (window.adsbygoogle) {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
              console.log("Ad push attempted after waiting");
              setIsAdLoaded(true);
              clearInterval(waitForAdsense);
            }
          }, 300);
          
          // Clear interval after 5 seconds if not loaded
          setTimeout(() => clearInterval(waitForAdsense), 5000);
        }
      } catch (error) {
        console.log("Ad loading error:", error);
      }
    };

    // Initial delay before loading ad
    const timer = setTimeout(() => {
      loadAd();
      
      // Retry after 2 seconds if not loaded
      setTimeout(() => {
        if (!isAdLoaded && adContainerRef.current) {
          console.log("Retrying ad load");
          loadAd();
        }
      }, 2000);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [adClient, format, height, isAdLoaded, responsive, slot, width]);

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
