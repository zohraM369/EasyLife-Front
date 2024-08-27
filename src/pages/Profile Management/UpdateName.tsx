import React, { useState } from 'react';
import authService from '../../services/authServices';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const UpdateName: React.FC = () => {
  const navigate = useNavigate()
  const [newName, setNewName] = useState("");
  const [confirmName, setConfirmName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const user_id = "66a941d4d83285e45c8ea688";
const handleUpdate = () => {
  if(newName != confirmName) {
      toast.error("Les deux emails ne sont identiques")
  }else {
     authService.updateName(user_id,newName,password).then(result=>{
    if(result.error) {
      toast.error(result.error)
    }else {
      toast.success(result.msg)

    }
  })
  }
 }

 const handleBack = () => {
    navigate('/dashboard/settings')
 }
  return (
    <div className="p-8  mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold text-blue-500 mb-4">Modifier votre nom</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nouveau nom</label>
        <input
          type="email"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Confirmer le nouveau nom</label>
        <input
          type="email"
          value={confirmName}
          onChange={(e) => setConfirmName(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4 relative">
        <label className="block text-sm font-medium text-gray-700">Mot de passe de Easy life</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-600"
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>
      <div className="mt-5 flex justify-around">
        <button className="bg-green-500 text-white py-2 px-4 rounded-md" onClick={handleUpdate} >Modifier</button>
        <button className="bg-orange-500 text-white py-2 px-4 rounded-md" onClick={handleBack}>Retour</button>
      </div>
    </div>
  );
};

export default UpdateName;
