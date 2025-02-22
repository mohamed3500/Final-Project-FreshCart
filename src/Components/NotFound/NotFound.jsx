import React from "react";
import style from "./NotFound.module.css";
import error from "../../assets/images/error.svg";

export default function NotFound() {
  return (
    <>
      <img src={error} alt="error 404" className="w-full" />
    </>
  );
}
