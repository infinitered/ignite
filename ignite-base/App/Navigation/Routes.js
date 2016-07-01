import { Transitions } from '../Themes/'

// I18n
import I18n from '../I18n/I18n.js'

export default new class Routes {

  // Here are the "Containers" in our app (e.g. Screens).
  //
  // These routes are implemented as getter functions
  // because I like the simple calling notation, but
  // they're lazily evaluated to prevent recursion
  // when the screens themselves use this Routes file.

  get MapviewExample () {
    return {
      title: 'Mapview Example',
      component: require('../Containers/MapviewExample').default,
      leftButton: 'BACK'
    }
  }

  get ListviewGridExample () {
    return {
      title: 'Listview Grid Example',
      component: require('../Containers/ListviewGridExample').default,
      leftButton: 'BACK'
    }
  }

  get ListviewExample () {
    return {
      title: 'Listview Example',
      component: require('../Containers/ListviewExample').default,
      leftButton: 'BACK'
    }
  }

  get DeviceInfoScreen () {
    return {
      title: 'Device Info',
      component: require('../Containers/DeviceInfoScreen').default,
      leftButton: 'BACK'
    }
  }

  get PresentationScreen () {
    return {
      title: I18n.t('welcome'),
      component: require('../Containers/PresentationScreen').default,
      leftButton: 'HAMBURGER'
    }
  }

  get AllComponentsScreen () {
    return {
      title: I18n.t('componentExamples'),
      component: require('../Containers/AllComponentsScreen').default,
      leftButton: 'BACK'
    }
  }

  get UsageExamplesScreen () {
    return {
      title: I18n.t('usageExamples'),
      component: require('../Containers/UsageExamplesScreen').default,
      leftButton: 'BACK'
    }
  }

  get APITestingScreen () {
    return {
      title: I18n.t('apiTesting'),
      component: require('../Containers/APITestingScreen').default,
      leftButton: 'BACK'
    }
  }

  get ThemeScreen () {
    return {
      title: I18n.t('themeSettings'),
      component: require('../Containers/ThemeScreen').default,
      leftButton: 'BACK'
    }
  }

  get LoginScreen () {
    return {
      title: I18n.t('login'),
      component: require('../Containers/LoginScreen').default,
      customConfiguration: Transitions.modal,
      rightButton: 'FORGOT_PASSWORD',
      leftButton: 'BACK'
    }
  }

}
