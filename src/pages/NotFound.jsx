import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
      <h1 className="text-9xl font-black">404</h1>
      <p className="text-5xl text-gray-400 font-bold">Page not found</p>
      <p className="mt-4">
        Return to dashboard via{" "}
        <Link to="/dashboard" className="text-blue-400 underline">
          this link:
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
