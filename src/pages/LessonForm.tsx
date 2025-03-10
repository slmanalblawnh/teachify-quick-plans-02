import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { lessonSchema } from "../schemas/lessonSchema";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { createLessonPlan } from "../lib/api";
import { Loader2 } from "lucide-react";
import AdBanner from "../components/AdBanner";

type LessonSchemaType = z.infer<typeof lessonSchema>;

const LessonForm = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      topic: "",
      gradeLevel: "",
      learningObjectives: "",
      materials: "",
      procedure: "",
      assessment: "",
      duration: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: createLessonPlan,
    onSuccess: (data) => {
      console.log("Lesson plan created successfully", data);
      setIsGenerating(false);
      toast({
        title: "تم إنشاء خطة الدرس بنجاح",
      });
      navigate("/preview");
    },
    onError: (error) => {
      console.error("Failed to create lesson plan", error);
      setIsGenerating(false);
      toast({
        title: "فشل في إنشاء خطة الدرس",
        description: "يرجى التحقق من النموذج الخاص بك والمحاولة مرة أخرى.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: LessonSchemaType) => {
    console.log("Form values", values);
    setIsGenerating(true);
    mutate(values);
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* إضافة شريط إعلاني تجريبي أعلى الصفحة */}
      <AdBanner 
        slot="1234567890" 
        format="auto" 
        height="100px" 
        showFallback={true} 
        fallbackText="إعلان تجريبي Google AdSense"
      />
      
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-2xl font-semibold mb-4">
          إنشاء خطة درس جديدة
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان الدرس</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل عنوان الدرس" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gradeLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المرحلة الدراسية</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل المرحلة الدراسية" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="learningObjectives"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الأهداف التعليمية</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="أدخل الأهداف التعليمية"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="materials"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المواد والأدوات</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="أدخل المواد والأدوات اللازمة"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="procedure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>إجراءات التدريس</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="أدخل إجراءات التدريس بالتفصيل"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assessment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>طرق التقييم</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="أدخل طرق التقييم المستخدمة"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المدة الزمنية</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل المدة الزمنية للدرس" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || isGenerating}
            >
              {isLoading || isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري الإنشاء...
                </>
              ) : (
                "إنشاء خطة الدرس"
              )}
            </Button>
          </form>
        </Form>
      </div>
      
      {/* إضافة شريط إعلاني تجريبي آخر أسفل الصفحة */}
      <div className="mt-8">
        <AdBanner 
          slot="1234567890" 
          format="rectangle" 
          height="250px" 
          showFallback={true} 
          fallbackText="إعلان تجريبي Google AdSense (مستطيل)"
        />
      </div>
    </motion.div>
  );
};

export default LessonForm;
