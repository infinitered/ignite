import React, { ReactElement } from "react"
import { SectionList, SectionListProps } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"

const DEFAULT_BOTTOM_OFFSET = 50

type SectionType<ItemType> = {
  name: string
  description: string
  data: ItemType[]
}

type SectionListWithKeyboardAwareScrollViewProps<ItemType> = SectionListProps<ItemType> & {
  /* Optional function to pass a custom scroll component */
  renderScrollComponent?: () => React.ReactNode
  /* Optional bottom offset for the keyboard avoid behavior */
  bottomOffset?: number
  /* The sections to be rendered in the list */
  sections: SectionType<ItemType>[]
  /* Function to render the header for each section */
  renderSectionHeader: ({ section }: { section: SectionType<ItemType> }) => React.ReactNode
}

function SectionListWithKeyboardAwareScrollView<ItemType>(
  {
    renderScrollComponent,
    bottomOffset = DEFAULT_BOTTOM_OFFSET,
    contentContainerStyle,
    ...props
  }: SectionListWithKeyboardAwareScrollViewProps<ItemType>,
  ref: React.Ref<SectionList<ItemType>>,
): ReactElement {
  const defaultRenderScrollComponent = () => (
    <KeyboardAwareScrollView
      contentContainerStyle={contentContainerStyle}
      bottomOffset={bottomOffset}
    />
  )

  return (
    <SectionList
      {...props}
      ref={ref}
      renderScrollComponent={renderScrollComponent || defaultRenderScrollComponent}
    />
  )
}

export default React.forwardRef(SectionListWithKeyboardAwareScrollView) as <ItemType>(
  props: SectionListWithKeyboardAwareScrollViewProps<ItemType> & {
    ref?: React.Ref<SectionList<ItemType>>
  },
) => ReactElement

// @demo remove-file
