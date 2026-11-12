import demoAr from "./demo-ar" // @demo remove-current-line
import { Translations } from "./en"

const ar: Translations = {
  common: {
    ok: "حسنًا",
    cancel: "إلغاء",
    back: "رجوع",
    logOut: "تسجيل الخروج", // @demo remove-current-line
  },
  welcomeScreen: {
    postscript:
      "بالمناسبة، ربما لن يبدو تطبيقك بهذا الشكل. (إلا إذا سلّمك المصمم هذه الشاشات، ففي هذه الحالة، أطلقه!)",
    readyForLaunch: "تطبيقك جاهز تقريبًا للإطلاق!",
    exciting: "(يا له من أمر مثير!)",
    letsGo: "لنبدأ", // @demo remove-current-line
  },
  errorScreen: {
    title: "حدث خطأ ما!",
    friendlySubtitle:
      "هذه هي الشاشة التي سيراها المستخدمون عند حدوث خطأ في النسخة المنشورة من التطبيق. يمكنك تخصيص هذه الرسالة (في `app/i18n/ar.ts`) وربما تخطيط الشاشة أيضًا (في `app/screens/ErrorScreen`). لإزالة هذه الشاشة بالكامل، راجع المكوّن <ErrorBoundary> في `app/app.tsx`.",
    reset: "إعادة تعيين التطبيق",
    traceTitle: "خطأ في مكدس الاستدعاءات %{name}", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "فارغ تمامًا... يا للأسف",
      content: "لا توجد بيانات بعد. جرّب الضغط على الزر لتحديث التطبيق أو إعادة تحميله.",
      button: "لنحاول مرة أخرى",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "عنوان البريد الإلكتروني غير صالح.",
  },
  loginScreen: {
    logIn: "تسجيل الدخول",
    enterDetails:
      "أدخل بياناتك أدناه للاطلاع على معلومات سرية للغاية. لن تتخيل ما ينتظرك. أو ربما تتخيله؛ فالأمر ليس معقدًا إلى هذا الحد.",
    emailFieldLabel: "البريد الإلكتروني",
    passwordFieldLabel: "كلمة المرور",
    emailFieldPlaceholder: "أدخل عنوان بريدك الإلكتروني",
    passwordFieldPlaceholder: "أدخل كلمة مرور سرية للغاية",
    tapToLogIn: "اضغط لتسجيل الدخول!",
    hint: "تلميح: يمكنك استخدام أي عنوان بريد إلكتروني وكلمة المرور المفضلة لديك :)",
  },
  demoNavigator: {
    componentsTab: "المكوّنات",
    debugTab: "تصحيح الأخطاء",
    communityTab: "المجتمع",
    podcastListTab: "البودكاست",
  },
  demoCommunityScreen: {
    title: "تواصل مع المجتمع",
    tagLine:
      "انضم إلى مجتمع مطوّري React Native في Infinite Red، وارتقِ بمهاراتك في تطوير التطبيقات معنا!",
    joinUsOnSlackTitle: "انضم إلينا على Slack",
    joinUsOnSlack:
      "هل تبحث عن مكان للتواصل مع مطوّري React Native حول العالم؟ انضم إلى النقاش في مجتمع Infinite Red على Slack! مجتمعنا المتنامي مساحة آمنة لطرح الأسئلة والتعلّم من الآخرين وتوسيع شبكة علاقاتك.",
    joinSlackLink: "انضم إلى مجتمع Slack",
    makeIgniteEvenBetterTitle: "ساهم في تحسين Ignite",
    makeIgniteEvenBetter:
      "هل لديك فكرة لتحسين Ignite؟ يسعدنا سماعها! نبحث دائمًا عمّن يرغب في مساعدتنا على بناء أفضل أدوات React Native. انضم إلينا على GitHub وساهم في بناء مستقبل Ignite.",
    contributeToIgniteLink: "ساهم في Ignite",
    theLatestInReactNativeTitle: "آخر مستجدات React Native",
    theLatestInReactNative: "نحن هنا لنطلعك على آخر ما تقدّمه React Native.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "نشرة React Native الإخبارية",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "مؤتمر Chain React",
    hireUsTitle: "استعن بفريق Infinite Red في مشروعك القادم",
    hireUs:
      "سواء كنت تحتاج إلى تنفيذ مشروع كامل أو تطوير مهارات فريقك من خلال تدريبنا العملي، يمكن لفريق Infinite Red مساعدتك في أي مشروع React Native تقريبًا.",
    hireUsLink: "أرسل إلينا رسالة",
  },
  demoShowroomScreen: {
    jumpStart: "مكوّنات تمنح مشروعك انطلاقة سريعة!",
    lorem2Sentences:
      "هذا نص تجريبي لعرض المكوّنات واختبار تنسيقها. يمكنك استبداله بالمحتوى المناسب لتطبيقك.",
    demoHeaderTxExample: "رائع!",
    demoViaTxProp: "عبر الخاصية `tx`",
    demoViaSpecifiedTxProp: "عبر الخاصية `{{prop}}Tx`",
  },
  demoDebugScreen: {
    howTo: "طريقة الاستخدام",
    title: "تصحيح الأخطاء",
    tagLine: "تهانينا، لديك قالب متقدّم لتطبيق React Native. استفد من هذا القالب!",
    reactotron: "إرسال إلى Reactotron",
    reportBugs: "الإبلاغ عن أخطاء",
    demoList: "قائمة تجريبية",
    demoPodcastList: "قائمة البودكاست التجريبية",
    androidReactotronHint:
      "إذا لم ينجح ذلك، فتأكد من تشغيل تطبيق Reactotron على الحاسوب، ونفّذ الأمر `adb reverse tcp:9090 tcp:9090` في الطرفية، ثم أعد تحميل التطبيق.",
    iosReactotronHint:
      "إذا لم ينجح ذلك، فتأكد من تشغيل تطبيق Reactotron على الحاسوب، ثم أعد تحميل التطبيق.",
    macosReactotronHint:
      "إذا لم ينجح ذلك، فتأكد من تشغيل تطبيق Reactotron على الحاسوب، ثم أعد تحميل التطبيق.",
    webReactotronHint:
      "إذا لم ينجح ذلك، فتأكد من تشغيل تطبيق Reactotron على الحاسوب، ثم أعد تحميل التطبيق.",
    windowsReactotronHint:
      "إذا لم ينجح ذلك، فتأكد من تشغيل تطبيق Reactotron على الحاسوب، ثم أعد تحميل التطبيق.",
  },
  demoPodcastListScreen: {
    title: "حلقات React Native Radio",
    onlyFavorites: "المفضلة فقط",
    favoriteButton: "إضافة إلى المفضلة",
    unfavoriteButton: "إزالة من المفضلة",
    accessibility: {
      cardHint:
        "اضغط مرتين للاستماع إلى الحلقة. اضغط مرتين مع الاستمرار لتطبيق الإجراء «{{action}}» على هذه الحلقة.",
      switch: "فعّل المفتاح لعرض المفضلة فقط.",
      favoriteAction: "تغيير حالة التفضيل",
      favoriteIcon: "الحلقة غير مضافة إلى المفضلة",
      unfavoriteIcon: "الحلقة مضافة إلى المفضلة",
      publishLabel: "نُشرت في {{date}}",
      durationLabel:
        "المدة: عدد الساعات {{hours}}، وعدد الدقائق {{minutes}}، وعدد الثواني {{seconds}}",
    },
    noFavoritesEmptyState: {
      heading: "تبدو هذه القائمة فارغة بعض الشيء",
      content:
        "لم تُضف أي حلقات إلى المفضلة بعد. اضغط على القلب بجانب إحدى الحلقات لإضافتها إلى المفضلة!",
    },
  },
  // @demo remove-block-start
  ...demoAr,
  // @demo remove-block-end
}

export default ar
