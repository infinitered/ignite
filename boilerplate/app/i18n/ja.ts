import { Translations } from "./translations.types"

const ja: Translations = {
  common: {
    ok: "OK",
    cancel: "キャンセル",
    back: "戻る",
    logOut: "ログアウト", // @demo remove-current-line
  },
  welcomeScreen: {
    postscript:
      "注目！ — このアプリはお好みの見た目では無いかもしれません(デザイナーがこのスクリーンを送ってこない限りは。もしそうなら公開しちゃいましょう！)",
    readyForLaunch: "このアプリはもう少しで公開できます！",
    exciting: "(楽しみですね！)",
    letsGo: "レッツゴー！", // @demo remove-current-line
  },
  errorScreen: {
    title: "問題が発生しました",
    friendlySubtitle:
      "本番では、エラーが投げられた時にこのページが表示されます。もし使うならこのメッセージに変更を加えてください(`app/i18n/jp.ts`)レイアウトはこちらで変更できます(`app/screens/ErrorScreen`)。もしこのスクリーンを取り除きたい場合は、`app/app.tsx`にある<ErrorBoundary>コンポーネントをチェックしてください",
    reset: "リセット",
  },
  emptyStateComponent: {
    generic: {
      heading: "静かだ...悲しい。",
      content:
        "データが見つかりません。ボタンを押してアプリをリロード、またはリフレッシュしてください。",
      button: "もう一度やってみよう",
    },
  },
  loginScreen: {
    logIn: "ログイン",
    enterDetails:
      "ここにあなたの情報を入力してトップシークレットをアンロックしましょう。何が待ち構えているか予想もつかないはずです。はたまたそうでも無いかも - ロケットサイエンスほど複雑なものではありません。",
    emailFieldLabel: "メールアドレス",
    passwordFieldLabel: "パスワード",
    emailFieldPlaceholder: "メールアドレスを入力してください",
    passwordFieldPlaceholder: "パスワードを入力してください",
    tapToLogIn: "タップしてログインしよう！",
    hint: "ヒント: お好みのメールアドレスとパスワードを使ってください :)",
  },
  demoNavigator: {
    componentsTab: "コンポーネント",
    debugTab: "デバッグ",
    communityTab: "コミュニティ",
    podcastListTab: "ポッドキャスト",
  },
  demoCommunityScreen: {
    title: "コミュニティと繋がろう",
    tagLine:
      "Infinite RedのReact Nativeエンジニアコミュニティに接続して、一緒にあなたのアプリ開発をレベルアップしましょう！",
    joinUsOnSlackTitle: "私たちのSlackに参加しましょう",
    joinUsOnSlack:
      "世界中のReact Nativeエンジニアと繋がりたいを思いませんか？Infinite RedのコミュニティSlackに参加しましょう！私達のコミュニティは安全に質問ができ、お互いから学び、あなたのネットワークを広げることができます。",
    joinSlackLink: "Slackコミュニティに参加する",
    makeIgniteEvenBetterTitle: "Igniteをより良くする",
    makeIgniteEvenBetter:
      "Igniteをより良くする為のアイデアはありますか? そうであれば聞きたいです！ 私たちはいつでも最良のReact Nativeのツールを開発する為に助けを求めています。GitHubで私たちと一緒にIgniteの未来を作りましょう。",
    contributeToIgniteLink: "Igniteにコントリビュートする",
    theLatestInReactNativeTitle: "React Nativeの今",
    theLatestInReactNative: "React Nativeの現在をあなたにお届けします。",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "あなたの次のプロジェクトでInfinite Redと契約する",
    hireUs:
      "それがプロジェクト全体でも、チームにトレーニングをしてあげたい時でも、Infinite RedはReact Nativeのことであればなんでもお手伝いができます。",
    hireUsLink: "メッセージを送る",
  },
  demoShowroomScreen: {
    jumpStart: "あなたのプロジェクトをスタートさせるコンポーネントです！",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "`tx`から",
    demoViaSpecifiedTxProp: "`{{prop}}Tx`から",
  },
  demoDebugScreen: {
    howTo: "ハウツー",
    title: "デバッグ",
    tagLine:
      "おめでとうございます、あなたはとてもハイレベルなReact Nativeのテンプレートを使ってます。このボイラープレートを活用してください！",
    reactotron: "Reactotronに送る",
    reportBugs: "バグをレポートする",
    demoList: "デモリスト",
    demoPodcastList: "デモのポッドキャストリスト",
    androidReactotronHint:
      "もし動かなければ、Reactotronのデスクトップアプリが実行されていることを確認して, このコマンドをターミナルで実行した後、アプリをアプリをリロードしてください。 adb reverse tcp:9090 tcp:9090",
    reactotronHint:
      "もし動かなければ、Reactotronのデスクトップアプリが実行されていることを確認して、アプリをリロードしてください。",
  },
  demoPodcastListScreen: {
    title: "React Native Radioのエピソード",
    onlyFavorites: "お気に入り表示",
    favoriteButton: "お気に入り",
    unfavoriteButton: "お気に入りを外す",
    accessibility: {
      cardHint: "ダブルタップで再生します。 ダブルタップと長押しで {{action}}",
      switch: "スイッチオンでお気に入りを表示する",
      favoriteAction: "お気に入りの切り替え",
      favoriteIcon: "お気に入りのエピソードではありません",
      unfavoriteIcon: "お気に入りのエピソードです",
    },
    noFavoritesEmptyState: {
      heading: "どうやら空っぽのようですね",
      content:
        "お気に入りのエピソードがまだありません。エピソードにあるハートマークにタップして、お気に入りに追加しましょう！",
    },
  },
  episodeModel: {
    accessibility: {
      publishLabel: "公開日 {{date}}",
      durationLabel: "再生時間: {{hours}} 時間 {{minutes}} 分 {{seconds}} 秒",
    }
  },
  // @demo remove-block-start
  demoIcon: {
    description:
      "あらかじめ登録されたアイコンを描画するコンポーネントです。 `onPress` が提供されている場合は <TouchableOpacity /> にラップされますが、それ以外の場合は <View /> にラップされます。",
    useCase: {
      icons: {
        name: "アイコン",
        description: "登録されたアイコンのリストです。",
      },
      size: {
        name: "サイズ",
        description: "sizeのpropsです。",
      },
      color: {
        name: "カラー",
        description: "colorのpropsです。",
      },
      styling: {
        name: "スタイリング",
        description: "このコンポーネントはスタイリングの変更ができます。",
      },
    },
  },
  demoTextField: {
    description: "このコンポーネントはテキストの入力と編集ができます。",
    useCase: {
      statuses: {
        name: "ステータス",
        description:
          "status - これは他コンポーネントの`preset`の似ていますが、これはコンポーネントの機能も変えるpropsです。",
        noStatus: {
          label: "ステータスなし",
          helper: "デフォルトのステータスです",
          placeholder: "テキストが入力されます",
        },
        error: {
          label: "エラーステータス",
          helper: "エラーが発生した場合に使用されるステータスです",
          placeholder: "ここにテキストが入力されます",
        },
        disabled: {
          label: "無効(disabled)ステータス",
          helper: "編集不可となるステータスです",
          placeholder: "ここにテキストが入力されます",
        },
      },
      passingContent: {
        name: "コンテントを渡す",
        description: "コンテントを渡す方法はいくつかあります。",
        viaLabel: {
          labelTx: "`label` から",
          helper: "`helper` から",
          placeholder: "`placeholder` から",
        },
        rightAccessory: {
          label: "右側にアクセサリー",
          helper: "このpropsはReact要素を返す関数をうけとります。",
        },
        leftAccessory: {
          label: "左側にアクセサリー",
          helper: "このpropsはReact要素を返す関数をうけとります。",
        },
        supportsMultiline: {
          label: "複数行サポート",
          helper: "複数行の入力が出来るようになります。",
        },
      },
      styling: {
        name: "スタイリング",
        description: "このコンポーネントはスタイリングの変更ができます。",
        styleInput: {
          label: "インプットのスタイル",
          helper: "`style`から",
        },
        styleInputWrapper: {
          label: "インプットラッパーのスタイル",
          helper: "`inputWrapperStyle`から",
        },
        styleContainer: {
          label: "スタイルコンテナのスタイル",
          helper: "`containerStyle`から",
        },
        styleLabel: {
          label: "ラベルとヘルパーのスタイル",
          helper: "`LabelTextProps` & `HelperTextProps`から",
        },
        styleAccessories: {
          label: "アクセサリーのスタイル",
          helper: "`RightAccessory` & `LeftAccessory`から",
        },
      },
    },
  },
  demoToggle: {
    description:
      "ブーリアンの入力を表示するコンポーネントです。コンポーネントはvalueの値を使用して描画するので、onValueChangeコールバックを使って値を変更し、valueを更新する必要があります。valueの値が変更されていない場合は、描画が更新されません。",
    useCase: {
      variants: {
        name: "バリエーション",
        description:
          "このコンポーネントは数種類のバリエーションをサポートしています。もしカスタマイズが必要な場合、これらのバリエーションをリファクタリングできます。デフォルトは`checkbox`です。",
        checkbox: {
          label: "`checkbox`バリエーション",
          helper: "シンプルなon/offのインプットに使えます。",
        },
        radio: {
          label: "`radio`バリエーション",
          helper: "数個のオプションがある場合に使えます。",
        },
        switch: {
          label: "`switch`バリエーション",
          helper:
            "代表的なon/offのインプットです。他と比べアクセシビリティのサポートが充実しています。",
        },
      },
      statuses: {
        name: "ステータス",
        description:
          "status - これは他コンポーネントの`preset`の似ていますが、これはコンポーネントの機能も変えるpropsです。",
        noStatus: "ステータスなし - デフォルトです。",
        errorStatus: "エラー - エラーがある際に使えるステータスです。",
        disabledStatus: "無効(disabled) - 編集不可となるステータスです",
      },
      passingContent: {
        name: "コンテントを渡す",
        description: "コンテントを渡す方法はいくつかあります。",
        useCase: {
          checkBox: {
            label: "`labelTx`から",
            helper: "`helperTx`から",
          },
          checkBoxMultiLine: {
            helper: "複数行サポート - Nulla proident consectetur labore sunt ea labore. ",
          },
          radioChangeSides: {
            helper: "左右に変更 - Laborum labore adipisicing in eu ipsum deserunt.",
          },
          customCheckBox: {
            label: "カスタムアイコンも渡せます",
          },
          switch: {
            label: "スイッチはテキストとして読むこともできます。",
            helper:
              "デフォルトでは、このオプションはフォントの影響を受け、見た目が見苦しくなる可能性がある為`Text`コンポーネントを使用していません。必要に応じてカスタマイズしてください。",
          },
          switchAid: {
            label: "または補助アイコンもつけられます",
          },
        },
      },
      styling: {
        name: "スタイリング",
        description: "このコンポーネントはスタイリングの変更ができます。",
        outerWrapper: "1 - インプットの外側のラッパー",
        innerWrapper: "2 - インプットの内側のラッパー",
        inputDetail: "3 - インプットのそのもの",
        labelTx: "ラベルのスタイルも変更できます。",
        styleContainer: "もしくは、コンポーネントのコンテナ全体をスタイルすることもできます。",
      },
    },
  },
  demoButton: {
    description:
      "ユーザーにアクションや選択を促すコンポーネントです。`Text`コンポーネントを`Pressable`コンポーネントでラップしています。",
    useCase: {
      presets: {
        name: "プリセット",
        description: "数種類のプリセットが用意されています。",
      },
      passingContent: {
        name: "コンテントを渡す",
        description: "コンテントを渡す方法はいくつかあります。",
        viaTextProps: "`text`から - Billum In",
        children: "Childrenから - Irure Reprehenderit",
        rightAccessory: "RightAccessoryから - Duis Quis",
        leftAccessory: "LeftAccessoryから - Duis Proident",
        nestedChildren: "ネストされたchildrenから - proident veniam.",
        nestedChildren2: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
        nestedChildren3: "Occaecat aliqua irure proident veniam.",
        multiLine:
          "Multilineから - consequat veniam veniam reprehenderit. Fugiat id nisi quis duis sunt proident mollit dolor mollit adipisicing proident deserunt.",
      },
      styling: {
        name: "スタイリング",
        description: "このコンポーネントはスタイリングの変更ができます。",
        styleContainer: "コンテナのスタイル - Exercitation",
        styleText: "テキストのスタイル - Ea Anim",
        styleAccessories: "アクセサリーのスタイル - enim ea id fugiat anim ad.",
        pressedState: "押された状態のスタイル - fugiat anim",
      },
      disabling: {
        name: "無効化",
        description:
          "このコンポーネントは無効化できます。スタイルも同時に変更され、押した際の挙動も無効化されます。",
        standard: "無効化 - standard",
        filled: "無効化 - filled",
        reversed: "無効化 - reversed",
        accessory: "無効化されたアクセサリーのスタイル",
        textStyle: "無効化されたテキストのスタイル",
      },
    },
  },
  demoListItem: {
    description:
      "スタイルを指定されたリストの行のコンポーネントです。FlatListやSectionListなどのコンポーネントを使用することもできますし、単体でも使用できます。",
    useCase: {
      height: {
        name: "高さ",
        description: "高さの指定ができます。",
        defaultHeight: "デフォルトの高さ (56px)",
        customHeight: "`height`を使ったカスタムの高さ",
        textHeight:
          "テキストによって決まった高さ - Reprehenderit incididunt deserunt do do ea labore.",
        longText: "テキストを1行に制限する- Reprehenderit incididunt deserunt do do ea labore.",
      },
      separators: {
        name: "セパレーター",
        description: "セパレーター/ディバイダーは用意されてるかつ任意です。",
        topSeparator: "トップセパレーターのみ",
        topAndBottomSeparator: "トップとボトムのセパレーター",
        bottomSeparator: "ボトムのセパレーター",
      },
      icons: {
        name: "アイコン",
        description: "右または左のアイコンをカスタマイズすることができます。",
        leftIcon: "左のアイコン",
        rightIcon: "右のアイコン",
        leftRightIcons: "左右のアイコン",
      },
      customLeftRight: {
        name: "左右のコンポーネントのカスタマイズ",
        description: "左右のコンポーネントをカスタマイズすることができます。",
        customLeft: "カスタムされた左コンポーネント",
        customRight: "カスタムされた右コンポーネント",
      },
      passingContent: {
        name: "コンテントを渡す",
        description: "コンテントを渡す方法はいくつかあります。",
        text: "`text`から - reprehenderit sint",
        children: "Childrenから - mostrud mollit",
        nestedChildren1: "ネストされたchildrenから - proident veniam.",
        nestedChildren2: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
      },
      listIntegration: {
        name: "FlatList & FlashListに組みこむ場合",
        description:
          "このコンポーネントはお好みのリスト系のコンポーネントへ容易に組み込むことができます。",
      },
      styling: {
        name: "スタイリング",
        description: "このコンポーネントはスタイリングの変更ができます。",
        styledText: "スタイルされたテキスト",
        styledContainer: "スタイルされたコンテナ(セパレーター)",
        tintedIcons: "アイコンに色をつける",
      },
    },
  },
  demoCard: {
    description:
      "カードは関連する情報同士をまとめるのに役立ちます。ListItemが横に情報を表示するのに使え、こちらは縦に表示するのに使えます。",
    useCase: {
      presets: {
        name: "プリセット",
        description: "数種類のプリセットが用意されています。",
        default: {
          heading: "デフォルトのプリセット",
          content: "Incididunt magna ut aliquip consectetur mollit dolor.",
          footer: "Consectetur nulla non aliquip velit.",
        },
        reversed: {
          heading: "リバースのプリセット",
          content: "Reprehenderit occaecat proident amet id laboris.",
          footer: "Consectetur tempor ea non labore anim .",
        },
      },
      verticalAlignment: {
        name: "縦の位置調整",
        description: "カードは用意されたプリセットを使っての縦位置調整ができます。",
        top: {
          heading: "Top(デフォルト)",
          content: "全てのコンテンツは自動的に上に配置されます。",
          footer: "Footerも同じように上に配置されます。",
        },
        center: {
          heading: "センター",
          content: "全てのコンテンツはカードの高さから見て中央に配置されます。",
          footer: "Footerである私も!",
        },
        spaceBetween: {
          heading: "Space Between",
          content: "全てのコンテンツは均等に分配されます。",
          footer: "Footerの私はここが一番落ち着くね",
        },
        reversed: {
          heading: "Footerのみを下に配置する",
          content: "その名の通り、Footerのみを下に配置することができます。",
          footer: "Footerは一人で寂しい",
        },
      },
      passingContent: {
        name: "コンテントを渡す",
        description: "コンテントを渡す方法はいくつかあります。",
        heading: "`heading`から",
        content: "`content`から",
        footer: "`footer`から",
      },
      customComponent: {
        name: "カスタムコンポーネント",
        description:
          "全てのプリセットはカスタムコンポーネントを使って拡張/変更することができます。",
        rightComponent: "右コンポーネント",
        leftComponent: "左コンポーネント",
      },
      style: {
        name: "スタイリング",
        description: "このコンポーネントはスタイリングの変更ができます。",
        heading: "ヘディングのスタイル",
        content: "コンテントのスタイル",
        footer: "フッターのスタイル",
      },
    },
  },
  demoAutoImage: {
    description: "リモートまたはデータURIによって自動的にサイズを変更する画像コンポーネントです。",
    useCase: {
      remoteUri: { name: "リモート URI" },
      base64Uri: { name: "Base64 URI" },
      scaledToFitDimensions: {
        name: "ディメンションにフィットするように拡大する",
        description:
          "`maxWidth` と/または `maxHeight`を指定することで、アスペクト比を維持したままサイズを変更することができます。`resizeMode: 'contain'`との違いとしては: \n1. 一方のサイズの指定でも良い（両方の指定の必要がない）。 \n2. 画像のコンテナに押し込められるのではなく、画像のディメンションを保ったまま指定したサイズに拡大、縮小を行うことができます。",
        heightAuto: "width: 60 / height: auto",
        widthAuto: "width: auto / height: 32",
        bothManual: "width: 60 / height: 60",
      },
    },
  },
  demoText: {
    description:
      "テキストを表示する為のコンポーネントです。これはReact NativeのTextコンポーネントを内包する高階コンポーネント(Higher Order Component)です。",
    useCase: {
      presets: {
        name: "プリセット",
        description: "数種類のプリセットが用意されています。",
        default:
          "デフォルトのプリセット - Cillum eu laboris in labore. Excepteur mollit tempor reprehenderit fugiat elit et eu consequat laborum.",
        bold: "ボールドのプリセット - Tempor et ullamco cupidatat in officia. Nulla ea duis elit id sunt ipsum cillum duis deserunt nostrud ut nostrud id.",
        subheading: "サブヘディングのプリセット - In Cupidatat Cillum.",
        heading: "ヘディングのプリセット - Voluptate Adipis.",
      },
      sizes: {
        name: "サイズ",
        description: "サイズ用のpropsです.",
        xs: "xs - Ea ipsum est ea ex sunt.",
        sm: "sm - Lorem sunt adipisicin.",
        md: "md - Consequat id do lorem.",
        lg: "lg - Nostrud ipsum ea.",
        xl: "xl - Eiusmod ex excepteur.",
        xxl: "xxl - Cillum eu laboris.",
      },
      weights: {
        name: "ウエイト",
        description: "ウエイト用のpropです。",
        light:
          "ライト - Nulla magna incididunt excepteur est occaecat duis culpa dolore cupidatat enim et.",
        normal:
          "ノーマル - Magna incididunt dolor ut veniam veniam laboris aliqua velit ea incididunt.",
        medium: "ミディアム - Non duis laborum quis laboris occaecat culpa cillum.",
        semibold: "セミボールド - Exercitation magna nostrud pariatur laborum occaecat aliqua.",
        bold: "ボールド - Eiusmod ullamco magna exercitation est excepteur.",
      },
      passingContent: {
        name: "コンテントを渡す",
        description: "コンテントを渡す方法はいくつかあります。",
        viaText:
          "`text`から - Billum in aute fugiat proident nisi pariatur est. Cupidatat anim cillum eiusmod ad. Officia eu magna aliquip labore dolore consequat.",
        viaTx: "`tx`から -",
        children: "childrenから - Aliqua velit irure reprehenderit eu qui amet veniam consectetur.",
        nestedChildren: "ネストされたchildrenから -",
        nestedChildren2: "Occaecat aliqua irure proident veniam.",
        nestedChildren3: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
        nestedChildren4: "Occaecat aliqua irure proident veniam.",
      },
      styling: {
        name: "スタイリング",
        description: "このコンポーネントはスタイリングの変更ができます。",
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
      "様々なスクリーンで登場するコンポーネントです。ナビゲーションのボタンとスクリーンタイトルを含みます。",
    useCase: {
      actionIcons: {
        name: "アクションアイコン",
        description: "左右にアイコンを表示させることができます。",
        leftIconTitle: "左アイコン",
        rightIconTitle: "右アイコン",
        bothIconsTitle: "両方のアイコン",
      },
      actionText: {
        name: "アクションテキスト",
        description: "左右にテキストを表示させることができます。",
        leftTxTitle: "`leftTx`から",
        rightTextTitle: "`rightText`から",
      },
      customActionComponents: {
        name: "カスタムアクションコンポーネント",
        description:
          "アイコンまたはテキスト以外のものが必要な場合は、カスタムのアクションコンポーネントを渡すことができます。",
        customLeftActionTitle: "カスタムの左アクション",
      },
      titleModes: {
        name: "タイトルモード",
        description:
          "タイトルはデフォルトで中央に配置されますが、長すぎるとカットされてしまいます。Flexを使うことでアクションボタンから自動的にポジションを調整することもできます。",
        centeredTitle: "Centered Title",
        flexTitle: "Flex Title",
      },
      styling: {
        name: "スタイリング",
        description: "このコンポーネントはスタイリングの変更ができます。",
        styledTitle: "スタイルされたタイトル",
        styledWrapperTitle: "スタイルされたラッパー",
        tintedIconsTitle: "色付けされたアイコン",
      },
    },
  },
  demoEmptyState: {
    description:
      "表示する為のデータが存在しない場合に使えるコンポーネントです。ユーザーに取るべきアクションをお勧めする際に有用です。",
    useCase: {
      presets: {
        name: "プリセット",
        description:
          "text/imageのセットを使ってカスタマイズすることができます。これは`generic`のものです。カスタマイズが必要になることを想定して、このコンポーネントにデフォルトのプリセットは存在しません。",
      },
      passingContent: {
        name: "コンテントを渡す",
        description: "コンテントを渡す方法はいくつかあります。",
        customizeImageHeading: "画像をカスタマイズ",
        customizeImageContent: "画像のソースを渡すことができます。",
        viaHeadingProp: "`heading`から",
        viaContentProp: "`content`から",
        viaButtonProp: "`button`から",
      },
      styling: {
        name: "スタイリング",
        description: "このコンポーネントはスタイリングの変更ができます。",
      },
    },
  },
  // @demo remove-block-end
}

export default ja
