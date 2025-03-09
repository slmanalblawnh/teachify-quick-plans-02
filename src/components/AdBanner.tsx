
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
  slot = "1234567890", 
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
  // استخدام معرف العميل التجريبي من Google
  const adClient = "ca-pub-3940256099942544";
  const [adLoaded, setAdLoaded] = useState(false);
  
  useEffect(() => {
    const loadAd = () => {
      if (!adContainerRef.current) return;
      
      // تنظيف المحتوى الموجود
      adContainerRef.current.innerHTML = '';
      
      try {
        // إنشاء عنصر الإعلان
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
        
        // إضافة إلى DOM
        adContainerRef.current.appendChild(insElement);
        
        // دفع الإعلان للعرض
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          console.log("تم تنفيذ دفع الإعلان");
          setAdLoaded(true);
        } catch (adError) {
          console.error("خطأ في دفع الإعلان:", adError);
          setAdLoaded(false);
        }
      } catch (error) {
        console.error("خطأ في إعداد الإعلان:", error);
        setAdLoaded(false);
      }
    };

    // تحميل أولي بتأخير طفيف
    const timer = setTimeout(loadAd, 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [adClient, format, height, responsive, slot, width]);

  // إضافة نمط محتوى بديل إذا تم تمكين showFallback
  const fallbackStyle = showFallback || !adLoaded ? {
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
      {(showFallback || !adLoaded) && fallbackText}
    </div>
  );
};

// إضافة إعلان نوع TypeScript لـ adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default AdBanner;
