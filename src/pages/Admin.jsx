import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Admin = () => {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("common");

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-screen h-screen">
      <span className="text-2xl">{t("WELCOME TO MANAGER PAGE")}</span>
      <div
        className="text-xl text-[#6610f2] cursor-pointer"
        onClick={() => navigate("/home")}
      >
        {t("GO BACK")}
      </div>
    </div>
  );
};
