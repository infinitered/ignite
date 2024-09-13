import { DemoTranslations } from "./demo-en"

export const demoEs: DemoTranslations = {
    demoIcon: {
        description:
            "Un componente para dibujar un ícono pre-definido. Si se proporciona el atributo `onPress`, se rodea por un componente <TouchableOpacity />. De lo contrario, se rodea con un componente <View />.",
        useCase: {
            icons: {
            name: "Íconos",
            description: "Lista de los íconos pre-definidos para el componente.",
            },
            size: {
            name: "Tamaño",
            description: "Hay un atributo para el tamaño.",
            },
            color: {
            name: "Color",
            description: "Hay un atributo para el color.",
            },
            styling: {
            name: "Estilo",
            description: "El componente puede ser configurado fácilmente.",
            },
        },
},
demoTextField: {
    description: "El componente <TextField /> permite el ingreso y edición de texto.",
    useCase: {
      statuses: {
        name: "Estados",
        description:
          "Hay un atributo para el estado - similar a `preset` en otros componentes, pero que además impacta en la funcionalidad del componente.",
        noStatus: {
          label: "Sin estado",
          helper: "Este es el estado predeterminado",
          placeholder: "El texto va acá",
        },
        error: {
          label: "Estado de error",
          helper: "Estado para usar en caso de error",
          placeholder: "El texto va acá",
        },
        disabled: {
          label: "Estado desactivado",
          helper: "Desactiva la edición y atenúa el texto",
          placeholder: "El texto va acá",
        },
      },
      passingContent: {
        name: "Entregando contenido",
        description: "Hay varias formas de entregar contenido.",
        viaLabel: {
          labelTx: "A través del atributo `label`",
          helper: "A través del atributo `helper`",
          placeholder: "A través del atributo `placeholder`",
        },
        rightAccessory: {
          label: "Complemento derecho",
          helper: "Este atributo requiere una función que retorne un elemento React.",
        },
        leftAccessory: {
          label: "Complemento izquierdo",
          helper: "Este atributo requiere una función que retorne un elemento React.",
        },
        supportsMultiline: {
          label: "Soporta múltilíneas",
          helper: "Permite un input de texto más largo para texto multilinea.",
        },
      },
      styling: {
        name: "Estilo",
        description: "El componente puede ser configurado fácilmente.",
        styleInput: {
          label: "Estilo del input",
          helper: "A través de el atributo `style`",
        },
        styleInputWrapper: {
          label: "Estilo del contenedor del input",
          helper: "A través de el atributo `inputWrapperStyle`",
        },
        styleContainer: {
          label: "Estilo del contenedor",
          helper: "A través de el atributo `containerStyle`",
        },
        styleLabel: {
          label: "Estilo de la etiqueta y texto de ayuda",
          helper: "A través de las props de estilo `LabelTextProps` y `HelperTextProps`",
        },
        styleAccessories: {
          label: "Estilo de los accesorios",
          helper: "A través de las props de estilo `RightAccessory` y `LeftAccessory`",
        },
      },
    },
  },
  demoToggle: {
    description:
      "Fait le rendu d’un booléen. Ce composant contrôlé nécessite un callback `onValueChange` qui met à jour el atributo `value` pour que le composant reflète les actions de l'utilisateur. Si el atributo `value` n'est pas mise à jour, le composant continuera à rendre el atributo `value` fournie au lieu du résultat attendu des actions de l'utilisateur.",
    useCase: {
      variants: {
        name: "Variantes",
        description:
          "Le composant supporte différentes variantes. Si une personnalisation poussée d'une variante spécifique est nécessaire, elle peut être facilement refactorisée. La valeur par défaut est `checkbox`.",
        checkbox: {
          label: "Variante `checkbox`",
          helper: "Peut être utilisée pour une seule valeure on/off.",
        },
        radio: {
          label: "Variante `radio`",
          helper: "Utilisez ceci quand vous avez plusieurs options.",
        },
        switch: {
          label: "Variante `switch`",
          helper:
            "Une entrée on/off plus proéminente. Possède un meilleur support d’accessibilité.",
        },
      },
      statuses: {
        name: "Statuts",
        description:
          "Il y a une prop de statut - similaire à `preset` dans d'autres composants, mais affecte également la fonctionnalité du composant.",
        noStatus: "Pas de statut - c'est le défaut",
        errorStatus: "Statut d’erreur - à utiliser quand il y a une erreur",
        disabledStatus: "Statut désactivé - désactive l’édition et atténue le style",
      },
      passingContent: {
        name: "Transfert de contenu",
        description: "Il y a plusieurs façons de transmettre du contenu.",
        useCase: {
          checkBox: {
            label: "Via el atributo `labelTx`",
            helper: "Via el atributo `helperTx`.",
          },
          checkBoxMultiLine: {
            helper: "Supporte le multiligne - Nulla proident consectetur labore sunt ea labore. ",
          },
          radioChangeSides: {
            helper:
              "Vous pouvez changer de côté - Laborum labore adipisicing in eu ipsum deserunt.",
          },
          customCheckBox: {
            label: "Passez une icône de case à cocher personnalisée.",
          },
          switch: {
            label: "Les interrupteurs peuvent être lus comme du texte",
            helper:
              "Par défaut, cette option n’utilise pas `Text` car selon la police, les caractères on/off pourraient paraître étranges. Personnalisez selon vos besoins.",
          },
          switchAid: {
            label: "Ou aidé d’une icône",
          },
        },
      },
      styling: {
        name: "Style",
        description: "Le composant peut être facilement stylisé.",
        outerWrapper: "1 - styliser le wrapper extérieur de l’entrée",
        innerWrapper: "2 - styliser le wrapper intérieur de l’entrée",
        inputDetail: "3 - styliser le détail de l’entrée",
        labelTx: "Vous pouvez aussi styliser le labelTx",
        styleContainer: "Ou, styliser le conteneur entier",
      },
    },
  },
  demoButton: {
    description:
      "Un composant qui permet aux utilisateurs d’effectuer des actions et de faire des choix. Enveloppe le composant Text avec un composant Pressable.",
    useCase: {
      presets: {
        name: "Préréglages",
        description: "Il y a quelques préréglages préconfigurés.",
      },
      passingContent: {
        name: "Transfert de contenu",
        description: "Il y a plusieurs façons de transmettre du contenu.",
        viaTextProps: "Via el atributo `text` - Billum In",
        children: "Enfants - Irure Reprehenderit",
        rightAccessory: "Accessoire droit - Duis Quis",
        leftAccessory: "Accessoire gauche - Duis Proident",
        nestedChildren: "Enfants imbriqués - proident veniam.",
        nestedChildren2: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
        nestedChildren3: "Occaecat aliqua irure proident veniam.",
        multiLine:
          "Multiligne - consequat veniam veniam reprehenderit. Fugiat id nisi quis duis sunt proident mollit dolor mollit adipisicing proident deserunt.",
      },
      styling: {
        name: "Style",
        description: "Le composant peut être facilement stylisé.",
        styleContainer: "Style du conteneur - Exercitation",
        styleText: "Style du texte - Ea Anim",
        styleAccessories: "Style des accessoires - enim ea id fugiat anim ad.",
        pressedState: "Style de l’état pressé - fugiat anim",
      },
      disabling: {
        name: "Désactivation",
        description:
          "Le composant peut être désactivé et stylisé en conséquence. Le comportement de pression sera désactivé.",
        standard: "Désactivé - standard",
        filled: "Désactivé - rempli",
        reversed: "Désactivé - inversé",
        accessory: "Style d’accessoire désactivé",
        textStyle: "Style de texte désactivé",
      },
    },
  },
  demoListItem: {
    description:
      "Un composant de ligne stylisé qui peut être utilisé dans FlatList, SectionList, ou seul.",
    useCase: {
      height: {
        name: "Hauteur",
        description: "La ligne peut avoir différentes hauteurs.",
        defaultHeight: "Hauteur par défaut (56px)",
        customHeight: "Hauteur personnalisée via el atributo `height`",
        textHeight:
          "Hauteur déterminée par le contenu du texte - Reprehenderit incididunt deserunt do do ea labore.",
        longText:
          "Limiter le texte long à une ligne - Reprehenderit incididunt deserunt do do ea labore.",
      },
      separators: {
        name: "Séparateurs",
        description: "Le séparateur / diviseur est préconfiguré et optionnel.",
        topSeparator: "Séparateur uniquement en haut",
        topAndBottomSeparator: "Séparateurs en haut et en bas",
        bottomSeparator: "Séparateur uniquement en bas",
      },
      icons: {
        name: "Icônes",
        description: "Vous pouvez personnaliser les icônes à gauche ou à droite.",
        leftIcon: "Icône gauche",
        rightIcon: "Icône droite",
        leftRightIcons: "Icônes gauche et droite",
      },
      customLeftRight: {
        name: "Composants personnalisés gauche/droite",
        description:
          "Si vous avez besoin d’un composant personnalisé à gauche/droite, vous pouvez le passer.",
        customLeft: "Composant personnalisé à gauche",
        customRight: "Composant personnalisé à droite",
      },
      passingContent: {
        name: "Transfert de contenu",
        description: "Il y a plusieurs façons de transmettre du contenu.",
        text: "Via el atributo `text` - reprehenderit sint",
        children: "Enfants - mostrud mollit",
        nestedChildren1: "Enfants imbriqués - proident veniam.",
        nestedChildren2: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
      },
      listIntegration: {
        name: "Intégration avec FlatList & FlashList",
        description:
          "Le composant peut être facilement intégré avec votre interface de liste préférée.",
      },
      styling: {
        name: "Style",
        description: "Le composant peut être facilement stylisé.",
        styledText: "Texte stylisé",
        styledContainer: "Conteneur stylisé (séparateurs)",
        tintedIcons: "Icônes teintées",
      },
    },
  },
  demoCard: {
    description:
      "Les cartes sont utiles pour afficher des informations connexes de manière contenue. Si un ListItem affiche le contenu horizontalement, une Card peut être utilisée pour afficher le contenu verticalement.",
    useCase: {
      presets: {
        name: "Préréglages",
        description: "Il y a quelques préréglages préconfigurés.",
        default: {
          heading: "Préréglage par défaut (default)",
          content: "Incididunt magna ut aliquip consectetur mollit dolor.",
          footer: "Consectetur nulla non aliquip velit.",
        },
        reversed: {
          heading: "Préréglage inversé",
          content: "Reprehenderit occaecat proident amet id laboris.",
          footer: "Consectetur tempor ea non labore anim .",
        },
      },
      verticalAlignment: {
        name: "Alignement vertical",
        description:
          "Selon les besoins, la carte est préconfigurée avec différentes stratégies d’alignement.",
        top: {
          heading: "Haut (par défaut)",
          content: "Tout le contenu est automatiquement aligné en haut.",
          footer: "Même le pied de page",
        },
        center: {
          heading: "Centre",
          content: "Le contenu est centré par rapport à la hauteur de la carte.",
          footer: "Moi aussi !",
        },
        spaceBetween: {
          heading: "Espace entre",
          content: "Tout le contenu est espacé uniformément.",
          footer: "Je suis là où je veux être.",
        },
        reversed: {
          heading: "Forcer le pied de page en bas",
          content: "Cela pousse le pied de page là où il appartient.",
          footer: "Je suis si seul ici en bas.",
        },
      },
      passingContent: {
        name: "Transfert de contenu",
        description: "Il y a plusieurs façons de transmettre du contenu.",
        heading: "Via el atributo `heading`",
        content: "Via el atributo `content`",
        footer: "Je suis si seul ici en bas.",
      },
      customComponent: {
        name: "Composants personnalisés",
        description:
          "N’importe quels composants préconfigurés peuvent être remplacé par le vôtre. Vous pouvez également en ajouter d’autres.",
        rightComponent: "Composant droit",
        leftComponent: "Composant gauche",
      },
      style: {
        name: "Style",
        description: "Le composant peut être facilement stylisé.",
        heading: "Styliser l’en-tête",
        content: "Styliser le contenu",
        footer: "Styliser le pied de page",
      },
    },
  },
  demoAutoImage: {
    description:
      "Un composant Image qui dimensionne automatiquement une image distante ou data-uri.",
    useCase: {
      remoteUri: { name: "URI distante" },
      base64Uri: { name: "URI Base64" },
      scaledToFitDimensions: {
        name: "Mis à l’échelle pour s’adapter aux dimensions",
        description:
          "En fournissant les props `maxWidth` et/ou `maxHeight`, l’image se redimensionnera automatiquement à l’échelle tout en conservant son rapport d’aspect. En quoi est-ce différent de `resizeMode: 'contain'` ? Premièrement, vous pouvez spécifier la taille d'un seul côté (pas les deux). Deuxièmement, l'image s'adaptera aux dimensions souhaitées au lieu d'être simplement contenue dans son conteneur d'image.",
        heightAuto: "largeur: 60 / hauteur: auto",
        widthAuto: "largeur: auto / hauteur: 32",
        bothManual: "largeur: 60 / hauteur: 60",
      },
    },
  },
  demoText: {
    description:
      "Pour vos besoins d'affichage de texte. Ce composant est un HOC sur celui intégré à React Native.",
    useCase: {
      presets: {
        name: "Préréglages",
        description: "Il y a quelques réglages préconfigurés.",
        default:
          "préréglage par défaut - Cillum eu laboris in labore. Excepteur mollit tempor reprehenderit fugiat elit et eu consequat laborum.",
        bold: "préréglage gras - Tempor et ullamco cupidatat in officia. Nulla ea duis elit id sunt ipsum cillum duis deserunt nostrud ut nostrud id.",
        subheading: "préréglage sous-titre - In Cupidatat Cillum.",
        heading: "préréglage titre - Voluptate Adipis.",
      },
      sizes: {
        name: "Tailles",
        description: "Il y a une prop de taille.",
        xs: "xs - Ea ipsum est ea ex sunt.",
        sm: "sm - Lorem sunt adipisicin.",
        md: "md - Consequat id do lorem.",
        lg: "lg - Nostrud ipsum ea.",
        xl: "xl - Eiusmod ex excepteur.",
        xxl: "xxl - Cillum eu laboris.",
      },
      weights: {
        name: "Graisse",
        description: "Il y a une prop de graisse.",
        light:
          "léger - Nulla magna incididunt excepteur est occaecat duis culpa dolore cupidatat enim et.",
        normal:
          "normal - Magna incididunt dolor ut veniam veniam laboris aliqua velit ea incididunt.",
        medium: "moyen - Non duis laborum quis laboris occaecat culpa cillum.",
        semibold: "demi-gras - Exercitation magna nostrud pariatur laborum occaecat aliqua.",
        bold: "gras - Eiusmod ullamco magna exercitation est excepteur.",
      },
      passingContent: {
        name: "Transfert de contenu",
        description: "Il y a plusieurs façons de transférer du contenu.",
        viaText:
          "via el atributo `text` - Billum in aute fugiat proident nisi pariatur est. Cupidatat anim cillum eiusmod ad. Officia eu magna aliquip labore dolore consequat.",
        viaTx: "via el atributo `tx` -",
        children: "enfants - Aliqua velit irure reprehenderit eu qui amet veniam consectetur.",
        nestedChildren: "Enfants imbriqués -",
        nestedChildren2: "Occaecat aliqua irure proident veniam.",
        nestedChildren3: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
        nestedChildren4: "Occaecat aliqua irure proident veniam.",
      },
      styling: {
        name: "Style",
        description: "Le composant peut être facilement stylisé.",
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
      "Composant qui apparaît sur de nombreux écrans. Contiendra les boutons de navigation et le titre de l’écran.",
    useCase: {
      actionIcons: {
        name: "Icônes d’action",
        description:
          "Vous pouvez facilement passer des icônes aux composants d’action gauche ou droit.",
        leftIconTitle: "Icône gauche",
        rightIconTitle: "Icône droite",
        bothIconsTitle: "Les deux icônes",
      },
      actionText: {
        name: "Texte d’action",
        description:
          "Vous pouvez facilement passer du texte aux composants d’action gauche ou droit.",
        leftTxTitle: "Via `leftTx`",
        rightTextTitle: "Via `rightText`",
      },
      customActionComponents: {
        name: "Composants d’action personnalisés",
        description:
          "Si les options d’icône ou de texte ne suffisent pas, vous pouvez passer votre propre composant d’action personnalisé.",
        customLeftActionTitle: "Action gauche personnalisée",
      },
      titleModes: {
        name: "Modes de titre",
        description:
          "Le titre peut être forcé à rester au centre (par défaut) mais peut être coupé s’il est trop long. Vous pouvez éventuellement le faire s’ajuster aux boutons d’action.",
        centeredTitle: "Titre centré",
        flexTitle: "Titre flexible",
      },
      styling: {
        name: "Style",
        description: "Le composant peut être facilement stylisé.",
        styledTitle: "Titre stylisé",
        styledWrapperTitle: "Wrapper stylisé",
        tintedIconsTitle: "Icônes teintées",
      },
    },
  },
  demoEmptyState: {
    description:
      "Un composant à utiliser lorsqu’il n’y a pas de données à afficher. Il peut être utilisé pour diriger l’utilisateur sur ce qu’il faut faire ensuite.",
    useCase: {
      presets: {
        name: "Préréglages",
        description:
          "Vous pouvez créer différents ensembles de texte/image. Un est prédéfini appelé `generic`. Notez qu’il n’y a pas de valeur par défaut au cas où vous voudriez avoir un EmptyState complètement personnalisé.",
      },
      passingContent: {
        name: "Transfert de contenu",
        description: "Il y a plusieurs façons de transférer du contenu.",
        customizeImageHeading: "Personnaliser l’image",
        customizeImageContent: "Vous pouvez passer n’importe quelle source d'image.",
        viaHeadingProp: "Via el atributo `heading`",
        viaContentProp: "Via el atributo `content`.",
        viaButtonProp: "Via el atributo `button`",
      },
      styling: {
        name: "Style",
        description: "Le composant peut être facilement stylisé.",
      },
    },
  },
}

export default demoEs

// @demo remove-file
