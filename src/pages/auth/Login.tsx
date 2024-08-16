import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await login({ email, password });
      console.log(result);

      if (result.msg) {
        toast.success(result.msg);
        setTimeout(() => {
          if (result.user.role === "admin") {
            navigate("/admin_dashboard");
          } else {
            navigate("/dashboard");
          }
        }, 1500);
      } else if (result.error) {
        toast.error(result.error);
      }
    } catch (error: any) {
      console.log("Login failed", error);
      toast.error("An error occurred during login.");
    }
  };

  return (
    <div className="bg-customBlue4 min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white w-8/12 h-fit m-7 mx-auto flex-grow rounded-3xl shadow-md p-8">
        <div className="w-1/3 m-auto">
          <h2 className="text-3xl font-bold text-center mb-20">S'IDENTIFIER</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-black font-inter">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label className="block text-black font-inter">
                Mot de passe
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="mt-5 absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-black">
                  Restez connecté
                </label>
              </div>
              <a
                href="/forgot_password"
                className="text-customBlue2 font-semibold"
              >
                Mot de passe oublié
              </a>
            </div>
            <button
              type="submit"
              className="w-2/3 bg-customBlue2 text-white py-3 rounded-2xl"
            >
              Connection
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
