import { DemoTranslations } from "./demo-en"

export const demoAr: DemoTranslations = {
  demoIcon: {
    description:
      "مكوّن لعرض أيقونة مسجّلة. يُغلَّف بالمكوّن <TouchableOpacity /> عند توفير الخاصية `onPress`، وبالمكوّن <View /> خلاف ذلك.",
    useCase: {
      icons: {
        name: "الأيقونات",
        description: "قائمة الأيقونات المسجّلة في المكوّن.",
      },
      size: {
        name: "الحجم",
        description: "يمكن تحديد الحجم عبر الخاصية `size`.",
      },
      color: {
        name: "اللون",
        description: "يمكن تحديد اللون عبر الخاصية `color`.",
      },
      styling: {
        name: "التنسيق",
        description: "يمكن تنسيق المكوّن بسهولة.",
      },
    },
  },
  demoTextField: {
    description: "يتيح المكوّن TextField إدخال النص وتحريره.",
    useCase: {
      statuses: {
        name: "الحالات",
        description:
          "توجد خاصية `status` تشبه الخاصية `preset` في المكوّنات الأخرى، لكنها تؤثر أيضًا على وظائف المكوّن.",
        noStatus: {
          label: "بلا حالة محددة",
          helper: "هذه هي الحالة الافتراضية",
          placeholder: "أدخل النص هنا",
        },
        error: {
          label: "حالة الخطأ",
          helper: "الحالة المستخدمة عند حدوث خطأ",
          placeholder: "أدخل النص هنا",
        },
        disabled: {
          label: "حالة التعطيل",
          helper: "يمنع تحرير النص ويعرضه بلون باهت",
          placeholder: "أدخل النص هنا",
        },
      },
      passingContent: {
        name: "تمرير المحتوى",
        description: "توجد عدة طرق لتمرير المحتوى.",
        viaLabel: {
          labelTx: "عبر الخاصية `label`",
          helper: "عبر الخاصية `helper`",
          placeholder: "عبر الخاصية `placeholder`",
        },
        rightAccessory: {
          label: "RightAccessory",
          helper: "تستقبل هذه الخاصية دالة تُرجع عنصر React.",
        },
        leftAccessory: {
          label: "LeftAccessory",
          helper: "تستقبل هذه الخاصية دالة تُرجع عنصر React.",
        },
        supportsMultiline: {
          label: "يدعم تعدد الأسطر",
          helper: "يزيد ارتفاع حقل الإدخال ليتسع لنص متعدد الأسطر.",
        },
      },
      styling: {
        name: "التنسيق",
        description: "يمكن تنسيق المكوّن بسهولة.",
        styleInput: {
          label: "تنسيق حقل الإدخال",
          helper: "عبر الخاصية `style`",
        },
        styleInputWrapper: {
          label: "تنسيق غلاف حقل الإدخال",
          helper: "عبر الخاصية `inputWrapperStyle`",
        },
        styleContainer: {
          label: "تنسيق الحاوية",
          helper: "عبر الخاصية `containerStyle`",
        },
        styleLabel: {
          label: "تنسيق التسمية والنص المساعد",
          helper: "عبر الخاصية `style` ضمن `LabelTextProps` و`HelperTextProps`",
        },
        styleAccessories: {
          label: "تنسيق العناصر الملحقة",
          helper: "عبر الخاصية `style` في `RightAccessory` و`LeftAccessory`",
        },
      },
    },
  },
  demoToggle: {
    description:
      "يعرض حقل إدخال لقيمة منطقية. هذا مكوّن متحكَّم فيه؛ لذا يتطلب دالة `onValueChange` لتحديث الخاصية `value` كي يعكس إجراءات المستخدم. إذا لم تُحدَّث الخاصية `value`، فسيواصل المكوّن عرض القيمة الممرّرة إليه بدلًا من النتيجة المتوقعة لإجراءات المستخدم.",
    useCase: {
      variants: {
        name: "الأنواع",
        description:
          "يدعم المكوّن عدة أنواع. إذا احتاج نوع معيّن إلى تخصيص كبير، فيمكن إعادة هيكلة المكوّن بسهولة. النوع الافتراضي هو `checkbox`.",
        checkbox: {
          label: "النوع `checkbox`",
          helper: "يمكن استخدامه لإدخال قيمة واحدة للتفعيل أو الإيقاف.",
        },
        radio: {
          label: "النوع `radio`",
          helper: "استخدمه عندما تكون لديك خيارات متعددة.",
        },
        switch: {
          label: "النوع `switch`",
          helper: "عنصر إدخال أكثر بروزًا للتفعيل والإيقاف، مع دعم أفضل لإمكانية الوصول.",
        },
      },
      statuses: {
        name: "الحالات",
        description:
          "توجد خاصية `status` تشبه الخاصية `preset` في المكوّنات الأخرى، لكنها تؤثر أيضًا على وظائف المكوّن.",
        noStatus: "بلا حالة محددة - هذه هي الحالة الافتراضية",
        errorStatus: "حالة الخطأ - استخدمها عند حدوث خطأ",
        disabledStatus: "حالة التعطيل - تمنع تعديل القيمة وتعرض عنصر الإدخال بلون باهت",
      },
      passingContent: {
        name: "تمرير المحتوى",
        description: "توجد عدة طرق لتمرير المحتوى.",
        useCase: {
          checkBox: {
            label: "عبر الخاصية `labelTx`",
            helper: "عبر الخاصية `helperTx`.",
          },
          checkBoxMultiLine: {
            helper: "يدعم تعدد الأسطر - Nulla proident consectetur labore sunt ea labore.",
          },
          radioChangeSides: {
            helper: "يمكنك تبديل الجانبين - Laborum labore adipisicing in eu ipsum deserunt.",
          },
          customCheckBox: {
            label: "مرّر أيقونة مخصصة لمربع الاختيار.",
          },
          switch: {
            label: "يمكن عرض حالة المفتاح كنص",
            helper:
              "لا يستخدم هذا الخيار المكوّن `Text` افتراضيًا، لأن رموز التفعيل والإيقاف قد تبدو غريبة بحسب الخط المستخدم. يمكنك تخصيصه حسب الحاجة.",
          },
          switchAid: {
            label: "أو توضيحها بأيقونة",
          },
        },
      },
      styling: {
        name: "التنسيق",
        description: "يمكن تنسيق المكوّن بسهولة.",
        outerWrapper: "١ - تنسيق الغلاف الخارجي لعنصر الإدخال",
        innerWrapper: "٢ - تنسيق الغلاف الداخلي لعنصر الإدخال",
        inputDetail: "٣ - تنسيق تفاصيل عنصر الإدخال",
        labelTx: "يمكنك أيضًا تنسيق التسمية `labelTx`",
        styleContainer: "أو تنسيق الحاوية بأكملها",
      },
    },
  },
  demoButton: {
    description:
      "مكوّن يتيح للمستخدمين تنفيذ الإجراءات وتحديد الخيارات. يغلّف المكوّن Text بالمكوّن Pressable.",
    useCase: {
      presets: {
        name: "الإعدادات المسبقة",
        description: "تتوفر عدة إعدادات مسبقة جاهزة للاستخدام.",
      },
      passingContent: {
        name: "تمرير المحتوى",
        description: "توجد عدة طرق لتمرير المحتوى.",
        viaTextProps: "عبر الخاصية `text` - Billum In",
        children: "العناصر الفرعية (`children`) - Irure Reprehenderit",
        rightAccessory: "RightAccessory - Duis Quis",
        leftAccessory: "LeftAccessory - Duis Proident",
        nestedChildren: "عناصر فرعية متداخلة - proident veniam.",
        nestedChildren2: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
        nestedChildren3: "Occaecat aliqua irure proident veniam.",
        multiLine:
          "نص متعدد الأسطر - consequat veniam veniam reprehenderit. Fugiat id nisi quis duis sunt proident mollit dolor mollit adipisicing proident deserunt.",
      },
      styling: {
        name: "التنسيق",
        description: "يمكن تنسيق المكوّن بسهولة.",
        styleContainer: "تنسيق الحاوية - Exercitation",
        styleText: "تنسيق النص - Ea Anim",
        styleAccessories: "تنسيق العناصر الملحقة - enim ea id fugiat anim ad.",
        pressedState: "تنسيق حالة الضغط - fugiat anim",
      },
      disabling: {
        name: "التعطيل",
        description: "يمكن تعطيل المكوّن وتنسيقه وفقًا لذلك. لن يستجيب للضغط عند تعطيله.",
        standard: "معطّل - قياسي",
        filled: "معطّل - ممتلئ",
        reversed: "معطّل - معكوس",
        accessory: "تنسيق العنصر الملحق عند التعطيل",
        textStyle: "تنسيق النص عند التعطيل",
      },
    },
  },
  demoListItem: {
    description: "مكوّن صف منسّق يمكن استخدامه في FlatList أو SectionList أو بمفرده.",
    useCase: {
      height: {
        name: "الارتفاع",
        description: "يمكن عرض الصف بارتفاعات مختلفة.",
        defaultHeight: "الارتفاع الافتراضي (56px)",
        customHeight: "ارتفاع مخصص عبر الخاصية `height`",
        textHeight: "ارتفاع يحدده محتوى النص - Reprehenderit incididunt deserunt do do ea labore.",
        longText:
          "حصر النص الطويل في سطر واحد - Reprehenderit incididunt deserunt do do ea labore.",
      },
      separators: {
        name: "الفواصل",
        description: "الفاصل مُعدّ مسبقًا واستخدامه اختياري.",
        topSeparator: "فاصل علوي فقط",
        topAndBottomSeparator: "فاصلان علوي وسفلي",
        bottomSeparator: "فاصل سفلي فقط",
      },
      icons: {
        name: "الأيقونات",
        description: "يمكنك تخصيص الأيقونات على اليسار أو اليمين.",
        leftIcon: "أيقونة على اليسار",
        rightIcon: "أيقونة على اليمين",
        leftRightIcons: "أيقونتان على اليسار واليمين",
      },
      customLeftRight: {
        name: "مكوّنات مخصصة لليسار واليمين",
        description: "يمكنك تمرير مكوّن مخصص لعرضه على اليسار أو اليمين.",
        customLeft: "مكوّن مخصص على اليسار",
        customRight: "مكوّن مخصص على اليمين",
      },
      passingContent: {
        name: "تمرير المحتوى",
        description: "توجد عدة طرق لتمرير المحتوى.",
        text: "عبر الخاصية `text` - reprehenderit sint",
        children: "العناصر الفرعية (`children`) - mostrud mollit",
        nestedChildren1: "عناصر فرعية متداخلة - proident veniam.",
        nestedChildren2: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
      },
      listIntegration: {
        name: "التكامل مع FlatList",
        description: "يمكن دمج المكوّن بسهولة مع واجهة القوائم المفضلة لديك.",
      },
      styling: {
        name: "التنسيق",
        description: "يمكن تنسيق المكوّن بسهولة.",
        styledText: "نص منسّق",
        styledContainer: "حاوية منسّقة (الفواصل)",
        tintedIcons: "أيقونات ملونة",
      },
    },
  },
  demoCard: {
    description:
      "تساعد البطاقات على عرض المعلومات المترابطة ضمن مساحة واحدة. يعرض المكوّن ListItem المحتوى أفقيًا، بينما يمكن استخدام المكوّن Card لعرضه رأسيًا.",
    useCase: {
      presets: {
        name: "الإعدادات المسبقة",
        description: "تتوفر عدة إعدادات مسبقة جاهزة للاستخدام.",
        default: {
          heading: "الإعداد المسبق الافتراضي (default)",
          content: "Incididunt magna ut aliquip consectetur mollit dolor.",
          footer: "Consectetur nulla non aliquip velit.",
        },
        reversed: {
          heading: "الإعداد المسبق المعكوس",
          content: "Reprehenderit occaecat proident amet id laboris.",
          footer: "Consectetur tempor ea non labore anim .",
        },
      },
      verticalAlignment: {
        name: "المحاذاة الرأسية",
        description: "تتوفر في البطاقة خيارات محاذاة معدّة مسبقًا لتناسب الاحتياجات المختلفة.",
        top: {
          heading: "الأعلى (الافتراضي)",
          content: "تُحاذى جميع المحتويات تلقائيًا إلى الأعلى.",
          footer: "حتى التذييل",
        },
        center: {
          heading: "الوسط",
          content: "يُوسَّط المحتوى بالنسبة إلى ارتفاع البطاقة.",
          footer: "وأنا أيضًا!",
        },
        spaceBetween: {
          heading: "توزيع المسافات بين العناصر",
          content: "تُوزَّع المسافات بين عناصر المحتوى بالتساوي.",
          footer: "أنا في المكان الذي أريده.",
        },
        reversed: {
          heading: "إبقاء التذييل في الأسفل",
          content: "يدفع هذا التذييل إلى موضعه في الأسفل.",
          footer: "أشعر بالوحدة هنا في الأسفل.",
        },
      },
      passingContent: {
        name: "تمرير المحتوى",
        description: "توجد عدة طرق لتمرير المحتوى.",
        heading: "عبر الخاصية `heading`",
        content: "عبر الخاصية `content`",
        footer: "أشعر بالوحدة هنا في الأسفل.",
      },
      customComponent: {
        name: "مكوّنات مخصصة",
        description: "يمكنك استبدال أي مكوّن مُعدّ مسبقًا بمكوّن من إنشائك، أو إضافة مكوّنات أخرى.",
        rightComponent: "RightComponent",
        leftComponent: "LeftComponent",
      },
      style: {
        name: "التنسيق",
        description: "يمكن تنسيق المكوّن بسهولة.",
        heading: "تنسيق العنوان",
        content: "تنسيق المحتوى",
        footer: "تنسيق التذييل",
      },
    },
  },
  demoAutoImage: {
    description: "مكوّن Image يضبط تلقائيًا أبعاد صورة من مصدر بعيد أو من معرّف بيانات (data URI).",
    useCase: {
      remoteUri: {
        name: "معرّف URI لمصدر بعيد",
      },
      base64Uri: {
        name: "Base64 URI",
      },
      scaledToFitDimensions: {
        name: "تحجيم الصورة لتناسب الأبعاد",
        description:
          "عند تحديد الخاصية `maxWidth` أو `maxHeight` أو كلتيهما، تُضبط أبعاد الصورة تلقائيًا مع الحفاظ على نسبة العرض إلى الارتفاع. ما الفرق عن `resizeMode: 'contain'`؟ أولًا، يمكنك تحديد بُعد واحد فقط بدلًا من تحديد البُعدين. ثانيًا، تُضبط أبعاد الصورة لتناسب الأبعاد المطلوبة بدلًا من الاكتفاء باحتوائها داخل حاوية الصورة.",
        heightAuto: "width: 60 / height: auto",
        widthAuto: "width: auto / height: 32",
        bothManual: "width: 60 / height: 60",
      },
    },
  },
  demoText: {
    description:
      "مكوّن لعرض النصوص، يغلّف مكوّن النص المدمج في React Native بمكوّن ذي رتبة أعلى (HOC).",
    useCase: {
      presets: {
        name: "الإعدادات المسبقة",
        description: "تتوفر عدة إعدادات مسبقة جاهزة للاستخدام.",
        default:
          "الإعداد المسبق `default` - Cillum eu laboris in labore. Excepteur mollit tempor reprehenderit fugiat elit et eu consequat laborum.",
        bold: "الإعداد المسبق `bold` - Tempor et ullamco cupidatat in officia. Nulla ea duis elit id sunt ipsum cillum duis deserunt nostrud ut nostrud id.",
        subheading: "الإعداد المسبق `subheading` - In Cupidatat Cillum.",
        heading: "الإعداد المسبق `heading` - Voluptate Adipis.",
      },
      sizes: {
        name: "الأحجام",
        description: "يمكن تحديد الحجم عبر الخاصية `size`.",
        xs: "xs - Ea ipsum est ea ex sunt.",
        sm: "sm - Lorem sunt adipisicin.",
        md: "md - Consequat id do lorem.",
        lg: "lg - Nostrud ipsum ea.",
        xl: "xl - Eiusmod ex excepteur.",
        xxl: "xxl - Cillum eu laboris.",
      },
      weights: {
        name: "أوزان الخط",
        description: "يمكن تحديد وزن الخط عبر الخاصية `weight`.",
        light:
          "light - Nulla magna incididunt excepteur est occaecat duis culpa dolore cupidatat enim et.",
        normal:
          "normal - Magna incididunt dolor ut veniam veniam laboris aliqua velit ea incididunt.",
        medium: "medium - Non duis laborum quis laboris occaecat culpa cillum.",
        semibold: "semiBold - Exercitation magna nostrud pariatur laborum occaecat aliqua.",
        bold: "bold - Eiusmod ullamco magna exercitation est excepteur.",
      },
      passingContent: {
        name: "تمرير المحتوى",
        description: "توجد عدة طرق لتمرير المحتوى.",
        viaText:
          "عبر الخاصية `text` - Billum in aute fugiat proident nisi pariatur est. Cupidatat anim cillum eiusmod ad. Officia eu magna aliquip labore dolore consequat.",
        viaTx: "عبر الخاصية `tx` -",
        children:
          "العناصر الفرعية (`children`) - Aliqua velit irure reprehenderit eu qui amet veniam consectetur.",
        nestedChildren: "عناصر فرعية متداخلة -",
        nestedChildren2: "Occaecat aliqua irure proident veniam.",
        nestedChildren3: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
        nestedChildren4: "Occaecat aliqua irure proident veniam.",
      },
      styling: {
        name: "التنسيق",
        description: "يمكن تنسيق المكوّن بسهولة.",
        text: "Consequat ullamco veniam velit mollit proident excepteur aliquip id culpa ipsum velit sint nostrud.",
        text2:
          "Eiusmod occaecat laboris eu ex veniam ipsum adipisicing consectetur. Magna ullamco adipisicing tempor adipisicing.",
        text3:
          "Eiusmod occaecat laboris eu ex veniam ipsum adipisicing consectetur. Magna ullamco adipisicing tempor adipisicing.",
      },
    },
  },
  demoHeader: {
    description: "مكوّن يظهر في العديد من الشاشات ويحتوي على أزرار التنقل وعنوان الشاشة.",
    useCase: {
      actionIcons: {
        name: "أيقونات الإجراءات",
        description: "يمكنك بسهولة تمرير أيقونات إلى مكوّنات الإجراءات على اليسار أو اليمين.",
        leftIconTitle: "الأيقونة اليسرى",
        rightIconTitle: "الأيقونة اليمنى",
        bothIconsTitle: "الأيقونتان",
      },
      actionText: {
        name: "نص الإجراء",
        description: "يمكنك بسهولة تمرير نص إلى مكوّنات الإجراءات على اليسار أو اليمين.",
        leftTxTitle: "عبر `leftTx`",
        rightTextTitle: "عبر `rightText`",
      },
      customActionComponents: {
        name: "مكوّنات إجراءات مخصصة",
        description: "إذا لم تكفِ خيارات الأيقونة أو النص، فيمكنك تمرير مكوّن إجراء مخصص.",
        customLeftActionTitle: "إجراء مخصص على اليسار",
      },
      titleModes: {
        name: "أوضاع العنوان",
        description:
          "يبقى العنوان في الوسط افتراضيًا، لكنه قد يُقتطع إذا كان طويلًا جدًا. ويمكنك بدلًا من ذلك جعله يتكيّف مع أزرار الإجراءات.",
        centeredTitle: "عنوان في الوسط",
        flexTitle: "عنوان مرن",
      },
      styling: {
        name: "التنسيق",
        description: "يمكن تنسيق المكوّن بسهولة.",
        styledTitle: "عنوان منسّق",
        styledWrapperTitle: "غلاف منسّق",
        tintedIconsTitle: "أيقونات ملونة",
      },
    },
  },
  demoEmptyState: {
    description:
      "مكوّن يُستخدم عند عدم وجود بيانات لعرضها، ويمكنه إرشاد المستخدم إلى الخطوة التالية.",
    useCase: {
      presets: {
        name: "الإعدادات المسبقة",
        description:
          "يمكنك إنشاء مجموعات مختلفة من النصوص والصور. توجد مجموعة مُعدّة مسبقًا باسم `generic`. ولا توجد مجموعة افتراضية، لتتمكن من تخصيص المكوّن EmptyState بالكامل.",
      },
      passingContent: {
        name: "تمرير المحتوى",
        description: "توجد عدة طرق لتمرير المحتوى.",
        customizeImageHeading: "تخصيص الصورة",
        customizeImageContent: "يمكنك تمرير أي مصدر للصورة.",
        viaHeadingProp: "عبر الخاصية `heading`",
        viaContentProp: "عبر الخاصية `content`.",
        viaButtonProp: "عبر الخاصية `button`",
      },
      styling: {
        name: "التنسيق",
        description: "يمكن تنسيق المكوّن بسهولة.",
      },
    },
  },
}

export default demoAr

// @demo remove-file
