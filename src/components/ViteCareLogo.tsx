import React from "react";
import { Link } from "react-router-dom";
import vitecarelogo from "../assets/vclogo.png";

const ViteCareLogo = () => {
  return (
    <Link to="/" className="cursor-pointer">
      <img
        src={vitecarelogo}
        alt="vitecarelogo"
        className="mb-12 h-10 scale-100 w-fit"
      />
    </Link>
  );
};

export default ViteCareLogo;
