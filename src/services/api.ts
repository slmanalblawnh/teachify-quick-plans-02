
import { toast } from "sonner";

// Define interface for the lesson plan input
export interface LessonPlanInput {
  subject: string;
  grade: string;
  lessonTitle: string;
  date: string;
  teacherName: string;
}

// Define interface for the lesson plan data
export interface LessonPlanData {
  subject: string;
  grade: string;
  lessonTitle: string;
  date: string;
  teacherName: string;
  objectives: string[];
  teachingStrategies: string[];
  assessmentStrategies: string[];
  assessmentTools: string[];
  materialsAndResources: string[];
  timeManagement: { activity: string; time: string }[];
  priorLearning: string;
  horizontalIntegration: string;
  verticalIntegration: string;
  procedures: { activity: string; time: string }[];
  selfReflection: string;
  challengesFaced: string;
  improvementSuggestions: string;
  dailyFollowUpTable: {
    date: string;
    section: string;
    class: string;
    achievedOutcomes: string;
    homework: string;
  }[];
}

// Mock data for subjects and grades
export const subjects = [
  "الرياضيات",
  "العلوم",
  "اللغة العربية",
  "اللغة الإنجليزية",
  "التربية الإسلامية",
  "الدراسات الاجتماعية",
  "التربية الفنية",
  "التربية البدنية",
];

export const grades = [
  "الصف الأول",
  "الصف الثاني",
  "الصف الثالث",
  "الصف الرابع",
  "الصف الخامس",
  "الصف السادس",
  "الصف السابع",
  "الصف الثامن",
  "الصف التاسع",
  "الصف العاشر",
  "الصف الحادي عشر",
  "الصف الثاني عشر",
];

