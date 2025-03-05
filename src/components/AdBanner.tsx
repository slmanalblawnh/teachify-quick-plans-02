
import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  responsive?: boolean;
  printHidden?: boolean;
}

const AdBanner = ({ 
  slot = "5962076197", 
  format = "auto", 
  className = "", 
  responsive = true,
  printHidden = true
}: AdBannerProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // التأكد من وجود window.adsbygoogle
    if (typeof window !== 'undefined') {
      try {
        // إنشاء نص برمجي جديد
        const adScript = document.createElement('script');
        adScript.async = true;
        adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6062398972709628";
        adScript.crossOrigin = "anonymous";
        
        // التحقق من عدم وجود النص البرمجي بالفعل
        const existingScript = document.querySelector(
          'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6062398972709628"]'
        );
        
        if (!existingScript) {
          document.head.appendChild(adScript);
        }
        
        // إنشاء الإعلان عندما يكون المكون جاهزاً
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
        
        console.log("تم محاولة تحميل الإعلان");
      } catch (error) {
        console.error("خطأ في تحميل الإعلان:", error);
      }
    }
    
    return () => {
      // تنظيف عند إزالة المكون (اختياري)
    };
  }, []);

  return (
    <div ref={adContainerRef} className={`ad-container my-4 ${printHidden ? 'print:hidden' : ''} ${className}`}>
      <ins
        className={`adsbygoogle ${responsive ? 'w-full' : ''}`}
        style={{ display: 'block', minHeight: '100px' }}
        data-ad-client="ca-pub-6062398972709628"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};

export default AdBanner;
