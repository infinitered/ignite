import { DemoTranslations } from "./demo-en"

export const demoKo: DemoTranslations = {
  demoIcon: {
    description:
      "등록된 아이콘을 렌더링하는 컴포넌트입니다. `onPress`가 구현되어 있으면 <TouchableOpacity />로, 그렇지 않으면 <View />로 감쌉니다.",
    useCase: {
      icons: {
        name: "아이콘",
        description: "컴포넌트에 등록된 아이콘 목록입니다.",
      },
      size: {
        name: "크기",
        description: "크기 속성이 있습니다.",
      },
      color: {
        name: "색상",
        description: "색상 속성이 있습니다.",
      },
      styling: {
        name: "스타일링",
        description: "컴포넌트는 쉽게 스타일링할 수 있습니다.",
      },
    },
  },
  demoTextField: {
    description: "TextField 컴포넌트는 텍스트 입력 및 편집을 허용합니다.",
    useCase: {
      statuses: {
        name: "상태",
        description:
          "다른 컴포넌트의 `preset`과 유사한 상태 속성이 있으며, 컴포넌트의 기능에도 영향을 미칩니다.",
        noStatus: {
          label: "상태 없음",
          helper: "이것이 기본 상태입니다",
          placeholder: "텍스트가 여기에 들어갑니다",
        },
        error: {
          label: "오류 상태",
          helper: "오류가 있을 때 사용하는 상태입니다",
          placeholder: "텍스트가 여기에 들어갑니다",
        },
        disabled: {
          label: "비활성 상태",
          helper: "편집 기능을 비활성화하고 텍스트를 표시하지 않습니다",
          placeholder: "텍스트가 여기에 들어갑니다",
        },
      },
      passingContent: {
        name: "내용 전달",
        description: "내용을 전달하는 몇 가지 방법이 있습니다.",
        viaLabel: {
          labelTx: "`label` 속성으로",
          helper: "`helper` 속성으로",
          placeholder: "`placeholder` 속성으로",
        },
        rightAccessory: {
          label: "오른쪽 액세서리",
          helper: "이 속성은 React 요소를 반환하는 함수를 받습니다.",
        },
        leftAccessory: {
          label: "왼쪽 액세서리",
          helper: "이 속성은 React 요소를 반환하는 함수를 받습니다.",
        },
        supportsMultiline: {
          label: "멀티라인 지원",
          helper: "멀티라인 텍스트를 위한 더 높은 입력을 활성화합니다.",
        },
      },
      styling: {
        name: "스타일링",
        description: "컴포넌트는 쉽게 스타일링할 수 있습니다.",
        styleInput: {
          label: "입력 스타일",
          helper: "`style` 속성으로",
        },
        styleInputWrapper: {
          label: "입력 래퍼 스타일",
          helper: "`inputWrapperStyle` 속성으로",
        },
        styleContainer: {
          label: "컨테이너 스타일",
          helper: "`containerStyle` 속성으로",
        },
        styleLabel: {
          label: "레이블 및 헬퍼 스타일",
          helper: "`LabelTextProps` 및 `HelperTextProps` 스타일 속성으로",
        },
        styleAccessories: {
          label: "액세서리 스타일",
          helper: "`RightAccessory` 및 `LeftAccessory` 스타일 속성으로",
        },
      },
    },
  },
  demoToggle: {
    description:
      "불리언 입력을 렌더링합니다. 사용자가 수행한 작업을 반영하기 위해 값 속성을 업데이트하는 onValueChange 콜백이 필요한 제어된 컴포넌트입니다. 값 속성이 업데이트되지 않으면, 컴포넌트는 사용자 작업의 예상 결과 대신 제공된 값 속성을 계속 렌더링합니다.",
    useCase: {
      variants: {
        name: "변형",
        description:
          "이 컴포넌트는 몇 가지 변형을 지원합니다. 특정 변형을 대폭 커스터마이즈해야 하는 경우에는 쉽게 리팩토링할 수 있습니다. 기본값은 `체크박스`입니다.",
        checkbox: {
          label: "`체크박스` 변형",
          helper: "단일 켜기/끄기 입력에 사용할 수 있습니다.",
        },
        radio: {
          label: "`라디오` 변형",
          helper: "여러 옵션이 있는 경우 사용하십시오.",
        },
        switch: {
          label: "`스위치` 변형",
          helper: "더 눈에 띄는 켜기/끄기 입력입니다. 접근성 지원이 더 좋습니다.",
        },
      },
      statuses: {
        name: "상태",
        description:
          "다른 컴포넌트의 `preset`과 유사한 상태 속성이 있으며, 컴포넌트의 기능에도 영향을 미칩니다.",
        noStatus: "상태 없음 - 기본 상태",
        errorStatus: "오류 상태 - 오류가 있을 때 사용",
        disabledStatus: "비활성 상태 - 편집 기능을 비활성화하고 입력을 표시하지 않음",
      },
      passingContent: {
        name: "내용 전달",
        description: "내용을 전달하는 몇 가지 방법이 있습니다.",
        useCase: {
          checkBox: {
            label: "`labelTx` 속성으로",
            helper: "`helperTx` 속성으로",
          },
          checkBoxMultiLine: {
            helper: "멀티라인 지원 - 멀티라인 지원을 위한 예제 문장입니다. 하나 둘 셋.",
          },
          radioChangeSides: {
            helper: "양쪽을 변경할 수 있습니다 - 양쪽 변경을 위한 예제 문장입니다. 하나 둘 셋.",
          },
          customCheckBox: {
            label: "맞춤 체크박스 아이콘 전달.",
          },
          switch: {
            label: "스위치는 텍스트로 읽을 수 있습니다",
            helper:
              "기본적으로 이 옵션은 `Text`를 사용하지 않습니다. 폰트에 따라 켜기/끄기 문자가 이상하게 보일 수 있기 때문입니다. 필요에 따라 커스터마이즈하세요.",
          },
          switchAid: {
            label: "또는 아이콘으로 보조",
          },
        },
      },
      styling: {
        name: "스타일링",
        description: "컴포넌트는 쉽게 스타일링할 수 있습니다.",
        outerWrapper: "1 - 입력 외부 래퍼 스타일링",
        innerWrapper: "2 - 입력 내부 래퍼 스타일링",
        inputDetail: "3 - 입력 디테일 스타일링",
        labelTx: "labelTx도 스타일링할 수 있습니다",
        styleContainer: "또는 전체 컨테이너 스타일링",
      },
    },
  },
  demoButton: {
    description:
      "사용자가 작업을 수행하고 선택을 할 수 있도록 하는 컴포넌트입니다. Text 컴포넌트를 Pressable 컴포넌트로 감쌉니다.",
    useCase: {
      presets: {
        name: "프리셋",
        description: "사전 구성된 몇 가지 프리셋이 있습니다.",
      },
      passingContent: {
        name: "내용 전달",
        description: "내용을 전달하는 몇 가지 방법이 있습니다.",
        viaTextProps: "`text` 속성으로 - 예제 문장입니다.",
        children: "자식 - 또 다른 예제 문장입니다.",
        rightAccessory: "오른쪽 액세서리 - 예제 문장입니다.",
        leftAccessory: "왼쪽 액세서리 - 예제 문장입니다.",
        nestedChildren: "중첩 자식 - 별 하나에 추억과 별 하나에 사랑과 별 하나에 쓸쓸함과",
        nestedChildren2: "별 하나에 동경과 별 하나에 시와 ",
        nestedChildren3: "별 하나에 어머니, 어머니.",
        multiLine:
          "멀티라인 - 죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다. 별을 노래하는 마음으로 모든 죽어 가는 것을 사랑해야지 그리고 나한테 주어진 길을 걸어가야겠다. 오늘 밤에도 별이 바람에 스치운다.",
      },
      styling: {
        name: "스타일링",
        description: "컴포넌트는 쉽게 스타일링할 수 있습니다.",
        styleContainer: "스타일 컨테이너 - 예제 문장",
        styleText: "스타일 텍스트 - 예제 문장",
        styleAccessories: "스타일 액세서리 - 또 다른 예제 문장",
        pressedState: "스타일 눌린 상태 - 예제 문장",
      },
      disabling: {
        name: "비활성화",
        description:
          "컴포넌트는 비활성화할 수 있으며, 그에 따라 스타일링할 수 있습니다. 누르는 동작이 비활성화됩니다.",
        standard: "비활성화 - 표준",
        filled: "비활성화 - 채워진",
        reversed: "비활성화 - 역방향",
        accessory: "비활성화된 액세서리 스타일",
        textStyle: "비활성화된 텍스트 스타일",
      },
    },
  },
  demoListItem: {
    description: "FlatList, SectionList 또는 자체적으로 사용할 수 있는 스타일된 행 컴포넌트입니다.",
    useCase: {
      height: {
        name: "높이",
        description: "행은 다른 높이를 가질 수 있습니다.",
        defaultHeight: "기본 높이 (56px)",
        customHeight: "`height` 속성을 통해 사용자 정의 높이",
        textHeight:
          "텍스트 내용에 의해 결정된 높이 - 예제를 위한 긴 문장입니다. 하나 둘 셋. 안녕하세요.",
        longText:
          "긴 텍스트를 한 줄로 제한 - 이것 역시 예제를 위한 긴 문장입니다. 오늘 날씨는 어떤가요?",
      },
      separators: {
        name: "구분선",
        description: "구분선 / 디바이더가 사전 구성되어 있으며 선택 사항입니다.",
        topSeparator: "상단 구분선만",
        topAndBottomSeparator: "상단 및 하단 구분선",
        bottomSeparator: "하단 구분선만",
      },
      icons: {
        name: "아이콘",
        description: "왼쪽 또는 오른쪽 아이콘을 사용자 정의할 수 있습니다.",
        leftIcon: "왼쪽 아이콘",
        rightIcon: "오른쪽 아이콘",
        leftRightIcons: "왼쪽 및 오른쪽 아이콘",
      },
      customLeftRight: {
        name: "사용자 정의 왼쪽/오른쪽 컴포넌트",
        description: "필요시에는 사용자가 정의한 왼쪽/오른쪽 컴포넌트를 전달할 수 있습니다.",
        customLeft: "사용자 정의 왼쪽 컴포넌트",
        customRight: "사용자 정의 오른쪽 컴포넌트",
      },
      passingContent: {
        name: "내용 전달",
        description: "내용을 전달하는 몇 가지 방법이 있습니다.",
        text: "`text` 속성으로 - 예제 문장입니다.",
        children: "자식 - 또 다른 예제 문장입니다.",
        nestedChildren1: "중첩 자식 - 이것도 예제 문장입니다..",
        nestedChildren2: "또 다른 예제 문장, 중첩이 된 형태입니다.",
      },
      listIntegration: {
        name: "FlatList 및 FlashList 통합",
        description: "이 컴포넌트는 선호하는 리스트 인터페이스와 쉽게 통합할 수 있습니다.",
      },
      styling: {
        name: "스타일링",
        description: "컴포넌트는 쉽게 스타일링할 수 있습니다.",
        styledText: "스타일된 텍스트",
        styledContainer: "스타일된 컨테이너 (구분선)",
        tintedIcons: "색이 입혀진 아이콘",
      },
    },
  },
  demoCard: {
    description:
      "카드는 관련 정보를 컨테이너에 담아 표시하는 데 유용합니다. ListItem이 내용을 수평으로 표시한다면, 카드는 내용을 수직으로 표시할 수 있습니다.",
    useCase: {
      presets: {
        name: "프리셋",
        description: "사전 구성된 몇 가지 프리셋이 있습니다.",
        default: {
          heading: "기본 프리셋 (기본값)",
          content: "예제 문장입니다. 그믐밤 반디불은 부서진 달조각",
          footer: "숲으로 가자 달조각을 주으려 숲으로 가자.",
        },
        reversed: {
          heading: "역방향 프리셋",
          content: "예제 문장입니다. 그믐밤 반디불은 부서진 달조각",
          footer: "숲으로 가자 달조각을 주으려 숲으로 가자.",
        },
      },
      verticalAlignment: {
        name: "수직 정렬",
        description: "카드는 필요에 따라 미리 구성된 다양한 정렬방법으로 제공됩니다.",
        top: {
          heading: "상단 (기본값)",
          content: "모든 콘텐츠가 자동으로 상단에 정렬됩니다.",
          footer: "심지어 푸터도",
        },
        center: {
          heading: "중앙",
          content: "콘텐츠는 카드 높이에 상대적으로 중앙에 배치됩니다.",
          footer: "나도!",
        },
        spaceBetween: {
          heading: "공간 사이",
          content: "모든 콘텐츠가 고르게 간격을 둡니다.",
          footer: "나는 내가 있고 싶은 곳에 있어요.",
        },
        reversed: {
          heading: "푸터 강제 하단",
          content: "푸터를 원하는 위치에 밀어 넣습니다.",
          footer: "여기 너무 외로워요.",
        },
      },
      passingContent: {
        name: "내용 전달",
        description: "내용을 전달하는 몇 가지 방법이 있습니다.",
        heading: "`heading` 속성으로",
        content: "`content` 속성으로",
        footer: "푸터도 외로워요.",
      },
      customComponent: {
        name: "사용자 정의 컴포넌트",
        description:
          "사전 구성된 컴포넌트 중 하나를 직접 만든 자신의 컴포넌트로 대체할 수 있습니다. 추가 컴포넌트도 덧붙여 넣을 수 있습니다.",
        rightComponent: "오른쪽 컴포넌트",
        leftComponent: "왼쪽 컴포넌트",
      },
      style: {
        name: "스타일링",
        description: "컴포넌트는 쉽게 스타일링할 수 있습니다.",
        heading: "헤딩 스타일링",
        content: "컨텐츠 스타일링",
        footer: "푸터 스타일링",
      },
    },
  },
  demoAutoImage: {
    description: "원격 또는 data-uri 이미지의 크기를 자동으로 조정하는 Image 컴포넌트입니다.",
    useCase: {
      remoteUri: { name: "원격 URI" },
      base64Uri: { name: "Base64 URI" },
      scaledToFitDimensions: {
        name: "치수에 맞게 조정",
        description:
          "`maxWidth` 단독으로, 혹은 `maxHeight` 속성과 함께 제공하면, 이미지는 비율을 유지하면서 자동으로 크기가 조정됩니다. 이것이 `resizeMode: 'contain'`과 다른 점은 무엇일까요? 첫째, 한쪽 크기만 지정할 수 있습니다. 둘째, 이미지가 이미지 컨테이너 내에 포함되는 대신 원하는 치수에 맞게 조정됩니다.",
        heightAuto: "너비: 60 / 높이: 자동",
        widthAuto: "너비: 자동 / 높이: 32",
        bothManual: "너비: 60 / 높이: 60",
      },
    },
  },
  demoText: {
    description:
      "텍스트 표시가 필요한 경우를 위해, 이 컴포넌트는 기본 React Native 컴포넌트 위에 HOC로 제작되었습니다.",
    useCase: {
      presets: {
        name: "프리셋",
        description: "사전 구성된 몇 가지 프리셋이 있습니다.",
        default: "기본 프리셋 - 예제 문장입니다. 하나 둘 셋.",
        bold: "볼드 프리셋 - 예제 문장입니다. 하나 둘 셋.",
        subheading: "서브헤딩 프리셋 - 예제 문장입니다. 하나 둘 셋.",
        heading: "헤딩 프리셋 - 예제 문장입니다. 하나 둘 셋.",
      },
      sizes: {
        name: "크기",
        description: "크기 속성이 있습니다.",
        xs: "xs - 조금 더 작은 크기 속성입니다.",
        sm: "sm - 작은 크기 속성입니다.",
        md: "md - 중간 크기 속성입니다.",
        lg: "lg - 큰 크기 속성입니다.",
        xl: "xl - 조금 더 큰 크기 속성입니다.",
        xxl: "xxl - 아주 큰 크기 속성입니다.",
      },
      weights: {
        name: "굵기",
        description: "굵기 속성이 있습니다.",
        light: "가벼움 - 예제 문장입니다. 안녕하세요. 하나 둘 셋.",
        normal: "보통 - 예제 문장입니다. 안녕하세요. 하나 둘 셋.",
        medium: "중간 - 예제 문장입니다. 안녕하세요. 하나 둘 셋.",
        semibold: "세미볼드 - 예제 문장입니다. 안녕하세요. 하나 둘 셋.",
        bold: "볼드 - 예제 문장입니다. 안녕하세요. 하나 둘 셋.",
      },
      passingContent: {
        name: "내용 전달",
        description: "내용을 전달하는 몇 가지 방법이 있습니다.",
        viaText:
          "`text` 속성으로 - 죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다. 별을 노래하는 마음으로 모든 죽어 가는 것을 사랑해야지 그리고 나한테 주어진 길을 걸어가야겠다. 오늘 밤에도 별이 바람에 스치운다.",
        viaTx: "`tx` 속성으로",
        children: "자식 - 또 다른 예제 문장입니다. 하나 둘 셋.",
        nestedChildren: "중첩 자식",
        nestedChildren2: "죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, ",
        nestedChildren3: "잎새에 이는 바람에도 나는 괴로워했다.",
        nestedChildren4: "별을 노래하는 마음으로 모든 죽어 가는 것을 사랑해야지.",
      },
      styling: {
        name: "스타일링",
        description: "컴포넌트는 쉽게 스타일링할 수 있습니다.",
        text: "그리고 나한테 주어진 길을 걸어가야겠다.",
        text2: "오늘 밤에도 별이 바람에 스치운다.",
        text3: "계속 이어지는 예제 문장입니다. 하나 둘 셋.",
      },
    },
  },
  demoHeader: {
    description:
      "여러 화면에 나타나는 컴포넌트입니다. 네비게이션 버튼과 화면 제목을 포함할 것입니다.",
    useCase: {
      actionIcons: {
        name: "액션 아이콘",
        description: "왼쪽 또는 오른쪽 액션 컴포넌트에 아이콘을 쉽게 전달할 수 있습니다.",
        leftIconTitle: "왼쪽 아이콘",
        rightIconTitle: "오른쪽 아이콘",
        bothIconsTitle: "양쪽 아이콘",
      },
      actionText: {
        name: "액션 텍스트",
        description: "왼쪽 또는 오른쪽 액션 컴포넌트에 텍스트를 쉽게 전달할 수 있습니다.",
        leftTxTitle: "`leftTx`를 통해",
        rightTextTitle: "`rightText`를 통해",
      },
      customActionComponents: {
        name: "사용자 정의 액션 컴포넌트",
        description:
          "아이콘이나 텍스트 옵션이 충분하지 않은 경우, 사용자 정의 액션 컴포넌트를 전달할 수 있습니다.",
        customLeftActionTitle: "사용자 정의 왼쪽 액션",
      },
      titleModes: {
        name: "제목 모드",
        description:
          "제목은 기본적으로 중앙에 고정되지만 너무 길면 잘릴 수 있습니다. 액션 버튼에 맞춰 조정할 수 있습니다.",
        centeredTitle: "중앙 제목",
        flexTitle: "유연한 제목",
      },
      styling: {
        name: "스타일링",
        description: "컴포넌트는 쉽게 스타일링할 수 있습니다.",
        styledTitle: "스타일된 제목",
        styledWrapperTitle: "스타일된 래퍼",
        tintedIconsTitle: "색이 입혀진 아이콘",
      },
    },
  },
  demoEmptyState: {
    description:
      "표시할 데이터가 없을 때 사용할 수 있는 컴포넌트입니다. 사용자가 다음에 무엇을 할지 안내할 수 있습니다.",
    useCase: {
      presets: {
        name: "프리셋",
        description:
          "다양한 텍스트/이미지 세트를 만들 수 있습니다. `generic`이라는 사전 정의된 세트가 하나 있습니다. 기본값이 없으므로 완전히 사용자 정의된 EmptyState를 원할 경우 사용할 수 있습니다.",
      },
      passingContent: {
        name: "내용 전달",
        description: "내용을 전달하는 몇 가지 방법이 있습니다.",
        customizeImageHeading: "이미지 맞춤 설정",
        customizeImageContent: "어떤 이미지 소스도 전달할 수 있습니다.",
        viaHeadingProp: "`heading` 속성으로",
        viaContentProp: "`content` 속성으로",
        viaButtonProp: "`button` 속성으로",
      },
      styling: {
        name: "스타일링",
        description: "컴포넌트는 쉽게 스타일링할 수 있습니다.",
      },
    },
  },
}

export default demoKo

// @demo remove-file
