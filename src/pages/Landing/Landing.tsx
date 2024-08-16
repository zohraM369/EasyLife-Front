import {useNavigate} from "react-router-dom"

function Landing() {
  const navigate = useNavigate()
  return (
    <div> <section className="bg-gray-100 text-center py-20">
      <h1 className="text-4xl font-bold text-customRouge mb-4">
        SIMPLIFIEZ ET OPTIMISEZ VOTRE VIE QUOTIDIENNE
      </h1>
      <p className="text-xl text-gray-700 mb-8">
        Organisez vos tâches et activités, réalisez vos projets, <br/>et gérez votre
        vie personnelle plus efficacement.
      </p>
      <h1 className="font-medium text-4xl font-bold text-[#49D163]"> Tous sous controle</h1>
      <button onClick={()=>navigate('/register',{replace:true})} className="mt-4 bg-customBlue2 hover:bg-customGreen text-white font-bold py-3 px-8 rounded-md">
        S'INSCRIRE
      </button>
    </section>
    <>
      <hr className="bg-customGreen "></hr>
      <div>
                <section className="py-12 bg-white">
          <div className="container mx-auto flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 p-6">
              <h2 className="text-customRouge font-bold text-2xl lg:text-3xl">
                PARTOUT ET À TOUT MOMENT !
              </h2>
              <p className="mt-4 text-lg lg:text-xl font-medium">
                Disponible sur Tous Vos Écrans
              </p>
              <p className="mt-4 text-gray-700">
                EasyLife vous offre un déplacement sans effort, que vous soyez
                chez vous ou en déplacement. Toutes les fonctionnalités sont à
                votre portée.
              </p>
            </div>
            <div className="image-container">
  <img className="animated-image" src="../src/assets/landing1.png" alt="Artistic Image" />
</div>
          </div>
        </section>
                <section className="py-12 bg-customBlue2 text-white">
          <div className="container mx-auto flex flex-col lg:flex-row items-center">
            <div className="image-container lg:w-1/2 p-6">
                            <img className="animated-image" src="../src/assets/landing2.png"/>
            </div>
            <div className="lg:w-1/2 p-6">
              <h2 className="text-redAccent font-bold text-2xl lg:text-3xl">
                RÉALISEZ PLUS AVEC VOS AMIS !
              </h2>
              <p className="mt-4 text-lg lg:text-xl font-medium">
                Partagez et Réalisez Plus avec vos Amis !
              </p>
              <p className="mt-4 text-gray-200">
                Travaillez en équipe et atteignez vos objectifs ensemble.
                Réalisez plus, débloquez des récompenses et trouvez de nouvelles
                façons d'atteindre vos objectifs.
              </p>
            </div>
          </div>
        </section>
      
        <section className=" bg-white">
         <div className="flex flex-col items-center justify-center h-screen">
<div className="rectangle-container">
      
      <div className="corner top-left">
        <div className="title text-[#49D163]">Education</div>
        <img className="small-image" src="../src/assets/all_controlled/education.png" alt="Corner Image 1" />
      </div>

    
      <div className="corner top-right">
        <div className="title text-[#D0011B]">Santé et bien etre</div>
        <img className="small-image" src="../src/assets/all_controlled/sante_et_bien_etre.png" alt="Corner Image 2" />
      </div>

     
      <div className="corner bottom-left">
        
        <img className="small-image" src="../src/assets/all_controlled/travail.png" alt="Corner Image 3" />
      <div className="title text-[#1774FF]">Travail</div>
      </div>

   
      <div className="corner bottom-right">
        
        <img className="small-image" src="../src/assets/all_controlled/perso.png" alt="Corner Image 4" />
     <div className="title text-[#F5BA18]">Perso</div>
      </div>

      <div className="center-text">
Tous sous contrôle
      </div>
    </div>


  <button className="mt-5 bg-customBlue2 hover:bg-customGreen text-white font-bold py-3 px-8 rounded-md max-w-xs">
    S'INSCRIRE
  </button>
</div>
        </section>
      </div>
    </>
    <section className="bg-customBlue3  py-12">
      <div className="container mx-auto flex flex-col lg:flex-row items-left">
        <div className="lg:w-1/2 p-6">
          

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Contacter notre service
          </h2>
        </div>

        <form className="lg:w-1/2 p-6 ">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nom et prénom</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea className="w-full px-3 py-2 border rounded-lg"></textarea>
          </div>
          <button className="bg-customBlue2 hover:bg-customGreen text-white font-bold py-3 px-8 rounded-md">
            Envoyer
          </button>
        </form>
      </div>
    </section>
    
    
    </div>
  )
}

export default Landing