import React from "react";
import "../index.css";

const SuccessMessage = ({ message }) => {
  if (message === "") {
    return <></>;
  } else {
    return <div className="successMessage">{message}</div>;
  }
};

export default SuccessMessage;
