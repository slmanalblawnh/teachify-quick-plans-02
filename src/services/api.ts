
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
  isEnglishTemplate?: boolean; // Flag for English template
  numberOfClasses?: string; // Additional fields for English template
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
  "تاريخ الأردن",
  "الكيمياء",
  "الفيزياء",
  "الأحياء",
  "التربية المهنية",
  "الثقافة المالية",
  "الحاسوب",
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

// Function to generate English lesson plan
const generateEnglishLessonPlan = (input: LessonPlanInput): LessonPlanData => {
  // Create English-specific lesson plan structure
  return {
    ...input,
    isEnglishTemplate: true,
    numberOfClasses: "5", // Default number of classes
    objectives: [
      `Students will be able to understand the main ideas of ${input.lessonTitle}`,
      `Students will be able to use key vocabulary related to ${input.lessonTitle}`,
      `Students will be able to practice speaking about ${input.lessonTitle}`,
      `Students will be able to write short paragraphs about ${input.lessonTitle}`,
      `Students will be able to answer comprehension questions about ${input.lessonTitle}`
    ],
    teachingStrategies: [
      "Communicative approach",
      "Task-based learning",
      "Total physical response (TPR)",
      "Collaborative learning",
      "Direct method"
    ],
    assessmentStrategies: [
      "Formative assessment",
      "Peer assessment",
      "Self-assessment",
      "Performance-based assessment"
    ],
    assessmentTools: [
      "Rubrics",
      "Oral presentations",
      "Written assignments",
      "Quizzes"
    ],
    materialsAndResources: [
      "Student's Book",
      "Workbook",
      "Flashcards related to the lesson",
      "Audio recordings",
      "Interactive whiteboard resources"
    ],
    timeManagement: [
      { activity: "Warm-up activity and review of previous lesson", time: "5 minutes" },
      { activity: "Presentation of new vocabulary and structures", time: "15 minutes" },
      { activity: "Guided practice activities", time: "15 minutes" },
      { activity: "Independent practice and application", time: "10 minutes" },
      { activity: "Wrap-up and assessment", time: "5 minutes" }
    ],
    priorLearning: `Students have already learned basic vocabulary and structures related to similar topics in previous grades according to the Jordan national curriculum`,
    horizontalIntegration: `This lesson integrates with Social Studies (cultural aspects of ${input.lessonTitle}) and Art (creating visual representations)`,
    verticalIntegration: `This knowledge will be expanded in future grades with more complex vocabulary and grammatical structures related to ${input.lessonTitle}`,
    procedures: [
      { activity: `Warm-up: Show pictures related to ${input.lessonTitle} and ask students to identify what they see`, time: "5 minutes" },
      { activity: `Presentation: Introduce new vocabulary and structures related to ${input.lessonTitle} using visuals and realia`, time: "10 minutes" },
      { activity: `Guided Practice: Have students practice using the new language in pairs or small groups`, time: "15 minutes" },
      { activity: `Production: Students create their own dialogues or written work using the target language`, time: "15 minutes" },
      { activity: `Closure: Review the main points of the lesson and assign homework`, time: "5 minutes" }
    ],
    selfReflection: "The lesson was well-received by the students. They participated actively in all activities and demonstrated understanding of the key concepts.",
    challengesFaced: "Some students struggled with pronouncing certain words. More pronunciation practice should be incorporated in future lessons.",
    improvementSuggestions: "Include more visual aids and real-life examples to enhance understanding. Consider grouping students of mixed abilities to support weaker students.",
    dailyFollowUpTable: [
      {
        date: input.date,
        section: "A",
        class: "10",
        achievedOutcomes: "Most students achieved the learning objectives",
        homework: "Workbook exercises 1-3, page 24"
      },
      {
        date: input.date,
        section: "B",
        class: "10",
        achievedOutcomes: "All students achieved the learning objectives",
        homework: "Workbook exercises 1-3, page 24"
      }
    ]
  };
};

