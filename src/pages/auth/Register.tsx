import React, { useState } from "react";
import authService from "../../services/authServices";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await authService.register({ name, email, password }).then((result) => {
        if (result.msg) {
          toast.success("compte creé avec success ! ");
          setTimeout(() => {
            navigate("/register", { replace: true });
          }, 2500);
        } else {
          toast.error(result.error);
        }
      });
    } catch (error) {
      console.error("register failed", error);
    }
  };
  return (
    <>
      <div className="bg-customBlue4">
        <ToastContainer />
        <div className="bg-white w-8/12 h-fit m-7 mx-auto flex-grow rounded-3xl shadow-md p-8">
          <div className="w-1/3 m-auto">
            <h2 className="text-3xl font-bold text-center mb-20">S'INSCRIRE</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-black font-inter">
                  Nom <span className="text-customRouge">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-black font-inter">
                  Email <span className="text-customRouge">*</span>
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-black font-inter">
                  Mot de passe <span className="text-customRouge">*</span>
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="text-red-500 text-sm">
                Les champs marqués d'un (*) sont obligatoires.
              </p>
              <button
                type="submit"
                className="w-2/3 bg-customBlue2 text-white py-3 rounded-2xl"
              >
                S'inscrire
              </button>
            </form>
            <p className="text-center mt-4">
              Vous êtes inscrit?{" "}
              <a href="/login" className="text-customBlue2 font-semibold">
                S'IDENTIFIER
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
