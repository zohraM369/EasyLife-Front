import React from "react";

export const Register: React.FC = () => {
  return (
    <>
      <div className="bg-customBlue4">
        <div className="bg-white w-8/12 h-fit m-7 mx-auto flex-grow rounded-3xl shadow-md p-8">
          <div className="w-1/3 m-auto">
            <h2 className="text-3xl font-bold text-center mb-20">S'INSCRIRE</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-black font-inter">
                  Nom <span className="text-customRouge">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-black font-inter">
                  Email <span className="text-customRouge">*</span>
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-black font-inter">
                  Mot de passe <span className="text-customRouge">*</span>
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <p className="text-red-500 text-sm">
                Les champs marqués d'un (*) sont obligatoires.
              </p>
              <button className="w-2/3 bg-customBlue2 text-white py-3 rounded-2xl">
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
