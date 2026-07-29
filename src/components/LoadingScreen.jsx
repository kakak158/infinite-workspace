import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const tl = gsap.timeline({ repeat: 1 });

  // Beautiful GSAP animations
  useGSAP(() => {
    gsap.to("#loading", {
      opacity: 0,
      duration: 1,
      delay: 3,
    });
  }, []);

  useGSAP(() => {
    tl.to("#load", {
      duration: 1,
    });
    tl.to("#load", {
      width: "20%",
      duration: 0.6,
    });
    tl.to("#load", {
      width: "60%",
      duration: 1.4,
    });

    tl.to("#load", {
      width: "100%",
      duration: 1.5,
    });
  }, []);
  // Deletes div so user can interact with content
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  }, []);

  return isVisible ? (
    <div
      id="loading"
      className="flex top-0 left-0 fixed w-screen h-screen bg-black justify-center items-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute left-1/2 top-50 text-white -translate-1/2 text-9xl font-black w-full"
      >
        Infinite Workspace is loading...
      </motion.h1>

      <div id="load" className="h-full bg-white" />
    </div>
  ) : null;
};

export default LoadingScreen;
