
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
  showFallback = false
}: AdBannerProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
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
        
        // Push the ad
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          console.log("Ad push executed");
        } catch (adError) {
          console.error("Ad push error:", adError);
        }
      } catch (error) {
        console.error("Ad setup error:", error);
      }
    };

    // Initial load with a slight delay
    const timer = setTimeout(loadAd, 1000);
    
    // Retry after 3 seconds if needed
    const retryTimer = setTimeout(() => {
      console.log("Retrying ad load");
      loadAd();
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(retryTimer);
    };
  }, [adClient, format, height, responsive, slot, width]);

  // Add fallback content styling if showFallback is enabled
  const fallbackStyle = showFallback ? {
    backgroundColor: fallbackBgColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    fontStyle: 'italic',
    border: '1px dashed #ccc'
  } : {};

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
        ...fallbackStyle
      }}
      aria-label="إعلان"
    >
      {showFallback && fallbackText}
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
