import React from "react";

export const Register: React.FC = () => {
  return (
    <main className="flex-grow flex justify-center items-center p-6">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">S'INSCRIRE</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Nom *</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email *</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Mot de passe *</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <p className="text-red-500 text-sm">
            Les champs marqués d'un (*) sont obligatoires.
          </p>
          <button className="w-full bg-blue-500 text-white py-2 rounded">
            S'inscrire
          </button>
        </form>
        <p className="text-center mt-4">
          Vous êtes inscrit?{" "}
          <a href="/login" className="text-blue-500">
            S'IDENTIFIER
          </a>
        </p>
      </div>
    </main>
  );
};
