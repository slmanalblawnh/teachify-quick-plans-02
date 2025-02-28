
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
          `أن يستخرج الطالب أمثلة على ${input.lessonTitle} من نصوص أدبية متنوعة`,
          `أن ينتج الطالب جملاً وتعبيرات تتضمن ${input.lessonTitle}`,
          `أن يقدر الطالب القيمة الجمالية لـ${input.lessonTitle} في النصوص الأدبية`
        ],
        materialsAndResources: [
          "كتاب اللغة العربية المقرر من وزارة التربية والتعليم الأردنية",
          "نصوص أدبية مختارة من الأدب العربي والأردني",
          "بطاقات للمفاهيم البلاغية وأمثلتها",
          "عرض تقديمي يوضح الأساليب البلاغية",
          "صور وجملة تساعد في فهم الصور الفنية"
        ],
        procedures: [
          { activity: `التمهيد بقراءة نص أدبي جميل يتضمن ${input.lessonTitle}`, time: "5 دقائق" },
          { activity: `شرح مفهوم ${input.lessonTitle} وأنواعه بالأمثلة التوضيحية`, time: "15 دقيقة" },
          { activity: "تحليل أمثلة متنوعة من النصوص الأدبية", time: "10 دقائق" },
          { activity: `تدريب الطلبة على استخراج ${input.lessonTitle} من نصوص مختارة`, time: "10 دقائق" },
          { activity: `نشاط إبداعي: كتابة جمل وتعبيرات تتضمن ${input.lessonTitle}`, time: "10 دقائق" },
          { activity: "تلخيص المفاهيم الرئيسية وتقييم فهم الطلبة", time: "5 دقائق" }
        ],
        priorLearning: "المفاهيم اللغوية الأساسية والتعبير الكتابي وفق المنهاج الأردني للصفوف السابقة",
        horizontalIntegration: `التربية الإسلامية (${input.lessonTitle} في النصوص الدينية)، التاريخ (${input.lessonTitle} في الشعر الأردني والعربي)`,
        verticalIntegration: `سيدرس الطلبة في الصفوف العليا وفق المنهاج الأردني أساليب بلاغية أكثر تعقيداً مرتبطة بـ${input.lessonTitle}`
      };
    } else {
      // Default Arabic language lesson plan for Jordanian curriculum
      customLessonPlan = {
        objectives: [
          `أن يقرأ الطالب نص ${input.lessonTitle} قراءة جهرية سليمة`,
          `أن يفسر الطالب معاني المفردات الجديدة في ${input.lessonTitle}`,
          `أن يستخرج الطالب الأفكار الرئيسية والفرعية في ${input.lessonTitle}`,
          `أن يحلل الطالب النص مبيناً الجوانب الفنية والجمالية فيه`,
          `أن يستنتج الطالب القيم واتجاهات الواردة في ${input.lessonTitle}`,
          `أن يوظف الطالب مهارات التفكير العليا في التعامل مع ${input.lessonTitle}`
        ],
        materialsAndResources: [
          "كتاب اللغة العربية المقرر من وزارة التربية والتعليم الأردنية",
          "معجم لغوي لشرح المفردات الصعبة",
          "وسائل بصرية متعلقة بموضوع النص",
          "بطاقات للمفردات والتراكيب اللغوية",
          "أوراق عمل وأنشطة إثرائية"
        ],
        procedures: [
          { activity: `التمهيد لموضوع ${input.lessonTitle} من خلال صور أو أسئلة مثيرة للتفكير`, time: "5 دقائق" },
          { activity: `قراءة نموذجية لنص ${input.lessonTitle} من قبل المعلم`, time: "10 دقائق" },
          { activity: "قراءات فردية من الطلبة مع مناقشة المفردات الصعبة", time: "10 دقائق" },
          { activity: `تحليل الأفكار الرئيسية والفرعية في ${input.lessonTitle}`, time: "15 دقيقة" },
          { activity: "نشاط تعاوني: استخراج الأساليب اللغوية والصور الفنية", time: "10 دقائق" },
          { activity: "تلخيص المفاهيم الرئيسية وتقييم فهم الطلبة", time: "5 دقائق" }
        ],
        priorLearning: "مهارات القراءة والفهم والتحليل اللغوي وفق المنهاج الأردني للصفوف السابقة",
        horizontalIntegration: `التربية الإسلامية (القيم والمبادئ في ${input.lessonTitle})، الدراسات الاجتماعية (ربط ${input.lessonTitle} بالحياة والبيئة الأردنية)`,
        verticalIntegration: `سيتوسع الطلبة في الصفوف العليا وفق المنهاج الأردني في تحليل النصوص المشابهة لـ${input.lessonTitle} بمستويات أعمق`
      };
    }
  }
  // Match Islamic education topics for Jordanian curriculum
  else if (input.subject === "التربية الإسلامية") {
    customLessonPlan = {
      objectives: [
        `أن يتعرف الطالب على المفاهيم الإسلامية الأساسية في ${input.lessonTitle}`,
        `أن يشرح الطالب الأحكام الشرعية المتعلقة بـ${input.lessonTitle}`,
        `أن يستدل الطالب من القرآن الكريم والسنة النبوية على ${input.lessonTitle}`,
        `أن يستنتج الطالب القيم والآداب الإسلامية المتضمنة في ${input.lessonTitle}`,
        `أن يطبق الطالب مبادئ ${input.lessonTitle} في حياته اليومية`,
        `أن يقدر الطالب أهمية ${input.lessonTitle} في بناء الشخصية المسلمة`
      ],
      materialsAndResources: [
        "كتاب التربية الإسلامية المقرر من وزارة التربية والتعليم الأردنية",
        "المصحف الشريف أو نسخ من الآيات القرآنية المتعلقة بالدرس",
        "عرض تقديمي يتضمن الأحاديث النبوية والآيات القرآنية",
        "قصص وأمثلة من السيرة النبوية والتاريخ الإسلامي",
        "بطاقات للمفاهيم والأحكام الشرعية"
      ],
      procedures: [
        { activity: `التمهيد للدرس بآية قرآنية أو حديث شريف يتعلق بـ${input.lessonTitle}`, time: "5 دقائق" },
        { activity: `عرض المفاهيم الأساسية لـ${input.lessonTitle} مع الأدلة الشرعية`, time: "15 دقيقة" },
        { activity: `مناقشة الأحكام الشرعية المتعلقة بـ${input.lessonTitle} وتطبيقاتها`, time: "10 دقائق" },
        { activity: `نشاط تعاوني: حل أسئلة تطبيقية حول ${input.lessonTitle}`, time: "10 دقائق" },
        { activity: `ربط ${input.lessonTitle} بواقع الطلبة وحياتهم اليومية`, time: "10 دقائق" },
        { activity: "تلخيص الدرس واستخلاص القيم والتوجيهات الإسلامية", time: "5 دقائق" }
      ],
      priorLearning: `المفاهيم الإسلامية الأساسية المرتبطة بـ${input.lessonTitle} وفق المنهاج الأردني للصفوف السابقة`,
      horizontalIntegration: `اللغة العربية (النصوص والتعبير عن القيم الإسلامية)، الدراسات الاجتماعية (تطبيق مبادئ ${input.lessonTitle} في المجتمع الأردني)`,
      verticalIntegration: `سيتوسع الطلبة في الصفوف العليا وفق المنهاج الأردني في دراسة ${input.lessonTitle} بتفاصيل وأحكام أكثر`
    };
  }
  // Match social studies topics for Jordanian curriculum
  else if (input.subject === "الدراسات الاجتماعية") {
    customLessonPlan = {
      objectives: [
        `أن يحدد الطالب المفاهيم الأساسية المرتبطة بـ${input.lessonTitle}`,
        `أن يشرح الطالب الحقائق والمعلومات المتعلقة بـ${input.lessonTitle}`,
        `أن يحلل الطالب المعلومات والبيانات المرتبطة بـ${input.lessonTitle}`,
        `أن يربط الطالب ${input.lessonTitle} بخصائص المجتمع الأردني`,
        `أن يستنتج الطالب أهمية ${input.lessonTitle} في تنمية المجتمع الأردني`,
        `أن يقدر الطالب دور الأردن في ${input.lessonTitle} على المستوى المحلي والعربي`
      ],
      materialsAndResources: [
        "كتاب الدراسات الاجتماعية المقرر من وزارة التربية والتعليم الأردنية",
        "خرائط وأطالس ومصورات جغرافية للأردن",
        "صور وفيديوهات تتعلق بالموضوع",
        "إحصائيات وبيانات حديثة عن الأردن",
        "أوراق عمل وأنشطة تطبيقية"
      ],
      procedures: [
        { activity: `التمهيد بعرض صور أو فيديو قصير عن ${input.lessonTitle} في الأردن`, time: "5 دقائق" },
        { activity: `تقديم المفاهيم والحقائق الأساسية المتعلقة بـ${input.lessonTitle}`, time: "15 دقيقة" },
        { activity: `شرح الخصائص والعوامل المرتبطة بـ${input.lessonTitle} في الأردن`, time: "10 دقائق" },
        { activity: `نشاط تعاوني: تحليل بيانات أو مخططات تتعلق بـ${input.lessonTitle}`, time: "10 دقائق" },
        { activity: `مناقشة دور الأردن وجهوده في تنمية ${input.lessonTitle}`, time: "10 دقائق" },
        { activity: "تلخيص المفاهيم الرئيسية وتقييم فهم الطلبة", time: "5 دقائق" }
      ],
      priorLearning: `المفاهيم الأساسية في الدراسات الاجتماعية المرتبطة بـ${input.lessonTitle} وفق المنهاج الأردني للصفوف السابقة`,
      horizontalIntegration: `العلوم (الجوانب العلمية في ${input.lessonTitle})، التربية الوطنية (دور المواطن الأردني تجاه ${input.lessonTitle})`,
      verticalIntegration: `سيدرس الطلبة في الصفوف العليا وفق المنهاج الأردني ${input.lessonTitle} بشكل أكثر تفصيلاً وتحليلاً`
    };
  }
  // Default structure for any subject - Jordanian curriculum
  else {
    customLessonPlan = {
      objectives: [
        `أن يتعرف الطالب على المفاهيم الأساسية لـ${input.lessonTitle} وفق المنهاج الأردني`,
        `أن يشرح الطالب العناصر الرئيسية في ${input.lessonTitle}`,
        `أن يحلل الطالب المكونات المختلفة لـ${input.lessonTitle}`,
        `أن يطبق الطالب المعارف المكتسبة من ${input.lessonTitle} في مواقف جديدة`,
        `أن يقيّم الطالب أهمية ${input.lessonTitle} في الحياة العملية`,
        `أن ينتج الطالب عملاً إبداعياً يعكس فهمه لـ${input.lessonTitle}`
      ],
      materialsAndResources: [
        "الكتاب المدرسي المقرر من وزارة التربية والتعليم الأردنية",
        "وسائل تعليمية متنوعة تناسب موضوع الدرس",
        "عروض تقديمية ومصادر تعليمية رقمية",
        "أوراق عمل وأنشطة تطبيقية",
        "مصادر إثرائية معتمدة من الوزارة"
      ],
      procedures: [
        { activity: `التمهيد للدرس من خلال ربط ${input.lessonTitle} بحياة الطلبة وبيئتهم الأردنية`, time: "5 دقائق" },
        { activity: `تقديم المفاهيم الأساسية لـ${input.lessonTitle} بأسلوب شيق`, time: "15 دقيقة" },
        { activity: `شرح تفصيلي للعناصر الرئيسية في ${input.lessonTitle} مع أمثلة متنوعة`, time: "10 دقائق" },
        { activity: "نشاط تطبيقي فردي لتعزيز فهم المفاهيم", time: "10 دقائق" },
        { activity: "نشاط تعاوني: حل مشكلات أو تحديات مرتبطة بالدرس", time: "10 دقائق" },
        { activity: "تلخيص الدرس وتقييم مدى تحقق النتاجات التعليمية", time: "5 دقائق" }
      ],
      priorLearning: `المعارف والمهارات السابقة المرتبطة بـ${input.lessonTitle} وفق المنهاج الأردني للصفوف السابقة`,
      horizontalIntegration: `ربط ${input.lessonTitle} بالمواد الدراسية الأخرى والمهارات الحياتية المناسبة للبيئة الأردنية`,
      verticalIntegration: `امتداد موضوع ${input.lessonTitle} في صفوف لاحقة وفق المصفوفة المفاهيمية للمنهاج الأردني`
    };
  }

  // Merge the custom lesson plan with the base structure
  return {
    subject: input.subject,
    grade: input.grade,
    lessonTitle: input.lessonTitle,
    date: input.date,
    teacherName: input.teacherName,
    objectives: customLessonPlan.objectives,
    teachingStrategies: baseLessonStructure.teachingStrategies,
    assessmentStrategies: baseLessonStructure.assessmentStrategies,
    assessmentTools: baseLessonStructure.assessmentTools,
    materialsAndResources: customLessonPlan.materialsAndResources,
    timeManagement: [], // This field is used in the procedures field
    priorLearning: customLessonPlan.priorLearning,
    horizontalIntegration: customLessonPlan.horizontalIntegration,
    verticalIntegration: customLessonPlan.verticalIntegration,
    procedures: customLessonPlan.procedures,
    selfReflection: baseLessonStructure.selfReflection,
    challengesFaced: baseLessonStructure.challengesFaced,
    improvementSuggestions: baseLessonStructure.improvementSuggestions,
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

// Function to generate English lesson plan format - ALL CONTENT IN ENGLISH
const generateEnglishLessonPlan = (input: LessonPlanInput): LessonPlanData => {
  // Convert Arabic grade to English format if needed
  let gradeInEnglish = input.grade;
  if (input.grade.includes("الصف")) {
    const gradeMap: {[key: string]: string} = {
      "الصف الأول": "Grade 1",
      "الصف الثاني": "Grade 2",
      "الصف الثالث": "Grade 3",
      "الصف الرابع": "Grade 4",
      "الصف الخامس": "Grade 5",
      "الصف السادس": "Grade 6",
      "الصف السابع": "Grade 7",
      "الصف الثامن": "Grade 8",
      "الصف التاسع": "Grade 9",
      "الصف العاشر": "Grade 10",
      "الصف الحادي عشر": "Grade 11",
      "الصف الثاني عشر": "Grade 12",
    };
    gradeInEnglish = gradeMap[input.grade] || input.grade;
  }

  // Create English format lesson plan
  return {
    subject: "English Language",
    grade: gradeInEnglish,
    lessonTitle: input.lessonTitle,
    date: input.date,
    teacherName: input.teacherName,
    isEnglishTemplate: true, // Flag to identify English template
    numberOfClasses: "1", // Default value for number of classes
    objectives: [
      `By the end of this lesson, students will be able to identify key vocabulary related to ${input.lessonTitle}`,
      `By the end of this lesson, students will be able to use the target language of ${input.lessonTitle} accurately`,
      `By the end of this lesson, students will be able to demonstrate comprehension of ${input.lessonTitle} through speaking activities`,
      `By the end of this lesson, students will be able to produce written responses related to ${input.lessonTitle}`,
      `By the end of this lesson, students will be able to engage in communicative activities about ${input.lessonTitle}`
    ],
    teachingStrategies: [
      "Communicative Language Teaching",
      "Total Physical Response",
      "Task-based Learning",
      "Cooperative Learning"
    ],
    assessmentStrategies: [
      "Formative Assessment",
      "Performance Assessment",
      "Self-Assessment"
    ],
    assessmentTools: [
      "Observation Checklist",
      "Rubric",
      "Exit Ticket"
    ],
    materialsAndResources: [
      "Student's Book",
      "Activity Sheets",
      "Flashcards",
      "Audio recordings",
      "Interactive whiteboard"
    ],
    timeManagement: [],
    priorLearning: `Students have been introduced to basic vocabulary and grammar structures related to ${input.lessonTitle} in previous grades according to the Jordanian English curriculum`,
    horizontalIntegration: `Science (scientific terms related to ${input.lessonTitle}), Social Studies (cultural aspects of ${input.lessonTitle})`,
    verticalIntegration: `Students will build on these language skills in future grades when they study more complex aspects of ${input.lessonTitle} according to the Jordanian curriculum progression`,
    procedures: [
      { activity: `Warm-up: Engage students with a quick activity to introduce ${input.lessonTitle}`, time: "5 minutes" },
      { activity: `Presentation: Introduce new vocabulary and language structures related to ${input.lessonTitle}`, time: "10 minutes" },
      { activity: `Practice: Guided practice of new language through controlled activities about ${input.lessonTitle}`, time: "15 minutes" },
      { activity: `Group work: Students work in pairs/groups to complete communicative tasks about ${input.lessonTitle}`, time: "10 minutes" },
      { activity: `Production: Students demonstrate their learning through speaking or writing about ${input.lessonTitle}`, time: "10 minutes" },
      { activity: "Closure: Summarize the lesson and check understanding through quick assessment", time: "5 minutes" }
    ],
    selfReflection: "I am satisfied with the students' participation and their ability to use the target language",
    challengesFaced: "Some students struggled with the pronunciation of new vocabulary",
    improvementSuggestions: "Provide more audio examples and pronunciation practice in future lessons",
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
    // If English language is selected, directly return English format without API call
    if (input.subject === "اللغة الإنجليزية") {
      console.log("Generating English format lesson plan");
      return generateEnglishLessonPlan(input);
    }
    
    console.log("Starting to generate lesson plan with input:", input);
    const API_KEY = "AIzaSyDoABAcPMgYKBUgby8LsQoNPczO9I51yBU";
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

    const prompt = `
      أنت معلم خبير في إعداد خطط الدروس وفق المنهاج الأردني. قم بإعداد خطة درس مفصلة باللغة العربية بناءً على المعلومات التالية:
      
      المادة الدراسية: ${input.subject}
      الصف الدراسي: ${input.grade}
      عنوان الدرس: ${input.lessonTitle}
      التاريخ: ${input.date}
      اسم المعلم: ${input.teacherName}
      الدولة: الأردن
      
      الرجاء تقديم النتائج بالتنسيق التالي:
      - النتاجات الخاصة (أهداف الدرس): قائمة بأهداف الدرس (5-6 أهداف) مرتبطة مباشرة بعنوان الدرس "${input.lessonTitle}" وفق المنهاج الأردني
      - استراتيجيات التدريس: قائمة بأساليب التدريس المناسبة (3-4 استراتيجيات) وفق أساليب التدريس المعتمدة في الأردن
      - استراتيجيات التقويم: قائمة بأساليب التقييم (2-3 استراتيجيات) وفق المعايير الأردنية
      - أدوات التقويم: قائمة بأدوات التقييم (2-3 أدوات) المعتمدة في المدارس الأردنية
      - المواد والأدوات والتجهيزات (مصادر التعلم): قائمة بالمواد والموارد المطلوبة (4-5 عناصر) مرتبطة مباشرة بعنوان الدرس "${input.lessonTitle}" ومتوفرة في المدارس الأردنية
      - الإجراءات: قائمة بالأنشطة التي سيقوم بها المعلم مع التوقيت الزمني لكل نشاط (5-6 أنشطة) مرتبطة مباشرة بعنوان الدرس "${input.lessonTitle}" ومناسبة للبيئة المدرسية الأردنية
      - التعلم القبلي: ما هي المعارف السابقة المرتبطة بهذا الدرس وفق المنهاج الأردني
      - التكامل الأفقي: كيف يرتبط هذا الدرس بالمواد الدراسية الأخرى في المنهاج الأردني
      - التكامل الرأسي: كيف يرتبط هذا الدرس بمحتوى المادة نفسها في صفوف أخرى وفق تسلسل المنهاج الأردني
      - التأمل الذاتي: تعليق قصير عن الشعور بالرضا عن الدرس
      - تحديات واجهتني: تعليق قصير عن التحديات المحتملة في البيئة المدرسية الأردنية
      - اقتراحات للتحسين: تعليق قصير عن كيفية تحسين الدرس مستقبلاً بما يتناسب مع المنهاج الأردني
      
      أعط إجابتك باللغة العربية فقط، وبصيغة JSON. اجعل الإجابة مناسبة للصف الدراسي والمادة المحددة وفق المنهاج الأردني.
      تأكد من أن كل محتوى خطة الدرس مرتبط مباشرة بعنوان الدرس "${input.lessonTitle}" وليس عاماً، مع مراعاة خصوصية البيئة التعليمية الأردنية.
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
    try {
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
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      throw new Error("Invalid JSON received from API");
    }
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
