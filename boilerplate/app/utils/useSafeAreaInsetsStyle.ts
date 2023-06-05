import { Edge, useSafeAreaInsets } from "react-native-safe-area-context"

export type ExtendedEdge = Edge | "start" | "end"

const propertySuffixMap = {
  top: "Top",
  bottom: "Bottom",
  left: "Start",
  right: "End",
  start: "Start",
  end: "End",
}

const edgeInsetMap = {
  start: "left",
  end: "right",
}

export type SafeAreaInsetsStyle<
  Property extends "padding" | "margin" = "padding",
  Edges extends Array<ExtendedEdge> = Array<ExtendedEdge>
> = {
  [K in Edges[number] as `${Property}${Capitalize<K>}`]: number
}

/**
 * A hook that can be used to create a safe-area-aware style object that can be passed directly to a View.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Utils-useSafeAreaInsetsStyle.md)
 */
export function useSafeAreaInsetsStyle<
  Property extends "padding" | "margin" = "padding",
  Edges extends Array<ExtendedEdge> = [],
>(
  safeAreaEdges: Edges = [] as Edges,
  property: Property = "padding" as Property,
): SafeAreaInsetsStyle<Property, Edges>
{
  const insets = useSafeAreaInsets()

  return safeAreaEdges.reduce((acc, e) => {
    return { ...acc, [`${property}${propertySuffixMap[e]}`]: insets[edgeInsetMap[e] ?? e] }
  }, {}) as SafeAreaInsetsStyle<Property, Edges>
}
