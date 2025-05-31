import { forwardRef, ReactElement, ReactNode, useCallback } from "react"
import { ScrollViewProps, SectionList, SectionListProps } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"

import { DEFAULT_BOTTOM_OFFSET } from "@/components/Screen"

type SectionType<ItemType> = {
  name: string
  description: string
  data: ItemType[]
}

type SectionListWithKeyboardAwareScrollViewProps<ItemType> = SectionListProps<ItemType> & {
  /* Optional function to pass a custom scroll component */
  renderScrollComponent?: (props: ScrollViewProps) => ReactNode
  /* Optional additional offset between TextInput bottom edge and keyboard top edge. See https://kirillzyusko.github.io/react-native-keyboard-controller/docs/api/components/keyboard-aware-scroll-view#bottomoffset */
  bottomOffset?: number
  /* The sections to be rendered in the list */
  sections: SectionType<ItemType>[]
  /* Function to render the header for each section */
  renderSectionHeader: ({ section }: { section: SectionType<ItemType> }) => React.ReactNode
}

function SectionListWithKeyboardAwareScrollView<ItemType = any>(
  {
    renderScrollComponent,
    bottomOffset = DEFAULT_BOTTOM_OFFSET,
    contentContainerStyle,
    ...props
  }: SectionListWithKeyboardAwareScrollViewProps<ItemType>,
  ref: React.Ref<SectionList<ItemType>>,
): ReactElement {
  const defaultRenderScrollComponent = useCallback(
    (props: ScrollViewProps) => (
      <KeyboardAwareScrollView
        contentContainerStyle={contentContainerStyle}
        bottomOffset={bottomOffset}
        {...props}
      />
    ),
    [contentContainerStyle, bottomOffset],
  )

  return (
    <SectionList
      {...props}
      ref={ref}
      renderScrollComponent={renderScrollComponent ?? defaultRenderScrollComponent}
    />
  )
}

export default forwardRef(SectionListWithKeyboardAwareScrollView) as <ItemType = any>(
  props: SectionListWithKeyboardAwareScrollViewProps<ItemType> & {
    ref?: React.Ref<SectionList<ItemType>>
  },
) => ReactElement

// @demo remove-file
