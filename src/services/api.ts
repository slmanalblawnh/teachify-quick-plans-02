
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

// Generate lesson plan data based on the subject, grade and lesson title
const generateMockLessonPlan = (input: LessonPlanInput): LessonPlanData => {
  // Base structure for all lessons
  const baseLessonStructure = {
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
    selfReflection: "شعرت بالرضا عن تفاعل الطلاب مع الدرس وفهمهم للمفاهيم الأساسية للموضوع",
    challengesFaced: "تفاوت مستويات الطلاب في فهم بعض المفاهيم المتعلقة بالدرس",
    improvementSuggestions: "استخدام المزيد من الوسائل التعليمية البصرية والتطبيقات العملية لترسيخ المفاهيم"
  };

  // Extract keywords from the lesson title
  const lessonTitle = input.lessonTitle.toLowerCase();
  let customLessonPlan;

  // Match science-related topics
  if (input.subject === "العلوم") {
    if (lessonTitle.includes("الدم") || lessonTitle.includes("الدورة الدموية") || lessonTitle.includes("القلب")) {
      customLessonPlan = {
        objectives: [
          `أن يتعرف الطالب على مكونات ${input.lessonTitle} الرئيسية`,
          `أن يصف الطالب وظائف ${input.lessonTitle} في جسم الإنسان`,
          `أن يشرح الطالب آلية عمل ${input.lessonTitle}`,
          `أن يناقش الطالب أهمية ${input.lessonTitle} في جسم الإنسان`,
          `أن يميز الطالب بين مكونات ${input.lessonTitle} المختلفة`,
          `أن يقدر الطالب أهمية المحافظة على صحة ${input.lessonTitle}`
        ],
        materialsAndResources: [
          "كتاب الطالب",
          `عرض تقديمي حول ${input.lessonTitle}`,
          `نماذج توضيحية لـ ${input.lessonTitle}`,
          `فيديو تعليمي عن ${input.lessonTitle}`,
          "صور توضيحية للدرس"
        ],
        procedures: [
          { activity: `التمهيد للدرس من خلال طرح أسئلة تحفيزية حول ${input.lessonTitle}`, time: "5 دقائق" },
          { activity: `عرض فيديو توضيحي عن ${input.lessonTitle}`, time: "10 دقائق" },
          { activity: `شرح مكونات ${input.lessonTitle} باستخدام الصور والنماذج التوضيحية`, time: "15 دقيقة" },
          { activity: `نشاط جماعي: تقسيم الطلاب إلى مجموعات لمناقشة وظائف ${input.lessonTitle}`, time: "10 دقائق" },
          { activity: "عرض الطلاب لنتائج نشاطهم الجماعي", time: "5 دقائق" },
          { activity: "تلخيص الدرس وطرح أسئلة للتقييم", time: "5 دقائق" }
        ],
        priorLearning: `المعارف السابقة عن أجهزة جسم الإنسان المرتبطة بـ${input.lessonTitle}`,
        horizontalIntegration: `مادة اللغة العربية (كتابة تقرير عن ${input.lessonTitle})، والرياضيات (حساب معدلات متعلقة بـ${input.lessonTitle})`,
        verticalIntegration: `سيتعرف الطلاب في الصف التالي على تفاصيل أكثر عن ${input.lessonTitle} وعلاقته بأجهزة الجسم الأخرى`
      };
    } else if (lessonTitle.includes("الضوء") || lessonTitle.includes("البصريات") || lessonTitle.includes("العدسات")) {
      customLessonPlan = {
        objectives: [
          `أن يتعرف الطالب على خصائص ${input.lessonTitle} الأساسية`,
          `أن يشرح الطالب كيفية انتقال ${input.lessonTitle}`,
          `أن يوضح الطالب مفهوم انعكاس ${input.lessonTitle}`,
          `أن يصف الطالب مفهوم انكسار ${input.lessonTitle}`,
          `أن يجري الطالب تجارب بسيطة تتعلق بـ${input.lessonTitle}`,
          `أن يربط الطالب بين ${input.lessonTitle} وتطبيقاته في الحياة اليومية`
        ],
        materialsAndResources: [
          "كتاب الطالب",
          "منشور ضوئي",
          "عدسات محدبة ومقعرة",
          "مصباح كهربائي",
          "صور توضيحية لظواهر بصرية"
        ],
        procedures: [
          { activity: `التمهيد للدرس من خلال طرح أسئلة عن ظواهر ${input.lessonTitle} في الطبيعة`, time: "5 دقائق" },
          { activity: `عرض تجربة عملية توضح خصائص ${input.lessonTitle}`, time: "10 دقائق" },
          { activity: `شرح مفاهيم ${input.lessonTitle} باستخدام الرسومات والأمثلة`, time: "15 دقيقة" },
          { activity: `نشاط عملي: تقسيم الطلاب لإجراء تجارب بسيطة تتعلق بـ${input.lessonTitle}`, time: "15 دقائق" },
          { activity: "مناقشة نتائج التجارب", time: "5 دقائق" },
          { activity: "تلخيص الدرس وإعطاء واجب منزلي", time: "5 دقائق" }
        ],
        priorLearning: "المعارف الأساسية عن خصائص الموجات والطاقة",
        horizontalIntegration: `الرياضيات (حسابات زوايا انعكاس ${input.lessonTitle})، والفنون (دراسة الألوان وتكوينها)`,
        verticalIntegration: `سيتعلم الطلاب في الصفوف اللاحقة المزيد عن ${input.lessonTitle} والتطبيقات التكنولوجية المرتبطة به`
      };
    } else if (lessonTitle.includes("النبات") || lessonTitle.includes("النباتات") || lessonTitle.includes("الزهرة")) {
      customLessonPlan = {
        objectives: [
          `أن يتعرف الطالب على مكونات ${input.lessonTitle} الرئيسية`,
          `أن يصف الطالب وظائف أجزاء ${input.lessonTitle} المختلفة`,
          `أن يشرح الطالب عملية التكاثر في ${input.lessonTitle}`,
          `أن يقارن الطالب بين أنواع ${input.lessonTitle} المختلفة`,
          `أن يستنتج الطالب أهمية ${input.lessonTitle} في الطبيعة`,
          `أن يقدر الطالب دور ${input.lessonTitle} في التوازن البيئي`
        ],
        materialsAndResources: [
          "كتاب الطالب",
          `نماذج بلاستيكية لـ${input.lessonTitle}`,
          "عينات نباتية حقيقية",
          "مجهر ضوئي",
          "شرائح جاهزة لمقاطع نباتية"
        ],
        procedures: [
          { activity: `التمهيد للدرس بمناقشة أهمية ${input.lessonTitle} في حياتنا`, time: "5 دقائق" },
          { activity: `عرض عينات حقيقية ونماذج لـ${input.lessonTitle}`, time: "10 دقائق" },
          { activity: `شرح مكونات ${input.lessonTitle} ووظائفها`, time: "15 دقيقة" },
          { activity: `نشاط عملي: فحص أجزاء من ${input.lessonTitle} باستخدام المجهر`, time: "15 دقائق" },
          { activity: "مناقشة نتائج النشاط العملي", time: "5 دقائق" },
          { activity: "تلخيص الدرس وتكليف الطلاب بواجب منزلي", time: "5 دقائق" }
        ],
        priorLearning: "المعارف الأساسية عن الكائنات الحية وتصنيفاتها",
        horizontalIntegration: `الدراسات الاجتماعية (توزيع ${input.lessonTitle} في البيئات المختلفة)، الفنون (رسم ${input.lessonTitle})`,
        verticalIntegration: `سيدرس الطلاب في الصفوف اللاحقة العمليات الحيوية في ${input.lessonTitle} بشكل أكثر تفصيلاً`
      };
    } else {
      // Default science lesson plan
      customLessonPlan = {
        objectives: [
          `أن يتعرف الطالب على المفاهيم الأساسية المرتبطة بـ${input.lessonTitle}`,
          `أن يشرح الطالب العمليات الرئيسية المتعلقة بـ${input.lessonTitle}`,
          `أن يميز الطالب بين العناصر المختلفة في ${input.lessonTitle}`,
          `أن يطبق الطالب المفاهيم العلمية على ${input.lessonTitle}`,
          `أن يحلل الطالب العلاقات بين مكونات ${input.lessonTitle}`,
          `أن يقدر الطالب أهمية ${input.lessonTitle} في الحياة`
        ],
        materialsAndResources: [
          "كتاب الطالب",
          `عرض تقديمي حول ${input.lessonTitle}`,
          "أدوات ومواد للتجارب العملية",
          "فيديوهات تعليمية",
          "صور توضيحية"
        ],
        procedures: [
          { activity: `التمهيد للدرس بطرح أسئلة تحفيزية حول ${input.lessonTitle}`, time: "5 دقائق" },
          { activity: `عرض فيديو تعليمي عن ${input.lessonTitle}`, time: "10 دقائق" },
          { activity: `شرح المفاهيم الأساسية لـ${input.lessonTitle}`, time: "15 دقيقة" },
          { activity: "نشاط عملي: إجراء تجربة تطبيقية", time: "15 دقائق" },
          { activity: "مناقشة نتائج التجربة وتحليلها", time: "5 دقائق" },
          { activity: "تلخيص الدرس وتقييم فهم الطلاب", time: "5 دقائق" }
        ],
        priorLearning: `المعارف السابقة المرتبطة بموضوع ${input.lessonTitle}`,
        horizontalIntegration: `الرياضيات (تطبيق العمليات الحسابية على ${input.lessonTitle})، اللغة العربية (كتابة تقارير علمية)`,
        verticalIntegration: `سيتعمق الطلاب في دراسة ${input.lessonTitle} في الصفوف اللاحقة بصورة أكثر تفصيلاً`
      };
    }
  }
  // Match math-related topics
  else if (input.subject === "الرياضيات") {
    if (lessonTitle.includes("الكسور") || lessonTitle.includes("كسور")) {
      customLessonPlan = {
        objectives: [
          `أن يميز الطالب بين أنواع ${input.lessonTitle} المختلفة`,
          `أن يحول الطالب بين ${input.lessonTitle} العادية والعشرية`,
          `أن يجري الطالب عمليات الجمع والطرح على ${input.lessonTitle}`,
          `أن يحل الطالب مسائل حياتية تتضمن ${input.lessonTitle}`,
          `أن يقارن الطالب بين ${input.lessonTitle} المختلفة`,
          `أن يقرب الطالب ${input.lessonTitle} لأقرب جزء من عشرة أو مائة`
        ],
        materialsAndResources: [
          "كتاب الطالب",
          "السبورة التفاعلية",
          `بطاقات تعليمية لـ${input.lessonTitle}`,
          `مجسمات تمثل ${input.lessonTitle}`,
          "أوراق عمل"
        ],
        procedures: [
          { activity: `التمهيد بمراجعة المفاهيم السابقة عن ${input.lessonTitle}`, time: "5 دقائق" },
          { activity: `شرح مفهوم ${input.lessonTitle} وتمثيلها`, time: "10 دقائق" },
          { activity: `تدريب الطلاب على العمليات المختلفة على ${input.lessonTitle}`, time: "15 دقيقة" },
          { activity: `نشاط جماعي: حل مسائل حياتية تتضمن ${input.lessonTitle}`, time: "10 دقائق" },
          { activity: `شرح تطبيقات ${input.lessonTitle} في الحياة اليومية`, time: "5 دقائق" },
          { activity: "تلخيص الدرس وإعطاء واجب منزلي", time: "5 دقائق" }
        ],
        priorLearning: "الأعداد الطبيعية والعمليات الحسابية عليها",
        horizontalIntegration: `العلوم (استخدام ${input.lessonTitle} في القياسات العلمية)، الدراسات الاجتماعية (قراءة البيانات الإحصائية)`,
        verticalIntegration: `سيتعلم الطلاب في الصفوف اللاحقة عمليات الضرب والقسمة على ${input.lessonTitle} وتطبيقاتها الموسعة`
      };
    } else if (lessonTitle.includes("الهندسة") || lessonTitle.includes("المثلث") || lessonTitle.includes("المربع") || lessonTitle.includes("الدائرة")) {
      customLessonPlan = {
        objectives: [
          `أن يتعرف الطالب على مفهوم ${input.lessonTitle} وخصائصه`,
          `أن يحدد الطالب عناصر ${input.lessonTitle} المختلفة`,
          `أن يحسب الطالب محيط ومساحة ${input.lessonTitle}`,
          `أن يرسم الطالب ${input.lessonTitle} بدقة باستخدام الأدوات الهندسية`,
          `أن يحل الطالب مسائل تطبيقية على ${input.lessonTitle}`,
          `أن يستنتج الطالب العلاقات الهندسية المرتبطة بـ${input.lessonTitle}`
        ],
        materialsAndResources: [
          "كتاب الطالب",
          "أدوات هندسية (مسطرة، منقلة، فرجار)",
          "نماذج بلاستيكية للأشكال الهندسية",
          "أوراق رسم بياني",
          "برمجية تعليمية للرسم الهندسي"
        ],
        procedures: [
          { activity: `التمهيد بعرض أمثلة من الحياة اليومية لـ${input.lessonTitle}`, time: "5 دقائق" },
          { activity: `شرح خصائص ${input.lessonTitle} وعناصره`, time: "10 دقائق" },
          { activity: `تدريب الطلاب على رسم ${input.lessonTitle} باستخدام الأدوات الهندسية`, time: "15 دقيقة" },
          { activity: `شرح كيفية حساب محيط ومساحة ${input.lessonTitle}`, time: "10 دقائق" },
          { activity: "نشاط جماعي: حل مسائل تطبيقية", time: "10 دقائق" },
          { activity: "تلخيص الدرس وإعطاء واجب منزلي", time: "5 دقائق" }
        ],
        priorLearning: "المفاهيم الأساسية في الهندسة والقياس",
        horizontalIntegration: `الفنون (استخدام ${input.lessonTitle} في التصميم)، العلوم (دراسة ${input.lessonTitle} في الطبيعة)`,
        verticalIntegration: `سيتعلم الطلاب في الصفوف اللاحقة المزيد عن ${input.lessonTitle} وتطبيقاته المتقدمة في الهندسة الفراغية`
      };
    } else if (lessonTitle.includes("الجبر") || lessonTitle.includes("المعادلات") || lessonTitle.includes("المتباينات")) {
      customLessonPlan = {
        objectives: [
          `أن يتعرف الطالب على مفهوم ${input.lessonTitle} وأنواعها`,
          `أن يحدد الطالب مكونات ${input.lessonTitle} وخصائصها`,
          `أن يحل الطالب ${input.lessonTitle} بطرق مختلفة`,
          `أن يمثل الطالب ${input.lessonTitle} بيانياً`,
          `أن يصيغ الطالب مسائل حياتية باستخدام ${input.lessonTitle}`,
          `أن يطبق الطالب ${input.lessonTitle} في حل مشكلات واقعية`
        ],
        materialsAndResources: [
          "كتاب الطالب",
          "السبورة التفاعلية",
          "أوراق عمل",
          "برمجية تعليمية للتمثيل البياني",
          "بطاقات المعادلات"
        ],
        procedures: [
          { activity: `التمهيد بطرح مشكلة حياتية تحتاج إلى ${input.lessonTitle} لحلها`, time: "5 دقائق" },
          { activity: `شرح مفهوم ${input.lessonTitle} وأنواعها`, time: "10 دقائق" },
          { activity: `توضيح خطوات حل ${input.lessonTitle} مع أمثلة متنوعة`, time: "15 دقيقة" },
          { activity: `تدريب الطلاب على حل ${input.lessonTitle} بشكل فردي`, time: "10 دقائق" },
          { activity: "نشاط جماعي: صياغة وحل مسائل حياتية", time: "10 دقائق" },
          { activity: "تلخيص الدرس وإعطاء واجب منزلي", time: "5 دقائق" }
        ],
        priorLearning: "العمليات الحسابية الأساسية والتعبيرات الرياضية",
        horizontalIntegration: `العلوم (استخدام ${input.lessonTitle} في الفيزياء)، الاقتصاد المنزلي (تطبيق ${input.lessonTitle} في حساب الميزانية)`,
        verticalIntegration: `سيتعلم الطلاب في الصفوف اللاحقة أنظمة ${input.lessonTitle} المتعددة وطرق حلها المتقدمة`
      };
    } else {
      // Default math lesson plan
      customLessonPlan = {
        objectives: [
          `أن يتعرف الطالب على مفهوم ${input.lessonTitle} وخصائصه`,
          `أن يطبق الطالب العمليات الحسابية على ${input.lessonTitle}`,
          `أن يحل الطالب مسائل متنوعة تتعلق بـ${input.lessonTitle}`,
          `أن يربط الطالب بين ${input.lessonTitle} والمفاهيم الرياضية الأخرى`,
          `أن يوظف الطالب ${input.lessonTitle} في حل مشكلات حياتية`,
          `أن يقدر الطالب أهمية ${input.lessonTitle} في الرياضيات`
        ],
        materialsAndResources: [
          "كتاب الطالب",
          "السبورة التفاعلية",
          "أوراق عمل",
          "وسائل تعليمية مناسبة",
          "برمجيات تعليمية"
        ],
        procedures: [
          { activity: `التمهيد بمراجعة المعارف السابقة المرتبطة بـ${input.lessonTitle}`, time: "5 دقائق" },
          { activity: `شرح مفهوم ${input.lessonTitle} مع أمثلة توضيحية`, time: "15 دقيقة" },
          { activity: "حل أمثلة متنوعة على السبورة", time: "10 دقائق" },
          { activity: "تدريبات فردية للطلاب", time: "10 دقائق" },
          { activity: "نشاط جماعي تطبيقي", time: "10 دقائق" },
          { activity: "تلخيص الدرس وإعطاء واجب منزلي", time: "5 دقائق" }
        ],
        priorLearning: `المفاهيم والمهارات الأساسية المرتبطة بـ${input.lessonTitle}`,
        horizontalIntegration: `العلوم (تطبيقات ${input.lessonTitle} في الفيزياء)، الدراسات الاجتماعية (استخدام ${input.lessonTitle} في تحليل البيانات)`,
        verticalIntegration: `سيتعلم الطلاب في الصفوف اللاحقة تطبيقات متقدمة لـ${input.lessonTitle}`
      };
    }
  }
  // Match Arabic language topics
  else if (input.subject === "اللغة العربية") {
    if (lessonTitle.includes("قصة") || lessonTitle.includes("قصص") || lessonTitle.includes("رواية") || lessonTitle.includes("حكاية")) {
      customLessonPlan = {
        objectives: [
          `أن يقرأ الطالب ${input.lessonTitle} قراءة جهرية صحيحة`,
          `أن يحدد الطالب الشخصيات الرئيسية والثانوية في ${input.lessonTitle}`,
          `أن يستخرج الطالب الأفكار الرئيسية من ${input.lessonTitle}`,
          `أن يحلل الطالب عناصر ${input.lessonTitle} (الشخصيات، الزمان، المكان، الحبكة)`,
          `أن يستنتج الطالب القيم المتضمنة في ${input.lessonTitle}`,
          `أن يكتب الطالب ملخصاً لـ${input.lessonTitle} بأسلوبه الخاص`
        ],
        materialsAndResources: [
          "كتاب الطالب",
          "نص القصة مطبوعاً",
          "صور توضيحية لأحداث القصة",
          "بطاقات الكلمات الصعبة",
          "خريطة للأحداث"
        ],
        procedures: [
          { activity: `التمهيد بإثارة فضول الطلاب حول موضوع ${input.lessonTitle}`, time: "5 دقائق" },
          { activity: `قراءة نموذجية لـ${input.lessonTitle} من قبل المعلم`, time: "10 دقائق" },
          { activity: "قراءات فردية من قبل الطلاب", time: "10 دقائق" },
          { activity: `مناقشة عناصر ${input.lessonTitle} وتحليلها`, time: "15 دقيقة" },
          { activity: `نشاط جماعي: تمثيل مشهد من ${input.lessonTitle}`, time: "10 دقائق" },
          { activity: "تلخيص الدرس وتكليف الطلاب بكتابة ملخص للقصة", time: "5 دقائق" }
        ],
        priorLearning: "مهارات القراءة الجهرية وتحليل النصوص الأدبية",
        horizontalIntegration: `التربية الإسلامية (القيم والأخلاق في ${input.lessonTitle})، الدراسات الاجتماعية (البيئة والزمان في ${input.lessonTitle})`,
        verticalIntegration: `سيتعمق الطلاب في تحليل ${input.lessonTitle} ودراسة الفنون القصصية بشكل أكثر تفصيلاً في الصفوف اللاحقة`
      };
    } else if (lessonTitle.includes("نحو") || lessonTitle.includes("قواعد") || lessonTitle.includes("إعراب")) {
      customLessonPlan = {
        objectives: [
          `أن يتعرف الطالب على مفهوم ${input.lessonTitle} وأقسامه`,
          `أن يميز الطالب بين أنواع ${input.lessonTitle} المختلفة`,
          `أن يحدد الطالب موقع ${input.lessonTitle} في الجملة`,
          `أن يعرب الطالب جملاً تتضمن ${input.lessonTitle}`,
          `أن يوظف الطالب ${input.lessonTitle} في جمل من إنشائه`,
          `أن يصحح الطالب الأخطاء المرتبطة بـ${input.lessonTitle}`
        ],
        materialsAndResources: [
          "كتاب الطالب",
          "السبورة التفاعلية",
          "بطاقات تعليمية",
          "لوحات حائطية توضح قواعد النحو",
          "أوراق عمل"
        ],
        procedures: [
          { activity: "التمهيد بأمثلة محفزة من واقع الطلاب", time: "5 دقائق" },
          { activity: `شرح مفهوم ${input.lessonTitle} وأقسامه`, time: "15 دقيقة" },
          { activity: "عرض أمثلة متنوعة على السبورة", time: "10 دقائق" },
          { activity: "تدريبات فردية على الإعراب", time: "10 دقائق" },
          { activity: "نشاط جماعي: تكوين جمل وإعرابها", time: "10 دقائق" },
          { activity: "تلخيص القاعدة النحوية وإعطاء واجب منزلي", time: "5 دقائق" }
        ],
        priorLearning: "المفاهيم النحوية الأساسية وأقسام الكلام",
        horizontalIntegration: "جميع المواد الدراسية من خلال التعبير الكتابي السليم",
        verticalIntegration: `سيدرس الطلاب في الصفوف اللاحقة قواعد نحوية أكثر تعقيداً مبنية على ${input.lessonTitle}`
      };
    } else if (lessonTitle.includes("بلاغة") || lessonTitle.includes("تشبيه") || lessonTitle.includes("استعارة") || lessonTitle.includes("كناية")) {
      customLessonPlan = {
        objectives: [
          `أن يتعرف الطالب على مفهوم ${input.lessonTitle} وأنواعه`,
          `أن يميز الطالب بين ${input.lessonTitle} وغيره من الأساليب البلاغية`,
          `أن يحلل الطالب نصوصاً أدبية تتضمن ${input.lessonTitle}`,
          `أن يستخرج الطالب ${input.lessonTitle} من النصوص المختلفة`,
          `أن ينتج الطالب جملاً تتضمن ${input.lessonTitle}`,
          `أن يقدر الطالب جمال ${input.lessonTitle} في النصوص الأدبية`
        ],
        materialsAndResources: [
          "كتاب الطالب",
          "مختارات من النصوص الأدبية",
          "بطاقات تعليمية للأساليب البلاغية",
          "السبورة التفاعلية",
          "عرض تقديمي"
        ],
        procedures: [
          { activity: "التمهيد بقراءة نص أدبي جميل", time: "5 دقائق" },
          { activity: `شرح مفهوم ${input.lessonTitle} وأنواعه`, time: "15 دقيقة" },
          { activity: "تحليل أمثلة متنوعة من النصوص", time: "10 دقائق" },
          { activity: `تدريب الطلاب على استخراج ${input.lessonTitle} من النصوص`, time: "10 دقائق" },
          { activity: `نشاط إبداعي: كتابة جمل تتضمن ${input.lessonTitle}`, time: "10 دقائق" },
          { activity: "تلخيص الدرس وإعطاء واجب منزلي", time: "5 دقائق" }
        ],
        priorLearning: "المفاهيم اللغوية الأساسية والتعبير الكتابي",
        horizontalIntegration: `التربية الإسلامية (${input.lessonTitle} في النصوص الدينية)، التاريخ (النصوص الأدبية التاريخية)`,
        verticalIntegration: `سيدرس الطلاب في الصفوف اللاحقة أساليب بلاغية أكثر تعقيداً مرتبطة بـ${input.lessonTitle}`
      };
    } else {
      // Default Arabic language lesson plan
      customLessonPlan = {
        objectives: [
          `أن يقرأ الطالب نص ${input.lessonTitle} قراءة جهرية صحيحة`,
          `أن يفسر الطالب المفردات الجديدة الواردة في نص ${input.lessonTitle}`,
          `أن يستخرج الطالب الأفكار الرئيسية لـ${input.lessonTitle}`,
          `أن يحلل الطالب العناصر الفنية في ${input.lessonTitle}`,
          `أن يستنتج الطالب القيم المتضمنة في ${input.lessonTitle}`,
          `أن يعبر الطالب عن رأيه في ${input.lessonTitle} بأسلوبه الخاص`
        ],
        materialsAndResources: [
          "كتاب الطالب",
          "السبورة",
          "بطاقات الكلمات الصعبة",
          "صور توضيحية للنص",
          "جهاز عرض"
        ],
        procedures: [
          { activity: `التمهيد للدرس من خلال مناقشة الصور المتعلقة بـ${input.lessonTitle}`, time: "5 دقائق" },
          { activity: `قراءة نموذجية لنص ${input.lessonTitle} من قبل المعلم`, time: "10 دقائق" },
          { activity: "قراءة فردية من بعض الطلاب مع تصحيح الأخطاء", time: "10 دقيقة" },
          { activity: `مناقشة الأفكار الرئيسية وشرح المفردات الصعبة في ${input.lessonTitle}`, time: "15 دقائق" },
          { activity: "نشاط جماعي: تحليل النص", time: "10 دقائق" },
          { activity: "تلخيص الدرس وإعطاء واجب منزلي", time: "5 دقائق" }
        ],
        priorLearning: "مهارات القراءة الجهرية وتحديد معاني المفردات من السياق",
        horizontalIntegration: `التربية الإسلامية (القيم والأخلاق الواردة في ${input.lessonTitle})، الدراسات الاجتماعية (البيئة المذكورة في ${input.lessonTitle})`,
        verticalIntegration: `في الصف التالي سيتعلم الطلاب تحليل نصوص مشابهة لـ${input.lessonTitle} بشكل أعمق`
      };
    }
  }
  // Default structure for any subject
  else {
    customLessonPlan = {
      objectives: [
        `أن يتعرف الطالب على المفاهيم الأساسية لـ${input.lessonTitle}`,
        `أن يشرح الطالب العناصر الرئيسية في ${input.lessonTitle}`,
        `أن يحلل الطالب المكونات المختلفة لـ${input.lessonTitle}`,
        `أن يطبق الطالب المعارف المكتسبة من ${input.lessonTitle} في مواقف جديدة`,
        `أن يقيّم الطالب أهمية ${input.lessonTitle} في المادة الدراسية`,
        `أن ينتج الطالب عملاً إبداعياً يعكس فهمه لـ${input.lessonTitle}`
      ],
      materialsAndResources: [
        "كتاب الطالب",
        "السبورة التفاعلية",
        "عرض تقديمي",
        "صور ووسائل توضيحية",
        "أوراق عمل"
      ],
      procedures: [
        { activity: `التمهيد للدرس بمراجعة المعارف السابقة المرتبطة بـ${input.lessonTitle}`, time: "5 دقائق" },
        { activity: `عرض المفاهيم الأساسية لـ${input.lessonTitle}`, time: "15 دقيقة" },
        { activity: `شرح تفصيلي لعناصر ${input.lessonTitle}`, time: "10 دقائق" },
        { activity: "نشاط فردي لتطبيق المفاهيم", time: "10 دقائق" },
        { activity: "نشاط جماعي: حل مشكلات مرتبطة بالدرس", time: "10 دقائق" },
        { activity: "تلخيص الدرس وإعطاء واجب منزلي", time: "5 دقائق" }
      ],
      priorLearning: `المعارف والمهارات السابقة المرتبطة بـ${input.lessonTitle}`,
      horizontalIntegration: `الربط مع المواد الدراسية الأخرى ذات الصلة بـ${input.lessonTitle}`,
      verticalIntegration: `سيتم تناول موضوعات متقدمة مرتبطة بـ${input.lessonTitle} في الصفوف اللاحقة`
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
      - النتاجات الخاصة (أهداف الدرس): قائمة بأهداف الدرس (5-6 أهداف) مرتبطة مباشرة بعنوان الدرس "${input.lessonTitle}"
      - استراتيجيات التدريس: قائمة بأساليب التدريس المناسبة (3-4 استراتيجيات)
      - استراتيجيات التقويم: قائمة بأساليب التقييم (2-3 استراتيجيات)
      - أدوات التقويم: قائمة بأدوات التقييم (2-3 أدوات)
      - المواد والأدوات والتجهيزات (مصادر التعلم): قائمة بالمواد والموارد المطلوبة (4-5 عناصر) مرتبطة مباشرة بعنوان الدرس "${input.lessonTitle}"
      - الإجراءات: قائمة بالأنشطة التي سيقوم بها المعلم مع التوقيت الزمني لكل نشاط (5-6 أنشطة) مرتبطة مباشرة بعنوان الدرس "${input.lessonTitle}"
      - التعلم القبلي: ما هي المعارف السابقة المرتبطة بهذا الدرس
      - التكامل الأفقي: كيف يرتبط هذا الدرس بالمواد الدراسية الأخرى
      - التكامل الرأسي: كيف يرتبط هذا الدرس بمحتوى المادة نفسها في صفوف أخرى
      - التأمل الذاتي: تعليق قصير عن الشعور بالرضا عن الدرس
      - تحديات واجهتني: تعليق قصير عن التحديات المحتملة
      - اقتراحات للتحسين: تعليق قصير عن كيفية تحسين الدرس مستقبلاً
      
      أعط إجابتك باللغة العربية فقط، وبصيغة JSON. اجعل الإجابة مناسبة للصف الدراسي والمادة المحددة.
      تأكد من أن كل محتوى خطة الدرس مرتبط مباشرة بعنوان الدرس "${input.lessonTitle}" وليس عاماً.
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
