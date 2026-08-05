import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-linear-to-r from-black to-[#01021f] p-10 font-spirit flex flex-col gap-6 justify-center items-center h-screen text-white text-center">
      <h1 className="font-bold text-8xl">Hey there!</h1>

      <p className="text-3xl">
        We're currently working on a landing page for Prism. To access your
        workspace, go to
      </p>
      <Link to="/workspace/1" className="text-blue-500 underline text-7xl">
        this link.
      </Link>
    </div>
  );
};

export default Landing;
