import { DemoTranslations } from "./demo-en"

export const demoEs: DemoTranslations = {
  demoIcon: {
    description:
      "Un componente para dibujar un ícono pre-definido. Si se proporciona el atributo `onPress`, se rodea por un componente <TouchableOpacity />. De lo contrario, se rodea por un componente <View />.",
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
          helper:
            "Una entrada del tipo on/off que sobresale más. Tiene mejor soporte de accesibilidad.",
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
            helper: "Puedes cambiarle el lado - Laborum labore adipisicing in eu ipsum deserunt.",
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
      "Un componente estilizado que representa una fila para ser utilizada dentro de un FlatList, SectionList o por sí solo.",
    useCase: {
      height: {
        name: "Altura",
        description: "La fila puede tener diferentes alturas.",
        defaultHeight: "Altura por defecto (56px)",
        customHeight: "Altura personalizada a través del atributo `height`",
        textHeight:
          "Altura determinada por el contenido del texto - Reprehenderit incididunt deserunt do do ea labore.",
        longText:
          "Limitar texto largo a solo una línea - Reprehenderit incididunt deserunt do do ea labore.",
      },
      separators: {
        name: "Separadores",
        description: "El separador/divisor está preconfigurado y es opcional.",
        topSeparator: "Separador solo en la parte superior",
        topAndBottomSeparator: "Separadores en la parte superior e inferior",
        bottomSeparator: "Separador solo en la parte inferior",
      },
      icons: {
        name: "Íconos",
        description: "Puedes personalizar los íconos a la izquierda o a la derecha.",
        leftIcon: "Ícono izquierdo",
        rightIcon: "Ícono derecho",
        leftRightIcons: "Íconos izquierdo y derecho",
      },
      customLeftRight: {
        name: "Componentes personalizados en la izquierda o derecha",
        description:
          "Puede pasar un componente personalizado en la izquierda o derecha, si así lo necesitas.",
        customLeft: "Componente personalizado a la izquierda",
        customRight: "Componente personalizado a la derecha",
      },
      passingContent: {
        name: "Entregando contenido",
        description: "Hay varias formas de entregar contenido.",
        text: "A través del atributo `text` - reprehenderit sint",
        children: "Contenido anidado (children) - mostrud mollit",
        nestedChildren1: "Contenido anidado 1 - proident veniam.",
        nestedChildren2: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
      },
      listIntegration: {
        name: "Integración con FlatList",
        description:
          "El componente puede ser fácilmente integrado con tu interfaz de lista preferida.",
      },
      styling: {
        name: "Estilo",
        description: "El componente puede ser configurando fácilmente.",
        styledText: "Texto estilizado",
        styledContainer: "Contenedor estilizado (separadores)",
        tintedIcons: "Íconos coloreados",
      },
    },
  },
  demoCard: {
    description:
      "Las tarjetas son útiles para mostrar información relacionada de forma englobada. Si un ListItem muestra el contenido horizontalmente, una tarjeta puede ser también utilizada para mostrar el contenido de manera vertical.",
    useCase: {
      presets: {
        name: "Preajustes",
        description: "Hay algunos ajustes preconfigurados.",
        default: {
          heading: "Preajuste por defecto (default)",
          content: "Incididunt magna ut aliquip consectetur mollit dolor.",
          footer: "Consectetur nulla non aliquip velit.",
        },
        reversed: {
          heading: "Preajuste inverso",
          content: "Reprehenderit occaecat proident amet id laboris.",
          footer: "Consectetur tempor ea non labore anim.",
        },
      },
      verticalAlignment: {
        name: "Alineamiento vertical",
        description:
          "Dependiendo del requerimiento, la tarjeta está preconfigurada con diferentes estrategias de alineación.",
        top: {
          heading: "Arriba (por defecto)",
          content: "Todo el contenido está automáticamente alineado en la parte superior.",
          footer: "Incluso en el pie de página",
        },
        center: {
          heading: "Centro",
          content: "El contenido está centrado en relación con la altura de la tarjeta.",
          footer: "¡Yo también!",
        },
        spaceBetween: {
          heading: "Espacio entre",
          content: "Todo el contenido está espaciado uniformemente.",
          footer: "Estoy donde quiero estar.",
        },
        reversed: {
          heading: "Forzar el pie de página hacia abajo",
          content: "Esto empuja el pie de página hacia donde pertenece.",
          footer: "Estoy tan solo aquí abajo.",
        },
      },
      passingContent: {
        name: "Entregando contenido",
        description: "Hay varias formas de entregar contenido.",
        heading: "A través del atributo `heading`",
        content: "A través del atributo `content`",
        footer: "Estoy tan solo aquí abajo.",
      },
      customComponent: {
        name: "Componentes personalizados",
        description:
          "Cualquier componente preconfigurado puede ser reemplazado por uno específico. Puedes agregar otros si así lo requieres.",
        rightComponent: "Componente derecho",
        leftComponent: "Componente izquierdo",
      },
      style: {
        name: "Estilo",
        description: "El componente puede ser configurado fácilmente.",
        heading: "Estilizar el encabezado",
        content: "Estilizar el contenido",
        footer: "Estilizar el pie de página",
      },
    },
  },
  demoAutoImage: {
    description:
      "Un componente que se ajusta automáticamente el tamaño de una imagen remota o utilizando el atributo data-uri.",
    useCase: {
      remoteUri: { name: "URI remota" },
      base64Uri: { name: "URI Base64" },
      scaledToFitDimensions: {
        name: "Escalado que se ajusta a las dimensiones",
        description:
          "Al proporcionar los atributos `maxWidth` y/o `maxHeight`, la imagen se redimensionará automáticamente manteniendo el ratio. ¿En qué se diferencia de `resizeMode: 'contain'`? Para empezar, puedes especificar el tamaño de un solo lado (no ambos). Segundo, la imagen se ajustará a las dimensiones deseadas en lugar de simplemente estar contenida en su contenedor.",
        heightAuto: "ancho: 60 / altura: auto",
        widthAuto: "ancho: auto / altura: 32",
        bothManual: "ancho: 60 / altura: 60",
      },
    },
  },
  demoText: {
    description:
      "Para todo tipo de requerimiento relacionado a mostrar texto. Este componente es un 'wrapper' (HOC) del componente Text de React Native.",
    useCase: {
      presets: {
        name: "Preajustes",
        description: "Hay algunos ajustes preconfigurados.",
        default:
          "ajuste por defecto - Cillum eu laboris in labore. Excepteur mollit tempor reprehenderit fugiat elit et eu consequat laborum.",
        bold: "preajuste negrita - Tempor et ullamco cupidatat in officia. Nulla ea duis elit id sunt ipsum cillum duis deserunt nostrud ut nostrud id.",
        subheading: "preajuste subtítulo - In Cupidatat Cillum.",
        heading: "preajuste título - Voluptate Adipis.",
      },
      sizes: {
        name: "Tamaños",
        description: "Hay un atributo de tamaño.",
        xs: "xs - Ea ipsum est ea ex sunt.",
        sm: "sm - Lorem sunt adipisicin.",
        md: "md - Consequat id do lorem.",
        lg: "lg - Nostrud ipsum ea.",
        xl: "xl - Eiusmod ex excepteur.",
        xxl: "xxl - Cillum eu laboris.",
      },
      weights: {
        name: "Grueso",
        description: "Hay un atributo de grueso.",
        light:
          "ligero - Nulla magna incididunt excepteur est occaecat duis culpa dolore cupidatat enim et.",
        normal:
          "normal - Magna incididunt dolor ut veniam veniam laboris aliqua velit ea incididunt.",
        medium: "medio - Non duis laborum quis laboris occaecat culpa cillum.",
        semibold: "seminegrita - Exercitation magna nostrud pariatur laborum occaecat aliqua.",
        bold: "negrita - Eiusmod ullamco magna exercitation est excepteur.",
      },
      passingContent: {
        name: "Entregando contenido",
        description: "Hay varias formas de entregar contenido.",
        viaText:
          "a través del atributo `text` - Billum in aute fugiat proident nisi pariatur est. Cupidatat anim cillum eiusmod ad. Officia eu magna aliquip labore dolore consequat.",
        viaTx: "a través del atributo `tx` -",
        children:
          "Contenido anidado (children) - Aliqua velit irure reprehenderit eu qui amet veniam consectetur.",
        nestedChildren: "Contenidos anidados -",
        nestedChildren2: "Occaecat aliqua irure proident veniam.",
        nestedChildren3: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
        nestedChildren4: "Occaecat aliqua irure proident veniam.",
      },
      styling: {
        name: "Estilo",
        description: "El componente puede ser configurando fácilmente.",
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
      "Componente desplegado en varias pantallas. Va a contener botones de navegación y el título de la pantalla.",
    useCase: {
      actionIcons: {
        name: "Íconos de acción",
        description: "Puedes pasar fácilmente íconos a los componentes de la izquierda o derecha.",
        leftIconTitle: "Ícono izquierdo",
        rightIconTitle: "Ícono derecho",
        bothIconsTitle: "Ambos íconos",
      },
      actionText: {
        name: "Texto de acción",
        description: "Puedes pasar fácilmente texto a los componentes de la izquierda o derecha.",
        leftTxTitle: "A través de `leftTx`",
        rightTextTitle: "A través de `rightText`",
      },
      customActionComponents: {
        name: "Componentes personalizados de acción",
        description:
          "Si las opciones de ícono o texto no son suficientes, puedes pasar tu propio componente personalizado de acción.",
        customLeftActionTitle: "Acción izquierda personalizada",
      },
      titleModes: {
        name: "Alineamiento para el título",
        description:
          "El título puede ser forzado a permanecer centrado (por defecto), pero podría cortarse si es demasiado largo. También puedes hacer que se ajuste a los botones a la izquierda o derecha.",
        centeredTitle: "Título centrado",
        flexTitle: "Título flexible",
      },
      styling: {
        name: "Estilo",
        description: "El componente puede ser configurado fácilmente.",
        styledTitle: "Título estilizado",
        styledWrapperTitle: "Contenedor estilizado",
        tintedIconsTitle: "Íconos coloreados",
      },
    },
  },
  demoEmptyState: {
    description:
      "Un componente para cuando no hay información que mostrar. Puede usarse también para guiar al usuario sobre qué hacer a continuación.",
    useCase: {
      presets: {
        name: "Preajustes",
        description:
          "Puedes crear distintos conjuntos de texto/imagen. Por ejemplo, con un ajuste predefinido `generic`. Si quieres tener un EmptyState completamente personalizado, ten en cuenta que no hay un valor por defecto.",
      },
      passingContent: {
        name: "Entregando contenido",
        description: "Hay varias formas de entregar contenido.",
        customizeImageHeading: "Personalizar la imagen",
        customizeImageContent: "Puedes pasar cualquier una imagen de distintas fuentes.",
        viaHeadingProp: "A través del atributo `heading`",
        viaContentProp: "A través del atributo `content`.",
        viaButtonProp: "A través del atributo `button`",
      },
      styling: {
        name: "Estilo",
        description: "El componente puede ser configurado fácilmente.",
      },
    },
  },
}

export default demoEs

// @demo remove-file
