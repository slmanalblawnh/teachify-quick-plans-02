
import { useEffect } from 'react';

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

  useEffect(() => {
    try {
      // طريقة إنشاء الإعلان عندما يكون المكون جاهزاً
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
      
      console.log("تم تحميل الإعلان");
    } catch (error) {
      console.error("خطأ في تحميل الإعلان:", error);
    }
  }, []);

  return (
    <div className={`ad-container my-4 ${printHidden ? 'print:hidden' : ''} ${className}`}>
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
