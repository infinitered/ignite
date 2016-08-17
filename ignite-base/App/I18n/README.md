# Idea

Shipping app with localization for all available languages. The main idea here is to minimise the memory required of other languages that is not used by the platform.

For example if the phone is localized in French, then this will only load the French and English translations into memory and ignore the 30+ other languages available.

English translation is set as default fallback in case some translations are not available in the chosen language.

# Installation

First install i18n into your react native project

    npm install --save react-native-i18n
    react-native link

Then clone this project to your within your project, removing the git repo and example afterwards.

    git clone --depth 1 https://github.com/hiaw/rn-translate-template translations
    rm -rf translations/.git translations/example

Then require the translations.js file within your main app js file

    require('./translations/_translation.js');

To use the translation in app.

    import I18n from 'react-native-i18n';

    render() {
    ...
    { I18n.t('welcome') }
    ...
    }
