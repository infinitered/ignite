module.exports = function transformer(file, api) {
  const j = api.jscodeshift
  const rootSource = j(file.source)

  // remove mobx-react-lite imports
  const importToRemove = rootSource.find(j.ImportDeclaration, {
    source: {
      value: "mobx-react-lite",
    },
  })
  if (importToRemove.length > 0) {
    importToRemove.remove()
  }

  // look for any observer() calls and replace them with the component function
  rootSource
    .find(j.CallExpression, {
      callee: {
        type: "Identifier",
        name: "observer",
      },
    })
    .replaceWith((path) => {
      const observerCall = path.node
      const componentFn = observerCall.arguments[0]
      return j.arrowFunctionExpression(componentFn.params, componentFn.body, false)
    })

  // remove any ./models imports
  //   rootSource.find(j.ImportDeclaration, { source: { value: "./models" } }).remove()

  // replace app.tsx hydration code
  //   rootSource
  //     .find(j.Identifier)
  //     .filter((path) => path.node.name === "useInitialStore")
  //     .closest(j.CallExpression)
  //     .replaceWith((p) => {
  //       console.log("replacing!")
  //       return j.callExpression(j.identifier("useEffect"), [
  //         j.arrowFunctionExpression([], p.node.arguments[0].body),
  //         j.arrayExpression([]),
  //       ])
  //     })

  //   rootSource
  //     .find(j.FunctionDeclaration)
  //     .filter((path) => path.node.id.name === "App")
  //     .forEach((path) => {
  //       path.node.body.body.forEach((stmt) => {
  //         if (stmt.type === "VariableDeclaration") {
  //           console.log("declarations", stmt.declarations[0])
  //           j(stmt)
  //             .find(j.Identifier)
  //             .filter((p) => p.node.name === "useInitialRootStore")
  //             .closest(j.CallExpression)
  //             .replaceWith((p) => {
  //               return j.callExpression(j.identifier("useEffect"), [
  //                 j.arrowFunctionExpression([], p.node.arguments[0].body),
  //                 j.arrayExpression([]),
  //               ])
  //             })

  //           //   j(stmt)
  //           //     .find(j.Identifier)
  //           //     .filter((p) => p.node.name === "rehydrated")
  //           //     .closest(j.VariableDeclarator)
  //           //     .remove()
  //         }
  //       })
  //     })

  return rootSource.toSource()
}

module.exports.parser = "tsx"
