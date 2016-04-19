import I18n from 'react-native-i18n'

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true

// All translations for the app go here:
I18n.translations = {
  en: {
    signIn: 'Sign In',
    logOut: 'Log Out',
    loginLogoutExampleTitle: 'Login/Logout Redux + Sagas Example',
    progressiveImageComponent: 'Progressive Image Component',
    api: 'API',
    rnVectorIcons: 'RN Vector Icons',
    loginWithFacebook: 'Login with Facebook',
    rnAnimatable: 'RN Animatable',
    forgotPassword: 'Forgot Password',
    username: 'Username',
    password: 'Password',
    cancel: 'Cancel',
    welcome: 'Welcome',
    login: 'Login',
    tempIndicator: 'F'
  },
  fr: {
    signIn: 'Se connecter',
    logOut: 'Se déconnecter',
    loginLogoutExampleTitle: 'Connexion / Déconnexion Redux + Sagas Exemple',
    progressiveImageComponent: 'Composant Image Progressive',
    api: 'Mon Dieu!  Une API pour vous!',
    rnVectorIcons: 'RN icônes vectorielles',
    loginWithFacebook: 'Se connecter avec Facebook',
    rnAnimatable: 'RN Animatable',
    forgotPassword: 'Mot de passe oublié',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    cancel: 'Annuler',
    welcome: 'Bienvenue',
    login: 'S\'identifier',
    tempIndicator: 'C'
  }
}

export default I18n
