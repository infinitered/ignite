const demo = {
  ar: {
    common: {
      ok: "نعم",
      cancel: "حذف",
      back: "خلف",
      logOut: "تسجيل خروج", // @demo remove-current-line
    },
    welcomeScreen: {
      postscript:
        "ربما لا يكون هذا هو الشكل الذي يبدو عليه تطبيقك مالم يمنحك المصمم هذه الشاشات وشحنها في هذه الحالة",
      readyForLaunch: "تطبيقك تقريبا جاهز للتشغيل",
      exciting: "اوه هذا مثير",
      letsGo: "لنذهب", // @demo remove-current-line
    },
    errorScreen: {
      title: "هناك خطأ ما",
      friendlySubtitle:
        "هذه هي الشاشة التي سيشاهدها المستخدمون في عملية الانتاج عند حدوث خطأ. سترغب في تخصيص هذه الرسالة ( الموجودة في 'ts.en/i18n/app') وربما التخطيط ايضاً ('app/screens/ErrorScreen'). إذا كنت تريد إزالة هذا بالكامل، تحقق من 'app/app.tsp' من اجل عنصر <ErrorBoundary>.",
      reset: "اعادة تعيين التطبيق",
      traceTitle: "خطأ من مجموعة %{name}", // @demo remove-current-line
    },
    emptyStateComponent: {
      generic: {
        heading: "فارغة جداً....حزين",
        content: "لا توجد بيانات حتى الآن. حاول النقر فوق الزر لتحديث التطبيق او اعادة تحميله.",
        button: "لنحاول هذا مرّة أخرى",
      },
    },
    // @demo remove-block-start
    errors: {
      invalidEmail: "عنوان البريد الالكتروني غير صالح",
    },
    loginScreen: {
      signIn: "تسجيل الدخول",
      enterDetails:
        ".ادخل التفاصيل الخاصة بك ادناه لفتح معلومات سرية للغاية. لن تخمن ابداً ما الذي ننتظره. او ربما ستفعل انها انها ليست علم الصواريخ",
      emailFieldLabel: "البريد الالكتروني",
      passwordFieldLabel: "كلمة السر",
      emailFieldPlaceholder: "ادخل بريدك الالكتروني",
      passwordFieldPlaceholder: "كلمة السر هنا فائقة السر",
      tapToSignIn: "انقر لتسجيل الدخول!",
      hint: "(: تلميح: يمكنك استخدام اي عنوان بريد الكتروني وكلمة السر المفضلة لديك",
    },
    demoNavigator: {
      componentsTab: "عناصر",
      debugTab: "تصحيح",
      communityTab: "واصل اجتماعي",
      podcastListTab: "البودكاست",
    },
    demoCommunityScreen: {
      title: "تواصل مع المجتمع",
      tagLine:
        "قم بالتوصيل لمنتدى Infinite Red الذي يضم تفاعل المهندسين المحلّيين ورفع مستوى تطوير تطبيقك معنا",
      joinUsOnSlackTitle: "انضم الينا على Slack",
      joinUsOnSlack:
        "هل ترغب في وجود مكان للتواصل مع مهندسي React Native حول العالم؟ الانضمام الى المحادثة في سلاك المجتمع الاحمر اللانهائي! مجتمعناالمتنامي هو مساحةآمنة لطرح الاسئلة والتعلم من الآخرين وتنمية شبكتك.",
      joinSlackLink: "انضم الي مجتمع Slack",
      makeIgniteEvenBetterTitle: "اجعل Ignite افضل",
      makeIgniteEvenBetter:
        "هل لديك فكرة لجعل Ignite افضل؟ نحن سعداء لسماع ذلك! نحن نبحث دائماً عن الآخرين الذين يرغبون في مساعدتنا في بناء افضل الادوات المحلية التفاعلية المتوفرة هناك. انضم الينا عبر GitHub للانضمام الينا في بناء مستقبل Ignite",
      contributeToIgniteLink: "ساهم في Ignite",
      theLatestInReactNativeTitle: "الاحدث في React Native",
      theLatestInReactNative: "نخن هنا لنبقيك محدثاً على جميع React Native التي تعرضها",
      reactNativeRadioLink: "راديو React Native",
      reactNativeNewsletterLink: "نشرة اخبار React Native",
      reactNativeLiveLink: "مباشر React Native",
      chainReactConferenceLink: "مؤتمر Chain React",
      hireUsTitle: "قم بتوظيف Infinite Red لمشروعك القادم",
      hireUs:
        "سواء كان الامر يتعلّق بتشغيل مشروع كامل او اعداد الفرق بسرعة من خلال التدريب العلمي لدينا، يمكن ان يساعد Infinite Red اللامتناهي في اي مشروع محلي يتفاعل معه.",
      hireUsLink: "ارسل لنا رسالة",
    },
    demoShowroomScreen: {
      jumpStart: "مكونات او عناصر لبدء مشروعك",
      lorem2Sentences:
        "عامل الناس بأخلاقك لا بأخلاقهم. عامل الناس بأخلاقك لا بأخلاقهم. عامل الناس بأخلاقك لا بأخلاقهم",
      demoHeaderTxExample: "ياي",
      demoViaTxProp: "عبر `tx` Prop",
      demoViaSpecifiedTxProp: "Prop `{{prop}}Tx` عبر",
    },
    demoDebugScreen: {
      howTo: "كيف",
      title: "التصحيح",
      tagLine: "مبروك، لديك نموذج اصلي متقدم للغاية للتفاعل هنا. الاستفادة من هذه النمذجة",
      reactotron: "Reactotron ارسل إلى",
      reportBugs: "الابلاغ عن اخطاء",
      demoList: "قائمة تجريبية",
      demoPodcastList: "قائمة البودكاست التجريبي",
      androidReactotronHint:
        "اذا لم ينجح ذللك، فتأكد من تشغيل تطبيق الحاسوب الخاص Reactotron، وقم بتشغيل عكس adb tcp:9090 \ntcp:9090 من جهازك الطرفي ، واعد تحميل التطبيق",
      iosReactotronHint:
        "اذا لم ينجح ذلك، فتأكد من تشغيل تطبيق الحاسوب الخاص ب Reactotron وأعد تحميل التطبيق",
      macosReactotronHint:
        "اذا لم ينجح ذلك، فتأكد من تشغيل الحاسوب ب Reactotron وأعد تحميل التطبيق",
      webReactotronHint: "اذا لم ينجح ذلك، فتأكد من تشغيل الحاسوب ب Reactotron وأعد تحميل التطبيق",
      windowsReactotronHint:
        "اذا لم ينجح ذلك، فتأكد من تشغيل الحاسوب ب Reactotron وأعد تحميل التطبيق",
    },
    demoPodcastListScreen: {
      title: "حلقات إذاعية React Native",
      onlyFavorites: "المفضلة فقط",
      favoriteButton: "المفضل",
      unfavoriteButton: "غير مفضل",
      accessibility: {
        cardHint:
          "انقر مرّتين للاستماع على الحلقة. انقر مرّتين وانتظر لتفعيل {{action}} هذه الحلقة.",
        switch: "قم بالتبديل لاظهار المفضّلة فقط.",
        favoriteAction: "تبديل المفضلة",
        favoriteIcon: "الحلقة الغير مفضّلة",
        unfavoriteIcon: "الحلقة المفضّلة",
        publishLabel: "نشرت {{date}}",
        durationLabel: "المدّة: {{hours}} ساعات {{minutes}} دقائق {{seconds}} ثواني",
      },
      noFavoritesEmptyState: {
        heading: "هذا يبدو فارغاً بعض الشيء.",
        content:
          "لم تتم اضافة اي مفضلات حتى الان. اضغط على القلب في إحدى الحلقات لإضافته الى المفضلة.",
      },
    },
  },
  // @demo EN
  en: {
    common: {
      ok: "OK!",
      cancel: "Cancel",
      back: "Back",
      logOut: "Log Out", // @demo remove-current-line
    },
    welcomeScreen: {
      postscript:
        "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
      readyForLaunch: "Your app, almost ready for launch!",
      exciting: "(ohh, this is exciting!)",
      letsGo: "Let's go!", // @demo remove-current-line
    },
    errorScreen: {
      title: "Something went wrong!",
      friendlySubtitle:
        "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
      reset: "RESET APP",
      traceTitle: "Error from %{name} stack", // @demo remove-current-line
    },
    emptyStateComponent: {
      generic: {
        heading: "So empty... so sad",
        content: "No data found yet. Try clicking the button to refresh or reload the app.",
        button: "Let's try this again",
      },
    },
    // @demo remove-block-start
    errors: {
      invalidEmail: "Invalid email address.",
    },
    loginScreen: {
      signIn: "Sign In",
      enterDetails:
        "Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science here.",
      emailFieldLabel: "Email",
      passwordFieldLabel: "Password",
      emailFieldPlaceholder: "Enter your email address",
      passwordFieldPlaceholder: "Super secret password here",
      tapToSignIn: "Tap to sign in!",
      hint: "Hint: you can use any email address and your favorite password :)",
    },
    demoNavigator: {
      componentsTab: "Components",
      debugTab: "Debug",
      communityTab: "Community",
      podcastListTab: "Podcast",
    },
    demoCommunityScreen: {
      title: "Connect with the community",
      tagLine:
        "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
      joinUsOnSlackTitle: "Join us on Slack",
      joinUsOnSlack:
        "Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.",
      joinSlackLink: "Join the Slack Community",
      makeIgniteEvenBetterTitle: "Make Ignite even better",
      makeIgniteEvenBetter:
        "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
      contributeToIgniteLink: "Contribute to Ignite",
      theLatestInReactNativeTitle: "The latest in React Native",
      theLatestInReactNative: "We're here to keep you current on all React Native has to offer.",
      reactNativeRadioLink: "React Native Radio",
      reactNativeNewsletterLink: "React Native Newsletter",
      reactNativeLiveLink: "React Native Live",
      chainReactConferenceLink: "Chain React Conference",
      hireUsTitle: "Hire Infinite Red for your next project",
      hireUs:
        "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
      hireUsLink: "Send us a message",
    },
    demoShowroomScreen: {
      jumpStart: "Components to jump start your project!",
      lorem2Sentences:
        "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
      demoHeaderTxExample: "Yay",
      demoViaTxProp: "Via `tx` Prop",
      demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
    },
    demoDebugScreen: {
      howTo: "HOW TO",
      title: "Debug",
      tagLine:
        "Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
      reactotron: "Send to Reactotron",
      reportBugs: "Report Bugs",
      demoList: "Demo List",
      demoPodcastList: "Demo Podcast List",
      androidReactotronHint:
        "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
      iosReactotronHint:
        "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
      macosReactotronHint:
        "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
      webReactotronHint:
        "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
      windowsReactotronHint:
        "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    },
    demoPodcastListScreen: {
      title: "React Native Radio episodes",
      onlyFavorites: "Only Show Favorites",
      favoriteButton: "Favorite",
      unfavoriteButton: "Unfavorite",
      accessibility: {
        cardHint:
          "Double tap to listen to the episode. Double tap and hold to {{action}} this episode.",
        switch: "Switch on to only show favorites",
        favoriteAction: "Toggle Favorite",
        favoriteIcon: "Episode not favorited",
        unfavoriteIcon: "Episode favorited",
        publishLabel: "Published {{date}}",
        durationLabel: "Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds",
      },
      noFavoritesEmptyState: {
        heading: "This looks a bit empty",
        content:
          "No favorites have been added yet. Tap the heart on an episode to add it to your favorites!",
      },
    },
  },
  fr: {
    common: {
      ok: "OK !",
      cancel: "Annuler",
      back: "Retour",
      logOut: "Déconnexion", // @demo remove-current-line
    },
    welcomeScreen: {
      postscript:
        "psst  — Ce n'est probablement pas à quoi ressemble votre application. (À moins que votre designer ne vous ait donné ces écrans, dans ce cas, mettez la en prod !)",
      readyForLaunch: "Votre application, presque prête pour le lancement !",
      exciting: "(ohh, c'est excitant !)",
      letsGo: "Allons-y !", // @demo remove-current-line
    },
    errorScreen: {
      title: "Quelque chose s'est mal passé !",
      friendlySubtitle:
        "C'est l'écran que vos utilisateurs verront en production lorsqu'une erreur sera lancée. Vous voudrez personnaliser ce message (situé dans `app/i18n/fr.ts`) et probablement aussi la mise en page (`app/screens/ErrorScreen`). Si vous voulez le supprimer complètement, vérifiez `app/app.tsx` pour le composant <ErrorBoundary>.",
      reset: "RÉINITIALISER L'APPLICATION",
      traceTitle: "Erreur depuis %{name}", // @demo remove-current-line
    },
    emptyStateComponent: {
      generic: {
        heading: "Si vide... si triste",
        content:
          "Aucune donnée trouvée pour le moment. Essayez de cliquer sur le bouton pour rafraîchir ou recharger l'application.",
        button: "Essayons à nouveau",
      },
    },
    // @demo remove-block-start
    errors: {
      invalidEmail: "Adresse e-mail invalide.",
    },
    loginScreen: {
      signIn: "Se connecter",
      enterDetails:
        "Entrez vos informations ci-dessous pour débloquer des informations top secrètes. Vous ne devinerez jamais ce que nous avons en attente. Ou peut-être que vous le ferez ; ce n'est pas de la science spatiale ici.",
      emailFieldLabel: "E-mail",
      passwordFieldLabel: "Mot de passe",
      emailFieldPlaceholder: "Entrez votre adresse e-mail",
      passwordFieldPlaceholder: "Mot de passe super secret ici",
      tapToSignIn: "Appuyez pour vous connecter !",
      hint: "Astuce : vous pouvez utiliser n'importe quelle adresse e-mail et votre mot de passe préféré :)",
    },
    demoNavigator: {
      componentsTab: "Composants",
      debugTab: "Débogage",
      communityTab: "Communauté",
      podcastListTab: "Podcasts",
    },
    demoCommunityScreen: {
      title: "Connectez-vous avec la communauté",
      tagLine:
        "Rejoignez la communauté d'ingénieurs React Native d'Infinite Red et améliorez votre développement d'applications avec nous !",
      joinUsOnSlackTitle: "Rejoignez-nous sur Slack",
      joinUsOnSlack:
        "Vous souhaitez vous connecter avec des ingénieurs React Native du monde entier ? Rejoignez la conversation dans la communauté Slack d'Infinite Red ! Notre communauté en pleine croissance est un espace sûr pour poser des questions, apprendre des autres et développer votre réseau.",
      joinSlackLink: "Rejoindre la communauté Slack",
      makeIgniteEvenBetterTitle: "Rendre Ignite encore meilleur",
      makeIgniteEvenBetter:
        "Vous avez une idée pour rendre Ignite encore meilleur ? Nous sommes heureux de l'entendre ! Nous cherchons toujours des personnes qui veulent nous aider à construire les meilleurs outils React Native. Rejoignez-nous sur GitHub pour nous aider à construire l'avenir d'Ignite.",
      contributeToIgniteLink: "Contribuer à Ignite",
      theLatestInReactNativeTitle: "Les dernières nouvelles de React Native",
      theLatestInReactNative:
        "Nous sommes là pour vous tenir au courant de tout ce que React Native a à offrir.",
      reactNativeRadioLink: "React Native Radio",
      reactNativeNewsletterLink: "React Native Newsletter",
      reactNativeLiveLink: "React Native Live",
      chainReactConferenceLink: "Conférence Chain React",
      hireUsTitle: "Engagez Infinite Red pour votre prochain projet",
      hireUs:
        "Que ce soit pour gérer un projet complet ou pour former des équipes à notre formation pratique, Infinite Red peut vous aider pour presque tous les projets React Native.",
      hireUsLink: "Envoyez-nous un message",
    },
    demoShowroomScreen: {
      jumpStart: "Composants pour démarrer votre projet !",
      lorem2Sentences:
        "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
      demoHeaderTxExample: "Yay",
      demoViaTxProp: "Via la propriété `tx`",
      demoViaSpecifiedTxProp: "Via la propriété `{{prop}}Tx` spécifiée",
    },
    demoDebugScreen: {
      howTo: "COMMENT FAIRE",
      title: "Débugage",
      tagLine:
        "Félicitations, vous avez un modèle d'application React Native très avancé ici. Profitez de cette base de code !",
      reactotron: "Envoyer à Reactotron",
      reportBugs: "Signaler des bugs",
      demoList: "Liste de démonstration",
      demoPodcastList: "Liste de podcasts de démonstration",
      androidReactotronHint:
        "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, exécutez adb reverse tcp:9090 tcp:9090 à partir de votre terminal, puis rechargez l'application.",
      iosReactotronHint:
        "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
      macosReactotronHint:
        "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
      webReactotronHint:
        "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
      windowsReactotronHint:
        "Si cela ne fonctionne pas, assurez-vous que l'application de bureau Reactotron est en cours d'exécution, puis rechargez l'application.",
    },
    demoPodcastListScreen: {
      title: "Épisodes de Radio React Native",
      onlyFavorites: "Afficher uniquement les favoris",
      favoriteButton: "Favori",
      unfavoriteButton: "Non favori",
      accessibility: {
        cardHint:
          "Double-cliquez pour écouter l'épisode. Double-cliquez et maintenez pour {{action}} cet épisode.",
        switch: "Activez pour afficher uniquement les favoris",
        favoriteAction: "Basculer en favori",
        favoriteIcon: "Épisode non favori",
        unfavoriteIcon: "Épisode favori",
        publishLabel: "Publié le {{date}}",
        durationLabel: "Durée : {{hours}} heures {{minutes}} minutes {{seconds}} secondes",
      },
      noFavoritesEmptyState: {
        heading: "C'est un peu vide ici",
        content:
          "Aucun favori n'a été ajouté pour le moment. Appuyez sur le cœur d'un épisode pour l'ajouter à vos favoris !",
      },
    },
  },
  ko: {
    common: {
      ok: "확인!",
      cancel: "취소",
      back: "뒤로",
      logOut: "로그아웃", // @demo remove-current-line
    },
    welcomeScreen: {
      postscript:
        "잠깐! — 지금 보시는 것은 아마도 당신의 앱의 모양새가 아닐겁니다. (디자이너분이 이렇게 건내주셨다면 모를까요. 만약에 그렇다면, 이대로 가져갑시다!) ",
      readyForLaunch: "출시 준비가 거의 끝난 나만의 앱!",
      exciting: "(오, 이거 신나는데요!)",
      letsGo: "가보자구요!", // @demo remove-current-line
    },
    errorScreen: {
      title: "뭔가 잘못되었습니다!",
      friendlySubtitle:
        "이 화면은 오류가 발생할 때 프로덕션에서 사용자에게 표시됩니다. 이 메시지를 커스터마이징 할 수 있고(해당 파일은 `app/i18n/ko.ts` 에 있습니다) 레이아웃도 마찬가지로 수정할 수 있습니다(`app/screens/error`). 만약 이 오류화면을 완전히 없에버리고 싶다면 `app/app.tsx` 파일에서 <ErrorBoundary> 컴포넌트를 확인하기 바랍니다.",
      reset: "초기화",
      traceTitle: "%{name} 스택에서의 오류", // @demo remove-current-line
    },
    emptyStateComponent: {
      generic: {
        heading: "너무 텅 비어서.. 너무 슬퍼요..",
        content: "데이터가 없습니다. 버튼을 눌러서 리프레쉬 하시거나 앱을 리로드하세요.",
        button: "다시 시도해봅시다",
      },
    },
    // @demo remove-block-start
    errors: {
      invalidEmail: "잘못된 이메일 주소 입니다.",
    },
    loginScreen: {
      signIn: "로그인",
      enterDetails:
        "일급비밀 정보를 해제하기 위해 상세 정보를 입력하세요. 무엇이 기다리고 있는지 절대 모를겁니다. 혹은 알 수 있을지도 모르겠군요. 엄청 복잡한 뭔가는 아닙니다.",
      emailFieldLabel: "이메일",
      passwordFieldLabel: "비밀번호",
      emailFieldPlaceholder: "이메일을 입력하세요",
      passwordFieldPlaceholder: "엄청 비밀스러운 암호를 입력하세요",
      tapToSignIn: "눌러서 로그인 하기!",
      hint: "힌트: 가장 좋아하는 암호와 아무런 아무 이메일 주소나 사용할 수 있어요 :)",
    },
    demoNavigator: {
      componentsTab: "컴포넌트",
      debugTab: "디버그",
      communityTab: "커뮤니티",
      podcastListTab: "팟캐스트",
    },
    demoCommunityScreen: {
      title: "커뮤니티와 함께해요",
      tagLine:
        "전문적인 React Native 엔지니어들로 구성된 Infinite Red 커뮤니티에 접속해서 함께 개발 실력을 향상시켜 보세요!",
      joinUsOnSlackTitle: "Slack 에 참여하세요",
      joinUsOnSlack:
        "전 세계 React Native 엔지니어들과 함께할 수 있는 곳이 있었으면 좋겠죠? Infinite Red Community Slack 에서 대화에 참여하세요! 우리의 성장하는 커뮤니티는 질문을 던지고, 다른 사람들로부터 배우고, 네트워크를 확장할 수 있는 안전한 공간입니다. ",
      joinSlackLink: "Slack 에 참여하기",
      makeIgniteEvenBetterTitle: "Ignite 을 향상시켜요",
      makeIgniteEvenBetter:
        "Ignite 을 더 좋게 만들 아이디어가 있나요? 기쁜 소식이네요. 우리는 항상 최고의 React Native 도구를 구축하는데 도움을 줄 수 있는 분들을 찾고 있습니다. GitHub 에서 Ignite 의 미래를 만들어 가는것에 함께해 주세요.",
      contributeToIgniteLink: "Ignite 에 기여하기",
      theLatestInReactNativeTitle: "React Native 의 최신정보",
      theLatestInReactNative: "React Native 가 제공하는 모든 최신 정보를 알려드립니다.",
      reactNativeRadioLink: "React Native 라디오",
      reactNativeNewsletterLink: "React Native 뉴스레터",
      reactNativeLiveLink: "React Native 라이브 스트리밍",
      chainReactConferenceLink: "Chain React 컨퍼런스",
      hireUsTitle: "다음 프로젝트에 Infinite Red 를 고용하세요",
      hireUs:
        "프로젝트 전체를 수행하든, 실무 교육을 통해 팀의 개발 속도에 박차를 가하든 상관없이, Infinite Red 는 React Native 프로젝트의 모든 분야의 에서 도움을 드릴 수 있습니다.",
      hireUsLink: "메세지 보내기",
    },
    demoShowroomScreen: {
      jumpStart: "프로젝트를 바로 시작할 수 있는 컴포넌트들!",
      lorem2Sentences:
        "별 하나에 추억과, 별 하나에 사랑과, 별 하나에 쓸쓸함과, 별 하나에 동경(憧憬)과, 별 하나에 시와, 별 하나에 어머니, 어머니",
      demoHeaderTxExample: "야호",
      demoViaTxProp: "`tx` Prop 을 통해",
      demoViaSpecifiedTxProp: "`{{prop}}Tx` Prop 을 통해",
    },
    demoDebugScreen: {
      howTo: "사용방법",
      title: "디버그",
      tagLine:
        "축하합니다. 여기 아주 고급스러운 React Native 앱 템플릿이 있습니다. 이 보일러 플레이트를 사용해보세요!",
      reactotron: "Reactotron 으로 보내기",
      reportBugs: "버그 보고하기",
      demoList: "데모 목록",
      demoPodcastList: "데모 팟캐스트 목록",
      androidReactotronHint:
        "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후, 터미널에서 adb reverse tcp:9090 tcp:9090 을 실행한 다음 앱을 다시 실행해보세요.",
      iosReactotronHint:
        "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.",
      macosReactotronHint:
        "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.",
      webReactotronHint:
        "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.",
      windowsReactotronHint:
        "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.",
    },
    demoPodcastListScreen: {
      title: "React Native 라디오 에피소드",
      onlyFavorites: "즐겨찾기만 보기",
      favoriteButton: "즐겨찾기",
      unfavoriteButton: "즐겨찾기 해제",
      accessibility: {
        cardHint:
          "에피소드를 들으려면 두 번 탭하세요. 이 에피소드를 좋아하거나 싫어하려면 두 번 탭하고 길게 누르세요.",
        switch: "즐겨찾기를 사용하려면 스위치를 사용하세요.",
        favoriteAction: "즐겨찾기 토글",
        favoriteIcon: "좋아하는 에피소드",
        unfavoriteIcon: "즐겨찾기하지 않은 에피소드",
        publishLabel: "{{date}} 에 발행됨",
        durationLabel: "소요시간: {{hours}}시간 {{minutes}}분 {{seconds}}초",
      },
      noFavoritesEmptyState: {
        heading: "조금 텅 비어 있네요.",
        content: "즐겨찾기가 없습니다. 에피소드에 있는 하트를 눌러서 즐겨찾기에 추가하세요.",
      },
    },
  },
}

export default demo
