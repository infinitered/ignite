import { DemoListScreen, DemoScreen, WelcomeScreen } from "../screens"

export const commonNavigators = {
    welcome: WelcomeScreen,
    demo: DemoScreen,
    demoList: DemoListScreen
}

/**
 * @function a middleware to handle navigator before navigate
 * @param routes list route, example: commonNavigators
 * @constructor
 */
export const NavigatorsMiddleware = (routes) => {
    // example: ...NavigatorsMiddleware(commonNavigators)
    const shallowRoute = { ...routes }
    ///do something with your routes before navigate
    return shallowRoute
}
