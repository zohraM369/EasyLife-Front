import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <section className="bg-gray-100 text-center py-20">
        <h1 className="text-customRouge font-extrabold text-2xl lg:text-4xl my-6 py-2">
          SIMPLIFIEZ ET OPTIMISEZ <br></br>VOTRE VIE QUOTIDIENNE
        </h1>
        <p className="text-24px font-inter text-black my-10 py-2">
          Organisez vos tâches de manière intuitive, suivez vos progrès{" "}
          <br></br>et réalisez vos objectifs plus rapidement et plus
          efficacement.
        </p>
        <p className=" text-24px font text-customGreen my-5 py-2">
          {" "}
          TOUS SOUS CONTROLE
        </p>
        <button
          onClick={() => navigate("/register", { replace: true })}
          className="bg-customBlue2 hover:bg-customGreen text-white font-bold py-3 px-11  rounded-2xl"
        >
          S'INSCRIRE
        </button>
      </section>
      <>
        <div>
          <hr className="border-t-4 border-customGreen my-4" />
          {/* Section 1 */}
          <section className="py-12 bg-white">
            <div className="container mx-auto flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 p-6">
                <h2 className="text-customRouge font-extrabold text-40px lg:text-3xl">
                  PARTOUT ET À TOUT MOMENT !
                </h2>
                <p className="mt-4 text-35PX lg:text-xl font-extrabold text-black">
                  Disponible sur Tous Vos Écrans
                </p>
                <div className="py-2 my-5 pr-1">
                  <p className=" text-black ">
                    <span className="text-customGreen">EasyLife</span> vous
                    offre un déplacement sans effort, que vous soyez chez vous
                    ou en déplacement. Toutes les fonctionnalités sont à votre
                    portée.
                  </p>
                </div>
              </div>
              <div className="lg:w-1/2 p-6">
                <img src="../src/assets/appli.png"></img>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="py-12 bg-customBlue2 text-white">
            <div className="container mx-auto flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 p-2 lg:pr-8">
                <img
                  src="../src/assets/partage-amis.png"
                  alt="Partagez avec vos amis"
                  className="w-full h-auto"
                />
              </div>
              <div className="lg:w-1/2 p-6">
                <h2 className="text-redAccent font-bold text-xl lg:text-2xl text-customRouge">
                  RÉALISEZ PLUS AVEC VOS AMIS !
                </h2>
                <p className="mt-4 text-lg lg:text-3xl font-extrabold">
                  Partagez et Réalisez Plus avec vos Amis !
                </p>
                <p className="mt-4 text-gray-200">
                  Travaillez en équipe et atteignez vos objectifs ensemble.
                  Réalisez plus, débloquez des récompenses et trouvez de
                  nouvelles façons d'atteindre vos objectifs.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white flex flex-col items-center text-center py-20">
            <div className="flex flex-col items-center">
              <img src="../src/assets/groupe_type.png" className="mb-8" />
              <button
                onClick={() => navigate("/register", { replace: true })}
                className="bg-customBlue2 hover:bg-customGreen text-white font-bold py-3 px-11  rounded-2xl"
              >
                S'INSCRIRE
              </button>
            </div>
          </section>
        </div>
      </>
      <section className="bg-customBlue3 py-12">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 p-6 flex flex-col items-center relative">
            <img src="/src/assets/cercles.png" alt="Cercles" className="mb-8" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h2 className="text-3xl font-bold text-customGreen mb-4">
                Contacter notre service
              </h2>
              <p className="text-black  py-3 ">
                Veuillez renseigner vos informations, un représentant d'EasyLife
                vous recontactera dès que possible.
              </p>
            </div>
          </div>

          <form className="lg:w-1/2 p-6">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Nom et prénom <span className="text-customRouge">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Email <span className="text-customRouge">*</span>
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Numero de téléphone <span className="text-customRouge">*</span>
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Message <span className="text-customRouge">*</span>
              </label>
              <textarea className="w-full px-3 py-2 border rounded-lg"></textarea>
            </div>
            <p className="text-customRouge  pt-0 pb-8 text-sm">
              Les champs marqués d'un (*) sont obligatoires.
            </p>
            <button className="bg-customBlue2 hover:bg-customGreen text-white font-bold py-3 px-11  rounded-2xl">
              ENVOYER
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
