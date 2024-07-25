export const ForgotPassword = () => {
  return (
    <div className="bg-customBlue4">
      <div className="bg-white w-8/12 h-fit m-7 mx-auto flex-grow rounded-3xl shadow-md p-8">
        <div className="w-1/3 m-auto">
          <h2 className="text-3xl font-bold text-center mb-20">
            Mot de passe oublié ?
          </h2>
          <form className="space-y-4">
            <p className="text-black font-bol">
              Pour réinitialiser votre mot de passe, veuillez inscrire l'adresse
              e-mail de votre compte EasyLife.
            </p>
            <div>
              <label className="block text-black font-inter">
                Email <span className="text-customRouge">*</span>
              </label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <button className="w-2/3 bg-customBlue2 text-white py-3 rounded-2xl">
              Réinitialiser mon mot de passe
            </button>
          </form>
          <a href="/login" className="text-customBlue2 font-semibold">
            {" "}
            <p className="text-center mt-4">se connecter</p>
          </a>
        </div>
      </div>
    </div>
  );
};
