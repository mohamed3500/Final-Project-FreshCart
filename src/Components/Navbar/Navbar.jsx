import React, { useContext } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { CartContext } from "../../Contexts/CartContext";

export default function Navbar() {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  let { numberItems } = useContext(CartContext);

  function signOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="bg-[#F8F9FA] border-gray-200">
        <div className="container flex flex-wrap items-center justify-between mx-auto py-4">
          <div>
            <Link
              to=""
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} width={"120px"} alt="FreshCart Logo" />
            </Link>
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="flex gap-4 items-center">
              <Link to={""}>
                <i className="fa-brands fa-instagram text-slate-950"></i>
              </Link>
              <Link to={""}>
                <i className="fa-brands fa-facebook text-slate-950"></i>
              </Link>
              <Link to={""}>
                <i className="fa-brands fa-tiktok text-slate-950"></i>
              </Link>
              <Link to={""}>
                <i className="fa-brands fa-twitter text-slate-950"></i>
              </Link>
              <Link to={""}>
                <i className="fa-brands fa-linkedin text-slate-950"></i>
              </Link>
              <Link to={""}>
                <i className="fa-brands fa-youtube text-slate-950"></i>
              </Link>
              {userLogin ? (
                <span
                  onClick={signOut}
                  className="text-slate-600 cursor-pointer"
                >
                  Sign Out
                </span>
              ) : (
                <>
                  <Link to={"login"} className="text-slate-600">
                    Login
                  </Link>
                  <Link to={"register"} className="text-slate-600">
                    Register
                  </Link>
                </>
              )}
            </div>
            {/* <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Get started
            </button> */}
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-cta"
              aria-expanded="false"
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
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            {userLogin ? (
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                <li className="md:me-8">
                  <Link to={""} className="text-slate-600">
                    Home
                  </Link>
                </li>
                <li className="md:me-8">
                  <Link to={"cart"} className="text-slate-600 relative">
                    Cart{" "}
                    <div className=" absolute bottom-[-10px] right-[-18px] size-5 bg-emerald-600 text-white rounded-full flex items-center justify-center p-1">
                      {numberItems}
                    </div>
                  </Link>
                </li>
                <li className="md:me-8">
                  <Link to={"wishlist"} className="text-slate-600">
                    WishList
                  </Link>
                </li>
                <li className="md:me-8">
                  <Link to={"products"} className="text-slate-600">
                    Products
                  </Link>
                </li>
                <li className="md:me-8">
                  <Link to={"categories"} className="text-slate-600">
                    Categories
                  </Link>
                </li>
                <li className="md:me-8">
                  <Link to={"brands"} className="text-slate-600">
                    Brands
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
}
