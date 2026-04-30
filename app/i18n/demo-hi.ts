import { DemoTranslations } from "./demo-en"

export const demoHi: DemoTranslations = {
  demoIcon: {
    description:
      "एक पंजीकृत आइकन को रेंडर करने के लिए एक कंपोनेंट। यदि `onPress` प्रदान किया जाता है तो यह <TouchableOpacity /> में लपेटा जाता है, अन्यथा <View /> में।",
    useCase: {
      icons: {
        name: "आइकन",
        description: "कंपोनेंट के अंदर पंजीकृत आइकनों की सूची।",
      },
      size: {
        name: "आकार",
        description: "एक आकार प्रॉप है।",
      },
      color: {
        name: "रंग",
        description: "एक रंग प्रॉप है।",
      },
      styling: {
        name: "स्टाइलिंग",
        description: "कंपोनेंट को आसानी से स्टाइल किया जा सकता है।",
      },
    },
  },
  demoTextField: {
    description: "टेक्स्टफील्ड कंपोनेंट टेक्स्ट दर्ज करने और संपादित करने की अनुमति देता है।",
    useCase: {
      statuses: {
        name: "स्थितियाँ",
        description:
          "एक स्थिति प्रॉप है - अन्य कंपोनेंट्स में `preset` के समान, लेकिन कंपोनेंट की कार्यक्षमता को भी प्रभावित करता है।",
        noStatus: {
          label: "कोई स्थिति नहीं",
          helper: "यह डिफ़ॉल्ट स्थिति है",
          placeholder: "टेक्स्ट यहाँ जाता है",
        },
        error: {
          label: "त्रुटि स्थिति",
          helper: "त्रुटि होने पर उपयोग करने के लिए स्थिति",
          placeholder: "टेक्स्ट यहाँ जाता है",
        },
        disabled: {
          label: "अक्षम स्थिति",
          helper: "संपादन को अक्षम करता है और टेक्स्ट को मंद करता है",
          placeholder: "टेक्स्ट यहाँ जाता है",
        },
      },
      passingContent: {
        name: "सामग्री पास करना",
        description: "सामग्री पास करने के कई तरीके हैं।",
        viaLabel: {
          labelTx: "`label` प्रॉप के माध्यम से",
          helper: "`helper` प्रॉप के माध्यम से",
          placeholder: "`placeholder` प्रॉप के माध्यम से",
        },
        rightAccessory: {
          label: "दायाँ सहायक",
          helper: "यह प्रॉप एक फ़ंक्शन लेता है जो एक React तत्व लौटाता है।",
        },
        leftAccessory: {
          label: "बायाँ सहायक",
          helper: "यह प्रॉप एक फ़ंक्शन लेता है जो एक React तत्व लौटाता है।",
        },
        supportsMultiline: {
          label: "मल्टीलाइन का समर्थन करता है",
          helper: "मल्टीलाइन टेक्स्ट के लिए एक लंबा इनपुट सक्षम करता है।",
        },
      },
      styling: {
        name: "स्टाइलिंग",
        description: "कंपोनेंट को आसानी से स्टाइल किया जा सकता है।",
        styleInput: {
          label: "इनपुट स्टाइल",
          helper: "`style` प्रॉप के माध्यम से",
        },
        styleInputWrapper: {
          label: "इनपुट रैपर स्टाइल",
          helper: "`inputWrapperStyle` प्रॉप के माध्यम से",
        },
        styleContainer: {
          label: "कंटेनर स्टाइल",
          helper: "`containerStyle` प्रॉप के माध्यम से",
        },
        styleLabel: {
          label: "लेबल और हेल्पर स्टाइल",
          helper: "`LabelTextProps` और `HelperTextProps` स्टाइल प्रॉप के माध्यम से",
        },
        styleAccessories: {
          label: "सहायक स्टाइल",
          helper: "`RightAccessory` और `LeftAccessory` स्टाइल प्रॉप के माध्यम से",
        },
      },
    },
  },
  demoToggle: {
    description:
      "एक बूलियन इनपुट रेंडर करता है। यह एक नियंत्रित कंपोनेंट है जिसे उपयोगकर्ता क्रियाओं को दर्शाने के लिए value प्रॉप को अपडेट करने वाले onValueChange कॉलबैक की आवश्यकता होती है। यदि value प्रॉप अपडेट नहीं की जाती है, तो कंपोनेंट उपयोगकर्ता क्रियाओं के अपेक्षित परिणाम के बजाय आपूर्ति की गई value प्रॉप को रेंडर करना जारी रखेगा।",
    useCase: {
      variants: {
        name: "विविधताएँ",
        description:
          "कंपोनेंट कुछ अलग-अलग विविधताओं का समर्थन करता है। यदि किसी विशिष्ट विविधता के भारी अनुकूलन की आवश्यकता है, तो इसे आसानी से पुनर्गठित किया जा सकता है। डिफ़ॉल्ट `checkbox` है।",
        checkbox: {
          label: "`checkbox` विविधता",
          helper: "इसका उपयोग एकल चालू/बंद इनपुट के लिए किया जा सकता है।",
        },
        radio: {
          label: "`radio` विविधता",
          helper: "जब आपके पास कई विकल्प हों तो इसका उपयोग करें।",
        },
        switch: {
          label: "`switch` विविधता",
          helper: "एक अधिक प्रमुख चालू/बंद इनपुट। बेहतर पहुँच समर्थन है।",
        },
      },
      statuses: {
        name: "स्थितियाँ",
        description:
          "एक स्थिति प्रॉप है - अन्य कंपोनेंट्स में `preset` के समान, लेकिन कंपोनेंट की कार्यक्षमता को भी प्रभावित करता है।",
        noStatus: "कोई स्थिति नहीं - यह डिफ़ॉल्ट है",
        errorStatus: "त्रुटि स्थिति - जब कोई त्रुटि हो तो उपयोग करें",
        disabledStatus: "अक्षम स्थिति - संपादन को अक्षम करता है और इनपुट को मंद करता है",
      },
      passingContent: {
        name: "सामग्री पास करना",
        description: "सामग्री पास करने के कई तरीके हैं।",
        useCase: {
          checkBox: {
            label: "`labelTx` प्रॉप के माध्यम से",
            helper: "`helperTx` प्रॉप के माध्यम से।",
          },
          checkBoxMultiLine: {
            helper:
              "मल्टीलाइन का समर्थन करता है - Nulla proident consectetur labore sunt ea labore. ",
          },
          radioChangeSides: {
            helper: "आप पक्ष बदल सकते हैं - Laborum labore adipisicing in eu ipsum deserunt.",
          },
          customCheckBox: {
            label: "एक कस्टम चेकबॉक्स आइकन पास करें।",
          },
          switch: {
            label: "स्विच को टेक्स्ट के रूप में पढ़ा जा सकता है",
            helper:
              "डिफ़ॉल्ट रूप से, यह विकल्प `Text` का उपयोग नहीं करता है क्योंकि फ़ॉन्ट के आधार पर, चालू/बंद अक्षर अजीब दिख सकते हैं। आवश्यकतानुसार अनुकूलित करें।",
          },
          switchAid: {
            label: "या एक आइकन की मदद से",
          },
        },
      },
      styling: {
        name: "स्टाइलिंग",
        description: "कंपोनेंट को आसानी से स्टाइल किया जा सकता है।",
        outerWrapper: "1 - इनपुट के बाहरी रैपर को स्टाइल करें",
        innerWrapper: "2 - इनपुट के आंतरिक रैपर को स्टाइल करें",
        inputDetail: "3 - इनपुट विवरण को स्टाइल करें",
        labelTx: "आप labelTx को भी स्टाइल कर सकते हैं",
        styleContainer: "या, पूरे कंटेनर को स्टाइल करें",
      },
    },
  },
  demoButton: {
    description:
      "एक कंपोनेंट जो उपयोगकर्ताओं को कार्रवाई करने और विकल्प चुनने की अनुमति देता है। Text कंपोनेंट को Pressable कंपोनेंट के साथ लपेटता है।",
    useCase: {
      presets: {
        name: "प्रीसेट",
        description: "कुछ पूर्व-कॉन्फ़िगर किए गए प्रीसेट हैं।",
      },
      passingContent: {
        name: "सामग्री पास करना",
        description: "सामग्री पास करने के कई तरीके हैं।",
        viaTextProps: "`text` प्रॉप के माध्यम से - Billum In",
        children: "चिल्ड्रन - Irure Reprehenderit",
        rightAccessory: "दायां एक्सेसरी - Duis Quis",
        leftAccessory: "बायां एक्सेसरी - Duis Proident",
        nestedChildren: "नेस्टेड चिल्ड्रन - proident veniam.",
        nestedChildren2: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
        nestedChildren3: "Occaecat aliqua irure proident veniam.",
        multiLine:
          "मल्टीलाइन - consequat veniam veniam reprehenderit. Fugiat id nisi quis duis sunt proident mollit dolor mollit adipisicing proident deserunt.",
      },
      styling: {
        name: "स्टाइलिंग",
        description: "कंपोनेंट को आसानी से स्टाइल किया जा सकता है।",
        styleContainer: "कंटेनर स्टाइल - Exercitation",
        styleText: "टेक्स्ट स्टाइल - Ea Anim",
        styleAccessories: "एक्सेसरीज़ स्टाइल - enim ea id fugiat anim ad.",
        pressedState: "दबाए गए स्थिति का स्टाइल - fugiat anim",
      },
      disabling: {
        name: "अक्षम करना",
        description:
          "कंपोनेंट को अक्षम किया जा सकता है और उसके आधार पर स्टाइल किया जा सकता है। दबाने का व्यवहार अक्षम हो जाएगा।",
        standard: "अक्षम - मानक",
        filled: "अक्षम - भरा हुआ",
        reversed: "अक्षम - उलटा",
        accessory: "अक्षम एक्सेसरी स्टाइल",
        textStyle: "अक्षम टेक्स्ट स्टाइल",
      },
    },
  },
  demoListItem: {
    description:
      "एक स्टाइल किया गया पंक्ति कंपोनेंट जो FlatList, SectionList, या अकेले उपयोग किया जा सकता है।",
    useCase: {
      height: {
        name: "ऊँचाई",
        description: "पंक्ति की विभिन्न ऊँचाइयाँ हो सकती हैं।",
        defaultHeight: "डिफ़ॉल्ट ऊँचाई (56px)",
        customHeight: "`height` प्रॉप के माध्यम से कस्टम ऊँचाई",
        textHeight:
          "टेक्स्ट सामग्री द्वारा निर्धारित ऊँचाई - Reprehenderit incididunt deserunt do do ea labore.",
        longText:
          "लंबे टेक्स्ट को एक पंक्ति तक सीमित करें - Reprehenderit incididunt deserunt do do ea labore.",
      },
      separators: {
        name: "विभाजक",
        description: "विभाजक / डिवाइडर पूर्व-कॉन्फ़िगर किया गया है और वैकल्पिक है।",
        topSeparator: "केवल ऊपरी विभाजक",
        topAndBottomSeparator: "ऊपरी और निचले विभाजक",
        bottomSeparator: "केवल निचला विभाजक",
      },
      icons: {
        name: "आइकन",
        description: "आप बाएँ या दाएँ आइकन को कस्टमाइज़ कर सकते हैं।",
        leftIcon: "बायाँ आइकन",
        rightIcon: "दायाँ आइकन",
        leftRightIcons: "बाएँ और दाएँ आइकन",
      },
      customLeftRight: {
        name: "कस्टम बायाँ/दायाँ कंपोनेंट",
        description:
          "यदि आपको कस्टम बायाँ/दायाँ कंपोनेंट की आवश्यकता है, तो आप इसे पास कर सकते हैं।",
        customLeft: "कस्टम बायाँ कंपोनेंट",
        customRight: "कस्टम दायाँ कंपोनेंट",
      },
      passingContent: {
        name: "सामग्री पास करना",
        description: "सामग्री पास करने के कई तरीके हैं।",
        text: "`text` प्रॉप के माध्यम से - reprehenderit sint",
        children: "चिल्ड्रन - mostrud mollit",
        nestedChildren1: "नेस्टेड चिल्ड्रन - proident veniam.",
        nestedChildren2: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
      },
      listIntegration: {
        name: "FlatList के साथ एकीकरण",
        description:
          "कंपोनेंट को आसानी से आपके पसंदीदा सूची इंटरफेस के साथ एकीकृत किया जा सकता है।",
      },
      styling: {
        name: "स्टाइलिंग",
        description: "कंपोनेंट को आसानी से स्टाइल किया जा सकता है।",
        styledText: "स्टाइल किया गया टेक्स्ट",
        styledContainer: "स्टाइल किया गया कंटेनर (विभाजक)",
        tintedIcons: "रंगीन आइकन",
      },
    },
  },
  demoCard: {
    description:
      "कार्ड संबंधित जानकारी को एक संयमित तरीके से प्रदर्शित करने के लिए उपयोगी हैं। यदि एक ListItem सामग्री को क्षैतिज रूप से प्रदर्शित करता है, तो एक कार्ड का उपयोग सामग्री को लंबवत रूप से प्रदर्शित करने के लिए किया जा सकता है।",
    useCase: {
      presets: {
        name: "प्रीसेट",
        description: "कुछ पूर्व-कॉन्फ़िगर किए गए प्रीसेट हैं।",
        default: {
          heading: "डिफ़ॉल्ट प्रीसेट (डिफ़ॉल्ट)",
          content: "Incididunt magna ut aliquip consectetur mollit dolor.",
          footer: "Consectetur nulla non aliquip velit.",
        },
        reversed: {
          heading: "रिवर्स्ड प्रीसेट",
          content: "Reprehenderit occaecat proident amet id laboris.",
          footer: "Consectetur tempor ea non labore anim .",
        },
      },
      verticalAlignment: {
        name: "ऊर्ध्वाधर संरेखण",
        description:
          "आवश्यकता के अनुसार, कार्ड विभिन्न संरेखण रणनीतियों के साथ पूर्व-कॉन्फ़िगर किया गया है।",
        top: {
          heading: "शीर्ष (डिफ़ॉल्ट)",
          content: "सभी सामग्री स्वचालित रूप से शीर्ष पर संरेखित होती है।",
          footer: "यहां तक कि फुटर भी",
        },
        center: {
          heading: "मध्य",
          content: "सामग्री कार्ड की ऊंचाई के सापेक्ष केंद्रित होती है।",
          footer: "मैं भी!",
        },
        spaceBetween: {
          heading: "स्पेस बिटवीन",
          content: "सभी सामग्री समान रूप से फैली हुई है।",
          footer: "मैं वहां हूं जहां मैं होना चाहता हूं।",
        },
        reversed: {
          heading: "फुटर को नीचे रखें",
          content: "यह फुटर को उसके सही स्थान पर धकेलता है।",
          footer: "मैं यहां नीचे बहुत अकेला हूं।",
        },
      },
      passingContent: {
        name: "सामग्री पास करना",
        description: "सामग्री पास करने के कई तरीके हैं।",
        heading: "`heading` प्रॉप के माध्यम से",
        content: "`content` प्रॉप के माध्यम से",
        footer: "मैं यहां नीचे बहुत अकेला हूं।",
      },
      customComponent: {
        name: "कस्टम कंपोनेंट्स",
        description:
          "किसी भी पूर्व-कॉन्फ़िगर किए गए कंपोनेंट को आपके अपने कंपोनेंट से बदला जा सकता है। आप अतिरिक्त कंपोनेंट भी जोड़ सकते हैं।",
        rightComponent: "दायाँ कंपोनेंट",
        leftComponent: "बायाँ कंपोनेंट",
      },
      style: {
        name: "स्टाइलिंग",
        description: "कंपोनेंट को आसानी से स्टाइल किया जा सकता है।",
        heading: "शीर्षक को स्टाइल करें",
        content: "सामग्री को स्टाइल करें",
        footer: "फुटर को स्टाइल करें",
      },
    },
  },
  demoAutoImage: {
    description:
      "एक छवि कंपोनेंट जो स्वचालित रूप से रिमोट या डेटा-यूआरआई छवि का आकार निर्धारित करता है।",
    useCase: {
      remoteUri: { name: "रिमोट यूआरआई" },
      base64Uri: { name: "बेस64 यूआरआई" },
      scaledToFitDimensions: {
        name: "आयामों के अनुरूप स्केल किया गया",
        description:
          "`maxWidth` और/या `maxHeight` प्रॉप्स प्रदान करने पर, छवि स्वचालित रूप से अपने आस्पेक्ट अनुपात को बनाए रखते हुए स्केल होगी। यह `resizeMode: 'contain'` से कैसे अलग है? पहला, आप केवल एक तरफ का आकार निर्दिष्ट कर सकते हैं (दोनों नहीं)। दूसरा, छवि वांछित आयामों के अनुरूप स्केल होगी, न कि केवल अपने छवि-कंटेनर के भीतर समाहित होगी।",
        heightAuto: "चौड़ाई: 60 / ऊंचाई: स्वचालित",
        widthAuto: "चौड़ाई: स्वचालित / ऊंचाई: 32",
        bothManual: "चौड़ाई: 60 / ऊंचाई: 60",
      },
    },
  },
  demoText: {
    description:
      "आपकी टेक्स्ट प्रदर्शन आवश्यकताओं के लिए। यह कंपोनेंट अंतर्निहित React Native कंपोनेंट पर एक HOC है।",
    useCase: {
      presets: {
        name: "प्रीसेट",
        description: "कुछ पूर्व-कॉन्फ़िगर किए गए प्रीसेट हैं।",
        default:
          "डिफ़ॉल्ट प्रीसेट - Cillum eu laboris in labore. Excepteur mollit tempor reprehenderit fugiat elit et eu consequat laborum.",
        bold: "बोल्ड प्रीसेट - Tempor et ullamco cupidatat in officia. Nulla ea duis elit id sunt ipsum cillum duis deserunt nostrud ut nostrud id.",
        subheading: "सबहेडिंग प्रीसेट - In Cupidatat Cillum.",
        heading: "हेडिंग प्रीसेट - Voluptate Adipis.",
      },
      sizes: {
        name: "आकार",
        description: "एक आकार प्रॉप है।",
        xs: "xs - Ea ipsum est ea ex sunt.",
        sm: "sm - Lorem sunt adipisicin.",
        md: "md - Consequat id do lorem.",
        lg: "lg - Nostrud ipsum ea.",
        xl: "xl - Eiusmod ex excepteur.",
        xxl: "xxl - Cillum eu laboris.",
      },
      weights: {
        name: "वजन",
        description: "एक वजन प्रॉप है।",
        light:
          "लाइट - Nulla magna incididunt excepteur est occaecat duis culpa dolore cupidatat enim et.",
        normal:
          "सामान्य - Magna incididunt dolor ut veniam veniam laboris aliqua velit ea incididunt.",
        medium: "मध्यम - Non duis laborum quis laboris occaecat culpa cillum.",
        semibold: "सेमीबोल्ड - Exercitation magna nostrud pariatur laborum occaecat aliqua.",
        bold: "बोल्ड - Eiusmod ullamco magna exercitation est excepteur.",
      },
      passingContent: {
        name: "सामग्री पास करना",
        description: "सामग्री पास करने के कई तरीके हैं।",
        viaText:
          "`text` प्रॉप के माध्यम से - Billum in aute fugiat proident nisi pariatur est. Cupidatat anim cillum eiusmod ad. Officia eu magna aliquip labore dolore consequat.",
        viaTx: "`tx` प्रॉप के माध्यम से -",
        children: "चिल्ड्रन - Aliqua velit irure reprehenderit eu qui amet veniam consectetur.",
        nestedChildren: "नेस्टेड चिल्ड्रन -",
        nestedChildren2: "Occaecat aliqua irure proident veniam.",
        nestedChildren3: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
        nestedChildren4: "Occaecat aliqua irure proident veniam.",
      },
      styling: {
        name: "स्टाइलिंग",
        description: "कंपोनेंट को आसानी से स्टाइल किया जा सकता है।",
        text: "Consequat ullamco veniam velit mollit proident excepteur aliquip id culpa ipsum velit sint nostrud.",
        text2:
          "Eiusmod occaecat laboris eu ex veniam ipsum adipisicing consectetur. Magna ullamco adipisicing tempor adipisicing.",
        text3:
          "Eiusmod occaecat laboris eu ex veniam ipsum adipisicing consectetur. Magna ullamco adipisicing tempor adipisicing.",
      },
    },
  },
  demoHeader: {
    description:
      "कई स्क्रीन पर दिखाई देने वाला कंपोनेंट। यह नेविगेशन बटन और स्क्रीन शीर्षक धारण करेगा।",
    useCase: {
      actionIcons: {
        name: "एक्शन आइकन",
        description: "आप आसानी से बाएँ या दाएँ एक्शन कंपोनेंट्स में आइकन पास कर सकते हैं।",
        leftIconTitle: "बायाँ आइकन",
        rightIconTitle: "दायाँ आइकन",
        bothIconsTitle: "दोनों आइकन",
      },
      actionText: {
        name: "एक्शन टेक्स्ट",
        description: "आप आसानी से बाएँ या दाएँ एक्शन कंपोनेंट्स में टेक्स्ट पास कर सकते हैं।",
        leftTxTitle: "`leftTx` के माध्यम से",
        rightTextTitle: "`rightText` के माध्यम से",
      },
      customActionComponents: {
        name: "कस्टम एक्शन कंपोनेंट्स",
        description:
          "यदि आइकन या टेक्स्ट विकल्प पर्याप्त नहीं हैं, तो आप अपना खुद का कस्टम एक्शन कंपोनेंट पास कर सकते हैं।",
        customLeftActionTitle: "कस्टम बायाँ एक्शन",
      },
      titleModes: {
        name: "शीर्षक मोड",
        description:
          "शीर्षक को मध्य में रहने के लिए मजबूर किया जा सकता है (डिफ़ॉल्ट) लेकिन यदि यह बहुत लंबा है तो काटा जा सकता है। वैकल्पिक रूप से आप इसे एक्शन बटनों के अनुसार समायोजित कर सकते हैं।",
        centeredTitle: "केंद्रित शीर्षक",
        flexTitle: "फ्लेक्स शीर्षक",
      },
      styling: {
        name: "स्टाइलिंग",
        description: "कंपोनेंट को आसानी से स्टाइल किया जा सकता है।",
        styledTitle: "स्टाइल किया गया शीर्षक",
        styledWrapperTitle: "स्टाइल किया गया रैपर",
        tintedIconsTitle: "रंगीन आइकन",
      },
    },
  },
  demoEmptyState: {
    description:
      "जब प्रदर्शित करने के लिए कोई डेटा नहीं है तो उपयोग करने के लिए एक कंपोनेंट। इसका उपयोग उपयोगकर्ता को अगला क्या करना है, यह निर्देशित करने के लिए किया जा सकता है।",
    useCase: {
      presets: {
        name: "प्रीसेट",
        description:
          "आप विभिन्न टेक्स्ट/छवि सेट बना सकते हैं। एक पूर्व-परिभाषित है जिसे `generic` कहा जाता है। ध्यान दें, कोई डिफ़ॉल्ट नहीं है यदि आप पूरी तरह से कस्टम EmptyState चाहते हैं।",
      },
      passingContent: {
        name: "सामग्री पास करना",
        description: "सामग्री पास करने के कई तरीके हैं।",
        customizeImageHeading: "छवि को अनुकूलित करें",
        customizeImageContent: "आप कोई भी छवि स्रोत पास कर सकते हैं।",
        viaHeadingProp: "`heading` प्रॉप के माध्यम से",
        viaContentProp: "`content` प्रॉप के माध्यम से।",
        viaButtonProp: "`button` प्रॉप के माध्यम से",
      },
      styling: {
        name: "स्टाइलिंग",
        description: "कंपोनेंट को आसानी से स्टाइल किया जा सकता है।",
      },
    },
  },
}

export default demoHi

// @demo remove-file
