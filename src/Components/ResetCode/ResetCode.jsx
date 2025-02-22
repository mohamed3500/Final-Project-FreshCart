import React from "react";
import style from "./ResetCode.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetCode() {
  const navigate = useNavigate();
  function handleLogin(values) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      )
      .then((res) => {
        if (res.data.status == "Success") {
          navigate("/enternewpw");
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: handleLogin,
  });

  return (
    <>
      <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
        <label
          htmlFor="resetCode"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter Code to Reset Your Password
        </label>
        <input
          type="resetCode"
          id="resetCode"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="enter code"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
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
