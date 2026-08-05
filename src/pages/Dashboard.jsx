import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

import { motion } from "motion/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const test = [1, 1, 1, 1, 1, 1, 1, 1];
  const [selected, setSelected] = useState("grid");
  return (
    <div className="flex flex-col bg-zinc-900 h-screen text-white font-spirit overflow-hidden">
      <div className="absolute top-0 left-0 h-screen w-screen backdrop-blur-md backdrop-brightness-80 p-10 font-spirit flex flex-col gap-6 justify-center items-center text-white text-center">
        <h1 className="font-bold text-8xl">Hey there!</h1>

        <p className="text-3xl">
          It seems you've found the dashboard we're working on! Soon, this will
          be a hub where you can access your multiple workspaces. For now, to
          access your workspace, go to
        </p>
        <Link to="/workspace/1" className="text-blue-500 underline text-7xl">
          this link.
        </Link>
      </div>
      <div className="flex border-b border-white/20 mb-6 p-6 justify-between items-center">
        <h1 className="text-4xl font-bold">Your workspaces</h1>
        <div>
          <Show when="signed-out">
            <div className="text-right font-spirit">
              <div className="flex gap-4 justify-end items-center">
                <SignInButton mode="modal">
                  <button className="p-2 px-6 bg-white rounded-full font-black text-lg italic text-black">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-linear-to-r from-indigo-600 to-blue-600 p-2 px-6 rounded-full font-black text-lg italic text-white">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
              <p className="text-red-500 max-w-xs text-xs mt-2">
                Warning: signing in will not transfer your workspaces. They will
                still be in your localStorage.
              </p>
            </div>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
      <div className="flex justify-between my-2 px-6">
        <motion.button
          type="submit"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 13 }}
          className="bg-green-500 border border-green-400 shadow-xl rounded-full p-2 px-4"
        >
          Add new workspace
        </motion.button>
        <div className="flex gap-2 p-2 px-2 bg-zinc-800/50 rounded-full">
          <button
            className={`${selected === "grid" && "bg-linear-to-r from-indigo-600 to-blue-600"} p-1 px-2 rounded-2xl`}
            onClick={() => {
              setSelected("grid");
            }}
          >
            {/* Square SVG */}
            <svg
              xmlns="http://w3.org"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <rect x="3" y="3" width="8" height="8" rx="1" />
              <rect x="13" y="3" width="8" height="8" rx="1" />
              <rect x="3" y="13" width="8" height="8" rx="1" />
              <rect x="13" y="13" width="8" height="8" rx="1" />
            </svg>
          </button>
          <button
            className={`${selected === "list" && "bg-linear-to-r from-indigo-600 to-blue-600"} p-1 px-2 rounded-2xl`}
            onClick={() => {
              setSelected("list");
            }}
          >
            {/* List SVG */}
            <svg
              xmlns="http://w3.org"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="4" cy="6" r="1" fill="currentColor" />
              <circle cx="4" cy="12" r="1" fill="currentColor" />
              <circle cx="4" cy="18" r="1" fill="currentColor" />

              <line x1="9" y1="6" x2="20" y2="6" />
              <line x1="9" y1="12" x2="20" y2="12" />
              <line x1="9" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-full">
        <div
          className={selected === "grid" ? "grid grid-cols-3 p-6 gap-4" : null}
        >
          {test.map((item, index) => {
            if (selected === "grid") {
              return (
                <div
                  className="border border-white/5 p-4 rounded-2xl shadow-xl/50"
                  onClick={() => {
                    navigate(`/workspace/${index + 1}`);
                  }}
                >
                  <img
                    src="test.png"
                    className="rounded-lg border border-white/3 mb-2"
                  />
                  <h2 className="text-2xl">Workspace {index + 1}</h2>
                  <p className="text-xs text-zinc-600">Edited 5 hours ago</p>
                </div>
              );
            }
          })}
        </div>
        {test.map((item, index) => {
          if (selected === "list") {
            return (
              <div
                className="flex justify-between items-center border-b border-white/10 my-4 mx-8 p-2"
                onClick={() => {
                  navigate(`/workspace/${index + 1}`);
                }}
              >
                <div className="flex items-center gap-10">
                  <img
                    src="test.png"
                    className="rounded-lg border border-white/10 shadow-xl/90 shadow-gray-800/20 mb-2"
                    width={100}
                  />
                  <h2 className="text-2xl">Workspace {index + 1}</h2>
                </div>
                <p className="text-xs text-zinc-600">Edited 5 hours ago</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Dashboard;
