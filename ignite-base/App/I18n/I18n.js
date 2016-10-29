// @flow

import I18n from 'react-native-i18n'

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true

// English language is the main language for fall back:
I18n.translations = {
  en: require('./english.json')
}

let languageCode = I18n.locale.substr(0, 2)

// All other translations for the app goes to the respective language file:
switch (languageCode) {
  case 'af':
    I18n.translations.af = require('./af.json')
    break
  case 'am':
    I18n.translations.am = require('./am.json')
    break
  case 'ar':
    I18n.translations.ar = require('./ar.json')
    break
  case 'bg':
    I18n.translations.bg = require('./bg.json')
    break
  case 'ca':
    I18n.translations.ca = require('./ca.json')
    break
  case 'cs':
    I18n.translations.cs = require('./cs.json')
    break
  case 'da':
    I18n.translations.da = require('./da.json')
    break
  case 'de':
    I18n.translations.de = require('./de.json')
    break
  case 'el':
    I18n.translations.el = require('./el.json')
    break
  case 'es':
    I18n.translations.es = require('./es.json')
    break
  case 'et':
    I18n.translations.et = require('./et.json')
    break
  case 'fi':
    let addCode = I18n.locale.substr(0, 3)
    if (addCode === 'fil') {
      I18n.translations.fil = require('./fil.json')
    } else {
      I18n.translations.fi = require('./fi.json')
    }
    break
  case 'fr':
    I18n.translations.fr = require('./fr.json')
    break
  case 'he':
    I18n.translations.he = require('./he.json')
    break
  case 'hi':
    I18n.translations.hi = require('./hi.json')
    break
  case 'hr':
    I18n.translations.hr = require('./hr.json')
    break
  case 'hu':
    I18n.translations.hu = require('./hu.json')
    break
  case 'in':
    I18n.translations.in = require('./id.json')
    break
  case 'id':
    I18n.translations.id = require('./id.json')
    break
  case 'it':
    I18n.translations.it = require('./it.json')
    break
  case 'ja':
    I18n.translations.ja = require('./ja.json')
    break
  case 'ko':
    I18n.translations.ko = require('./ko.json')
    break
  case 'lt':
    I18n.translations.lt = require('./lt.json')
    break
  case 'lv':
    I18n.translations.lv = require('./lv.json')
    break
  case 'ms':
    I18n.translations.ms = require('./ms.json')
    break
  case 'nb':
    I18n.translations.nb = require('./nb.json')
    break
  case 'nl':
    I18n.translations.nl = require('./nl.json')
    break
  case 'no':
    I18n.translations.no = require('./no.json')
    break
  case 'pl':
    I18n.translations.pl = require('./pl.json')
    break
  case 'pt':
    I18n.translations.pt = require('./pt.json')
    break
  case 'ro':
    I18n.translations.ro = require('./ro.json')
    break
  case 'ru':
    I18n.translations.ru = require('./ru.json')
    break
  case 'sl':
    I18n.translations.sl = require('./sl.json')
    break
  case 'sk':
    I18n.translations.sk = require('./sk.json')
    break
  case 'sr':
    I18n.translations.sr = require('./sr.json')
    break
  case 'sv':
    I18n.translations.sv = require('./sv.json')
    break
  case 'sw':
    I18n.translations.sw = require('./sw.json')
    break
  case 'th':
    I18n.translations.th = require('./th.json')
    break
  case 'tr':
    I18n.translations.tr = require('./tr.json')
    break
  case 'uk':
    I18n.translations.uk = require('./uk.json')
    break
  case 'vi':
    I18n.translations.vi = require('./vi.json')
    break
  case 'zh':
    I18n.translations.zh = require('./zh.json')
    break
  case 'zu':
    I18n.translations.zu = require('./zu.json')
    break
}
