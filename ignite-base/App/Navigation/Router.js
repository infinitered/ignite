import React from 'react'
import { Transitions } from '../Themes/'

export default {
  // plugs into a Navigator to provide route -> screen/scene mapping
  renderScene (route, navigator) {
    // Let's show the appropriate component/screen/scene for this route
    // It's already defined in the .component property, so let's just
    // createElement it.
    //
    // Also, let's pass along the navigator as a property too.
    return React.createElement(route.component, {
      navigator: navigator
    })
  },

  // plugs into a Navigator to provide transition animations
  configureScene (route) {
    return route.customConfiguration || Transitions.default
  }

}
