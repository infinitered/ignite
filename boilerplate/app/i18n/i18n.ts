/*
TODO: Set up RN unimodules
*/
import * as Localization from "expo-localization"
import i18n from "i18n-js"

const en = require("./en")
const ja = require("./ja")

i18n.fallbacks = true
i18n.translations = { en, ja }

const fallback = { languageTag: "en", isRTL: false }

i18n.locale = Localization.locale || fallback
