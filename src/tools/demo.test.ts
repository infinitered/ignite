import { demo } from "./demo"

describe("demo", () => {
  describe("removeCurrentLine", () => {
    it(`should remove line with "// ${demo.CommentType.REMOVE_CURRENT_LINE}" comment`, () => {
      const contents = `
        import React from "react"
        import { StyleProp, View, ViewStyle } from "react-native"
        
        interface DemoDividerProps {
            type?: "vertical" | "horizontal"
            size?: number
            style?: StyleProp<ViewStyle>
        }
        
        export function DemoDivider(props: DemoDividerProps) {
            const { type = "horizontal", size = 10, style: $styleOverride } = props
        
            return (
              <View
                  style={[
                    $divider,
                    type === "horizontal" && { height: size },
                    type === "vertical" && { width: size },
                    $styleOverride,
                  ]}
              />
            )
        }
        
        const $divider: ViewStyle = {
            flexGrow: 0,
            flexShrink: 0, // ${demo.CommentType.REMOVE_CURRENT_LINE}
        }
      `
      const result = demo.removeCurrentLine(contents)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(demo.CommentType.REMOVE_CURRENT_LINE)
    })

    it(`should remove line with "/* ${demo.CommentType.REMOVE_CURRENT_LINE} */" comment`, () => {
      const contents = `
        import React from "react"
        import { StyleProp, View, ViewStyle } from "react-native"
        
        interface DemoDividerProps {
            type?: "vertical" | "horizontal"
            size?: number
            style?: StyleProp<ViewStyle>
        }
        
        export function DemoDivider(props: DemoDividerProps) {
            const { type = "horizontal", size = 10, style: $styleOverride } = props
        
            return (
              <View
                  style={[
                    $divider,
                    type === "horizontal" && { height: size },
                    type === "vertical" && { width: size },
                    $styleOverride, {/* ${demo.CommentType.REMOVE_CURRENT_LINE} */}
                  ]}
              />
            )
        }
        
        const $divider: ViewStyle = {
            flexGrow: 0,
            flexShrink: 0,
        }
      `
      const result = demo.removeCurrentLine(contents)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(demo.CommentType.REMOVE_CURRENT_LINE)
    })
  })

  describe("removeNextLine", () => {
    it(`should remove comment and next line after "// ${demo.CommentType.REMOVE_NEXT_LINE}"`, () => {
      const contents = `
        export * from "./WelcomeScreen"
        export * from "./LoginScreen"
        // ${demo.CommentType.REMOVE_NEXT_LINE}
        export * from "./DemoCommunityScreen"
      `
      const result = demo.removeNextLine(contents)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(demo.CommentType.REMOVE_NEXT_LINE)
      expect(result).not.toContain("DemoCommunityScreen")
    })

    it(`should remove comment and next line after "/* ${demo.CommentType.REMOVE_NEXT_LINE} */"`, () => {
      const contents = `
        export * from "./WelcomeScreen"
        export * from "./LoginScreen"
        /* ${demo.CommentType.REMOVE_NEXT_LINE} */
        export * from "./DemoCommunityScreen"
      `
      const result = demo.removeNextLine(contents)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(demo.CommentType.REMOVE_NEXT_LINE)
      expect(result).not.toContain("DemoCommunityScreen")
    })

    it(`should not modify other lines other than "// ${demo.CommentType.REMOVE_NEXT_LINE} and line after"`, () => {
      // simulate whitespace and new lines of file after prettier format
      const contents = [
        `export * from "./DemoIcon"`,
        `export * from "./DemoTextField"`,
        `export * from "./DemoButton"`,
        `export * from "./DemoListItem"`,
        `export * from "./DemoHeader"`,
        `// ${demo.CommentType.REMOVE_NEXT_LINE}`,
        `export * from "./DemoAutoImage"`,
        `export * from "./DemoText"`,
      ].join("\n")

      const result = demo.removeNextLine(contents)
      expect(result).not.toContain(demo.CommentType.REMOVE_NEXT_LINE)
      expect(result).not.toContain("DemoAutoImage")
      expect(result).toEqual(
        [
          `export * from "./DemoIcon"`,
          `export * from "./DemoTextField"`,
          `export * from "./DemoButton"`,
          `export * from "./DemoListItem"`,
          `export * from "./DemoHeader"`,
          `export * from "./DemoText"`,
        ].join("\n"),
      )
    })
  })

  describe("removeBlock", () => {
    it(`should remove comments and lines between "// ${demo.CommentType.REMOVE_BLOCK_START}" and "// ${demo.CommentType.REMOVE_BLOCK_END}"`, () => {
      const contents = `
        export * from "./WelcomeScreen"
        export * from "./LoginScreen"
        // ${demo.CommentType.REMOVE_BLOCK_START}
        export * from "./DemoCommunityScreen"
        export * from "./DemoDebugScreen"
        export * from "./DemoComponentsScreen/DemoComponentsScreen"
        // ${demo.CommentType.REMOVE_BLOCK_END}
        export * from "./ErrorScreen/ErrorBoundary"
        // export other screens here
      `
      const result = demo.removeBlock(contents)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(demo.CommentType.REMOVE_BLOCK_START)
      expect(result).not.toContain(demo.CommentType.REMOVE_BLOCK_END)
      expect(result).not.toContain("DemoCommunityScreen")
      expect(result).not.toContain("DemoDebugScreen")
      expect(result).not.toContain("DemoComponentsScreen")
    })

    it(`should remove comments and lines between "/* ${demo.CommentType.REMOVE_BLOCK_START} */" and "/* ${demo.CommentType.REMOVE_BLOCK_END} */"`, () => {
      const contents = `
        export * from "./WelcomeScreen"
        export * from "./LoginScreen"
        /* ${demo.CommentType.REMOVE_BLOCK_START} */
        export * from "./DemoCommunityScreen"
        export * from "./DemoDebugScreen"
        export * from "./DemoComponentsScreen/DemoComponentsScreen"
        /* ${demo.CommentType.REMOVE_BLOCK_END} */
        export * from "./ErrorScreen/ErrorBoundary"
        // export other screens here
      `
      const result = demo.removeBlock(contents)
      expect(result).toMatchSnapshot()
      expect(result).not.toContain(demo.CommentType.REMOVE_BLOCK_START)
      expect(result).not.toContain(demo.CommentType.REMOVE_BLOCK_END)
      expect(result).not.toContain("DemoCommunityScreen")
      expect(result).not.toContain("DemoDebugScreen")
      expect(result).not.toContain("DemoComponentsScreen")
    })
  })
})
