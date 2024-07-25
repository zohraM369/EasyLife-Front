import React from "react";

export const Login: React.FC = () => {
  return (
    <div className="bg-customBlue4">
      <div className="bg-white w-8/12 h-fit m-7 mx-auto flex-grow rounded-3xl shadow-md p-8">
        <div className="w-1/3 m-auto">
          <h2 className="text-3xl font-bold text-center mb-20">S'IDENTIFIER</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-black font-inter">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value="zorazohra67@gmail.com"
                readOnly
              />
            </div>
            <div>
              <label className="block text-black font-inter">
                Mot de passe
              </label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value="********"
                readOnly
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <input type="checkbox" id="remember" className="mr-2 " />
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
            <button className="w-2/3 bg-customBlue2 text-white py-3 rounded-2xl">
              Connection
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
