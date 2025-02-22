import React from "react";
import style from "./Footer.module.css";
import apple from "../../assets/images/apple.png";
import google from "../../assets/images/google.png";
import { Link } from "react-router-dom";
import mcSymbol from "../../assets/images/mc.png";
import amazon from "../../assets/images/amazon.png";

export default function Footer() {
  return (
    <>
      <footer className=" shadow-sm bg-[#F8F9FA] border-gray-200">
        <div className="container mx-auto py-10">
          <h3 className="text-2xl mb-4">Get the FreshCart App</h3>
          <p>
            We will send you a link, open it on your phone to download the app.
          </p>

          <form action="" className="flex justify-between border-b-2 my-4 pb-4">
            <input
              type="email"
              placeholder="Email..."
              className="focus:ring-blue-500 focus:border-emerald-400 rounded-lg border-gray-300 bg-white border-2 w-[100%] p-2"
            />
            <button
              className="bg-emerald-400 ms-4 rounded-lg text-sm px-5 py-2.5 min-w-36 "
              onClick={(e) => e.preventDefault()}
            >
              Share App Link
            </button>
          </form>
          <div className="payment-and-download flex justify-between items-center border-b-2">
            <div className="payment flex items-center gap-2">
              <span>Payment Parteners</span>
              <img src={amazon} alt="amazon pay symbol" width={"50px"} />
              <img src={mcSymbol} alt="mastercard symbol" width={"50px"} />
            </div>
            <div className="download flex items-center gap-2">
              <span>Get Deliveries with FreshCart</span>
              <Link>
                <img src={apple} alt="apple download" width={"120px"} />
              </Link>
              <Link>
                <img src={google} alt="google download" width={"120px"} />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
