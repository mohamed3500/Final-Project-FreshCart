import React, { useContext, useState } from "react";
import style from "./Checkout.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../../Contexts/UserContext";
import { CartContext } from "../../Contexts/CartContext";

export default function Checkout() {
  let { checkout, cartId } = useContext(CartContext);

  const { setUserLogin } = useContext(UserContext);

  const validationSchema = yup.object().shape({
    details: yup.string().required("details are required"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "Phone is not a valid Egyptian number")
      .required("Phone is required"),
    city: yup.string().required("City is required"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: () => handleCheckout(cartId, `http://localhost:5173`),
    validationSchema,
  });

  async function handleCheckout(cartId, url) {
    let { data } = await checkout(cartId, url, formik.values);
    window.location.href = data.session.url;
  }

  return (
    <>
      <h2 className="text-xl text-center my-8">Checkout Now</h2>
      <form className="w-1/2 mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            placeholder=" "
            required
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-90 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4"
          >
            Details
          </label>
          {formik.errors.details && formik.touched.details ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  "
              role="alert"
            >
              <span className="font-medium">{formik.errors.details}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            placeholder=" "
            required
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-90 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4"
          >
            Phone
          </label>
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  "
              role="alert"
            >
              <span className="font-medium">{formik.errors.phone}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            placeholder=" "
            required
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-90 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4"
          >
            City
          </label>
          {formik.errors.city && formik.touched.city ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  "
              role="alert"
            >
              <span className="font-medium">{formik.errors.city}</span>
            </div>
          ) : null}
        </div>
        <div className="">
          <button
            type="submit"
            className={`text-white mt-3 mb-7 bg-emerald-400 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            {/* {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"} */}
            Checkout
          </button>
          {/* <div className="">
            <p className="">
              If you don't have an account
              <Link to="/register" className="text-blue-500 underline ms-1">
                Register Now
              </Link>
            </p>
            <p>
              Forget you password?{" "}
              <Link
                to={"/forgetpassword"}
                className="text-blue-500 underline ms-1"
              >
                Click Here
              </Link>
            </p>
          </div> */}
        </div>
      </form>
      {/* {apiError ? (
        <div
          className="p-4 mt-8 mb-4 text-sm text-red-800 rounded-lg bg-red-50  w-1/2 mx-auto text-center"
          role="alert"
        >
          <span className="font-medium">{apiError}</span>
        </div>
      ) : null} */}
    </>
  );
}
