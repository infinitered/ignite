import { DemoTranslations } from "./demo-en"

export const demoAr: DemoTranslations = {
  demoIcon: {
    description:
      "مكون لعرض أيقونة مسجلة.يتم تغليفه في <TouchableOpacity> يتم توفير 'OnPress'، وإلا يتم توفير <View",
    useCase: {
      icons: {
        name: "Icons",
        description: "قائمة الرموز المسجلة داخل المكون.",
      },
      size: {
        name: "Size",
        description: "هناك حجم الدعامة.",
      },
      color: {
        name: "لون",
        description: "هناك لون الدعامة.",
      },
      styling: {
        name: "التصميم",
        description: "يمكن تصميم المكون بسهولة.",
      },
    },
  },
  demoTextField: {
    description: "TextField يسمح المكون بإدخال النص وتحريره.",
    useCase: {
      statuses: {
        name: "الحالات",
        description:
          "هناك حالة مماثلة ل 'preset' في المكونات الأخرى، ولكنها تؤثر على وظيفة المكون ايضاً.",
        noStatus: {
          label: "لا يوجد حالات",
          helper: "هذه هي الحالة الافتراضية",
          placeholder: "النص يذهب هنا",
        },
        error: {
          label: "حالة الخطأ",
          helper: "الحالة التي يجب استخدامها عند وجود خطأ",
          placeholder: "النص يذهب هنا",
        },
        disabled: {
          label: "حالة الإعاقة",
          helper: "يعطل إمكانية التحرير ويكتم النص",
          placeholder: "النص يذهب هنا",
        },
      },
      passingContent: {
        name: "محتوى عابر",
        description: "هناك عدة طرق مختلفة لتمرير المحتوى",
        viaLabel: {
          labelTx: "عبر 'label' الدعامة",
          helper: "عبر 'helper' الدعامة",
          placeholder: "عبر 'placeholder' الدعامة",
        },
        rightAccessory: {
          label: "RightAccessory",
          helper: "هذه الدعامة تأخذ دالة تقوم بإرجاع عنصر React",
        },
        leftAccessory: {
          label: "LeftAccessory",
          helper: "هذه الدعامة تأخذ دالة تقوم بإرجاع عنصر React",
        },
        supportsMultiline: {
          label: "يدعم Multiline",
          helper: "يتيح إدخالا اطول للنص متعدد الأسطر.",
        },
      },
      styling: {
        name: "التصميم",
        description: "يمكن تصميم المكون بسهولة",
        styleInput: {
          label: "أسلوب الإدخال",
          helper: "عبر دعامة 'Style'",
        },
        styleInputWrapper: {
          label: "غلاف ادخال النمط",
          helper: "عبر دعامة 'InputWrapperStyle'",
        },
        styleContainer: {
          label: "حاوية النمط",
          helper: "عبر دعامة 'containerstyle'",
        },
        styleLabel: {
          label: "تسمية النمط والمساعد",
          helper: "عبر أسلوب الدعامة 'LabelTextProps' & 'HelperTextProps'",
        },
        styleAccessories: {
          label: "اكسسورات الاناقة",
          helper: "عبر أسلوب الدعامة 'RightAccessory' & 'LeftAccessory'",
        },
      },
    },
  },
  demoToggle: {
    description:
      "يقوم بعرض ادخال منطقي.هذا مكون خاضع للتحكم ويتطلب استدعاء OnValueChanger الذي يقوم بتحديث خاصية القيمة حتى يعكس المكون إجراءات المستخدم. إذا لم يتم تحديث خاصية القيمة، فسيستمر المكون في عرض خاصية القيمة المقدمة بدلا من النتيجة المتوقعة لأي إجراءات مستخدم.",
    useCase: {
      variants: {
        name: "المتغيرات",
        description:
          "تدعم المكونات عددا قليلا من المتغيرات المختلفة. اذا كانت هناك حاجة إلى تخصيص كبير لمتغير معين، فيمكن إعادة صياغته بسهولة. الافتراضي هو 'checkbox'",
        checkbox: {
          label: "'checkbox' متغير",
          helper: "يمكن استخدامه كمدخل تشغيل \\ إيقاف واحد",
        },
        radio: {
          label: "'radio' متغير",
          helper: "استخدام هذا عندما يكون لديك خيارات متعددة",
        },
        switch: {
          label: "'switch' متغير",
          helper: "مدخل تشغيل/إيقاف أكثر بروزا. يتمتع بدعم إمكانية الوصول بشكل أفضل.",
        },
      },
      statuses: {
        name: "الحالات",
        description:
          "هناك دعامة حالة مشابهة ل 'preset' في المكونات الأخرى، لكنها تؤثر على وظائف المكونات ايضاً",
        noStatus: "لا توجد حالات- هذا هو الوضع الافتراضي",
        errorStatus: "حالة الخطأ - استخدمها عندما يكون هناك خطأ",
        disabledStatus: "حالة معطلة- تعطيل إمكانية التحرير وكتم صوت الإدخال",
      },
      passingContent: {
        name: "محتوى عابر",
        description: "هناك عدة طرق مختلفة لتمرير المحتوى",
        useCase: {
          checkBox: {
            label: "عبر دعامة 'labelTx'",
            helper: "عبر دعامة 'helpertx'",
          },
          checkBoxMultiLine: {
            helper: "يدعم خطوط متعددة-Nulla provident consectetur labore sunt ea labore ",
          },
          radioChangeSides: {
            helper: "يمكنك تغيير الجانبين - Laborum labore adipisicing in eu ipsum deserunt.",
          },
          customCheckBox: {
            label: "مرر أيقونة مربع الاختيار المخصص",
          },
          switch: {
            label: "يمكن قراءة المفاتيح كنص",
            helper:
              "بشكل افتراضي، لا يستخدم هذا الخيار \"text' نظرا لأنه اعتمادا على الخط، قد تبدو الأحرف التي يتم تشغيلها/ايقافها غريبة. قم بالتخصيص حسب الحاجة",
          },
          switchAid: {
            label: "او بمساعدة أيقونة",
          },
        },
      },
      styling: {
        name: "التصميم",
        description: "يمكن تصميم المكون بسهولة",
        outerWrapper: "١- تصميم الغلاف الخارجي للإدخال",
        innerWrapper: "٢- تصميم الغلاف الداخلي للإدخال",
        inputDetail: "٣- تصميم تفاصيل الإدخال",
        labelTx: "يمكنك ايضاً تصميم الملصق labelTx",
        styleContainer: "او، قم بتصميم الحاوية بأكملها",
      },
    },
  },
  demoButton: {
    description:
      "مكون يسمح للمستخدمين بإتخاذ الإجراءات والاختيارات. يلف مكون النص بمكون قابل للضغط",
    useCase: {
      presets: {
        name: "الإعدادات المسبقة",
        description: "هناك عدد قليل من الإعدادات المسبقة التي تم تكوينها مسبقاً",
      },
      passingContent: {
        name: "محتوى عابر",
        description: "هناك عدة طرق مختلفة لتمرير المحتوى",
        viaTextProps: "عبر الدعامة 'text'- Billum In",
        children: "أولاد- Irure Reprehenderit",
        rightAccessory: "RightAccessory - Duis Quis",
        leftAccessory: "LeftAccessory - Duis Proident",
        nestedChildren: "الأطفال المتداخلون-\tprovident genial",
        nestedChildren2: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
        nestedChildren3: "Occaecat aliqua irure proident veniam.",
        multiLine:
          "Multiline - consequat veniam veniam reprehenderit. Fugiat id nisi quis duis sunt proident mollit dolor mollit adipisicing proident deserunt.",
      },
      styling: {
        name: "التصميم",
        description: "يمكن تصميم المكون بسهولة",
        styleContainer: "حاوية الأسلوب- الإثارة",
        styleText: "نص النمط- ِEa Anim",
        styleAccessories: "اكسسوارات الاناقة - enim ea id fugiat anim ad.",
        pressedState: "نمط الحالة المضغوطة - fugiat anim",
      },
      disabling: {
        name: "تعطيل",
        description: "يمكن تعطيل المكون، وتصميمه بناء على ذلك. سيتم تعطيل سلوك الضغط",
        standard: "إبطال - معيار",
        filled: "إبطال - مملوء",
        reversed: "إبطال- معكوس",
        accessory: "نمط الملحق المعطل",
        textStyle: "نمط النص المعطل",
      },
    },
  },
  demoListItem: {
    description: "مكون صف مصمم يمكن استخدامه في FlatList او SectionList او بمفرده",
    useCase: {
      height: {
        name: "علو",
        description: "يمكن ان يكون الصف بارتفاعات مختلفة",
        defaultHeight: "الارتفاع الافتراضي (56px)",
        customHeight: "ارتفاع مخصص عبر دعامة 'height'",
        textHeight:
          "الارتفاع يتم تحديده من خلال محتوى النص - Reprehenderit incididunt deserunt do do ea labore.",
        longText: "تحديد النص إلى سطر واحد - Reprehenderit incididunt deserunt do do ea labore.",
      },
      separators: {
        name: "الفواصل",
        description: "الفاصل/ المقسم مهيّأ مسبقاً وهو اختياري",
        topSeparator: "فقط فاصل علوي",
        topAndBottomSeparator: "الفواصل العلوية والسفلية",
        bottomSeparator: "فقط فاصل سفلي",
      },
      icons: {
        name: "الأيقونات",
        description: "يمكنك تخصيص الرموز على اليسار أو اليمين",
        leftIcon: "أيقونة اليسار",
        rightIcon: "أيقونة اليمين",
        leftRightIcons: "أيقونة اليمين واليسار",
      },
      customLeftRight: {
        name: "مكونات مخصصة لليسار /اليمين",
        description: "اذا كنت بحاجة إلى مخصص لليسار/اليمين فيمكنك تمريره",
        customLeft: "مكون يسار مخصص",
        customRight: "مكون يمين مخصص",
      },
      passingContent: {
        name: "محتوى عابر",
        description: "هناك عدة طرق مختلفة لتمرير المحتوى",
        text: "عبر دعامة 'text' - reprehenderit sint",
        children: "أولاد- mostrud mollit",
        nestedChildren1: "الأولاد المتداخلون - proident veniam.",
        nestedChildren2: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
      },
      listIntegration: {
        name: "دمج مع/ FlatList & FlashList",
        description: "يمكن دمج المكون بسهولة مع واجهة القائمة المفضلة لديك",
      },
      styling: {
        name: "التصميم",
        description: "يمكن تصميم المكون بسهولة.",
        styledText: "نص مصمم",
        styledContainer: "حاوية مصممة (فواصل)",
        tintedIcons: "أيقونات ملونة",
      },
    },
  },
  demoCard: {
    description:
      "البطاقات مفيدة لعرض المعلومات ذات الصلة بطريقة محددة. اذا كان ListItem يعرض المحتوى أفقياً، فيمكن استخدام البطاقة لعرض المحتوى رأسياً.",
    useCase: {
      presets: {
        name: "الإعدادات المسبقة",
        description: "هناك عدد قليل من الإعدادات المسبقة التي تم تكوينها مسبقاً",
        default: {
          heading: "الأعداد المسبق الافتراضي ( تقصير)",
          content: "Incididunt magna ut aliquip consectetur mollit dolor.",
          footer: "Consectetur nulla non aliquip velit.",
        },
        reversed: {
          heading: "الأعداد المسبق المعكوس",
          content: "Reprehenderit occaecat proident amet id laboris.",
          footer: "Consectetur tempor ea non labore anim .",
        },
      },
      verticalAlignment: {
        name: "انحياز عمودي",
        description:
          "اعتمادا على ما هو مطلوب، تأتي البطاقة مهيأة مسبقاً باستراتيجيات محاذاة مختلفة",
        top: {
          heading: "قمة (تقصير)",
          content: "يتم محاذاة كل محتوى تلقائياً إلى الأعلى",
          footer: "حتى التذييل",
        },
        center: {
          heading: "مركز",
          content: "يتم تركيز المحتوى بالنسبة لارتفاع البطاقة",
          footer: "أنا ايضاً!",
        },
        spaceBetween: {
          heading: "مسافة بين الكلمات",
          content: "يتم توزيع جميع المحتويات بالتساوي",
          footer: "أنا حيث أريد ان أكون",
        },
        reversed: {
          heading: "Force Footer Bottom",
          content: "يؤدي هذا إلى دفع التذييل إلى المكان الذي ينتمي اليه.",
          footer: "أنا وحد جداًهنا",
        },
      },
      passingContent: {
        name: "محتوى عابر",
        description: "هناك عدة طرق مختلفة لتمرير المحتوى.",
        heading: "عبر دعم 'heading'",
        content: "عبر دعم 'content'",
        footer: "أنا وحيد هنا.",
      },
      customComponent: {
        name: "مكونات مخصصة",
        description:
          "يمكن استبدال اي من المكونات المعدة مسبقاً بمكوناتك الخاصة. يمكنك ايضاً اضافة مكونات إضافية.",
        rightComponent: "RightComponent",
        leftComponent: "LeftComponent",
      },
      style: {
        name: "التصميم",
        description: "يمكن تصميم المكون بسهولة.",
        heading: "صمم العنوان",
        content: "صمم المحتوى",
        footer: "صمم التذييل",
      },
    },
  },
  demoAutoImage: {
    description: "مكون صورة يحدد حجم الصورة البعيدة او صورة data-uri",
    useCase: {
      remoteUri: {
        name: "عن بعد URI",
      },
      base64Uri: {
        name: "Base64 URI",
      },
      scaledToFitDimensions: {
        name: "تم قياسها لتناسب الأبعاد",
        description:
          " توفيرعرض  'maxWidth' و\\او 'maxHeight' ، سيتم عرض الصورة بنسبة عرض الى ارتفاع. كيف يختلف هذا عن 'resizeMode': 'contain'? اولاً،يمكنك تحديد حجم جانب واحد فقط. (ليس كلاهما). ثانياً، سيتم تغيير الصورة لتناسب الأبعاد المطلوبة بدلاً من مجرد احتوائها داخل حاوية الصورة الخاصة بها.",
        heightAuto: " عرض : ٦٠ / طول:  auto",
        widthAuto: "عرض: auto / طول: ٣٢",
        bothManual: "عرض :٦٠ / طول : ٦٠",
      },
    },
  },
  demoText: {
    description:
      "لتلبية احتياجاتك في عرض النصوص. هذا المكون عبارة عن HOC فوق المكون المدمج Native React.",
    useCase: {
      presets: {
        name: "الإعدادات المسبقة",
        description: "هناك عدد قليل من الإعدادات المسبقة التي تم تكوينها مسبقاً.",
        default:
          "الأعداد المسبق الافتراضي - Cillum eu laboris in labore. Excepteur mollit tempor reprehenderit fugiat elit et eu consequat laborum.",
        bold: "bold preset - Tempor et ullamco cupidatat in officia. Nulla ea duis elit id sunt ipsum cillum duis deserunt nostrud ut nostrud id.",
        subheading: "subheading preset - In Cupidatat Cillum.",
        heading: "heading preset - Voluptate Adipis.",
      },
      sizes: {
        name: "قياسات",
        description: "هناك حجم الدعامة",
        xs: "xs - Ea ipsum est ea ex sunt.",
        sm: "sm - Lorem sunt adipisicin.",
        md: "md - Consequat id do lorem.",
        lg: "lg - Nostrud ipsum ea.",
        xl: "xl - Eiusmod ex excepteur.",
        xxl: "xxl - Cillum eu laboris.",
      },
      weights: {
        name: "أوزان",
        description: "هناك وزن الدعامة",
        light:
          "light - Nulla magna incididunt excepteur est occaecat duis culpa dolore cupidatat enim et.",
        normal:
          "normal - Magna incididunt dolor ut veniam veniam laboris aliqua velit ea incididunt.",
        medium: "medium - Non duis laborum quis laboris occaecat culpa cillum.",
        semibold: "semiBold - Exercitation magna nostrud pariatur laborum occaecat aliqua.",
        bold: "bold - Eiusmod ullamco magna exercitation est excepteur.",
      },
      passingContent: {
        name: "محتوى عابر",
        description: "هناك عدة طرق مختلفة لتمرير المحتوى.",
        viaText:
          "via `text` prop - Billum in aute fugiat proident nisi pariatur est. Cupidatat anim cillum eiusmod ad. Officia eu magna aliquip labore dolore consequat.",
        viaTx: "عبر دعامة 'tx'",
        children: "childrenreprehenderit eu qui amet veniam consectetur.",
        nestedChildren: "الأطفال المتداخلون",
        nestedChildren2: "Occaecat aliqua irure proident veniam.",
        nestedChildren3: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
        nestedChildren4: "Occaecat aliqua irure proident veniam.",
      },
      styling: {
        name: "التصميم",
        description: "يمكن تصميم المكون بسهولة.",
        text: "Consequat ullamco veniam velit mollit proident excepteur aliquip id culpa ipsum velit sint nostrud.",
        text2:
          "Eiusmod occaecat laboris eu ex veniam ipsum adipisicing consectetur. Magna ullamco adipisicing tempor adipisicing.",
        text3:
          "Eiusmod occaecat laboris eu ex veniam ipsum adipisicing consectetur. Magna ullamco adipisicing tempor adipisicing.",
      },
    },
  },
  demoHeader: {
    description: "المكون الذي يظهر على العديد من الشاشات، سيحمل ازرار التنقل وعنوان الشاشة.",
    useCase: {
      actionIcons: {
        name: "أيقونة الإجرائات ",
        description: "يمكنك بسهولة تمرير الرموزالى مكونات الاجراء اليسرى او اليمنى.",
        leftIconTitle: "الرمز الأيسر",
        rightIconTitle: "الرمز الأيمن ",
        bothIconsTitle: "كلا الرمزين",
      },
      actionText: {
        name: "نص العمل",
        description: "يمكنك بسهولة تمرير النص الى مكونات الاجراء اليسرى او اليمنى.",
        leftTxTitle: "عبر 'leftTx' ",
        rightTextTitle: "عبر `rightText`",
      },
      customActionComponents: {
        name: "مكونات الاجراء المخصص",
        description:
          "اذا لم تكن خيارات الرمز او النسكافية، فيمكنك تمرير مكون الاجراء المخصص الخاص بك.",
        customLeftActionTitle: "عمل يسار مخصص ",
      },
      titleModes: {
        name: "اوضاع العنوان",
        description:
          "يمكن اجبار العنوان على البقاء غي المنتصف ولكن قد يتم قطعه اذا كان طويلاً للغاية. يمكنك بشكل اختياري تعديله وفقاً لأزرار الإجراء.",
        centeredTitle: "عنوان مركزي",
        flexTitle: "عنوان مرن",
      },
      styling: {
        name: "التصميم",
        description: "يمكن تصميم المكون بسهولة",
        styledTitle: "عنوان مصمم",
        styledWrapperTitle: "غلاف مصمم",
        tintedIconsTitle: "أيقونات ملونة",
      },
    },
  },
  demoEmptyState: {
    description:
      "مكون يتم استخدامه عندما لا يكون هناك بيانات لعرضها. ويمكن استخدامه لتوجيه المستخدم الى ما يجب فعله بعد ذلك.",
    useCase: {
      presets: {
        name: "الإعدادات المسبقة",
        description:
          "يمكن إنشاء نص/صورة مختلفة مجموعات. واحد محدد مسبقاً يسمى 'generic'. لاحظ انه لا يوجد اي خيار افتراضي في حال رغبتك في الحصول على كامل  EmptyState مخصصة.",
      },
      passingContent: {
        name: "محتوى عابر",
        description: "هناك عدة طرق مختلفة لتمرير المحتوى.",
        customizeImageHeading: "تخصيص الصورة",
        customizeImageContent: "يمكنك تمرير اي مصدر للصورة",
        viaHeadingProp: "عبر دعامة 'heading'",
        viaContentProp: "عبر دعامة 'content'",
        viaButtonProp: "عبر دعامة 'button'",
      },
      styling: {
        name: "التصميم",
        description: "يمكن تصميم المكون بسهولة.",
      },
    },
  },
}

export default demoAr

// @demo remove-file
