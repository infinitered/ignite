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
  /* Optional function to pass a custom scroll component */
  renderScrollComponent?: () => React.ReactNode
  /* Optional bottom offset for the keyboard avoid behavior */
  bottomOffset?: number
  /* The sections to be rendered in the list */
  sections: SectionType<ItemType>[]
  /* Function to render the header for each section */
  renderSectionHeader: ({ section }: { section: SectionType<ItemType> }) => React.ReactNode
}

/**
 * SectionListWithKeyboardAwareScrollView
 *
 * A component that combines a SectionList with a KeyboardAwareScrollView to handle
 * keyboard interactions smoothly. This component is useful when you have a list of
 * sections and need to ensure that the keyboard does not cover the input fields.
 *
 * Props:
 * @param {Object} props - The properties object.
 * @param {Array} props.sections - The sections to be rendered in the list.
 * @param {Function} props.renderSectionHeader - Function to render the header for each section.
 * @param {Object} props.sectionListProps - Additional props for SectionList.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const SectionListWithKeyboardAwareScrollView = forwardRef(
  <ItemType,>(
    {
      renderScrollComponent,
      bottomOffset = DEFAULT_BOTTOM_OFFSET,
      contentContainerStyle,
      ...props
    }: SectionListWithKeyboardAwareScrollViewProps<ItemType>,
    ref: React.Ref<SectionList<ItemType>>,
  ) => {
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
  },
) as <ItemType>(
  props: SectionListWithKeyboardAwareScrollViewProps<ItemType> & {
    ref?: React.Ref<SectionList<ItemType>>
  },
) => ReactElement
