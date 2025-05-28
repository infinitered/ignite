import { RefObject, ReactElement, ReactNode, useCallback } from "react"
import { ScrollViewProps, SectionList, SectionListProps } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"

import { DEFAULT_BOTTOM_OFFSET } from "@/components"

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
  /* An optional ref */
  ref?: RefObject<SectionList<ItemType>>
}

function SectionListWithKeyboardAwareScrollView<ItemType = any>({
  ref,
  renderScrollComponent,
  bottomOffset = DEFAULT_BOTTOM_OFFSET,
  contentContainerStyle,
  ...props
}: SectionListWithKeyboardAwareScrollViewProps<ItemType>): ReactElement {
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

export default SectionListWithKeyboardAwareScrollView

// @demo remove-file
