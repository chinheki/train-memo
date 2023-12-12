import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import KO from "../public/assets/i18n/translations/ko.json";
import EN from "../public/assets/i18n/translations/en.json";
i18n.use(initReactI18next).init({
  lng: "ko",
  fallbackLng: "ko",
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
i18n.addResourceBundle("ko", "translations", KO, false, true);
i18n.addResourceBundle("en", "translations", EN, false, true);

export default i18n;
