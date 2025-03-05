
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import AdBanner from "@/components/AdBanner";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="flex items-center justify-center py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-gray-900">تطبيق إعداد خطط الدروس</h1>
          <p className="mt-2 text-gray-600">
            أداة فعالة للمعلمين لإعداد خطط الدروس بشكل سريع واحترافي
          </p>
        </motion.div>
      </header>
      
      <AdBanner className="mx-auto max-w-5xl" />
      
      <main className="flex-1 px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-center space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  إنشاء خطط دروس احترافية بسهولة
                </h2>
                <p className="text-gray-600">
                  يساعدك تطبيقنا على إنشاء خطط دروس متكاملة ببضع نقرات فقط. أدخل المعلومات الأساسية ودع التطبيق يقوم بالباقي.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-lg font-medium">١</span>
                  </div>
                  <p className="text-gray-700">أدخل بيانات الدرس الأساسية</p>
                </div>
                
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-lg font-medium">٢</span>
                  </div>
                  <p className="text-gray-700">راجع وعدل الخطة المقترحة</p>
                </div>
                
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="text-lg font-medium">٣</span>
                  </div>
                  <p className="text-gray-700">احفظ واطبع بتنسيق PDF احترافي</p>
                </div>
              </div>
              
              <Button
                onClick={() => navigate("/form")}
                className="mt-6 rounded-lg bg-primary px-6 py-3 text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:-translate-y-1"
                size="lg"
              >
                ابدأ الآن
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <div className="overflow-hidden rounded-xl border bg-white p-6 shadow-lg">
                <div className="relative rounded-lg bg-gray-50 p-4">
                  <div className="text-center">
                    <h3 className="mb-4 text-lg font-semibold">خطة درس نموذجية</h3>
                    <div className="mb-3 space-y-2 text-right text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">المادة:</span>
                        <span>الرياضيات</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">الصف:</span>
                        <span>السادس الابتدائي</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">عنوان الدرس:</span>
                        <span>الكسور العشرية</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 rounded-md bg-white p-3 text-right text-sm shadow-sm">
                      <h4 className="mb-2 font-medium">أهداف الدرس:</h4>
                      <ul className="mr-5 list-disc space-y-1 text-xs text-gray-700">
                        <li>فهم مفهوم الكسور العشرية وتمثيلها</li>
                        <li>تحويل الكسور العادية إلى كسور عشرية</li>
                        <li>إجراء عمليات الجمع والطرح على الكسور العشرية</li>
                      </ul>
                    </div>
                    
                    <div className="mt-3 text-center text-xs text-gray-500">
                      انقر على "ابدأ الآن" لإنشاء خطة درس مشابهة
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 -right-4 -top-4 -z-10 rounded-xl bg-gradient-to-tr from-primary/30 via-primary/20 to-primary/5 blur-xl" />
            </motion.div>
          </div>
        </div>
      </main>
      
      <AdBanner className="mx-auto max-w-5xl" />
      
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>تطبيق إعداد خطط الدروس © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
