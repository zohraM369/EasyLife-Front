import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { login, sendVerificationCode, verifyCode } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [codeSent, setCodeSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validate inputs
    if (!email) {
      setEmailError("L'adresse e-mail est obligatoire.");
      return;
    }

    if (!isEmailValid(email)) {
      setEmailError("Veuillez entrer une adresse email valide.");
      return;
    }

    if (!password) {
      setPasswordError("Le mot de passe est obligatoire.");
      return;
    }

    try {
      const result = await login({ username: email, password });
      if (result.user) {
        const code = await sendVerificationCode(email);
        console.log(code);
        setCodeSent(true);
      } else {
        setPasswordError("Échec de la connexion.");
      }
    } catch (error: any) {
      console.log("Échec de la connexion", error.response.data.msg);
      setPasswordError(error.response.data.msg);
    }
  };

  const handleCodeVerification = () => {
    console.log(verifyCode(email, verificationCode));
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (user?.role === "user") {
      navigate("/dashboard");
    } else if (user?.role === "admin") {
      navigate("/admin_dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="bg-customBlue4 min-h-screen flex items-center justify-center">
      <div className="bg-white w-8/12 h-fit m-7 mx-auto flex-grow rounded-3xl shadow-md p-8">
        <div className="w-1/3 m-auto">
          <h2 className="text-3xl font-bold text-center mb-20">S'IDENTIFIER</h2>
          {!codeSent ? (
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-black font-inter">Email</label>
                <input
                  type="text"
                  className={`w-full p-3 border ${
                    emailError ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <span className="text-red-500 text-sm">{emailError}</span>
                )}
              </div>
              <div className="relative">
                <label className="block text-black font-inter">
                  Mot de passe
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  className={`w-full p-3 border ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="mt-5 absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
                {passwordError && (
                  <span className="text-red-500 text-sm">{passwordError}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <input
                    type="checkbox"
                    id="remember"
                    className="mr-2"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
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
                Connexion
              </button>
            </form>
          ) : (
            <div>
              <label className="block text-black font-inter">
                Code de vérification
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button
                onClick={handleCodeVerification}
                className="w-2/3 bg-customBlue2 text-white py-3 rounded-2xl mt-4"
              >
                Vérifier le code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
