import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DarkModeSwitcher from "../components/Header/DarkModeSwitcher";
import { authService } from "../services/authServices";
import { useAuth } from "../context/AuthContext";
export const Settings: React.FC = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [profileImage, setProfileImage] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };
  const user_id = user._id;
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, []);

  const uploadImage = () => {
    authService.updateImage(user_id, profileImage).then((result) => {
      console.log(result);
    });
  };
  return (
    <div className="p-8 dark:bg-boxdark-2 dark:text-bodydark mx-auto bg-white shadow-md rounded-md">
      <div className="flex items-center mb-4">
        <img
          src={`http://localhost:8000${user.image}`}
          className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl"
        />
        <div className="ml-4">
          <input type="file" onChange={handleImageChange} />
          <button
            disabled={!profileImage}
            onClick={uploadImage}
            className="px-2  bg-blue-400 py-4 border border-blue text-white"
          >
            Télécharger une photo
          </button>
          <p className="text-sm text-gray-600">
            Choisissez une photo de 4 Mo maximum. La photo de votre avatar sera
            publique.
          </p>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <div className="flex items-center">
          {" "}
          <input
            type="text"
            value={name}
            disabled
            className="mt-1 p-2 block w-3/4 border border-gray-300 rounded-md shadow-sm"
          />
          <button
            onClick={() => navigate("/dashboard/update_name")}
            className="bg-blue-100 rounded p-3 mx-4 mt-2 text-blue-500"
          >
            Modifier le nom{" "}
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="flex items-center">
          <input
            type="email"
            value={email}
            disabled
            className="mt-1 p-2 block w-3/4 border border-gray-300 rounded-md shadow-sm"
          />
          <button
            onClick={() => navigate("/dashboard/update_email")}
            className="bg-blue-100 rounded p-3 mx-4 mt-2 text-blue-500"
          >
            Modifier l'email
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Ville</label>
        <div className="flex items-center">
          <input
            type="text"
            disabled
            value={user.city}
            className="mt-1 p-2 block w-3/4 border border-gray-300 rounded-md shadow-sm"
          />
          <button
            onClick={() => navigate("/dashboard/update_city")}
            className="bg-blue-100 rounded p-3 btn mx-4 mt-2 text-blue-500"
          >
            Modifier Ville
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Mot de passe
        </label>
        <div className="flex items-center">
          <input
            type="password"
            disabled
            className="mt-1 p-2 block w-3/4 border border-gray-300 rounded-md shadow-sm"
          />
          <button
            onClick={() => navigate("/dashboard/update_password")}
            className="bg-blue-100 rounded p-3 btn mx-4 mt-2 text-blue-500"
          >
            Modifier mot de passe
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Thème</label>
        <div className="mt-1 flex items-center">
          <DarkModeSwitcher />
        </div>
      </div>
      <div className="grid grid-cols-3 mb-4 flex">
        <p className="mx-2 text-md text-black mt-2">
          Cela supprimera immédiatement toutes vos données, y compris les
          tâches, les projets, les commentaires et plus, sans annulation
          possible.
        </p>

        <button className="bg-red-500 text-white py-2 px-1 rounded-md">
          Supprimer le compte
        </button>
      </div>
    </div>
  );
};
