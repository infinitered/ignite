import { DEFAULT_BOTTOM_OFFSET } from "app/components"
import React, { ReactElement } from "react"
import { ScrollViewProps, SectionList, SectionListProps } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"

type SectionType<ItemType> = {
  name: string
  description: string
  data: ItemType[]
}

type SectionListWithKeyboardAwareScrollViewProps<ItemType> = SectionListProps<ItemType> & {
  /* Optional function to pass a custom scroll component */
  renderScrollComponent?: (props: ScrollViewProps) => React.ReactNode
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
  const defaultRenderScrollComponent = (props: ScrollViewProps) => (
    <KeyboardAwareScrollView
      contentContainerStyle={contentContainerStyle}
      bottomOffset={bottomOffset}
      {...props}
    />
  )

  return (
    <SectionList
      {...props}
      ref={ref}
      renderScrollComponent={(props) => {
        if (renderScrollComponent) {
          return renderScrollComponent(props)
        }
        return defaultRenderScrollComponent(props)
      }}
    />
  )
}

export default React.forwardRef(SectionListWithKeyboardAwareScrollView) as <ItemType>(
  props: SectionListWithKeyboardAwareScrollViewProps<ItemType> & {
    ref?: React.Ref<SectionList<ItemType>>
  },
) => ReactElement

// @demo remove-file
