import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword: React.FC = () => {
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="bg-customBlue4 min-h-screen flex items-center justify-center">
      <div className="bg-white w-10/12 h-fit m-7 mx-auto flex-grow rounded-3xl shadow-md p-8">
        <div className="w-1/3 m-auto">
          <h2 className="text-5xl uppercase font-bold text-center mb-20">
            Réinitialisation de mot de passe
          </h2>
          <form className="space-y-4 flex flex-col">
            <p className="text-black font-bold">
              Veuillez inscrire un nouveau mot de passe pour votre compte EasyLife.
              Cela déconnectera toutes les sessions actives de votre compte.
            </p>
            <div className="relative">
              <label className="block text-black font-inter">
                Inscrivez un nouveau mot de passe <span className="text-customRouge">*</span>
              </label>
              <input
                type={newPasswordVisible ? "text" : "password"}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <div
                className="mt-5 absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                onClick={toggleNewPasswordVisibility}
              >
                {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="relative">
              <label className="block text-black font-inter">
                Confirmez votre nouveau mot de passe <span className="text-customRouge">*</span>
              </label>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <div
                className="mt-5 absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <button className="px-3 py-5 w-full bg-customBlue2 text-white py-3 rounded-2xl">
              Réinitialiser le mot de passe
            </button>
          </form>
          <p className="text-center mt-4">
            Besoin d'aide? <a href="/" className="text-customBlue2 font-semibold">Contactez-nous</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
