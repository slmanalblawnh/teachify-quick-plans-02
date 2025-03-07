
# تطبيق إعداد خطط الدروس - تطبيق أندرويد

## تعليمات تشغيل المشروع في Visual Studio Code

لتشغيل المشروع في Visual Studio Code، اتبع الخطوات التالية:

1. قم بتثبيت Node.js وNPM من الموقع الرسمي: https://nodejs.org/
2. قم بتثبيت Visual Studio Code من الموقع الرسمي: https://code.visualstudio.com/
3. افتح Visual Studio Code وقم بتثبيت الإضافات التالية:
   - ESLint
   - Prettier
   - TypeScript
   - Vetur (لدعم ملفات Vue)
4. افتح المشروع في Visual Studio Code عبر File > Open Folder وحدد مجلد المشروع
5. افتح Terminal في Visual Studio Code عبر Terminal > New Terminal
6. قم بتثبيت حزم المشروع عبر الأمر:
   ```
   npm install
   ```
7. لتشغيل المشروع في وضع التطوير:
   ```
   npm run dev
   ```
8. يمكنك الوصول للتطبيق عبر المتصفح على الرابط: http://localhost:8080

## تحويل المشروع إلى تطبيق أندرويد

لتحويل المشروع إلى تطبيق أندرويد، اتبع الخطوات التالية:

1. تأكد من تثبيت Android Studio من الموقع الرسمي: https://developer.android.com/studio
2. قم بإعداد Android SDK وتأكد من تثبيت أحدث إصدار من Android SDK
3. أضف منصة أندرويد للمشروع:
   ```
   npx cap add android
   ```
4. قم ببناء المشروع:
   ```
   npm run build
   ```
5. قم بمزامنة الملفات مع مشروع أندرويد:
   ```
   npx cap sync
   ```
6. افتح المشروع في Android Studio:
   ```
   npx cap open android
   ```
7. في Android Studio، يمكنك تشغيل التطبيق على جهاز محاكاة أو جهاز حقيقي

## هيكل المشروع

```
teachify-quick-plans-02/
├── public/                  # ملفات ثابتة (الصور والأيقونات)
├── src/                     # كود المصدر
│   ├── components/          # مكونات قابلة لإعادة الاستخدام
│   │   ├── ui/              # مكونات واجهة المستخدم الأساسية
│   │   ├── FormInput.tsx    # مكون حقل الإدخال
│   │   ├── FormSelect.tsx   # مكون القائمة المنسدلة
│   │   └── ...
│   ├── hooks/               # هوكس React المخصصة
│   ├── lib/                 # مكتبات وأدوات مساعدة
│   ├── pages/               # صفحات التطبيق
│   │   ├── Index.tsx        # الصفحة الرئيسية
│   │   ├── LessonForm.tsx   # نموذج إنشاء خطة الدرس
│   │   ├── PreviewEdit.tsx  # معاينة وتحرير خطة الدرس
│   │   └── ...
│   ├── services/            # خدمات وواجهات برمجة التطبيق
│   ├── App.tsx              # مكون التطبيق الرئيسي
│   └── main.tsx             # نقطة الدخول للتطبيق
├── capacitor.config.ts      # إعدادات Capacitor
├── vite.config.ts           # إعدادات Vite
├── tsconfig.json            # إعدادات TypeScript
└── package.json             # تبعيات المشروع
```
