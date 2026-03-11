import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./langs/en";
import ar from "./langs/ar";
import ur from "./langs/ur";
import tr from "./langs/tr";
import de from "./langs/de";

i18n.use(initReactI18next).init({
  resources: { en, ar, ur, tr, de },
  lng: localStorage.getItem("fitsphere-lang") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
