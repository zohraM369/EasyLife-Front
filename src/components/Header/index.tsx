import { Link } from 'react-router-dom';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import LogoIcon from '../../images/logo/logo-icon.svg';
import { IoSearchSharp } from "react-icons/io5";
import {useState} from 'react';
import {FaArrowLeftLong, FaArrowRightLong} from 'react-icons/fa6';
import * as routes from "../../routes/routes"


const links = [
        { label: "Home", route: routes.HOME },
        { label: "Ajouter tache", route: routes.ADDTASK },
        { label: "Les messages", route: routes.MESSAGES },
       { label: "Mes taches", route: routes.USERTASKS },
       { label: "Les paramétres", route: routes.SETTINGS },
       { label: "Prochainement", route: routes.COMINGTASKS },
       { label: "Notifications", route: routes.NOTIFICATIONS },
       { label: "Tableau de board", route: routes.DASHBOARD }
    ];




const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
      const getSuggestions = (value:any) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0
            ? []
            : links.filter(
                (route) =>
                    typeof route.label === "string" &&
                    (route.label).toLowerCase().includes(inputValue)
            );
    };

    const handleInputChange = (e:any) => {
        const value = e.target.value;
        setSearchQuery(value);
        setSuggestions(getSuggestions(value));
    };

    const handleSuggestionClick = () => {
        setSuggestions([]);
        setSearchQuery("");
    };
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={LogoIcon} alt="Logo" />
          </Link>
        </div>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                
<IoSearchSharp size={'3vh'} color='green' />


              </button>

              <input
                type="text"
                placeholder="Cherchez ..."
                className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
                value={searchQuery}
                onChange={handleInputChange}
              />
            </div>
          </form>
           {suggestions.length > 0 && (
                <ul className="absolute bg-white border rounded w-full z-50 mt-1">
                    {suggestions.map((suggestion) => (
                        <li key={suggestion.label} className="p-2 hover:bg-gray-200">
                            <Link
                                to={suggestion.route}
                                className={`flex items-center text-green-600 text-decoration-none`}
                                onClick={handleSuggestionClick}
                            >
                              <FaArrowRightLong className="mr-2" />
                                <span className="px-1">{suggestion.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
           <DropdownUser />
           
            <DropdownNotification />
           
          </ul>

          
        </div>
      </div>
    </header>
  );
};

export default Header;