// Generate lesson plan data based on the subject, grade and lesson title
const generateMockLessonPlan = (input: LessonPlanInput): LessonPlanData => {
  // Check if the subject is English Language
  if (input.subject === "اللغة الإنجليزية") {
    return generateEnglishLessonPlan(input);
  }

  // Base structure for Jordanian curriculum lesson plans
  const baseLessonStructure = {
    teachingStrategies: [
      "التعلم التعاوني",
      "العصف الذهني",
      "الاستقصاء",
      "حل المشكلات",
      "التعلم النشط"
    ],
    assessmentStrategies: [
      "التقويم التكويني",
      "التقويم الختامي",
      "التقويم المعتمد على الأداء"
    ],
    assessmentTools: [
      "سلم تقدير",
      "قائمة رصد",
      "اختبارات قصيرة"
    ],
    selfReflection: "شعرت بالرضا عن تفاعل الطلبة مع الأنشطة المختلفة وتحقيق أهداف الدرس ضمن الخطة الزمنية المحددة",
    challengesFaced: "تباين مستويات الطلبة في استيعاب بعض المفاهيم المرتبطة بالدرس والحاجة إلى وقت إضافي لتوضيح بعض النقاط",
    improvementSuggestions: "تنويع الأنشطة التعليمية بشكل أكبر واستخدام وسائل تكنولوجية إضافية لتعزيز فهم الطلبة وفق احتياجاتهم المختلفة"
  };

  // Extract keywords from the lesson title
  const lessonTitle = input.lessonTitle.toLowerCase();
  let customLessonPlan;

  // Match science-related topics for Jordanian curriculum
  if (input.subject === "العلوم") {
    if (lessonTitle.includes("الدم") || lessonTitle.includes("الدورة الدموية") || lessonTitle.includes("القلب")) {
      customLessonPlan = {
        objectives: [
          `أن يصف الطالب تركيب ${input.lessonTitle} في جسم الإنسان`,
          `أن يوضح الطالب آلية عمل ${input.lessonTitle} في الجسم`,
          `أن يبين الطالب وظائف ${input.lessonTitle} المختلفة`,
          `أن يستنتج الطالب أهمية ${input.lessonTitle} في الحفاظ على الاتزان الداخلي للجسم`,
          `أن يصمم الطالب نموذجاً يوضح آلية عمل ${input.lessonTitle}`,
          `أن يقترح الطالب طرقاً للمحافظة على صحة ${input.lessonTitle}`
        ],
        materialsAndResources: [
          "كتاب العلوم للصف المقرر في المنهاج الأردني",
          `نماذج توضيحية ثلاثية الأبعاد لـ${input.lessonTitle}`,
          `صور ومخططات لـ${input.lessonTitle}`,
          `عرض فيديو عن ${input.lessonTitle} من مصادر معتمدة من وزارة التربية والتعليم`,
          "أوراق عمل معدة وفق الأهداف التعليمية للدرس"
        ],
        procedures: [
          { activity: `التمهيد للدرس من خلال ربط المعرفة السابقة بموضوع ${input.lessonTitle} وتحفيز الطلبة للتعلم`, time: "5 دقائق" },
          { activity: `عرض فيديو قصير عن ${input.lessonTitle} ومناقشة محتواه`, time: "10 دقائق" },
          { activity: `شرح تركيب ووظائف ${input.lessonTitle} باستخدام النماذج والصور التوضيحية`, time: "15 دقيقة" },
          { activity: `نشاط جماعي: تقسيم الطلبة إلى مجموعات لعمل مخطط مفاهيمي لـ${input.lessonTitle}`, time: "10 دقائق" },
          { activity: "عرض نتائج عمل المجموعات ومناقشتها", time: "5 دقائق" },
          { activity: "تلخيص الدرس وتقديم التغذية الراجعة وتوزيع الواجب المنزلي", time: "5 دقائق" }
        ],
        priorLearning: "معرفة الطلبة بتركيب جسم الإنسان وأجهزته الرئيسية وفق المنهاج الأردني للصفوف السابقة",
        horizontalIntegration: `التربية الصحية (العادات الصحية للحفاظ على سلامة ${input.lessonTitle})، الرياضيات (حساب معدلات ضربات القلب والضغط)`,
        verticalIntegration: `سيتعلم الطلبة في الصفوف اللاحقة وفق المنهاج الأردني مزيداً من التفاصيل عن أمراض ${input.lessonTitle} وطرق الوقاية منها والعلاقة بين ${input.lessonTitle} وباقي أجهزة الجسم`
      };
    } else if (lessonTitle.includes("الضوء") || lessonTitle.includes("البصريات") || lessonTitle.includes("العدسات")) {
      customLessonPlan = {
        objectives: [
          `أن يشرح الطالب خصائص ${input.lessonTitle} وفق مفاهيم الفيزياء الأساسية`,
          `أن يصف الطالب ظاهرة انعكاس ${input.lessonTitle} وفق قوانينها`,
          `أن يوضح الطالب ظاهرة انكسار ${input.lessonTitle} بالرسم والمعادلات الرياضية`,
          `أن يميز الطالب بين أنواع العدسات وخصائصها البصرية`,
          `أن يطبق الطالب قوانين ${input.lessonTitle} في حل مسائل عملية`,
          `أن ينفذ الطالب تجارب عملية تبين خصائص ${input.lessonTitle}`
        ],
        materialsAndResources: [
          "كتاب العلوم المقرر من وزارة التربية والتعليم الأردنية",
          "مجموعة عدسات (محدبة ومقعرة) ومرايا",
          "مصادر ضوئية مختلفة (ليزر، مصباح)",
          "منشور زجاجي وأدوات بصرية متنوعة",
          "أوراق عمل وتجارب عملية معدة وفق النتاجات"
        ],
        procedures: [
          { activity: `التمهيد للدرس بعرض ظواهر بصرية مرتبطة بـ${input.lessonTitle} من البيئة المحلية الأردنية`, time: "5 دقائق" },
          { activity: `إجراء تجربة عملية توضح ظاهرة انعكاس ${input.lessonTitle} مع مناقشة النتائج`, time: "10 دقائق" },
          { activity: `شرح قوانين ${input.lessonTitle} وتطبيقاتها في الحياة العملية`, time: "15 دقيقة" },
          { activity: `نشاط مجموعات: إجراء تجارب عملية لاكتشاف خصائص ${input.lessonTitle} من خلال الاستقصاء`, time: "15 دقائق" },
          { activity: "تقديم المجموعات لنتائج تجاربها ومناقشتها بشكل تشاركي", time: "5 دقائق" },
          { activity: "تلخيص المفاهيم الرئيسية وتقييم فهم الطلبة وتحديد الواجب المنزلي", time: "5 دقائق" }
        ],
        priorLearning: "المفاهيم الفيزيائية الأساسية للموجات والطاقة وفق المنهاج الأردني للصفوف السابقة",
        horizontalIntegration: `الرياضيات (تطبيق القوانين والمعادلات الرياضية في حساب زوايا انعكاس وانكسار ${input.lessonTitle})، التكنولوجيا (تطبيقات ${input.lessonTitle} في الأجهزة الحديثة)`,
        verticalIntegration: `سيدرس الطلبة في الصفوف العليا وفق المنهاج الأردني مفاهيم متقدمة في ${input.lessonTitle} مثل التداخل والحيود والاستقطاب وتطبيقاتها في التقنيات الحديثة`
      };
    } else if (lessonTitle.includes("النبات") || lessonTitle.includes("النباتات") || lessonTitle.includes("الزهرة")) {
      customLessonPlan = {
        objectives: [
          `أن يتعرف الطالب على الأجزاء الرئيسية لـ${input.lessonTitle} ووظائفها`,
          `أن يشرح الطالب عملية التمثيل الضوئي في ${input.lessonTitle}`,
          `أن يصف الطالب آلية امتصاص الماء والأملاح في ${input.lessonTitle}`,
          `أن يقارن الطالب بين أنواع ${input.lessonTitle} في البيئة الأردنية`,
          `أن يستنتج الطالب أهمية ${input.lessonTitle} في التوازن البيئي`,
          `أن يصمم الطالب نموذجاً يوضح تركيب ${input.lessonTitle}`
        ],
        materialsAndResources: [
          "كتاب العلوم المقرر من وزارة التربية والتعليم الأردنية",
          "عينات نباتية من البيئة المحلية الأردنية",
          "مجهر ضوئي وشرائح مجهرية جاهزة",
          "صور وفيديوهات تعليمية عن النباتات المحلية",
          "أدوات تشريح وأوراق عمل"
        ],
        procedures: [
          { activity: `التمهيد للدرس بعرض صور متنوعة لـ${input.lessonTitle} من البيئة الأردنية ومناقشة أهميتها`, time: "5 دقائق" },
          { activity: `عرض عينات حقيقية لـ${input.lessonTitle} وتحديد أجزائها الرئيسية`, time: "10 دقائق" },
          { activity: `شرح وظائف أجزاء ${input.lessonTitle} المختلفة باستخدام النماذج والصور`, time: "15 دقيقة" },
          { activity: `نشاط عملي: فحص أنسجة ${input.lessonTitle} تحت المجهر ورسم المشاهدات`, time: "15 دقائق" },
          { activity: "مناقشة نتائج النشاط العملي والربط مع المفاهيم النظرية", time: "5 دقائق" },
          { activity: "تقييم فهم الطلبة وتلخيص الدرس وتوزيع الواجب المنزلي", time: "5 دقائق" }
        ],
        priorLearning: "معرفة الطلبة بتصنيف الكائنات الحية وخصائصها وفق المنهاج الأردني للصفوف السابقة",
        horizontalIntegration: `الجغرافيا (توزيع النباتات في البيئات الأردنية المختلفة)، التربية المهنية (زراعة ${input.lessonTitle} والعناية بها)`,
        verticalIntegration: `سيتعمق الطلبة في الصفوف العليا وفق المنهاج الأردني في دراسة التكاثر والهرمونات النباتية والتعديل الوراثي في ${input.lessonTitle}`
      };
    } else {
      // Default science lesson plan for Jordanian curriculum
      customLessonPlan = {
        objectives: [
          `أن يتعرف الطالب على المفاهيم العلمية الأساسية المرتبطة بـ${input.lessonTitle}`,
          `أن يشرح الطالب العمليات والظواهر المتعلقة بـ${input.lessonTitle}`,
          `أن يستقصي الطالب العوامل المؤثرة في ${input.lessonTitle} بطريقة علمية`,
          `أن يجري الطالب تجارب عملية تتعلق بـ${input.lessonTitle}`,
          `أن يطبق الطالب المفاهيم العلمية المرتبطة بـ${input.lessonTitle} في مواقف حياتية`,
          `أن يقيّم الطالب أهمية ${input.lessonTitle} في تفسير الظواهر الطبيعية`
        ],
        materialsAndResources: [
          "كتاب العلوم المقرر من وزارة التربية والتعليم الأردنية",
          "أدوات ومواد مخبرية مناسبة لإجراء التجارب العملية",
          "عروض تقديمية وفيديوهات تعليمية مرتبطة بالدرس",
          "أوراق عمل وأنشطة استقصائية معدة وفق النتاجات",
          "مصادر إثرائية معتمدة من الوزارة"
        ],
        procedures: [
          { activity: `التمهيد للدرس بتنشيط المعرفة السابقة للطلبة حول ${input.lessonTitle} وربطها بواقعهم`, time: "5 دقائق" },
          { activity: `تقديم المفاهيم العلمية الأساسية لـ${input.lessonTitle} بأسلوب شيق وتفاعلي`, time: "10 دقائق" },
          { activity: `إجراء تجربة عملية توضح المبادئ العلمية المرتبطة بـ${input.lessonTitle}`, time: "15 دقيقة" },
          { activity: `نشاط تعاوني: تحليل بيانات ونتائج متعلقة بـ${input.lessonTitle} واستخلاص استنتاجات`, time: "10 دقائق" },
          { activity: "مناقشة نتائج النشاط التعاوني وتعزيز المفاهيم الصحيحة", time: "5 دقائق" },
          { activity: "تقييم تعلم الطلبة من خلال أسئلة ختامية وتقديم التغذية الراجعة", time: "5 دقائق" }
        ],
        priorLearning: `المفاهيم العلمية الأساسية المرتبطة بـ${input.lessonTitle} وفق المنهاج الأردني للصفوف السابقة`,
        horizontalIntegration: `الرياضيات (تحليل البيانات والرسوم البيانية المرتبطة بـ${input.lessonTitle})، التكنولوجيا (استخدام التطبيقات الرقمية في دراسة ${input.lessonTitle})`,
        verticalIntegration: `سيتوسع الطلبة في الصفوف العليا وفق المنهاج الأردني في دراسة ${input.lessonTitle} بشكل أكثر تعمقاً وتطبيقاته المتقدمة`
      };
    }
  }
  // Match math-related topics for Jordanian curriculum
  else if (input.subject === "الرياضيات") {
    if (lessonTitle.includes("الكسور") || lessonTitle.includes("كسور")) {
      customLessonPlan = {
        objectives: [
          `أن يميز الطالب بين أنواع ${input.lessonTitle} (عادية، عشرية، نسبة مئوية)`,
          `أن يجري الطالب العمليات الحسابية على ${input.lessonTitle} بدقة`,
          `أن يحول الطالب بين صور ${input.lessonTitle} المختلفة`,
          `أن يوظف الطالب ${input.lessonTitle} في حل مسائل حياتية من البيئة الأردنية`,
          `أن يقارن الطالب بين ${input.lessonTitle} المختلفة باستخدام علامات المقارنة المناسبة`,
          `أن يمثل الطالب ${input.lessonTitle} بيانياً على خط الأعداد`
        ],
        materialsAndResources: [
          "كتاب الرياضيات المقرر من وزارة التربية والتعليم الأردنية",
          "نماذج محسوسة للكسور (قطع دينز، نماذج ورقية)",
          "ألعاب تعليمية وبطاقات عمل للكسور",
          "برمجيات تفاعلية معتمدة من وزارة التربية والتعليم",
          "أوراق عمل وتمارين إضافية"
        ],
        procedures: [
          { activity: `التمهيد بمراجعة المعرفة السابقة عن ${input.lessonTitle} من خلال نشاط تحفيزي`, time: "5 دقائق" },
          { activity: `تقديم مفهوم ${input.lessonTitle} وأنواعها باستخدام النماذج المحسوسة`, time: "10 دقائق" },
          { activity: `شرح العمليات الحسابية على ${input.lessonTitle} مع أمثلة متنوعة`, time: "15 دقيقة" },
          { activity: `تدريب موجه: حل تمارين متدرجة الصعوبة على ${input.lessonTitle}`, time: "10 دقائق" },
          { activity: `نشاط تعاوني: حل مسائل حياتية من البيئة الأردنية تتضمن ${input.lessonTitle}`, time: "10 دقائق" },
          { activity: "تلخيص المفاهيم الرئيسية وتقييم فهم الطلبة من خلال أسئلة ختامية", time: "5 دقائق" }
        ],
        priorLearning: "مفاهيم الأعداد الصحيحة والعمليات الحسابية الأساسية وفق المنهاج الأردني للصفوف السابقة",
        horizontalIntegration: `العلوم (استخدام ${input.lessonTitle} في القياسات والتحويلات)، التربية المهنية (تطبيق ${input.lessonTitle} في الطبخ والنجارة)`,
        verticalIntegration: `سيتوسع الطلبة في الصفوف العليا وفق المنهاج الأردني في دراسة ${input.lessonTitle} العشرية والنسب المئوية والنسب والتناسب`
      };
    } else if (lessonTitle.includes("الهندسة") || lessonTitle.includes("المثلث") || lessonTitle.includes("المربع") || lessonTitle.includes("الدائرة")) {
      customLessonPlan = {
        objectives: [
          `أن يتعرف الطالب على خصائص ${input.lessonTitle} وعناصره الأساسية`,
          `أن يحسب الطالب محيط ومساحة ${input.lessonTitle} باستخدام القوانين الصحيحة`,
          `أن يرسم الطالب ${input.lessonTitle} باستخدام الأدوات الهندسية بدقة`,
          `أن يحل الطالب مسائل تطبيقية على ${input.lessonTitle} من البيئة الأردنية`,
          `أن يستنتج الطالب العلاقات الهندسية المرتبطة بـ${input.lessonTitle}`,
          `أن يربط الطالب خصائص ${input.lessonTitle} بتطبيقاته في الفن الإسلامي والعمارة الأردنية`
        ],
        materialsAndResources: [
          "كتاب الرياضيات المقرر من وزارة التربية والتعليم الأردنية",
          "أدوات هندسية (مسطرة، منقلة، فرجار، مثلثات)",
          "نماذج ومجسمات للأشكال الهندسية",
          "تطبيقات وبرمجيات الهندسة التفاعلية مثل GeoGebra",
          "صور من البيئة الأردنية تظهر فيها الأشكال الهندسية"
        ],
        procedures: [
          { activity: `التمهيد بعرض أمثلة من العمارة الأردنية توضح ${input.lessonTitle} ومناقشتها`, time: "5 دقائق" },
          { activity: `تقديم خصائص ${input.lessonTitle} وعناصره باستخدام النماذج والرسومات`, time: "10 دقائق" },
          { activity: `شرح قوانين المساحة والمحيط لـ${input.lessonTitle} مع أمثلة تطبيقية`, time: "15 دقيقة" },
          { activity: `تدريب عملي: رسم ${input.lessonTitle} باستخدام الأدوات الهندسية وتحديد خصائصه`, time: "10 دقائق" },
          { activity: `نشاط تعاوني: حل مسائل هندسية تطبيقية على ${input.lessonTitle} من البيئة المحلية`, time: "10 دقائق" },
          { activity: "تلخيص المفاهيم الرئيسية وتقييم فهم الطلبة وتوزيع الواجب المنزلي", time: "5 دقائق" }
        ],
        priorLearning: "المفاهيم الأساسية في القياس والهندسة وفق المنهاج الأردني للصفوف السابقة",
        horizontalIntegration: `الفنون (تطبيق خصائص ${input.lessonTitle} في الفن الإسلامي والزخرفة)، العلوم (استخدام ${input.lessonTitle} في تفسير الظواهر الطبيعية)`,
        verticalIntegration: `سيدرس الطلبة في الصفوف العليا وفق المنهاج الأردني نظريات وقوانين متقدمة في ${input.lessonTitle} وتطبيقاتها في الهندسة الفراغية`
      };
    } else if (lessonTitle.includes("الجبر") || lessonTitle.includes("المعادلات") || lessonTitle.includes("المتباينات")) {
      customLessonPlan = {
        objectives: [
          `أن يتعرف الطالب على مفهوم ${input.lessonTitle} وخصائصها`,
          `أن يميز الطالب بين أنواع ${input.lessonTitle} المختلفة`,
          `أن يحل الطالب ${input.lessonTitle} بطرق مختلفة`,
          `أن يمثل الطالب ${input.lessonTitle} بيانياً`,
          `أن يصوغ الطالب مسائل حياتية من البيئة الأردنية على شكل ${input.lessonTitle}`,
          `أن يطبق الطالب ${input.lessonTitle} في حل مشكلات واقعية`
        ],
        materialsAndResources: [
          "كتاب الرياضيات المقرر من وزارة التربية والتعليم الأردنية",
          "أوراق عمل مدرجة بمستويات مختلفة",
          "برمجيات وتطبيقات رياضية معتمدة مثل GeoGebra",
          "بطاقات للمفاهيم والرموز الجبرية",
          "نماذج لمسائل حياتية من البيئة الأردنية"
        ],
        procedures: [
          { activity: `التمهيد بطرح مشكلة حياتية من البيئة الأردنية وكيفية تمثيلها بـ${input.lessonTitle}`, time: "5 دقائق" },
          { activity: `تقديم مفهوم ${input.lessonTitle} وأنواعها باستخدام أمثلة متنوعة`, time: "10 دقائق" },
          { activity: `شرح طرق حل ${input.lessonTitle} مع تطبيقات متدرجة الصعوبة`, time: "15 دقيقة" },
          { activity: `تدريب موجه: حل ${input.lessonTitle} وتمثيلها بيانياً`, time: "10 دقائق" },
          { activity: `نشاط تعاوني: صياغة مسائل حياتية من البيئة الأردنية وتمثيلها بـ${input.lessonTitle}`, time: "10 دقائق" },
          { activity: "تلخيص المفاهيم الرئيسية وتقييم فهم الطلبة من خلال مسائل تطبيقية", time: "5 دقائق" }
        ],
        priorLearning: "العمليات الحسابية الأساسية والتعبيرات الجبرية وفق المنهاج الأردني للصفوف السابقة",
        horizontalIntegration: `العلوم (تطبيق ${input.lessonTitle} في حل مسائل فيزيائية)، الاقتصاد المنزلي (استخدام ${input.lessonTitle} في حساب التكاليف والميزانية)`,
        verticalIntegration: `سيتعلم الطلبة في الصفوف العليا وفق المنهاج الأردني ${input.lessonTitle} من الدرجة الثانية وأنظمة المعادلات وتطبيقاتها المتقدمة`
      };
    } else {
      // Default math lesson plan for Jordanian curriculum
      customLessonPlan = {
        objectives: [
          `أن يتعرف الطالب على المفاهيم الرياضية الأساسية المرتبطة بـ${input.lessonTitle}`,
          `أن يطبق الطالب القوانين والعمليات على ${input.lessonTitle}`,
          `أن يحل الطالب مسائل رياضية متنوعة تتعلق بـ${input.lessonTitle}`,
          `أن يوظف الطالب ${input.lessonTitle} في حل مشكلات حياتية من البيئة الأردنية`,
          `أن يستنتج الطالب العلاقات والأنماط الرياضية في ${input.lessonTitle}`,
          `أن يبرر الطالب الحلول والاستنتاجات المرتبطة بـ${input.lessonTitle}`
        ],
        materialsAndResources: [
          "كتاب الرياضيات المقرر من وزارة التربية والتعليم الأردنية",
          "وسائل تعليمية محسوسة مناسبة للمفهوم الرياضي",
          "برمجيات وتطبيقات رياضية معتمدة",
          "أوراق عمل وتمارين إضافية متدرجة الصعوبة",
          "وسائل تقييم متنوعة (اختبارات قصيرة، بطاقات خروج)"
        ],
        procedures: [
          { activity: `التمهيد باستراتيجية تنشيط المعرفة السابقة حول ${input.lessonTitle}`, time: "5 دقائق" },
          { activity: `تقديم المفاهيم الرياضية الأساسية لـ${input.lessonTitle} بطريقة محسوسة`, time: "10 دقائق" },
          { activity: `شرح القوانين والعمليات المرتبطة بـ${input.lessonTitle} مع أمثلة متنوعة`, time: "15 دقيقة" },
          { activity: `تدريب موجه: حل تمارين متدرجة الصعوبة على ${input.lessonTitle}`, time: "10 دقائق" },
          { activity: `نشاط تطبيقي: حل مسائل حياتية من البيئة الأردنية تتعلق بـ${input.lessonTitle}`, time: "10 دقائق" },
          { activity: "تلخيص المفاهيم الرئيسية وتقييم تعلم الطلبة وتوزيع الواجب المنزلي", time: "5 دقائق" }
        ],
        priorLearning: `المفاهيم والمهارات الرياضية الأساسية المرتبطة بـ${input.lessonTitle} وفق المنهاج الأردني للصفوف السابقة`,
        horizontalIntegration: `العلوم (تطبيق المفاهيم الرياضية في ${input.lessonTitle} على الظواهر العلمية)، الدراسات الاجتماعية (استخدام البيانات والإحصاءات عن الأردن)`,
        verticalIntegration: `سيتوسع الطلبة في الصفوف العليا وفق المنهاج الأردني في دراسة مفاهيم ${input.lessonTitle} بشكل أكثر تجريداً وتعقيداً`
      };
    }
  }
  // Match Arabic language topics for Jordanian curriculum
  else if (input.subject === "اللغة العربية") {
    if (lessonTitle.includes("قصة") || lessonTitle.includes("قصص") || lessonTitle.includes("رواية") || lessonTitle.includes("حكاية")) {
      customLessonPlan = {
        objectives: [
          `أن يقرأ الطالب ${input.lessonTitle} قراءة جهرية سليمة مراعياً علامات الترقيم`,
          `أن يحدد الطالب العناصر الفنية في ${input.lessonTitle} (الشخصيات، الزمان، المكان، الحبكة)`,
          `أن يستخرج الطالب الأفكار الرئيسية والفرعية من ${input.lessonTitle}`,
          `أن يحلل الطالب أحداث ${input.lessonTitle} وتسلسلها المنطقي`,
          `أن يستنتج الطالب القيم والدروس المستفادة من ${input.lessonTitle}`,
          `أن يعيد الطالب سرد ${input.lessonTitle} بأسلوبه الخاص`
        ],
        materialsAndResources: [
          "كتاب اللغة العربية المقرر من وزارة التربية والتعليم الأردنية",
          "نص القصة مطبوعاً بشكل واضح",
          "بطاقات الكلمات الصعبة ومعانيها",
          "صور توضيحية للأحداث والشخصيات",
          "خريطة مفاهيمية لعناصر القصة"
        ],
        procedures: [
          { activity: `التمهيد بمناقشة صور أو عنوان ${input.lessonTitle} لإثارة دافعية الطلبة`, time: "5 دقائق" },
          { activity: `قراءة نموذجية لـ${input.lessonTitle} من قبل المعلم مع مراعاة التنغيم المناسب`, time: "10 دقائق" },
          { activity: "قراءات فردية من الطلبة مع التصويب اللغوي", time: "10 دقائق" },
          { activity: `تحليل عناصر ${input.lessonTitle} ومناقشة الأحداث والشخصيات`, time: "15 دقيقة" },
          { activity: `نشاط إبداعي: تمثيل مشهد من ${input.lessonTitle} أو رسم لوحة تعبيرية عنها`, time: "10 دقائق" },
          { activity: "تلخيص الدرس واستخلاص القيم والدروس المستفادة", time: "5 دقائق" }
        ],
        priorLearning: "مهارات القراءة الجهرية وتحليل النصوص الأدبية وفق المنهاج الأردني للصفوف السابقة",
        horizontalIntegration: `التربية الإسلامية (القيم والأخلاق في ${input.lessonTitle})، التاريخ (ربط أحداث ${input.lessonTitle} بالتاريخ الأردني إن أمكن)`,
        verticalIntegration: `سيتعمق الطلبة في الصفوف العليا وفق المنهاج الأردني في تحليل ${input.lessonTitle} ودراسة الفنون الأدبية بشكل أكثر تفصيلاً`
      };
    } else if (lessonTitle.includes("نحو") || lessonTitle.includes("قواعد") || lessonTitle.includes("إعراب")) {
      customLessonPlan = {
        objectives: [
          `أن يتعرف الطالب على مفهوم ${input.lessonTitle} وأقسامه`,
          `أن يميز الطالب بين أنواع ${input.lessonTitle} في الجمل المختلفة`,
          `أن يعرب الطالب الكلمات والجمل إعراباً صحيحاً`,
          `أن يستخرج الطالب أمثلة على ${input.lessonTitle} من نصوص مختارة`,
          `أن يوظف الطالب ${input.lessonTitle} في جمل من إنشائه`,
          `أن يصحح الطالب الأخطاء النحوية المرتبطة بـ${input.lessonTitle}`
        ],
        materialsAndResources: [
          "كتاب اللغة العربية المقرر من وزارة التربية والتعليم الأردنية",
          "لوحات تعليمية جدارية توضح القواعد النحوية",
          "بطاقات تعليمية للمفاهيم النحوية",
          "نصوص مختارة للتطبيق النحوي",
          "أوراق عمل وتدريبات متنوعة"
        ],
        procedures: [
          { activity: `التمهيد باستخراج أمثلة على ${input.lessonTitle} من نص قصير`, time: "5 دقائق" },
          { activity: `شرح مفهوم ${input.lessonTitle} وأقسامه باستخدام الأمثلة التوضيحية`, time: "15 دقيقة" },
          { activity: "عرض أمثلة متنوعة على السبورة وتحليلها", time: "10 دقائق" },
          { activity: "تدريبات فردية على الإعراب والتطبيق النحوي", time: "10 دقائق" },
          { activity: "نشاط تعاوني: استخراج أمثلة من نصوص مختلفة وإعرابها", time: "10 دقائق" },
          { activity: "تلخيص القاعدة النحوية وتقييم فهم الطلبة", time: "5 دقائق" }
        ],
        priorLearning: "المفاهيم النحوية الأساسية وأقسام الكلام وفق المنهاج الأردني للصفوف السابقة",
        horizontalIntegration: "جميع المواد الدراسية من خلال القراءة والكتابة السليمة",
        verticalIntegration: `سيدرس الطلبة في الصفوف العليا وفق المنهاج الأردني قواعد نحوية أكثر تعقيداً مبنية على مفهوم ${input.lessonTitle}`
      };
    } else if (lessonTitle.includes("بلاغة") || lessonTitle.includes("تشبيه") || lessonTitle.includes("استعارة") || lessonTitle.includes("كناية")) {
      customLessonPlan = {
        objectives: [
          `أن يتعرف الطالب على مفهوم ${input.lessonTitle} وأنواعه`,
          `أن يميز الطالب بين ${input.lessonTitle} وغيره من الأساليب البلاغية`,
          `أن يحلل الطالب نصوصاً أدبية تتضمن ${input.lessonTitle}`,
          `أن يستخرج الطالب أمثلة على ${input.lessonTitle} من نصوص مختارة`,
          `أن يوظف الطالب ${input.lessonTitle} في تعبيره الكتابي`,
          `أن يذوق الطالب جمال التعبير البلاغي في ${input.lessonTitle}`
        ],
        materialsAndResources: [
          "كتاب اللغة العربية المقرر من وزارة التربية والتعليم الأردنية",
          "نصوص أدبية مختارة تتضمن الأساليب البلاغية",
          "لوحات جدارية توضح أنواع الأساليب البلاغية",
          "بطاقات للأمثلة البلاغية وشرحها",
          "أوراق عمل وتدريبات تطبيقية"
        ],
        procedures: [
          { activity: `التمهيد بعرض أمثلة أدبية جميلة تتضمن ${input.lessonTitle}`, time: "5 دقائق" },
          { activity: `شرح مفهوم ${input.lessonTitle} وأنواعه مع التمثيل`, time: "15 دقيقة" },
          { activity: `تحليل نماذج من ${input.lessonTitle} في نصوص مختارة`, time: "10 دقائق" },
          { activity: "تدريبات فردية على استخراج وتحليل الصور البلاغية", time: "10 دقائق" },
          { activity: `نشاط إبداعي: كتابة فقرات قصيرة توظف ${input.lessonTitle}`, time: "10 دقائق" },
          { activity: "عرض إنتاج الطلبة ومناقشته وتقييمه", time: "5 دقائق" }
        ],
        priorLearning: "المفاهيم اللغوية الأساسية وتذوق النصوص الأدبية وفق المنهاج الأردني للصفوف السابقة",
        horizontalIntegration: "التربية الإسلامية (التذوق البلاغي للنصوص القرآنية والحديث الشريف)، التاريخ (دراسة النصوص الأدبية في سياقها التاريخي)",
        verticalIntegration: `سيتوسع الطلبة في الصفوف العليا وفق المنهاج الأردني في دراسة الفنون البلاغية المختلفة وعلاقتها بـ${input.lessonTitle}`
      };
    } else {
      // Default Arabic language lesson plan for Jordanian curriculum
      customLessonPlan = {
        objectives: [
          `أن يقرأ الطالب نصوص ${input.lessonTitle} قراءة سليمة مراعياً مخارج الحروف`,
          `أن يحلل الطالب بنية ${input.lessonTitle} وخصائصه اللغوية`,
          `أن يستخرج الطالب الأفكار الرئيسية والفرعية في ${input.lessonTitle}`,
          `أن يوظف الطالب مفردات وتراكيب جديدة من ${input.lessonTitle} في سياقات لغوية مختلفة`,
          `أن يعبر الطالب عن فهمه لـ${input.lessonTitle} شفوياً وكتابياً`,
          `أن يبدي الطالب رأيه في ${input.lessonTitle} مع التعليل`
        ],
        materialsAndResources: [
          "كتاب اللغة العربية المقرر من وزارة التربية والتعليم الأردنية",
          "نصوص إثرائية مرتبطة بالدرس",
          "بطاقات للمفردات الجديدة ومعانيها",
          "وسائل سمعية وبصرية مساندة",
          "أوراق عمل وأنشطة تطبيقية متنوعة"
        ],
        procedures: [
          { activity: `التمهيد بإثارة انتباه الطلبة نحو موضوع ${input.lessonTitle} من خلال أسئلة تحفيزية`, time: "5 دقائق" },
          { activity: `قراءة نموذجية لـ${input.lessonTitle} مع مراعاة جودة الأداء`, time: "10 دقائق" },
          { activity: "قراءات فردية من الطلبة مع التصويب والتوجيه", time: "10 دقائق" },
          { activity: `شرح المفردات الجديدة وتحليل محتوى ${input.lessonTitle}`, time: "15 دقيقة" },
          { activity: `نشاط تطبيقي على ${input.lessonTitle} (تلخيص، إعادة صياغة، تعبير موجه)`, time: "10 دقائق" },
          { activity: "تقييم فهم الطلبة من خلال أسئلة شاملة وتلخيص لأهم النقاط", time: "5 دقائق" }
        ],
        priorLearning: "المهارات اللغوية الأساسية في القراءة والكتابة والتحدث والاستماع وفق المنهاج الأردني للصفوف السابقة",
        horizontalIntegration: `التربية الاجتماعية (ربط موضوع ${input.lessonTitle} بالبيئة الأردنية)، التربية الإسلامية (استخراج القيم والمبادئ من ${input.lessonTitle})`,
        verticalIntegration: `سيتعمق الطلبة في الصفوف العليا وفق المنهاج الأردني في دراسة الأنماط اللغوية المختلفة وصولاً إلى التحليل النقدي لـ${input.lessonTitle}`
      };
    }
  }

  // Add default lesson plan for other subjects
  else {
    customLessonPlan = {
      objectives: [
        `أن يتعرف الطالب على المفاهيم الأساسية المرتبطة بـ${input.lessonTitle}`,
        `أن يشرح الطالب العناصر الرئيسية في ${input.lessonTitle}`,
        `أن يحلل الطالب محتوى ${input.lessonTitle} بطريقة منهجية`,
        `أن يطبق الطالب المعرفة المكتسبة من ${input.lessonTitle} في مواقف جديدة`,
        `أن يقيّم الطالب أهمية ${input.lessonTitle} في سياق المادة الدراسية`,
        `أن يبدع الطالب تطبيقات جديدة تعكس فهمه لـ${input.lessonTitle}`
      ],
      materialsAndResources: [
        `كتاب ${input.subject} المقرر من وزارة التربية والتعليم الأردنية`,
        "وسائل تعليمية سمعية وبصرية مرتبطة بالدرس",
        "أوراق عمل وأنشطة إثرائية",
        "مصادر تعلم رقمية معتمدة من الوزارة",
        "مواد تقييم متنوعة"
      ],
      timeManagement: [
        { activity: "التمهيد وتنشيط المعرفة السابقة", time: "5 دقائق" },
        { activity: "عرض المفاهيم الرئيسية للدرس", time: "15 دقيقة" },
        { activity: "تطبيق عملي وأنشطة تفاعلية", time: "15 دقيقة" },
        { activity: "مناقشة وتحليل نتائج الأنشطة", time: "10 دقائق" },
        { activity: "تلخيص وتقييم", time: "5 دقائق" }
      ],
      procedures: [
        { activity: `التمهيد للدرس وربطه بالخبرات السابقة للطلبة حول ${input.lessonTitle}`, time: "5 دقائق" },
        { activity: `عرض المفاهيم الرئيسية لـ${input.lessonTitle} بطريقة منظمة ومشوقة`, time: "15 دقيقة" },
        { activity: `تنفيذ أنشطة تطبيقية متنوعة على ${input.lessonTitle}`, time: "15 دقيقة" },
        { activity: "مناقشة وتحليل نتائج الأنشطة وتقديم التغذية الراجعة", time: "10 دقائق" },
        { activity: "تلخيص أهم النقاط في الدرس وتقييم تعلم الطلبة", time: "5 دقائق" }
      ],
      priorLearning: `المفاهيم والمهارات الأساسية المرتبطة بـ${input.lessonTitle} وفق المنهاج الأردني للصفوف السابقة`,
      horizontalIntegration: `ربط ${input.lessonTitle} بالمواد الدراسية الأخرى ذات الصلة وبالبيئة المحلية الأردنية`,
      verticalIntegration: `سيتوسع الطلبة في الصفوف العليا وفق المنهاج الأردني في دراسة ${input.lessonTitle} بشكل أكثر عمقاً وشمولية`
    };
  }

  // Create daily follow-up table
  const dailyFollowUpTable = [
    {
      date: input.date,
      section: "أ",
      class: "1",
      achievedOutcomes: "تم تحقيق النتاجات المخطط لها بنسبة 85%",
      homework: "حل أسئلة الكتاب صفحة 45"
    },
    {
      date: input.date,
      section: "ب",
      class: "1",
      achievedOutcomes: "تم تحقيق النتاجات المخطط لها بنسبة 90%",
      homework: "حل أسئلة الكتاب صفحة 45"
    }
  ];

  // Merge the base lesson structure, custom plan, and other required fields for final output
  return {
    ...input,
    ...baseLessonStructure,
    ...customLessonPlan,
    dailyFollowUpTable
  };
};

// Function to simulate API call with mock data
export const generateLessonPlan = async (input: LessonPlanInput): Promise<LessonPlanData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // Return mock data
    const lessonPlan = generateMockLessonPlan(input);
    toast.success("تم إنشاء خطة الدرس بنجاح");
    return lessonPlan;
  } catch (error) {
    toast.error("حدث خطأ أثناء إنشاء خطة الدرس");
    console.error("Error generating lesson plan:", error);
    // Return a basic plan in case of error
    return generateMockLessonPlan(input);
  }
};
