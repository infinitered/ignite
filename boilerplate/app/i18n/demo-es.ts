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
          helper: "Este es el estado por defecto",
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
      "Dibuja un switch de tipo booleano. Este componente requiere un callback `onValueChange` que actualice el atributo `value` para que este refleje las acciones del usuario. Si el atributo `value` no se actualiza, el componente seguirá mostrando el valor proporcionado por defecto en lugar de lo esperado por las acciones del usuario.",
    useCase: {
      variants: {
        name: "Variantes",
        description:
          "El componente soporta diferentes variantes. Si se necesita una personalización más avanzada o variante específica, puede ser fácilmente refactorizada. El valor por defecto es `checkbox`.",
        checkbox: {
          label: "Variante `checkbox`",
          helper: "Puede ser utilizada para un único valor del tipo on/off.",
        },
        radio: {
          label: "Variante `radio`",
          helper: "Usa esto cuando tengas múltiples opciones.",
        },
        switch: {
          label: "Variante `switch`",
          helper: "Una entrada del tipo on/off que sobresale más. Tiene mejor soporte de accesibilidad.",
        },
      },
      statuses: {
        name: "Estados",
        description:
          "Hay un atributo de estado - similar a `preset` en otros componentes, pero que además impacta en la funcionalidad del componente.",
        noStatus: "Sin estado - este es el valor por defecto",
        errorStatus: "Estado de error - para usar cuando haya un error",
        disabledStatus: "Estado desactivado - desactiva la edición y silencia el input",
      },
      passingContent: {
        name: "Entregando contenido",
        description: "Hay varias formas de entregar contenido.",
        useCase: {
          checkBox: {
            label: "A través del atributo `labelTx`",
            helper: "A través del atributo `helperTx`.",
          },
          checkBoxMultiLine: {
            helper: "Soporta multi líneas - Nulla proident consectetur labore sunt ea labore.",
          },
          radioChangeSides: {
            helper:
              "Puedes cambiarle el lado - Laborum labore adipisicing in eu ipsum deserunt.",
          },
          customCheckBox: {
            label: "Pasa un ícono para un checkbox personalizado.",
          },
          switch: {
            label: "Los interruptores pueden leerse como texto",
            helper:
              "Por defecto, esta opción no usa `Text` ya que, dependiendo de la fuente, los caracteres on/off podrían no dibujarse bien. Personalízalo según tus necesidades.",
          },
          switchAid: {
            label: "O con la ayuda de un ícono",
          },
        },
      },
      styling: {
        name: "Estilo",
        description: "El componente puede ser configurado fácilmente.",
        outerWrapper: "1 - configura el contenedor externo del input",
        innerWrapper: "2 - configura el contenedor interno del input",
        inputDetail: "3 - configura el detalle del input",
        labelTx: "También puedes configurar el atributo labelTx",
        styleContainer: "O, configura todo el contenedor",
      },
    },
  },
  demoButton: {
    description:
      "Un componente que permite a los usuarios realizar acciones y hacer elecciones. Rodea un componente Text con otro componente Pressable.",
    useCase: {
      presets: {
        name: "Preajustes",
        description: "Hay algunos preajustes por defecto.",
      },
      passingContent: {
        name: "Entregando contenido",
        description: "Hay varias formas de entregar contenido.",
        viaTextProps: "A través del atributo `text` - Billum In",
        children: "Contenido anidado (children) - Irure Reprehenderit",
        rightAccessory: "Componente derecho - Duis Quis",
        leftAccessory: "Componente izquierdo - Duis Proident",
        nestedChildren: "Contenido anidado - proident veniam.",
        nestedChildren2: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
        nestedChildren3: "Occaecat aliqua irure proident veniam.",
        multiLine:
          "Multilínea - consequat veniam veniam reprehenderit. Fugiat id nisi quis duis sunt proident mollit dolor mollit adipisicing proident deserunt.",
      },
      styling: {
        name: "Estilo",
        description: "El componente puede ser configurando fácilmente.",
        styleContainer: "Estilo del contenedor - Exercitation",
        styleText: "Estilo del texto - Ea Anim",
        styleAccessories: "Estilo de los componentes - enim ea id fugiat anim ad.",
        pressedState: "Estilo para el estado presionado - fugiat anim",
      },
      disabling: {
        name: "Desactivado",
        description:
          "El componente puede ser desactivado y como consecuencia, estilizado. El comportamiento para hacer clic será desactivado.",
        standard: "Desactivado - estándar",
        filled: "Desactivado - relleno",
        reversed: "Desactivado - invertido",
        accessory: "Estilo del componente desactivado",
        textStyle: "Estilo del texto desactivado",
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
