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
  showFallback = true
}: AdBannerProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-3940256099942544"; // استخدم المتغير البيئي هنا
  const [adLoaded, setAdLoaded] = useState(false);
  const [adAttempted, setAdAttempted] = useState(false);
  
  useEffect(() => {
    const loadAd = () => {
      if (!adContainerRef.current) return;
      
      try {
        // تنظيف المحتوى الموجود
        adContainerRef.current.innerHTML = '';
        
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
        
        // تسجيل أنه تم محاولة تحميل الإعلان
        setAdAttempted(true);
        
        // دفع الإعلان للعرض
        try {
          // إزالة أي محاولات سابقة للإعلان مع هذا العنصر
          const currentAds = window.adsbygoogle || [];
          window.adsbygoogle = currentAds;
          
          // إضافة محاولة جديدة
          window.adsbygoogle.push({});
          console.log("تم تنفيذ دفع الإعلان بنجاح", { adClient, slot });
          
          // التحقق من تحميل الإعلان بعد فترة زمنية
          setTimeout(() => {
            if (adContainerRef.current) {
              const adHeight = adContainerRef.current.clientHeight;
              const adElementsCount = adContainerRef.current.querySelectorAll('iframe').length;
              
              if (adHeight > 10 && adElementsCount > 0) {
                console.log("تم تحميل الإعلان بنجاح", { height: adHeight, elements: adElementsCount });
                setAdLoaded(true);
              } else {
                console.log("فشل تحميل الإعلان", { height: adHeight, elements: adElementsCount });
                setAdLoaded(false);
              }
            }
          }, 2000);
        } catch (adError) {
          console.error("خطأ في دفع الإعلان:", adError);
          setAdLoaded(false);
        }
      } catch (error) {
        console.error("خطأ في إعداد الإعلان:", error);
        setAdLoaded(false);
      }
    };

    // تأخير تحميل الإعلان لضمان تحميل صفحة الموقع أولاً
    const timer = setTimeout(() => {
      loadAd();
      
      // إعادة المحاولة بعد فترة إذا لم يتم تحميل الإعلان
      const retryTimer = setTimeout(() => {
        if (!adLoaded && adContainerRef.current) {
          console.log("إعادة محاولة تحميل الإعلان...");
          loadAd();
        }
      }, 3000);
      
      return () => {
        clearTimeout(retryTimer);
      };
    }, 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [adClient, format, height, responsive, slot, width, adLoaded]);

  // تنسيق العرض الاحتياطي
  const fallbackStyle = (showFallback || adAttempted && !adLoaded) ? {
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
      id={`ad-container-${slot}`}
    >
      {(showFallback || adAttempted && !adLoaded) && (
        <div style={{ textAlign: 'center', width: '100%' }}>
          {fallbackText}
          <div style={{ fontSize: '12px', marginTop: '4px' }}>
            (إعلان تجريبي: {adClient})
          </div>
        </div>
      )}
    </div>
  );
};

// إضافة تعريف TypeScript لـ adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default AdBanner;
