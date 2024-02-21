module.exports = function transformer(file, api, options) {
  const j = api.jscodeshift
  const rootSource = j(file.source)

  const importsToRemove = options.importsToRemove || []

  // remove imports
  for (const importToRemove of importsToRemove) {
    rootSource
      .find(j.ImportDeclaration, {
        source: {
          value: importToRemove,
        },
      })
      .remove()
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

  // remove the 'useInitialRootStore' block found in app.tsx
  rootSource
    .find(j.FunctionDeclaration, {
      id: {
        name: "App",
      },
    })
    .forEach((path) => {
      path.value.body.body = path.value.body.body.filter((node) => {
        if (
          node.type === "VariableDeclaration" &&
          node.declarations[0]?.init?.callee?.name === "useInitialRootStore"
        ) {
          return false
        }
        return true
      })
    })

  // remove the reactotron-mst middleware
  // this assumes that reactotron-mst is the only spot where reactotron.use() is called
  rootSource
    .find(j.ExpressionStatement, {
      expression: {
        callee: {
          object: {
            name: "reactotron",
          },
          property: {
            name: "use",
          },
        },
      },
    })
    .remove()

  return rootSource.toSource()
}

module.exports.parser = "tsx"
