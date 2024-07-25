import React from "react";

export const Login: React.FC = () => {
  return (
    <main className="flex-grow flex justify-center items-center p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">S'IDENTIFIER</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded"
              value="zorazohra67@gmail.com"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded"
              value="********"
              readOnly
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-700">
                Restez connecté
              </label>
            </div>
            <a href="/forgot_password" className="text-customBlue2">
              Mot de passe oublié
            </a>
          </div>
          <button className="w-full bg-customBlue2 text-white py-3 rounded">
            Connection
          </button>
        </form>
      </div>
    </main>
  );
};
