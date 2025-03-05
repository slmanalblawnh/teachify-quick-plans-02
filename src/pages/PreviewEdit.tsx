import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Download, FileText, Save } from "lucide-react";
import { generateLessonPlan, LessonPlanData, LessonPlanInput } from "@/services/api";
import { Separator } from "@/components/ui/separator";
import AdBanner from "@/components/AdBanner";

const PreviewEdit = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(true);
  const [lessonPlan, setLessonPlan] = useState<LessonPlanData | null>(null);
  const [activeTab, setActiveTab] = useState("preview");

  useEffect(() => {
    const fetchLessonPlan = async () => {
      setIsLoading(true);
      setIsGenerating(true);
      
      try {
        const formDataStr = localStorage.getItem("lessonFormData");
        
        if (!formDataStr) {
          toast.error("لم يتم العثور على بيانات الدرس. يرجى العودة وملء النموذج.");
          navigate("/form");
          return;
        }
        
        const formData = JSON.parse(formDataStr) as LessonPlanInput;
        
        const generatedPlan = await generateLessonPlan(formData);
        
        setLessonPlan(generatedPlan);
        setIsGenerating(false);
        
        localStorage.setItem("generatedLessonPlan", JSON.stringify(generatedPlan));
        
      } catch (error) {
        console.error("Error fetching lesson plan:", error);
        toast.error("حدث خطأ أثناء استرداد خطة الدرس");
        setIsGenerating(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLessonPlan();
  }, [navigate]);
  
  const handleChange = (field: keyof LessonPlanData, value: any) => {
    if (!lessonPlan) return;
    
    setLessonPlan((prev) => {
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
  };
  
  const handleArrayChange = (field: keyof LessonPlanData, index: number, value: string) => {
    if (!lessonPlan) return;
    
    setLessonPlan((prev) => {
      if (!prev) return null;
      
      const updatedArray = [...(prev[field] as any[])];
      updatedArray[index] = value;
      
      return { ...prev, [field]: updatedArray };
    });
  };
  
  const handleObjectArrayChange = (
    field: keyof LessonPlanData,
    index: number,
    key: string,
    value: string
  ) => {
    if (!lessonPlan) return;
    
    setLessonPlan((prev) => {
      if (!prev) return null;
      
      const updatedArray = [...(prev[field] as any[])];
      updatedArray[index] = { ...updatedArray[index], [key]: value };
      
      return { ...prev, [field]: updatedArray };
    });
  };
  
  const handleSaveAndContinue = () => {
    if (!lessonPlan) return;
    
    localStorage.setItem("generatedLessonPlan", JSON.stringify(lessonPlan));
    
    navigate("/pdf");
  };
  
  const renderEditForm = () => {
    if (!lessonPlan) return null;
    
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Label>المادة الدراسية</Label>
            <Input 
              value={lessonPlan.subject} 
              onChange={(e) => handleChange("subject", e.target.value)} 
            />
          </div>
          
          <div className="space-y-4">
            <Label>الصف الدراسي</Label>
            <Input 
              value={lessonPlan.grade} 
              onChange={(e) => handleChange("grade", e.target.value)} 
            />
          </div>
          
          <div className="space-y-4">
            <Label>عنوان الدرس</Label>
            <Input 
              value={lessonPlan.lessonTitle} 
              onChange={(e) => handleChange("lessonTitle", e.target.value)} 
            />
          </div>
          
          <div className="space-y-4">
            <Label>التاريخ</Label>
            <Input 
              value={lessonPlan.date} 
              onChange={(e) => handleChange("date", e.target.value)} 
            />
          </div>
          
          <div className="space-y-4 md:col-span-2">
            <Label>اسم المعلم</Label>
            <Input 
              value={lessonPlan.teacherName} 
              onChange={(e) => handleChange("teacherName", e.target.value)} 
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <Label>النتاجات الخاصة (أهداف الدرس)</Label>
          {lessonPlan.objectives.map((objective, index) => (
            <Textarea
              key={`objective-${index}`}
              value={objective}
              onChange={(e) => handleArrayChange("objectives", index, e.target.value)}
              className="min-h-[80px] resize-none"
            />
          ))}
        </div>
        
        <div className="space-y-4">
          <Label>استراتيجيات التدريس</Label>
          {lessonPlan.teachingStrategies.map((strategy, index) => (
            <Input
              key={`strategy-${index}`}
              value={strategy}
              onChange={(e) => handleArrayChange("teachingStrategies", index, e.target.value)}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Label>استراتيجيات التقويم</Label>
            {lessonPlan.assessmentStrategies.map((strategy, index) => (
              <Input
                key={`assessment-strategy-${index}`}
                value={strategy}
                onChange={(e) => handleArrayChange("assessmentStrategies", index, e.target.value)}
              />
            ))}
          </div>
          
          <div className="space-y-4">
            <Label>أدوات التقويم</Label>
            {lessonPlan.assessmentTools.map((tool, index) => (
              <Input
                key={`assessment-tool-${index}`}
                value={tool}
                onChange={(e) => handleArrayChange("assessmentTools", index, e.target.value)}
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <Label>المواد والأدوات والتجهيزات (مصادر التعلم)</Label>
          {lessonPlan.materialsAndResources.map((resource, index) => (
            <Input
              key={`resource-${index}`}
              value={resource}
              onChange={(e) => handleArrayChange("materialsAndResources", index, e.target.value)}
            />
          ))}
        </div>
        
        <div className="space-y-4">
          <Label>الإجراءات</Label>
          {lessonPlan.procedures.map((procedure, index) => (
            <div key={`procedure-${index}`} className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="space-y-2 md:col-span-3">
                <Label className="text-xs">النشاط</Label>
                <Textarea
                  value={procedure.activity}
                  onChange={(e) => handleObjectArrayChange("procedures", index, "activity", e.target.value)}
                  className="resize-none"
                />
              </div>
              <div className="space-y-2 md:col-span-1">
                <Label className="text-xs">الوقت</Label>
                <Input
                  value={procedure.time}
                  onChange={(e) => handleObjectArrayChange("procedures", index, "time", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-4">
            <Label>التعلم القبلي</Label>
            <Textarea
              value={lessonPlan.priorLearning}
              onChange={(e) => handleChange("priorLearning", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
          
          <div className="space-y-4">
            <Label>التكامل الأفقي</Label>
            <Textarea
              value={lessonPlan.horizontalIntegration}
              onChange={(e) => handleChange("horizontalIntegration", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
          
          <div className="space-y-4">
            <Label>التكامل الرأسي</Label>
            <Textarea
              value={lessonPlan.verticalIntegration}
              onChange={(e) => handleChange("verticalIntegration", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-4">
            <Label>التأمل الذاتي (الشعور بالرضا عن)</Label>
            <Textarea
              value={lessonPlan.selfReflection}
              onChange={(e) => handleChange("selfReflection", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
          
          <div className="space-y-4">
            <Label>تحديات واجهتني</Label>
            <Textarea
              value={lessonPlan.challengesFaced}
              onChange={(e) => handleChange("challengesFaced", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
          
          <div className="space-y-4">
            <Label>اقتراحات للتحسين</Label>
            <Textarea
              value={lessonPlan.improvementSuggestions}
              onChange={(e) => handleChange("improvementSuggestions", e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
        </div>
      </div>
    );
  };
  
  const renderPreview = () => {
    if (!lessonPlan) return null;
    
    return (
      <div className="relative overflow-hidden rounded-lg border bg-white p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">خطة درس</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-right">
              <span className="font-semibold">الصف: </span>
              <span>{lessonPlan.grade}</span>
            </div>
            <div className="text-right">
              <span className="font-semibold">عنوان الدرس: </span>
              <span>{lessonPlan.lessonTitle}</span>
            </div>
            <div className="text-right">
              <span className="font-semibold">التاريخ: </span>
              <span>{lessonPlan.date}</span>
            </div>
            <div className="text-right">
              <span className="font-semibold">عدد الحصص: </span>
              <span>واحدة</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-right">
              <span className="font-semibold">التعلم القبلي: </span>
              <span>{lessonPlan.priorLearning}</span>
            </div>
            <div className="text-right">
              <span className="font-semibold">التكامل الأفقي: </span>
              <span>{lessonPlan.horizontalIntegration}</span>
            </div>
            <div className="text-right">
              <span className="font-semibold">التكامل الرأسي: </span>
              <span>{lessonPlan.verticalIntegration}</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 text-center">الرقم</th>
                <th className="border p-2 text-center">
                  النتاجات الخاصة<br />
                  يتوقع من الطالبة أن:
                </th>
                <th className="border p-2 text-center">
                  المواد والأدوات<br />
                  والتجهيزات<br />
                  (مصادر التعلم)
                </th>
                <th className="border p-2 text-center">
                  استراتيجيات<br />
                  التدريس
                </th>
                <th className="border p-2 text-center" colSpan={2}>
                  التقويم
                </th>
                <th className="border p-2 text-center" colSpan={2}>
                  التنفيــــــــــذ *
                </th>
              </tr>
              <tr>
                <th className="border p-2 text-center"></th>
                <th className="border p-2 text-center"></th>
                <th className="border p-2 text-center"></th>
                <th className="border p-2 text-center"></th>
                <th className="border p-2 text-center">الاستراتيجية</th>
                <th className="border p-2 text-center">الأداة</th>
                <th className="border p-2 text-center">الإجراءات</th>
                <th className="border p-2 text-center">الزمن</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 text-center">1</td>
                <td className="border p-2 text-right">
                  <ul className="list-disc mr-4 space-y-1 text-sm">
                    {lessonPlan.objectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </td>
                <td className="border p-2 text-right">
                  <ul className="list-disc mr-4 space-y-1 text-sm">
                    {lessonPlan.materialsAndResources.map((resource, index) => (
                      <li key={index}>{resource}</li>
                    ))}
                  </ul>
                </td>
                <td className="border p-2 text-right">
                  <ul className="list-disc mr-4 space-y-1 text-sm">
                    {lessonPlan.teachingStrategies.map((strategy, index) => (
                      <li key={index}>{strategy}</li>
                    ))}
                  </ul>
                </td>
                <td className="border p-2 text-right">
                  <ul className="list-disc mr-4 space-y-1 text-sm">
                    {lessonPlan.assessmentStrategies.map((strategy, index) => (
                      <li key={index}>{strategy}</li>
                    ))}
                  </ul>
                </td>
                <td className="border p-2 text-right">
                  <ul className="list-disc mr-4 space-y-1 text-sm">
                    {lessonPlan.assessmentTools.map((tool, index) => (
                      <li key={index}>{tool}</li>
                    ))}
                  </ul>
                </td>
                <td className="border p-2 text-right">
                  <ul className="list-none space-y-2 text-sm">
                    {lessonPlan.procedures.map((procedure, index) => (
                      <li key={index}>{procedure.activity}</li>
                    ))}
                  </ul>
                </td>
                <td className="border p-2 text-center">
                  <ul className="list-none space-y-2 text-sm">
                    {lessonPlan.procedures.map((procedure, index) => (
                      <li key={index}>{procedure.time}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-2">جدول المتابعة اليومي:</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-center">اليوم والتاريخ</th>
                  <th className="border p-2 text-center">الشعبة</th>
                  <th className="border p-2 text-center">الحصة</th>
                  <th className="border p-2 text-center">النتاجات المتحققة</th>
                  <th className="border p-2 text-center">الواجب البيتي</th>
                </tr>
              </thead>
              <tbody>
                {lessonPlan.dailyFollowUpTable.map((day, index) => (
                  <tr key={index}>
                    <td className="border p-2">{day.date || "-"}</td>
                    <td className="border p-2">{day.section || "-"}</td>
                    <td className="border p-2">{day.class || "-"}</td>
                    <td className="border p-2">{day.achievedOutcomes || "-"}</td>
                    <td className="border p-2">{day.homework || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="border p-4">
              <h3 className="font-semibold mb-2">التأمل الذاتي (الشعور بالرضا عن):</h3>
              <p className="text-sm">{lessonPlan.selfReflection}</p>
            </div>
            <div className="border p-4">
              <h3 className="font-semibold mb-2">تحديات واجهتني:</h3>
              <p className="text-sm">{lessonPlan.challengesFaced}</p>
            </div>
            <div className="border p-4">
              <h3 className="font-semibold mb-2">اقتراحات للتحسين:</h3>
              <p className="text-sm">{lessonPlan.improvementSuggestions}</p>
            </div>
          </div>
          
          <div className="mt-6 text-left">
            <p className="text-sm">إعداد المعلم: {lessonPlan.teacherName}</p>
            <div className="mt-2 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm">توقيع منسق المبحث:</p>
              </div>
              <div className="text-center">
                <p className="text-sm">توقيع مدير المدرسة:</p>
              </div>
              <div className="text-center">
                <p className="text-sm">توقيع المشرف التربوي:</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderLoadingState = () => {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-20">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-r-transparent" />
        <p className="text-lg font-medium">جاري إنشاء خطة الدرس...</p>
        <p className="text-center text-sm text-gray-500">
          نحن نعمل على إنشاء خطة درس متكاملة استنادًا إلى البيانات التي قدمتها. يرجى الانتظار...
        </p>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <AdBanner className="mx-auto max-w-5xl mb-6" />
      
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => navigate("/form")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            العودة للنموذج
          </Button>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setActiveTab(activeTab === "preview" ? "edit" : "preview")}
            >
              <FileText className="h-4 w-4" />
              {activeTab === "preview" ? "تعديل" : "معاينة"}
            </Button>
            
            <Button
              className="gap-2"
              onClick={handleSaveAndContinue}
              disabled={isLoading || isGenerating}
            >
              <Save className="h-4 w-4" />
              حفظ ومتابعة
            </Button>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg border-none bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 pb-6 pt-8">
              <CardTitle className="text-center text-2xl font-bold text-gray-800">
                {activeTab === "preview" ? "معاينة خطة الدرس" : "تعديل خطة الدرس"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {isLoading || isGenerating ? (
                renderLoadingState()
              ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="preview" className="flex-1">معاينة</TabsTrigger>
                    <TabsTrigger value="edit" className="flex-1">تعديل</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="preview" className="mt-0">
                    {renderPreview()}
                  </TabsContent>
                  
                  <TabsContent value="edit" className="mt-0">
                    {renderEditForm()}
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
          
          {!isLoading && !isGenerating && (
            <div className="mt-6 flex justify-center">
              <Button
                className="gap-2 w-full max-w-md rounded-xl"
                size="lg"
                onClick={handleSaveAndContinue}
              >
                <Download className="h-5 w-5" />
                حفظ وعرض PDF
              </Button>
            </div>
          )}
        </motion.div>
      </div>
      
      <AdBanner className="mx-auto max-w-5xl mt-6" />
    </div>
  );
};

export default PreviewEdit;
