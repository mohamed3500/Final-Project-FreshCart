import React from "react";
import style from "./ForgetPassword.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Not a valid email")
      .required("Email is required"),
  });

  function handleLogin(values) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
      .then((res) => {
        if (res.data.message == "Reset code sent to your email") {
          navigate("/resetcode");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleLogin,
    validationSchema,
  });
  return (
    <>
      <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            placeholder=" "
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-90 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4"
          >
            Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  "
              role="alert"
            >
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          ) : null}
        </div>
        <p
          id="helper-text-explanation"
          className="mt-2 text-sm text-gray-500 dark:text-gray-400"
        >
          We’ll never share your details. Read our{" "}
          <a
            href="#"
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Privacy Policy
          </a>
          .
        </p>
        <button
          type="submit"
          className="text-white mt-3 mb-7 bg-emerald-400 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Verify
        </button>
      </form>
    </>
  );
}
