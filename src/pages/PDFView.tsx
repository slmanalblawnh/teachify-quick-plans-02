import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Printer, ZoomIn, ZoomOut } from "lucide-react";
import { LessonPlanData } from "@/services/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Slider } from "@/components/ui/slider";
import AdBanner from "@/components/AdBanner";

const PDFView = () => {
  const navigate = useNavigate();
  const [lessonPlan, setLessonPlan] = useState<LessonPlanData | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [fontSize, setFontSize] = useState(5); // Default font size
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lessonPlanStr = localStorage.getItem("generatedLessonPlan");
    
    if (!lessonPlanStr) {
      toast.error("لم يتم العثور على بيانات خطة الدرس. يرجى العودة وإنشاء خطة جديدة.");
      navigate("/form");
      return;
    }
    
    setLessonPlan(JSON.parse(lessonPlanStr));
  }, [navigate]);

  const handleGeneratePDF = async () => {
    if (!pdfRef.current) return;
    
    setIsGeneratingPDF(true);
    
    try {
      pdfRef.current.classList.add("generating-pdf");
      
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        windowWidth: 1200,
        windowHeight: 1600,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById(pdfRef.current?.id || '');
          if (clonedElement) {
            clonedElement.style.width = "1100px";
            clonedElement.style.padding = "20px";
            clonedElement.style.margin = "0";
          }
        }
      });
      
      pdfRef.current.classList.remove("generating-pdf");
      
      const imgData = canvas.toDataURL("image/png");
      
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      if (imgHeight > pdfHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, '', 'FAST');
        const pageCount = Math.ceil(imgHeight / pdfHeight);
        for (let i = 1; i < pageCount; i++) {
          pdf.addPage();
          pdf.addImage(
            imgData, 
            "PNG", 
            0, 
            -pdfHeight * i, 
            imgWidth, 
            imgHeight, 
            '', 
            'FAST'
          );
        }
      } else {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, '', 'FAST');
      }
      
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text("خطة درس - تم إنشاؤها بواسطة تطبيق إعداد خطط الدروس", 10, pdfHeight - 5);
      
      pdf.save(`خطة درس - ${lessonPlan?.lessonTitle || "جديد"}.pdf`);
      
      toast.success("تم إنشاء ملف PDF بنجاح");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("حدث خطأ أثناء إنشاء ملف PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  if (!lessonPlan) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">جاري تحميل البيانات...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="mx-auto w-full max-w-[1024px] px-4 py-6">
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Button
            variant="ghost"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => navigate("/preview")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            العودة للمعاينة
          </Button>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <Button
              variant="outline"
              className="gap-2"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4" />
              طباعة
            </Button>
            
            <Button
              className="gap-2"
              onClick={handleGeneratePDF}
              disabled={isGeneratingPDF}
            >
              <Download className="h-4 w-4" />
              {isGeneratingPDF ? "جاري الإنشاء..." : "تحميل PDF"}
            </Button>
          </div>
        </div>
        
        <AdBanner className="mb-4 print:hidden" />
        
        <div className="flex items-center justify-between mb-4 print:hidden">
          <div className="flex items-center gap-2">
            <ZoomOut className="h-4 w-4 text-gray-500" />
            <div className="w-40">
              <Slider
                defaultValue={[fontSize]}
                max={10}
                min={3}
                step={0.5}
                onValueChange={handleFontSizeChange}
              />
            </div>
            <ZoomIn className="h-4 w-4 text-gray-500" />
          </div>
          <div className="text-sm text-gray-500">
            حجم الخط: {fontSize}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden shadow-lg border border-gray-200 print:shadow-none print:border-none">
            <CardContent className="p-0">
              <div
                ref={pdfRef}
                id="pdf-content"
                className="pdf-container bg-white p-4"
                style={{ 
                  width: "100%", 
                  minHeight: "842px",
                  fontSize: `${fontSize}px`
                }}
              >
                <div className="text-center mb-3">
                  <h2 className="text-xl font-bold">خطة درس</h2>
                </div>
                
                <div className="grid grid-cols-3 gap-x-4 mb-2">
                  <div className="text-right">
                    <span className="font-semibold">الصف: </span>
                    <span>{lessonPlan.grade}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">عنوان الدرس: </span>
                    <span>{lessonPlan.lessonTitle}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">عدد الحصص: </span>
                    <span>واحدة</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 mb-3">
                  <div className="text-right">
                    <span className="font-semibold">التاريخ: </span>
                    <span>{lessonPlan.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">التعلم القبلي: </span>
                    <span>{lessonPlan.priorLearning}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 mb-3">
                  <div className="text-right">
                    <span className="font-semibold">التكامل الأفقي: </span>
                    <span>{lessonPlan.horizontalIntegration}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">التكامل الرأسي: </span>
                    <span>{lessonPlan.verticalIntegration}</span>
                  </div>
                </div>
                
                <table className="pdf-table">
                  <thead>
                    <tr>
                      <th rowSpan={2} className="w-10">الرقم</th>
                      <th rowSpan={2} className="w-64">
                        النتاجات الخاصـــــــة<br />
                        يتوقع من الطالبة أن:
                      </th>
                      <th rowSpan={2} className="w-48">
                        المواد والأدوات<br />
                        والتجهيزات<br />
                        (مصادر التعلم)
                      </th>
                      <th rowSpan={2} className="w-48">
                        استراتيجيات<br />
                        التدريس
                      </th>
                      <th colSpan={2} className="w-48">
                        التقويــــــم
                      </th>
                      <th colSpan={2} className="w-72">
                        التنفيــــــــــذ *
                      </th>
                    </tr>
                    <tr>
                      <th className="w-24">الاستراتيجية</th>
                      <th className="w-24">الأداة</th>
                      <th className="w-60">الإجراءات</th>
                      <th className="w-12">الزمن</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="align-top">1</td>
                      <td className="align-top text-right">
                        <ul className="list-disc mr-4 space-y-1">
                          {lessonPlan.objectives.map((objective, index) => (
                            <li key={index}>{objective}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="align-top text-right">
                        <ul className="list-disc mr-4 space-y-1">
                          {lessonPlan.materialsAndResources.map((resource, index) => (
                            <li key={index}>{resource}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="align-top text-right">
                        <ul className="list-disc mr-4 space-y-1">
                          {lessonPlan.teachingStrategies.map((strategy, index) => (
                            <li key={index}>{strategy}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="align-top text-right">
                        <ul className="list-disc mr-4 space-y-1">
                          {lessonPlan.assessmentStrategies.map((strategy, index) => (
                            <li key={index}>{strategy}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="align-top text-right">
                        <ul className="list-disc mr-4 space-y-1">
                          {lessonPlan.assessmentTools.map((tool, index) => (
                            <li key={index}>{tool}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="align-top text-right">
                        <ul className="list-none space-y-2">
                          {lessonPlan.procedures.map((procedure, index) => (
                            <li key={index}>{procedure.activity}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="align-top text-center">
                        <ul className="list-none space-y-2">
                          {lessonPlan.procedures.map((procedure, index) => (
                            <li key={index}>{procedure.time}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <div className="mt-3 text-right">
                  <div className="font-semibold mb-1">التأمل الذاتي (الشعور بالرضا عن):</div>
                  <div className="border p-2 min-h-[40px]">{lessonPlan.selfReflection}</div>
                </div>
                
                <div className="mt-2 text-right">
                  <div className="font-semibold mb-1">تحديات واجهتني:</div>
                  <div className="border p-2 min-h-[40px]">{lessonPlan.challengesFaced}</div>
                </div>
                
                <div className="mt-2 text-right">
                  <div className="font-semibold mb-1">اقتراحات للتحسين:</div>
                  <div className="border p-2 min-h-[40px]">{lessonPlan.improvementSuggestions}</div>
                </div>
                
                <div className="mt-3">
                  <div className="font-semibold mb-1 text-right">(جدول المتابعة اليومي)</div>
                  <table className="pdf-table">
                    <thead>
                      <tr>
                        <th className="w-24">اليوم والتاريخ</th>
                        <th className="w-16">الشعبة</th>
                        <th className="w-16">الحصة</th>
                        <th className="w-64">النتاجات المتحققة</th>
                        <th className="w-64">الواجب البيتي</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index}>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-3 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p>إعداد المعلم: {lessonPlan.teacherName}</p>
                  </div>
                  <div className="text-center">
                    <p className="mb-8">توقيع منسق المبحث:</p>
                  </div>
                  <div className="text-center">
                    <p className="mb-8">توقيع مدير المدرسة:</p>
                  </div>
                </div>
                
                <div className="mt-1 text-center">
                  <p>توقيع المشرف التربوي:</p>
                </div>
                
                <div className="mt-3 text-left text-[8px] text-gray-500">
                  <p>FROM # QF71-147REV.A</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <AdBanner className="mt-4 print:hidden" />
          
          <div className="mt-6 text-center print:hidden">
            <p className="text-sm text-gray-500 mb-4">
              يمكنك تحميل ملف PDF أو طباعة الخطة مباشرة
            </p>
            
            <div className="flex justify-center space-x-4 space-x-reverse">
              <Button
                variant="outline"
                className="gap-2 w-40"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4" />
                طباعة
              </Button>
              
              <Button
                className="gap-2 w-40"
                onClick={handleGeneratePDF}
                disabled={isGeneratingPDF}
              >
                <Download className="h-4 w-4" />
                {isGeneratingPDF ? "جاري الإنشاء..." : "تحميل PDF"}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PDFView;
