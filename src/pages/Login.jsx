import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("common");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { username, password }
      );
      localStorage.setItem("token", JSON.stringify(response.data.jwt));
      toast.success("Login Successfully!");
      navigate("/home");
    } catch (error) {
      toast.error("Invalid username or password!");
    }
  };

  const handleValid = async (data) => {
    try {
      await axios.post("http://localhost:8080/api/auth/register", data);
      toast.success("Registered Successfully!");
      setIsLogin(true);
    } catch (error) {
      toast.error("Try again");
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <Toaster />
      <div className="flex flex-1 justify-center items-center">
        <img
          className="object-cover h-full w-full"
          src={require("../resource/login-bg.jpg")}
          alt="logo"
        />
      </div>
      {isLogin ? (
        <div className="flex flex-1 justify-center items-center shadow-2xl">
          <div className="p-6 border rounded-md flex flex-col justify-center items-center w-[350px]">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/DXC_Technology_logo_%282021%29.svg/1200px-DXC_Technology_logo_%282021%29.svg.png"
              alt="background"
              className="w-20"
            />
            <span className="mt-3 mr-auto">{t("username")}</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 w-full rounded-md mt-1 bg-slate-100"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500 text-center mb-5">
                {errors.username.message}
              </p>
            )}
            <span className="mt-3 mr-auto">{t("password")}</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 w-full rounded-md mt-1 bg-slate-100"
              placeholder="Password"
              type="password"
            />
            <button
              onClick={onLogin}
              className="my-4 px-4 py-1.5 rounded-md bg-[#6610f2] text-white hover:opacity-70 transition-all duration-300"
            >
              {t("Login")}
            </button>
            <div>
              <span className="text-sm text-slate-500 mr-1">
                {t("Don't have an account yet?")}
              </span>
            </div>
            <span
              onClick={() => setIsLogin(false)}
              className="text-sm font-bold text-[#6610f2] cursor-pointer hover:opacity-70 transition-all duration-300"
            >
              {t("Register Now!")}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 justify-center items-center shadow-2xl ">
          <div className="p-6 border rounded-md flex flex-col justify-center items-center w-[350px]">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/DXC_Technology_logo_%282021%29.svg/1200px-DXC_Technology_logo_%282021%29.svg.png"
              className="w-24 mb-2"
              alt="logo"
            />
            <form
              onSubmit={handleSubmit(handleValid)}
              className="flex justify-center items-center flex-col w-full"
            >
              <span className="mt-3 mr-auto">{t("First Name")}</span>
              <input
                {...register("firstname", {
                  required: "This field is required",
                })}
                className="p-2 w-full rounded-md mt-1 bg-slate-100"
                placeholder="First Name"
              />
              {errors.firstname && (
                <p className="text-red-500 text-center mb-3 mr-auto">
                  {errors.firstname.message}
                </p>
              )}
              <span className="mt-3 mr-auto">{t("Last Name")}</span>
              <input
                {...register("lastname", {
                  required: "This field is required",
                })}
                className="p-2 w-full rounded-md mt-1 bg-slate-100"
                placeholder="Last Name"
              />
              {errors.lastname && (
                <p className="text-red-500 text-center mb-3 mr-auto">
                  {errors.lastname.message}
                </p>
              )}
              <span className="mt-3 mr-auto">{t("username")}</span>
              <input
                {...register("username", {
                  required: "This field is required",
                })}
                className="p-2 w-full rounded-md mt-1 bg-slate-100"
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-red-500 text-center mb-3 mr-auto">
                  {errors.username.message}
                </p>
              )}
              <span className="mt-3 mr-auto">{t("password")}</span>

              <input
                {...register("password", {
                  required: "This field is required",
                })}
                className="p-2 w-full rounded-md mt-1 bg-slate-100"
                placeholder="Password"
                type="password"
              />
              {errors.password && (
                <p className="text-red-500 text-center mb-3 mr-auto">
                  {errors.password.message}
                </p>
              )}
              <span className="mt-3 mr-auto">{t("Password Confirmation")}</span>
              <input
                {...register("confirm_password", {
                  required: true,
                  validate: (val) => {
                    if (watch("password") !== val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
                className="p-2 w-full rounded-md mt-1 bg-slate-100"
                placeholder="Password"
                type="password"
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-center mb-3 mr-auto">
                  {errors.confirm_password.message}
                </p>
              )}
              <div className="flex flex-col mr-auto mt-3">
                <span>{t("Role")}</span>
                <FormControl>
                  <RadioGroup
                    defaultValue="USER"
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      {...register("role")}
                      value="USER"
                      control={<Radio />}
                      label={t("USER")}
                    />
                    <FormControlLabel
                      {...register("role")}
                      value="MANAGER"
                      control={<Radio />}
                      label={t("MANAGER")}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <button className="my-4 px-4 py-1.5 rounded-md bg-[#6610f2] text-white hover:opacity-70 transition-all duration-300">
                {t("Register")}
              </button>
              <div>
                <span className="text-sm text-slate-500 mr-1">
                  {t("Already have an account?")}
                </span>
              </div>
              <span
                onClick={() => setIsLogin(true)}
                className="text-sm font-bold text-[#6610f2] cursor-pointer hover:opacity-70 transition-all duration-300"
              >
                {t("Login")}
              </span>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
