import React, { FormEvent, useState } from "react";
import { ajout_todo_item } from "../../services/ajout_todo_item";
import { toast, ToastContainer } from "react-toastify";
export interface Task {
  name: string;
  description: string;
  date: string;
  heure: string;
  type: string;
}
export const AjoutItemTodo: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [heure, setHeure] = useState<string>("");
  const [type, setType] = useState<string>("");
  console.log(type);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await ajout_todo_item.ajout_todoItem({
        name,
        description,
        heure,
        date,
        type,
      });
      console.log(result);
      if (result.msg) {
        toast.success(result.msg);
      } else if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("probleme! !!!! ajout_todoItem failed", error);
    }
    // const dataToSend = new FormData(e.currentTarget);
    // const dataToDisplay = Object.fromEntries(dataToSend.entries());
    // console.log(dataToDisplay);
  };
  return (
    <div className="min-h-screen flex">
      <ToastContainer />
      {/* Sidebar */}
      <aside className="bg-customBlue3 w-64 min-h-screen p-4 rounded-md">
        <div className="flex items-center mb-8">
          <span className="ml-2 text-xl font-bold">
            {" "}
            <img src="../src/assets/easylife_logo.png" />
          </span>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#" className="text-lg font-medium">
                Dashboard
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-lg font-medium">
                Boite de reception
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-lg font-medium">
                Prochainement
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-lg font-medium">
                Mes tâches
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-lg font-medium text-blue-500">
                Ajouter une tâche
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-lg font-medium">
                Paramètres
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="text-lg font-medium">
                Notifications
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Recherche"
              className="py-2 px-4 border border-gray-300 rounded-full"
            />
            <button className="text-blue-500">
              {/* Icon de recherche */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m2.13-3.5A7.5 7.5 0 1110.5 3.5a7.5 7.5 0 018.75 8.75z"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src="/path-to-profile-pic"
              alt="Zohra ben"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium">Zohra ben</span>
          </div>
        </header>

        <section className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Ajouter une tâche</h2>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Nom du tâche
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre tâche"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Descriptions
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Votre description"
                name="description"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="text"
                  placeholder="jj/mm/aaaa"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Heure</label>
                <input
                  type="text"
                  placeholder="00h00"
                  name="heure"
                  value={heure}
                  onChange={(e) => setHeure(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    onChange={(e) => setType("Perso")}
                    className="form-radio"
                  />
                  <span className="ml-2">Perso</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    onChange={(e) => setType("Education")}
                    className="form-radio"
                  />
                  <span className="ml-2">Education</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    onChange={(e) => setType("Santé & bien être")}
                    className="form-radio"
                  />
                  <span className="ml-2">Santé & bien être</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    onChange={() => {
                      setType("Travail");
                    }}
                    className="form-radio"
                  />
                  <span className="ml-2">Travail</span>
                </label>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                className="bg-green-500 hover:bg-customGreen text-white font-bold py-3 px-6 rounded-md"
                type="submit"
              >
                Ajouter
              </button>
              <button className="bg-red-500 hover:bg-customRouge text-white font-bold py-3 px-6 rounded-md">
                Annuler
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};
