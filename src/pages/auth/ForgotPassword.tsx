import {useState} from "react";
import authService from "../../services/authServices";
import {ToastContainer} from "react-toastify";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
function ForgotPassword  ()  {
  const [email,setEmail] = useState("")
const handleSendUserEmail = async (e:any) => {
  e.preventDefault()
   await authService.sendResetPasswordEmail({email:email})
 
}

  return (

    <div className="bg-customBlue4">
      <ToastContainer/>
      <div className="bg-white w-8/12 h-fit m-7 mx-auto flex-grow rounded-3xl shadow-md p-8">
        <div className="w-1/3 m-auto">
          <h2 className="text-3xl font-bold text-center mb-20">
            Mot de passe oublié ?
          </h2>
          <form className="space-y-4 flex flex-col" onSubmit={handleSendUserEmail} >
            <p className="text-black font-bold">
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
                value={email}
                onChange={e=>setEmail(e.target.value)}
              />
            </div>
            <button className="px-3 py-5  w-4/3 bg-customBlue2 text-white py-3 rounded-2xl">
              Réinitialiser mon mot de passe
            </button>
          </form>
          <NavLink to={"/login"} className="text-customBlue2 font-semibold" >
           Se Connecter
          </NavLink>
        </div>
      </div>
    </div>
  );
};


export default ForgotPassword