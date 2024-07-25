import { Outlet, useNavigate } from "react-router-dom";
export const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col min-h-screen bg-customBlue4 rounded-t-lg">
        <header className="bg-customBlue text-white flex justify-between items-center p-4">
          <div className="flex items-center">
            <img
              src="../src/assets/easylife_logo.png"
              alt="EasyLife Logo"
              className="h-20 w-50 mr-1"
            />
          </div>
          <nav className="flex space-x-11 mx-auto">
            <a
              href="/"
              className="hover:text-customGreen font-roboto text-24px"
            >
              Accueil
            </a>
            <a
              href="#"
              className="hover:text-customGreen font-roboto text-24px"
            >
              Fonctionnalité
            </a>
            <a
              href="#"
              className="hover:text-customGreen font-roboto text-24px"
            >
              Contact
            </a>
            <a
              href="/login"
              className="hover:text-customGreen font-roboto text-24px"
            >
              S'identifier
            </a>
          </nav>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/register", { replace: true })}
              className="bg-customBlue2 hover:bg-customGreen text-white font-bold py-3 px-11  rounded-2xl"
            >
              S'INSCRIRE
            </button>
            <div className="flex items-center relative">
              <img
                src="../src/assets/fr.png"
                alt="French"
                className="h-10 w-10"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </header>

        <Outlet />

        <footer className="bg-customBlue text-white text-center">
          <div className="flex justify-between items-center">
            <img
              src="../src/assets/easylife_logo.png"
              alt="EasyLife Logo"
              className="h-20 w-50 mr-1"
            />
            <div className="flex flex-col items-start">
              <p className="flex items-center text-white">
                <img src="../src/assets/call.png" className="w-6 h-6 mr-2 " />
                07 326 1235 14523
              </p>
              <p className="flex items-center text-white">
                <img src="../src/assets/email.png" className="w-6 h-6 mr-2" />
                <a
                  href="mailto:chadly_zohra@hotmail.com"
                  className="text-white mr-2"
                >
                  chadly_zohra@hotmail.com
                </a>
              </p>
            </div>
          </div>
          <div className="bg-customGreen text-white p-4 mt-4 rounded-b-2xl w-full">
            <div className="flex justify-items-start">
              <p>© 2024 Easy Life | Powered by Zohra</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
