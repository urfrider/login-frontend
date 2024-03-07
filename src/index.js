import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { TranslationToggle } from "./component/TranslationToggle";
import { I18nextProvider } from "react-i18next";
import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import common_zh from "./translations/zh/common.json";
import common_en from "./translations/en/common.json";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

i18next
  .use(Backend)
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false }, // React already does escaping
    fallbackLng: "en",
    debug: false,
    resources: {
      en: {
        common: common_en, // 'common' is our custom namespace
      },
      zh: {
        common: common_zh,
      },
    },
  });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <div className="relative">
          <TranslationToggle />
          <Toaster />
          <App />
        </div>
      </BrowserRouter>
    </I18nextProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
