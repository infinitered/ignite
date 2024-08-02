import { forwardRef, ReactElement } from "react"
import { SectionList, SectionListProps } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"

const DEFAULT_BOTTOM_OFFSET = 50

type SectionType<ItemType> = {
  name: string
  description: string
  data: ItemType[]
}

type SectionListWithKeyboardAwareScrollViewProps<ItemType> = SectionListProps<ItemType> & {
  renderScrollComponent?: () => React.ReactNode,
  bottomOffset?: number
  sections: SectionType<ItemType>[]
  renderSectionHeader: ({ section }: { section: SectionType<ItemType> }) => React.ReactNode
}

export const SectionListWithKeyboardAwareScrollView = forwardRef(
  <ItemType,>(
    { renderScrollComponent, bottomOffset = DEFAULT_BOTTOM_OFFSET, contentContainerStyle, ...props }: SectionListWithKeyboardAwareScrollViewProps<ItemType>,
    ref: React.Ref<SectionList<ItemType>>,
  ) => {
    const defaultRenderScrollComponent = () => (
      <KeyboardAwareScrollView contentContainerStyle={contentContainerStyle} bottomOffset={bottomOffset} />
    )

    return (
      <SectionList
        {...props}
        ref={ref}
        renderScrollComponent={renderScrollComponent || defaultRenderScrollComponent}
      />
    )
  },
) as <ItemType>(
  props: SectionListWithKeyboardAwareScrollViewProps<ItemType> & {
    ref?: React.Ref<SectionList<ItemType>>
  },
) => ReactElement
