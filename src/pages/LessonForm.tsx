import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import FormDatePicker from "@/components/FormDatePicker";
import GenerateButton from "@/components/GenerateButton";
import AdBanner from "@/components/AdBanner";
import { LessonPlanInput, subjects, grades } from "@/services/api";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const LessonForm = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<LessonPlanInput>({
    subject: "",
    grade: "",
    lessonTitle: "",
    date: new Date().toLocaleDateString("ar-EG"),
    teacherName: "",
  });
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedDate) {
      setFormState((prev) => ({
        ...prev,
        date: selectedDate.toLocaleDateString("ar-EG"),
      }));
    }
  }, [selectedDate]);

  const handleInputChange = (field: keyof LessonPlanInput, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.subject) newErrors.subject = "يرجى اختيار المادة الدراسية";
    if (!formState.grade) newErrors.grade = "يرجى اختيار الصف الدراسي";
    if (!formState.lessonTitle) newErrors.lessonTitle = "يرجى إدخال عنوان الدرس";
    if (!formState.date) newErrors.date = "يرجى اختيار التاريخ";
    if (!formState.teacherName) newErrors.teacherName = "يرجى إدخال اسم المعلم";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("يرجى إكمال جميع الحقول المطلوبة");
      return;
    }
    
    setIsLoading(true);
    
    try {
      localStorage.setItem("lessonFormData", JSON.stringify(formState));
      
      setTimeout(() => {
        navigate("/preview");
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error generating lesson plan:", error);
      toast.error("حدث خطأ أثناء معالجة البيانات");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 text-gray-500 hover:text-gray-700"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          العودة
        </Button>
        
        <AdBanner 
          className="mb-6" 
          fallbackBgColor="#f5f5f5" 
          fallbackText="مساحة إعلانية" 
          showFallback={true}
          height="100px"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden shadow-lg border-none bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 pb-8 pt-10">
              <CardTitle className="text-center text-2xl font-bold text-gray-800">
                إدخال بيانات خطة الدرس
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-10 pt-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormSelect
                    label="المادة الدراسية"
                    id="subject"
                    value={formState.subject}
                    onChange={(value) => handleInputChange("subject", value)}
                    options={subjects}
                    required
                    error={errors.subject}
                  />
                  
                  <FormSelect
                    label="الصف الدراسي"
                    id="grade"
                    value={formState.grade}
                    onChange={(value) => handleInputChange("grade", value)}
                    options={grades}
                    required
                    error={errors.grade}
                  />
                  
                  <FormInput
                    label="عنوان الدرس"
                    id="lessonTitle"
                    value={formState.lessonTitle}
                    onChange={(value) => handleInputChange("lessonTitle", value)}
                    placeholder="أدخل عنوان الدرس"
                    required
                    error={errors.lessonTitle}
                  />
                  
                  <FormDatePicker
                    label="التاريخ"
                    id="date"
                    value={selectedDate}
                    onChange={setSelectedDate}
                    required
                    error={errors.date}
                  />
                  
                  <FormInput
                    label="اسم المعلم"
                    id="teacherName"
                    value={formState.teacherName}
                    onChange={(value) => handleInputChange("teacherName", value)}
                    placeholder="أدخل اسم المعلم"
                    required
                    error={errors.teacherName}
                    className="md:col-span-2"
                  />
                </div>
                
                <div className="mt-8 flex justify-center">
                  <GenerateButton
                    type="submit"
                    label="إنشاء خطة الدرس"
                    loadingLabel="جاري إنشاء خطة الدرس..."
                    isLoading={isLoading}
                    icon={<Sparkles className="h-5 w-5" />}
                    className="w-full max-w-md rounded-xl text-base font-medium"
                    size="lg"
                  />
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
        
        <AdBanner 
          className="mt-6" 
          fallbackBgColor="#f5f5f5" 
          fallbackText="مساحة إعلانية" 
          showFallback={true}
          height="100px"
        />
      </div>
    </div>
  );
};

export default LessonForm;
