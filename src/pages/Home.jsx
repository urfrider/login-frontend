import toast from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAccount } from "../hook/useAccount";

export const Home = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("token");
  const [t, i18n] = useTranslation("common");
  const { user, isLoading } = useAccount();

  const logout = () => {
    localStorage.setItem("token", "");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center flex-col w-screen h-screen relative">
      <div
        onClick={logout}
        className="absolute top-10 right-10 cursor-pointer flex flex-col justify-center items-center hover:opacity-70 text-[#6610f2]"
      >
        <IoIosLogOut size={24} />
        <span className="text-sm font-semibold">{t("logout")}</span>
      </div>
      <div className="p-2 relative bg-[#6610f2] text-slate-200 rounded-md w-[500px] h-[500px] flex flex-col justify-center items-center">
        <span className="text-3xl font-bold mb-4">{t("WELCOME")}!!</span>
        <div className="text-xl font-semibold mb-2">
          <span>{t("NAME")}: </span>
          <span>
            {user?.firstname} {user?.lastname}
          </span>
        </div>
        <div className="text-xl font-semibold mb-2">
          <span>{t("username")}: </span>
          <span>{user?.username} </span>
        </div>
        <div className="text-xl font-semibold mb-2">
          <span>{t("Role")}: </span>
          <span>{t(`${user?.role}`)} </span>
        </div>
        {user?.role === "MANAGER" && (
          <div
            onClick={() => navigate("/admin")}
            className="absolute text-red-500 bottom-5 cursor-pointer hover:opacity-70 font-bold"
          >
            {t("RESTRICTED ONLY FOR MANAGER")}
          </div>
        )}
      </div>
    </div>
  );
};
