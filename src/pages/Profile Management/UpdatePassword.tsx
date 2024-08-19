import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { authService } from "../../services/authServices";
import { useNavigate } from "react-router-dom";

export const UpdatePassword: React.FC = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const user_id = "66a941d4d83285e45c8ea688";

  const handleUpdate = () => {
    if (newPassword != confirmPassword) {
      toast.error("Les deux mot de passes ne sont identiques");
    } else {
      authService
        .updatePassword(user_id, oldPassword, newPassword)
        .then((result) => {
          console.log(result);
          if (result.error) {
            toast.error(result.error);
          } else {
            toast.success(result.msg);
          }
        });
    }
  };

  const handleBack = () => {
    navigate("/dashboard/settings");
  };

  return (
    <div className="p-8  mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold text-blue-500 mb-4">
        Modifier le mot de passe
      </h2>
      <ToastContainer />
      <div className="mb-4 relative">
        <label className="block text-sm font-medium text-gray-700">
          Mot de passe actuelle
        </label>
        <input
          type={showPassword ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-600"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Nouvelle Mot de passe
        </label>
        <input
          type="text"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Confirmation nouvelle mot de passe
        </label>
        <input
          type="text"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mt-5 flex justify-around">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md"
          onClick={handleUpdate}
        >
          Modifier
        </button>
        <button
          className="bg-orange-500 text-white py-2 px-4 rounded-md"
          onClick={handleBack}
        >
          Retour
        </button>
      </div>
    </div>
  );
};