// Gemini API service
export const generateLessonPlan = async (input: LessonPlanInput): Promise<LessonPlanData> => {
  try {
    const API_KEY = "AIzaSyDoABAcPMgYKBUgby8LsQoNPczO9I51yBU";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    const prompt = `
      أنت معلم خبير في إعداد خطط الدروس. قم بإعداد خطة درس مفصلة باللغة العربية بناءً على المعلومات التالية:
      
      المادة الدراسية: ${input.subject}
      الصف الدراسي: ${input.grade}
      عنوان الدرس: ${input.lessonTitle}
      التاريخ: ${input.date}
      اسم المعلم: ${input.teacherName}
      
      الرجاء تقديم النتائج بالتنسيق التالي:
      - النتاجات الخاصة (أهداف الدرس): قائمة بأهداف الدرس (5-6 أهداف)
      - استراتيجيات التدريس: قائمة بأساليب التدريس المناسبة (3-4 استراتيجيات)
      - استراتيجيات التقويم: قائمة بأساليب التقييم (2-3 استراتيجيات)
      - أدوات التقويم: قائمة بأدوات التقييم (2-3 أدوات)
      - المواد والأدوات والتجهيزات (مصادر التعلم): قائمة بالمواد والموارد المطلوبة (4-5 عناصر)
      - الإجراءات: قائمة بالأنشطة التي سيقوم بها المعلم مع التوقيت الزمني لكل نشاط (5-6 أنشطة)
      - التعلم القبلي: ما هي المعارف السابقة المرتبطة بهذا الدرس
      - التكامل الأفقي: كيف يرتبط هذا الدرس بالمواد الدراسية الأخرى
      - التكامل الرأسي: كيف يرتبط هذا الدرس بمحتوى المادة نفسها في صفوف أخرى
      - التأمل الذاتي: تعليق قصير عن الشعور بالرضا عن الدرس
      - تحديات واجهتني: تعليق قصير عن التحديات المحتملة
      - اقتراحات للتحسين: تعليق قصير عن كيفية تحسين الدرس مستقبلاً
      
      أعط إجابتك باللغة العربية فقط، وبصيغة JSON. اجعل الإجابة مناسبة للصف الدراسي والمادة المحددة.
    `;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0].text) {
      throw new Error("Unexpected API response format");
    }

    const rawText = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the text (in case it contains any markdown or other content)
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not find JSON in the API response");
    }
    
    const jsonText = jsonMatch[0];
    
    // Parse the JSON to get structured data
    const parsedData = JSON.parse(jsonText);
    
    // Transform the parsed data into our LessonPlanData format
    const lessonPlanData: LessonPlanData = {
      subject: input.subject,
      grade: input.grade,
      lessonTitle: input.lessonTitle,
      date: input.date,
      teacherName: input.teacherName,
      objectives: Array.isArray(parsedData.objectives) ? parsedData.objectives : [parsedData.objectives],
      teachingStrategies: Array.isArray(parsedData.teachingStrategies) ? parsedData.teachingStrategies : [parsedData.teachingStrategies],
      assessmentStrategies: Array.isArray(parsedData.assessmentStrategies) ? parsedData.assessmentStrategies : [parsedData.assessmentStrategies],
      assessmentTools: Array.isArray(parsedData.assessmentTools) ? parsedData.assessmentTools : [parsedData.assessmentTools],
      materialsAndResources: Array.isArray(parsedData.materialsAndResources) ? parsedData.materialsAndResources : [parsedData.materialsAndResources],
      timeManagement: Array.isArray(parsedData.timeManagement) ? parsedData.timeManagement : [],
      priorLearning: parsedData.priorLearning || "",
      horizontalIntegration: parsedData.horizontalIntegration || "",
      verticalIntegration: parsedData.verticalIntegration || "",
      procedures: Array.isArray(parsedData.procedures) ? parsedData.procedures : [],
      selfReflection: parsedData.selfReflection || "",
      challengesFaced: parsedData.challengesFaced || "",
      improvementSuggestions: parsedData.improvementSuggestions || "",
      dailyFollowUpTable: [
        {
          date: "",
          section: "",
          class: "",
          achievedOutcomes: "",
          homework: ""
        }
      ]
    };

    return lessonPlanData;
  } catch (error) {
    console.error("Error generating lesson plan:", error);
    toast.error("حدث خطأ أثناء إنشاء خطة الدرس. يرجى المحاولة مرة أخرى.");
    
    // Return fallback data in case of error
    return {
      subject: input.subject,
      grade: input.grade,
      lessonTitle: input.lessonTitle,
      date: input.date,
      teacherName: input.teacherName,
      objectives: ["تعذر توليد الأهداف. يرجى المحاولة مرة أخرى."],
      teachingStrategies: ["تعذر توليد استراتيجيات التدريس. يرجى المحاولة مرة أخرى."],
      assessmentStrategies: ["تعذر توليد استراتيجيات التقويم. يرجى المحاولة مرة أخرى."],
      assessmentTools: ["تعذر توليد أدوات التقويم. يرجى المحاولة مرة أخرى."],
      materialsAndResources: ["تعذر توليد المواد والأدوات. يرجى المحاولة مرة أخرى."],
      timeManagement: [{ activity: "تعذر توليد الأنشطة", time: "غير متاح" }],
      priorLearning: "تعذر توليد التعلم القبلي. يرجى المحاولة مرة أخرى.",
      horizontalIntegration: "تعذر توليد التكامل الأفقي. يرجى المحاولة مرة أخرى.",
      verticalIntegration: "تعذر توليد التكامل الرأسي. يرجى المحاولة مرة أخرى.",
      procedures: [{ activity: "تعذر توليد الإجراءات", time: "غير متاح" }],
      selfReflection: "تعذر توليد التأمل الذاتي. يرجى المحاولة مرة أخرى.",
      challengesFaced: "تعذر توليد التحديات. يرجى المحاولة مرة أخرى.",
      improvementSuggestions: "تعذر توليد الاقتراحات. يرجى المحاولة مرة أخرى.",
      dailyFollowUpTable: [
        {
          date: "",
          section: "",
          class: "",
          achievedOutcomes: "",
          homework: ""
        }
      ]
    };
  }
};

// Function to generate PDF from lesson plan data
export const generatePDF = async (lessonPlanData: LessonPlanData): Promise<string> => {
  // In a real app, this would generate an actual PDF
  // For now, we'll just return a mock URL
  return URL.createObjectURL(new Blob(["PDF content"], { type: "application/pdf" }));
};
