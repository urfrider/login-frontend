import { useState } from "react";
import { useTranslation } from "react-i18next";

export function TranslationToggle() {
  const [t, i18n] = useTranslation("common");
  const [isEnglish, setIsEnglish] = useState(
    i18n.language?.includes("en") ? true : false
  );
  const toggleLanguage = () => {
    if (isEnglish) {
      setIsEnglish(false);
      i18n.changeLanguage("zh");
    } else {
      setIsEnglish(true);
      i18n.changeLanguage("en");
    }
  };

  return (
    <div className="absolute bottom-10 right-10">
      <div
        className={`flex items-center justify-between mx-auto gap-3 w-full text-sm font-semibold`}
      >
        <div className="flex gap-1 items-center">
          <span className="text-[#6610f2]">{t("language")}</span>
        </div>
        <div
          className="transition-all duration-300 transition- group p-1 rounded-full flex items-center bg-slate-200 dark:bg-slate-600 text-xl relative cursor-pointer"
          onClick={toggleLanguage}
        >
          <span className="transition-all duration-300 w-[26px] h-[26px] rounded-full flex items-center justify-center text-white dark:text-slate-800">
            <img
              src={require("../resource/china.png")}
              className="opacity-40"
            />
          </span>
          <span className="transition-all duration-300 w-[26px] h-[26px] rounded-full flex items-center justify-center text-white dark:text-system-dark">
            <img
              src={require("../resource/united-kingdom.png")}
              className="opacity-40"
            />
          </span>
          <div
            className={`transition-all duration-300 absolute w-[26px] h-[26px] rounded-full flex items-center ring-0 ring-slate-500 dark:ring-slate-300 group-hover:ring-2 justify-center z-10 ${
              isEnglish && "translate-x-full"
            }`}
          >
            <img
              src={require("../resource/united-kingdom.png")}
              className={`z-10 transition-opacity duration-300 ${
                !isEnglish ? "opacity-0" : "opacity-100"
              }`}
            />
            <img
              src={require("../resource/china.png")}
              className={`z-10 transition-opacity duration-300  absolute ${
                !isEnglish ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
