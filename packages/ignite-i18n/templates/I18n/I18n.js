// @flow

import I18n from 'react-native-i18n'

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true

// English language is the main language for fall back:
I18n.translations = {
  en: require('./languages/english.json')
}

let languageCode = I18n.locale.substr(0, 2)

// All other translations for the app goes to the respective language file:
switch (languageCode) {
  case 'af':
    I18n.translations.af = require('./languages/af.json')
    break
  case 'am':
    I18n.translations.am = require('./languages/am.json')
    break
  case 'ar':
    I18n.translations.ar = require('./languages/ar.json')
    break
  case 'bg':
    I18n.translations.bg = require('./languages/bg.json')
    break
  case 'ca':
    I18n.translations.ca = require('./languages/ca.json')
    break
  case 'cs':
    I18n.translations.cs = require('./languages/cs.json')
    break
  case 'da':
    I18n.translations.da = require('./languages/da.json')
    break
  case 'de':
    I18n.translations.de = require('./languages/de.json')
    break
  case 'el':
    I18n.translations.el = require('./languages/el.json')
    break
  case 'es':
    I18n.translations.es = require('./languages/es.json')
    break
  case 'et':
    I18n.translations.et = require('./languages/et.json')
    break
  case 'fi':
    let addCode = I18n.locale.substr(0, 3)
    if (addCode === 'fil') {
      I18n.translations.fil = require('./languages/fil.json')
    } else {
      I18n.translations.fi = require('./languages/fi.json')
    }
    break
  case 'fr':
    I18n.translations.fr = require('./languages/fr.json')
    break
  case 'he':
    I18n.translations.he = require('./languages/he.json')
    break
  case 'hi':
    I18n.translations.hi = require('./languages/hi.json')
    break
  case 'hr':
    I18n.translations.hr = require('./languages/hr.json')
    break
  case 'hu':
    I18n.translations.hu = require('./languages/hu.json')
    break
  case 'in':
    I18n.translations.in = require('./languages/id.json')
    break
  case 'id':
    I18n.translations.id = require('./languages/id.json')
    break
  case 'it':
    I18n.translations.it = require('./languages/it.json')
    break
  case 'ja':
    I18n.translations.ja = require('./languages/ja.json')
    break
  case 'ko':
    I18n.translations.ko = require('./languages/ko.json')
    break
  case 'lt':
    I18n.translations.lt = require('./languages/lt.json')
    break
  case 'lv':
    I18n.translations.lv = require('./languages/lv.json')
    break
  case 'ms':
    I18n.translations.ms = require('./languages/ms.json')
    break
  case 'nb':
    I18n.translations.nb = require('./languages/nb.json')
    break
  case 'nl':
    I18n.translations.nl = require('./languages/nl.json')
    break
  case 'no':
    I18n.translations.no = require('./languages/no.json')
    break
  case 'pl':
    I18n.translations.pl = require('./languages/pl.json')
    break
  case 'pt':
    I18n.translations.pt = require('./languages/pt.json')
    break
  case 'ro':
    I18n.translations.ro = require('./languages/ro.json')
    break
  case 'ru':
    I18n.translations.ru = require('./languages/ru.json')
    break
  case 'sl':
    I18n.translations.sl = require('./languages/sl.json')
    break
  case 'sk':
    I18n.translations.sk = require('./languages/sk.json')
    break
  case 'sr':
    I18n.translations.sr = require('./languages/sr.json')
    break
  case 'sv':
    I18n.translations.sv = require('./languages/sv.json')
    break
  case 'sw':
    I18n.translations.sw = require('./languages/sw.json')
    break
  case 'th':
    I18n.translations.th = require('./languages/th.json')
    break
  case 'tr':
    I18n.translations.tr = require('./languages/tr.json')
    break
  case 'uk':
    I18n.translations.uk = require('./languages/uk.json')
    break
  case 'vi':
    I18n.translations.vi = require('./languages/vi.json')
    break
  case 'zh':
    I18n.translations.zh = require('./languages/zh.json')
    break
  case 'zu':
    I18n.translations.zu = require('./languages/zu.json')
    break
}
