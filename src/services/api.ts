
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

// Generate lesson plan data based on the subject and grade
const generateMockLessonPlan = (input: LessonPlanInput): LessonPlanData => {
  // Default lesson plans for different subjects
  const scienceLessonPlan = {
    objectives: [
      "أن يتعرف الطالب على مكونات الدم الرئيسية",
      "أن يصف الطالب وظائف خلايا الدم الحمراء والبيضاء والصفائح الدموية",
      "أن يشرح الطالب آلية التجلط",
      "أن يناقش الطالب أهمية الدم في جسم الإنسان",
      "أن يميز الطالب بين فصائل الدم المختلفة",
      "أن يقدر الطالب أهمية التبرع بالدم"
    ],
    teachingStrategies: [
      "التعلم التعاوني",
      "العصف الذهني",
      "الاستقصاء",
      "حل المشكلات"
    ],
    assessmentStrategies: [
      "التقويم المستمر",
      "التقويم الختامي",
      "التقويم التشخيصي"
    ],
    assessmentTools: [
      "أوراق عمل",
      "اختبارات قصيرة",
      "ملاحظة أداء"
    ],
    materialsAndResources: [
      "كتاب الطالب",
      "عرض تقديمي حول الدم ومكوناته",
      "نماذج بلاستيكية لخلايا الدم",
      "فيديو توضيحي لعملية تجلط الدم",
      "صور توضيحية لمكونات الدم"
    ],
    procedures: [
      { activity: "التمهيد للدرس من خلال طرح أسئلة تحفيزية حول أهمية الدم", time: "5 دقائق" },
      { activity: "عرض فيديو توضيحي عن الدم ومكوناته", time: "10 دقائق" },
      { activity: "شرح مكونات الدم باستخدام الصور والنماذج التوضيحية", time: "15 دقيقة" },
      { activity: "نشاط جماعي: تقسيم الطلاب إلى مجموعات لمناقشة وظائف مكونات الدم", time: "10 دقائق" },
      { activity: "عرض الطلاب لنتائج نشاطهم الجماعي", time: "5 دقائق" },
      { activity: "تلخيص الدرس وطرح أسئلة للتقييم", time: "5 دقائق" }
    ],
    priorLearning: "درس الجهاز الدوري وأجزاؤه، ووظائف القلب",
    horizontalIntegration: "مادة اللغة العربية (كتابة تقرير عن أهمية التبرع بالدم)، والرياضيات (حساب نسب مكونات الدم)",
    verticalIntegration: "سيتعرف الطلاب في الصف الخامس على تفاصيل أكثر عن الجهاز المناعي وعلاقته بالدم",
    selfReflection: "شعرت بالرضا عن تفاعل الطلاب مع الدرس وفهمهم للمفاهيم الأساسية للدم ومكوناته",
    challengesFaced: "صعوبة في توضيح آلية تجلط الدم بشكل مبسط يناسب مستوى الطلاب",
    improvementSuggestions: "استخدام نماذج محسوسة أكثر وتجارب بسيطة لتوضيح مفهوم التجلط، وزيادة وقت النشاط الجماعي"
  };

  const mathLessonPlan = {
    objectives: [
      "أن يميز الطالب بين الكسور العادية والعشرية",
      "أن يحول الطالب الكسور العادية إلى كسور عشرية",
      "أن يجري الطالب عمليات الجمع والطرح على الكسور العشرية",
      "أن يحل الطالب مسائل حياتية تتضمن الكسور العشرية",
      "أن يقرب الطالب الكسور العشرية لأقرب جزء من عشرة أو مائة"
    ],
    teachingStrategies: [
      "التعلم بالاكتشاف",
      "حل المشكلات",
      "التعلم التعاوني"
    ],
    assessmentStrategies: [
      "التقويم البنائي",
      "التقويم الختامي"
    ],
    assessmentTools: [
      "أوراق عمل",
      "اختبارات قصيرة",
      "واجبات منزلية"
    ],
    materialsAndResources: [
      "كتاب الطالب",
      "السبورة التفاعلية",
      "بطاقات تعليمية للكسور",
      "مجسمات تمثل الكسور العشرية",
      "أوراق عمل"
    ],
    procedures: [
      { activity: "التمهيد بمراجعة الكسور العادية", time: "5 دقائق" },
      { activity: "شرح مفهوم الكسور العشرية وتمثيلها", time: "10 دقائق" },
      { activity: "تدريب الطلاب على تحويل الكسور العادية إلى عشرية", time: "15 دقيقة" },
      { activity: "نشاط جماعي: حل مسائل حياتية تتضمن الكسور العشرية", time: "10 دقائق" },
      { activity: "شرح عمليات الجمع والطرح على الكسور العشرية", time: "10 دقائق" },
      { activity: "تلخيص الدرس وإعطاء واجب منزلي", time: "5 دقائق" }
    ],
    priorLearning: "الكسور العادية وتمثيلها وعمليات الجمع والطرح عليها",
    horizontalIntegration: "العلوم (استخدام وحدات القياس وتحويلاتها)، الدراسات الاجتماعية (قراءة البيانات الإحصائية)",
    verticalIntegration: "سيتعلم الطلاب في الصف السابع عمليات الضرب والقسمة على الكسور العشرية وتطبيقاتها",
    selfReflection: "شعرت بالرضا عن قدرة الطلاب على استيعاب مفهوم الكسور العشرية والعمليات عليها",
    challengesFaced: "بعض الطلاب واجهوا صعوبة في فهم العلاقة بين الكسور العادية والعشرية",
    improvementSuggestions: "استخدام مزيد من الوسائل البصرية وزيادة التطبيقات العملية لترسيخ المفاهيم"
  };

  const arabicLessonPlan = {
    objectives: [
      "أن يقرأ الطالب النص قراءة جهرية صحيحة",
      "أن يفسر الطالب المفردات الجديدة الواردة في النص",
      "أن يستخرج الطالب الأفكار الرئيسية للنص",
      "أن يحلل الطالب شخصيات القصة",
      "أن يكتب الطالب تلخيصاً للنص بأسلوبه الخاص"
    ],
    teachingStrategies: [
      "القراءة النموذجية",
      "المناقشة والحوار",
      "التعلم التعاوني",
      "العصف الذهني"
    ],
    assessmentStrategies: [
      "الملاحظة المباشرة",
      "التقويم الشفهي",
      "التقويم الكتابي"
    ],
    assessmentTools: [
      "أسئلة شفهية",
      "اختبار كتابي قصير",
      "بطاقة ملاحظة أداء"
    ],
    materialsAndResources: [
      "كتاب الطالب",
      "السبورة",
      "بطاقات الكلمات الصعبة",
      "صور توضيحية للنص",
      "جهاز عرض"
    ],
    procedures: [
      { activity: "التمهيد للدرس من خلال مناقشة الصور المتعلقة بالنص", time: "5 دقائق" },
      { activity: "قراءة نموذجية للنص من قبل المعلم", time: "10 دقائق" },
      { activity: "قراءة فردية من بعض الطلاب مع تصحيح الأخطاء", time: "15 دقيقة" },
      { activity: "مناقشة الأفكار الرئيسية وشرح المفردات الصعبة", time: "10 دقائق" },
      { activity: "نشاط جماعي: تحليل شخصيات القصة", time: "10 دقائق" },
      { activity: "تلخيص النص وإعطاء واجب منزلي", time: "5 دقائق" }
    ],
    priorLearning: "مهارات القراءة الجهرية وتحديد معاني المفردات من السياق",
    horizontalIntegration: "التربية الإسلامية (القيم والأخلاق الواردة في النص)، الدراسات الاجتماعية (البيئة المذكورة في النص)",
    verticalIntegration: "في الصف التالي سيتعلم الطلاب تحليل النصوص بشكل أعمق ودراسة الأساليب البلاغية",
    selfReflection: "شعرت بالرضا عن تفاعل الطلاب مع النص وقدرتهم على استخراج الأفكار الرئيسية",
    challengesFaced: "بعض الطلاب واجهوا صعوبة في قراءة بعض الكلمات الصعبة",
    improvementSuggestions: "تخصيص وقت إضافي للتدريب على القراءة الجهرية وإثراء المفردات اللغوية للطلاب"
  };

  // Select the appropriate lesson plan based on subject
  let baseLessonPlan;
  if (input.subject === "العلوم") {
    baseLessonPlan = scienceLessonPlan;
  } else if (input.subject === "الرياضيات") {
    baseLessonPlan = mathLessonPlan;
  } else if (input.subject === "اللغة العربية") {
    baseLessonPlan = arabicLessonPlan;
  } else {
    // Default fallback lesson plan
    baseLessonPlan = {
      objectives: [
        "أن يتعرف الطالب على المفاهيم الأساسية للدرس",
        "أن يطبق الطالب المعارف المكتسبة في مواقف جديدة",
        "أن يحلل الطالب العلاقات بين المفاهيم المختلفة",
        "أن يقيّم الطالب أهمية الموضوع في الحياة اليومية",
        "أن ينتج الطالب محتوى إبداعياً يعكس فهمه للموضوع"
      ],
      teachingStrategies: [
        "التعلم النشط",
        "الحوار والمناقشة",
        "التعلم التعاوني",
        "حل المشكلات"
      ],
      assessmentStrategies: [
        "التقويم المستمر",
        "التقويم الذاتي",
        "تقويم الأقران"
      ],
      assessmentTools: [
        "قوائم الرصد",
        "سلالم التقدير",
        "اختبارات قصيرة"
      ],
      materialsAndResources: [
        "الكتاب المدرسي",
        "عروض تقديمية",
        "فيديوهات تعليمية",
        "أوراق عمل",
        "مصادر إلكترونية"
      ],
      procedures: [
        { activity: "التهيئة والمراجعة السريعة للمعارف السابقة", time: "5 دقائق" },
        { activity: "عرض محتوى الدرس باستخدام العروض التقديمية", time: "15 دقيقة" },
        { activity: "نشاط جماعي لتطبيق المفاهيم", time: "10 دقائق" },
        { activity: "مناقشة نتائج النشاط الجماعي", time: "5 دقائق" },
        { activity: "تدريبات فردية لتقييم الفهم", time: "10 دقائق" },
        { activity: "تلخيص النقاط الرئيسية وإعطاء الواجب المنزلي", time: "5 دقائق" }
      ],
      priorLearning: "المعارف والمفاهيم المرتبطة بالدروس السابقة",
      horizontalIntegration: "الربط مع المواد الدراسية الأخرى ذات الصلة",
      verticalIntegration: "التمهيد للمفاهيم والمهارات التي سيتم تناولها في الصفوف اللاحقة",
      selfReflection: "تفاعل الطلاب الإيجابي مع الأنشطة وقدرتهم على استيعاب المفاهيم الأساسية",
      challengesFaced: "تفاوت مستويات الطلاب والحاجة إلى تنويع أساليب التدريس",
      improvementSuggestions: "زيادة الأنشطة التطبيقية وتوظيف التكنولوجيا بشكل أكبر في الدرس القادم"
    };
  }

  // Customize the lesson plan with the user's input
  return {
    subject: input.subject,
    grade: input.grade,
    lessonTitle: input.lessonTitle,
    date: input.date,
    teacherName: input.teacherName,
    objectives: baseLessonPlan.objectives,
    teachingStrategies: baseLessonPlan.teachingStrategies,
    assessmentStrategies: baseLessonPlan.assessmentStrategies,
    assessmentTools: baseLessonPlan.assessmentTools,
    materialsAndResources: baseLessonPlan.materialsAndResources,
    timeManagement: [], // This field is used in the procedures field
    priorLearning: baseLessonPlan.priorLearning,
    horizontalIntegration: baseLessonPlan.horizontalIntegration,
    verticalIntegration: baseLessonPlan.verticalIntegration,
    procedures: baseLessonPlan.procedures,
    selfReflection: baseLessonPlan.selfReflection,
    challengesFaced: baseLessonPlan.challengesFaced,
    improvementSuggestions: baseLessonPlan.improvementSuggestions,
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
};

// Gemini API service
export const generateLessonPlan = async (input: LessonPlanInput): Promise<LessonPlanData> => {
  try {
    console.log("Starting to generate lesson plan with input:", input);
    const API_KEY = "AIzaSyDoABAcPMgYKBUgby8LsQoNPczO9I51yBU";
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

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

    console.log("Sending request to Gemini API");
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

    console.log("Response status:", response.status);

    if (!response.ok) {
      console.error("API request failed with status", response.status);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("Received API response:", data);
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0].text) {
      console.error("Unexpected API response format", data);
      throw new Error("Unexpected API response format");
    }

    const rawText = data.candidates[0].content.parts[0].text;
    console.log("Raw text from API:", rawText);
    
    // Extract JSON from the text (in case it contains any markdown or other content)
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Could not find JSON in the API response", rawText);
      throw new Error("Could not find JSON in the API response");
    }
    
    const jsonText = jsonMatch[0];
    console.log("Extracted JSON:", jsonText);
    
    // Parse the JSON to get structured data
    const parsedData = JSON.parse(jsonText);
    console.log("Parsed data:", parsedData);
    
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

    console.log("Transformed data:", lessonPlanData);
    return lessonPlanData;
  } catch (error) {
    console.error("Error generating lesson plan:", error);
    toast.error("حدث خطأ أثناء التواصل مع الذكاء الاصطناعي. سيتم استخدام نموذج تلقائي.");
    
    // Return mockup data instead
    const mockLessonPlan = generateMockLessonPlan(input);
    console.log("Generated mock lesson plan:", mockLessonPlan);
    return mockLessonPlan;
  }
};

// Function to generate PDF from lesson plan data
export const generatePDF = async (lessonPlanData: LessonPlanData): Promise<string> => {
  // In a real app, this would generate an actual PDF
  // For now, we'll just return a mock URL
  return URL.createObjectURL(new Blob(["PDF content"], { type: "application/pdf" }));
};
