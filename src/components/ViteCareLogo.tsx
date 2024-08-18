import React from "react";
import { Link } from "react-router-dom";
import vitecarelogo from "../assets/vclogo.png";

const ViteCareLogo = () => {
  return (
    <Link to="/" className="cursor-pointer w-[20%]">
      <img src={vitecarelogo} alt="vitecarelogo" className="w-fit" />
    </Link>
  );
};

export default ViteCareLogo;
