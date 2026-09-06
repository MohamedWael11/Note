import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Context";

function Navbar() {
  let navigate = useNavigate();
  let { token, setToken } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const logOut = () => {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block py-2 px-3 rounded-md text-sm font-medium transition ${
      isActive
        ? "text-blue-600 md:bg-transparent"
        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600 md:hover:bg-transparent"
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center space-x-2">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Note App Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800">
            Note App
          </span>
        </NavLink>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:items-center md:space-x-2 md:mt-0 md:border-0 md:bg-transparent">
            {token && (
              <li>
                <NavLink to="/" className={linkClass} end>
                  Home
                </NavLink>
              </li>
            )}

            {!token ? (
              <>
                <li>
                  <NavLink to="/login" className={linkClass}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" className={linkClass}>
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="mt-2 md:mt-0">
                <button
                  onClick={logOut}
                  type="button"
                  className="w-full md:w-auto text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2 transition"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;