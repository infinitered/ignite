// Type-safe utility to check if an unknown object has a valid string property.
// This is particularly useful in React 19 where props are typed as unknown by default.
// The function safely narrows down the type by checking both property existence and type.
export function hasValidStringProp(props: unknown, propName: string): boolean {
  return (
    props !== null &&
    typeof props === "object" &&
    propName in props &&
    typeof (props as Record<string, unknown>)[propName] === "string"
  )
}
