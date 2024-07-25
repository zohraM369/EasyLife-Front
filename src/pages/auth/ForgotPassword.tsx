export const ForgotPassword = () => {
  return (
    <main className="flex-grow flex justify-center items-center p-6">
      <div className="bg-white w-[50vw] p-2 shadow ">
        <h2 className="text-2xl font-bold text-center mb-4">
          Mot de passe oublié ?
        </h2>
        <form className="space-y-4">
          <p>
            Pour réinitialiser votre mot de passe, veuillez inscrire l'adresse
            e-mail de votre compte EasyLife.
          </p>
          <div>
            <label className="block text-gray-700">Email *</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded">
            Réinitialiser mon mot de passe
          </button>
        </form>
        <a href="/login" className="text-blue-500">
          {" "}
          <p className="text-center mt-4">se connecter</p>
        </a>
      </div>
    </main>
  );
};
