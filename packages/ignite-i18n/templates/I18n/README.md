# Idea

Shipping app with localization for all available languages. The main idea here is to minimize the memory required of other languages that is not used by the platform.

For example if the phone is localized in French, then this will only load the French and English translations into memory and ignore the 30+ other languages available.

English translation is set as default fallback in case some translations are not available in the chosen language.

# Installation

Run `ignite add i18n`.

# Usage

TODO: Real usage example.

    import I18n from 'react-native-i18n';

    render() {
    ...
    { I18n.t('welcome') }
    ...
    }
