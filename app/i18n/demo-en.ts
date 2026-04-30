export const demoEn = {
  demoIcon: {
    description:
      "A component to render a registered icon. It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.",
    useCase: {
      icons: {
        name: "Icons",
        description: "List of icons registered inside the component.",
      },
      size: {
        name: "Size",
        description: "There's a size prop.",
      },
      color: {
        name: "Color",
        description: "There's a color prop.",
      },
      styling: {
        name: "Styling",
        description: "The component can be styled easily.",
      },
    },
  },
  demoTextField: {
    description: "TextField component allows for the entering and editing of text.",
    useCase: {
      statuses: {
        name: "Statuses",
        description:
          "There is a status prop - similar to `preset` in other components, but affects component functionality as well.",
        noStatus: {
          label: "No Status",
          helper: "This is the default status",
          placeholder: "Text goes here",
        },
        error: {
          label: "Error Status",
          helper: "Status to use when there is an error",
          placeholder: "Text goes here",
        },
        disabled: {
          label: "Disabled Status",
          helper: "Disables the editability and mutes text",
          placeholder: "Text goes here",
        },
      },
      passingContent: {
        name: "Passing Content",
        description: "There are a few different ways to pass content.",
        viaLabel: {
          labelTx: "Via `label` prop",
          helper: "Via `helper` prop",
          placeholder: "Via `placeholder` prop",
        },
        rightAccessory: {
          label: "RightAccessory",
          helper: "This prop takes a function that returns a React element.",
        },
        leftAccessory: {
          label: "LeftAccessory",
          helper: "This prop takes a function that returns a React element.",
        },
        supportsMultiline: {
          label: "Supports Multiline",
          helper: "Enables a taller input for multiline text.",
        },
      },
      styling: {
        name: "Styling",
        description: "The component can be styled easily.",
        styleInput: {
          label: "Style Input",
          helper: "Via `style` prop",
        },
        styleInputWrapper: {
          label: "Style Input Wrapper",
          helper: "Via `inputWrapperStyle` prop",
        },
        styleContainer: {
          label: "Style Container",
          helper: "Via `containerStyle` prop",
        },
        styleLabel: {
          label: "Style Label & Helper",
          helper: "Via `LabelTextProps` & `HelperTextProps` style prop",
        },
        styleAccessories: {
          label: "Style Accessories",
          helper: "Via `RightAccessory` & `LeftAccessory` style prop",
        },
      },
    },
  },
  demoToggle: {
    description:
      "Renders a boolean input. This is a controlled component that requires an onValueChange callback that updates the value prop in order for the component to reflect user actions. If the value prop is not updated, the component will continue to render the supplied value prop instead of the expected result of any user actions.",
    useCase: {
      variants: {
        name: "Variants",
        description:
          "The component supports a few different variants. If heavy customization of a specific variant is needed, it can be easily refactored. The default is `checkbox`.",
        checkbox: {
          label: "`checkbox` variant",
          helper: "This can be used for a single on/off input.",
        },
        radio: {
          label: "`radio` variant",
          helper: "Use this when you have multiple options.",
        },
        switch: {
          label: "`switch` variant",
          helper: "A more prominent on/off input. Has better accessibility support.",
        },
      },
      statuses: {
        name: "Statuses",
        description:
          "There is a status prop - similar to `preset` in other components, but affects component functionality as well.",
        noStatus: "No status - this is the default",
        errorStatus: "Error status - use when there is an error",
        disabledStatus: "Disabled status - disables the editability and mutes input",
      },
      passingContent: {
        name: "Passing Content",
        description: "There are a few different ways to pass content.",
        useCase: {
          checkBox: {
            label: "Via `labelTx` prop",
            helper: "Via `helperTx` prop.",
          },
          checkBoxMultiLine: {
            helper: "Supports multiline - Nulla proident consectetur labore sunt ea labore. ",
          },
          radioChangeSides: {
            helper: "You can change sides - Laborum labore adipisicing in eu ipsum deserunt.",
          },
          customCheckBox: {
            label: "Pass in a custom checkbox icon.",
          },
          switch: {
            label: "Switches can be read as text",
            helper:
              "By default, this option doesn't use `Text` since depending on the font, the on/off characters might look weird. Customize as needed.",
          },
          switchAid: {
            label: "Or aided with an icon",
          },
        },
      },
      styling: {
        name: "Styling",
        description: "The component can be styled easily.",
        outerWrapper: "1 - style the input outer wrapper",
        innerWrapper: "2 - style the input inner wrapper",
        inputDetail: "3 - style the input detail",
        labelTx: "You can also style the labelTx",
        styleContainer: "Or, style the entire container",
      },
    },
  },
  demoButton: {
    description:
      "A component that allows users to take actions and make choices. Wraps the Text component with a Pressable component.",
    useCase: {
      presets: {
        name: "Presets",
        description: "There are a few presets that are preconfigured.",
      },
      passingContent: {
        name: "Passing Content",
        description: "There are a few different ways to pass content.",
        viaTextProps: "Via `text` Prop - Billum In",
        children: "Children - Irure Reprehenderit",
        rightAccessory: "RightAccessory - Duis Quis",
        leftAccessory: "LeftAccessory - Duis Proident",
        nestedChildren: "Nested children - proident veniam.",
        nestedChildren2: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
        nestedChildren3: "Occaecat aliqua irure proident veniam.",
        multiLine:
          "Multiline - consequat veniam veniam reprehenderit. Fugiat id nisi quis duis sunt proident mollit dolor mollit adipisicing proident deserunt.",
      },
      styling: {
        name: "Styling",
        description: "The component can be styled easily.",
        styleContainer: "Style Container - Exercitation",
        styleText: "Style Text - Ea Anim",
        styleAccessories: "Style Accessories - enim ea id fugiat anim ad.",
        pressedState: "Style Pressed State - fugiat anim",
      },
      disabling: {
        name: "Disabling",
        description:
          "The component can be disabled, and styled based on that. Press behavior will be disabled.",
        standard: "Disabled - standard",
        filled: "Disabled - filled",
        reversed: "Disabled - reversed",
        accessory: "Disabled accessory style",
        textStyle: "Disabled text style",
      },
    },
  },
  demoListItem: {
    description: "A styled row component that can be used in FlatList, SectionList, or by itself.",
    useCase: {
      height: {
        name: "Height",
        description: "The row can be different heights.",
        defaultHeight: "Default height (56px)",
        customHeight: "Custom height via `height` prop",
        textHeight:
          "Height determined by text content - Reprehenderit incididunt deserunt do do ea labore.",
        longText:
          "Limit long text to one line - Reprehenderit incididunt deserunt do do ea labore.",
      },
      separators: {
        name: "Separators",
        description: "The separator / divider is preconfigured and optional.",
        topSeparator: "Only top separator",
        topAndBottomSeparator: "Top and bottom separators",
        bottomSeparator: "Only bottom separator",
      },
      icons: {
        name: "Icons",
        description: "You can customize the icons on the left or right.",
        leftIcon: "Left icon",
        rightIcon: "Right Icon",
        leftRightIcons: "Left & Right Icons",
      },
      customLeftRight: {
        name: "Custom Left/Right Components",
        description: "If you need a custom left/right component, you can pass it in.",
        customLeft: "Custom left component",
        customRight: "Custom right component",
      },
      passingContent: {
        name: "Passing Content",
        description: "There are a few different ways to pass content.",
        text: "Via `text` prop - reprehenderit sint",
        children: "Children - mostrud mollit",
        nestedChildren1: "Nested children - proident veniam.",
        nestedChildren2: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
      },
      listIntegration: {
        name: "Integrating w/ FlatList",
        description: "The component can be easily integrated with your favorite list interface.",
      },
      styling: {
        name: "Styling",
        description: "The component can be styled easily.",
        styledText: "Styled Text",
        styledContainer: "Styled Container (separators)",
        tintedIcons: "Tinted Icons",
      },
    },
  },
  demoCard: {
    description:
      "Cards are useful for displaying related information in a contained way. If a ListItem displays content horizontally, a Card can be used to display content vertically.",
    useCase: {
      presets: {
        name: "Presets",
        description: "There are a few presets that are preconfigured.",
        default: {
          heading: "Default Preset (default)",
          content: "Incididunt magna ut aliquip consectetur mollit dolor.",
          footer: "Consectetur nulla non aliquip velit.",
        },
        reversed: {
          heading: "Reversed Preset",
          content: "Reprehenderit occaecat proident amet id laboris.",
          footer: "Consectetur tempor ea non labore anim .",
        },
      },
      verticalAlignment: {
        name: "Vertical Alignment",
        description:
          "Depending on what's required, the card comes preconfigured with different alignment strategies.",
        top: {
          heading: "Top (default)",
          content: "All content is automatically aligned to the top.",
          footer: "Even the footer",
        },
        center: {
          heading: "Center",
          content: "Content is centered relative to the card's height.",
          footer: "Me too!",
        },
        spaceBetween: {
          heading: "Space Between",
          content: "All content is spaced out evenly.",
          footer: "I am where I want to be.",
        },
        reversed: {
          heading: "Force Footer Bottom",
          content: "This pushes the footer where it belongs.",
          footer: "I'm so lonely down here.",
        },
      },
      passingContent: {
        name: "Passing Content",
        description: "There are a few different ways to pass content.",
        heading: "Via `heading` Prop",
        content: "Via `content` Prop",
        footer: "I'm so lonely down here.",
      },
      customComponent: {
        name: "Custom Components",
        description:
          "Any of the preconfigured components can be replaced with your own. You can also add additional ones.",
        rightComponent: "RightComponent",
        leftComponent: "LeftComponent",
      },
      style: {
        name: "Styling",
        description: "The component can be styled easily.",
        heading: "Style the Heading",
        content: "Style the Content",
        footer: "Style the Footer",
      },
    },
  },
  demoAutoImage: {
    description: "An Image component that automatically sizes a remote or data-uri image.",
    useCase: {
      remoteUri: { name: "Remote URI" },
      base64Uri: { name: "Base64 URI" },
      scaledToFitDimensions: {
        name: "Scaled to Fit Dimensions",
        description:
          "Providing a `maxWidth` and/or `maxHeight` props, the image will automatically scale while retaining it's aspect ratio. How is this different from `resizeMode: 'contain'`? Firstly, you can specify only one side's size (not both). Secondly, the image will scale to fit the desired dimensions instead of just being contained within its image-container.",
        heightAuto: "width: 60 / height: auto",
        widthAuto: "width: auto / height: 32",
        bothManual: "width: 60 / height: 60",
      },
    },
  },
  demoText: {
    description:
      "For your text displaying needs. This component is a HOC over the built-in React Native one.",
    useCase: {
      presets: {
        name: "Presets",
        description: "There are a few presets that are preconfigured.",
        default:
          "default preset - Cillum eu laboris in labore. Excepteur mollit tempor reprehenderit fugiat elit et eu consequat laborum.",
        bold: "bold preset - Tempor et ullamco cupidatat in officia. Nulla ea duis elit id sunt ipsum cillum duis deserunt nostrud ut nostrud id.",
        subheading: "subheading preset - In Cupidatat Cillum.",
        heading: "heading preset - Voluptate Adipis.",
      },
      sizes: {
        name: "Sizes",
        description: "There's a size prop.",
        xs: "xs - Ea ipsum est ea ex sunt.",
        sm: "sm - Lorem sunt adipisicin.",
        md: "md - Consequat id do lorem.",
        lg: "lg - Nostrud ipsum ea.",
        xl: "xl - Eiusmod ex excepteur.",
        xxl: "xxl - Cillum eu laboris.",
      },
      weights: {
        name: "Weights",
        description: "There's a weight prop.",
        light:
          "light - Nulla magna incididunt excepteur est occaecat duis culpa dolore cupidatat enim et.",
        normal:
          "normal - Magna incididunt dolor ut veniam veniam laboris aliqua velit ea incididunt.",
        medium: "medium - Non duis laborum quis laboris occaecat culpa cillum.",
        semibold: "semiBold - Exercitation magna nostrud pariatur laborum occaecat aliqua.",
        bold: "bold - Eiusmod ullamco magna exercitation est excepteur.",
      },
      passingContent: {
        name: "Passing Content",
        description: "There are a few different ways to pass content.",
        viaText:
          "via `text` prop - Billum in aute fugiat proident nisi pariatur est. Cupidatat anim cillum eiusmod ad. Officia eu magna aliquip labore dolore consequat.",
        viaTx: "via `tx` prop -",
        children: "children - Aliqua velit irure reprehenderit eu qui amet veniam consectetur.",
        nestedChildren: "Nested children -",
        nestedChildren2: "Occaecat aliqua irure proident veniam.",
        nestedChildren3: "Ullamco cupidatat officia exercitation velit non ullamco nisi..",
        nestedChildren4: "Occaecat aliqua irure proident veniam.",
      },
      styling: {
        name: "Styling",
        description: "The component can be styled easily.",
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
      "Component that appears on many screens. Will hold navigation buttons and screen title.",
    useCase: {
      actionIcons: {
        name: "Action Icons",
        description: "You can easily pass in icons to the left or right action components.",
        leftIconTitle: "Left Icon",
        rightIconTitle: "Right Icon",
        bothIconsTitle: "Both Icons",
      },
      actionText: {
        name: "Action Text",
        description: "You can easily pass in text to the left or right action components.",
        leftTxTitle: "Via `leftTx`",
        rightTextTitle: "Via `rightText`",
      },
      customActionComponents: {
        name: "Custom Action Components",
        description:
          "If the icon or text options are not enough, you can pass in your own custom action component.",
        customLeftActionTitle: "Custom Left Action",
      },
      titleModes: {
        name: "Title Modes",
        description:
          "Title can be forced to stay in center (default) but may be cut off if it's too long. You can optionally make it adjust to the action buttons.",
        centeredTitle: "Centered Title",
        flexTitle: "Flex Title",
      },
      styling: {
        name: "Styling",
        description: "The component can be styled easily.",
        styledTitle: "Styled Title",
        styledWrapperTitle: "Styled Wrapper",
        tintedIconsTitle: "Tinted Icons",
      },
    },
  },
  demoEmptyState: {
    description:
      "A component to use when there is no data to display. It can be utilized to direct the user what to do next",
    useCase: {
      presets: {
        name: "Presets",
        description:
          "You can create different text/image sets. One is predefined called `generic`. Note, there's no default in case you want to have a completely custom EmptyState.",
      },
      passingContent: {
        name: "Passing Content",
        description: "There are a few different ways to pass content.",
        customizeImageHeading: "Customize Image",
        customizeImageContent: "You can pass in any image source.",
        viaHeadingProp: "Via `heading` Prop",
        viaContentProp: "Via `content` prop.",
        viaButtonProp: "Via `button` Prop",
      },
      styling: {
        name: "Styling",
        description: "The component can be styled easily.",
      },
    },
  },
}

export default demoEn
export type DemoTranslations = typeof demoEn

// @demo remove-file
