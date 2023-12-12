import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ZH from "../public/assets/i18n/translations/zh.json";
import EN from "../public/assets/i18n/translations/en.json";
i18n.use(initReactI18next).init({
  lng: "zh",
  fallbackLng: "zh",
  ns: ["translations"],
  defaultNs: "translation",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ","
    },
  debug: true,
  react: {
    wait: true,
    useSuspense: false
  }
});
i18n.addResourceBundle("zh", "translations", ZH, false, true);
i18n.addResourceBundle("en", "translations", EN, false, true);

export default i18n;
