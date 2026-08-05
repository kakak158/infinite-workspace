import {
  Handle,
  Position,
  useReactFlow,
  useUpdateNodeInternals,
} from "@xyflow/react";
import React from "react";
import { AnimatePresence, motion } from "motion/react";

const ImageCard = ({ id, data, selected }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const { updateNodeData } = useReactFlow();

  function onImageAdded(e) {
    const rawImg = e.target.files[0];
    if (!rawImg) return; // Guard against cancelling file pick

    const reader = new FileReader();

    reader.onload = (event) => {
      const urlImg = event.target.result; // The url img link
      // Update React Flow data directly
      updateNodeData(id, { img: urlImg });
    };

    reader.readAsDataURL(rawImg); // Tells reader.onload to run when conversion to url is finished
  }

  function onImageRemoved(e) {
    updateNodeData(id, { img: null });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onAnimationComplete={() => updateNodeInternals(id)}
      className={`font-spirit bg-white p-4 w-80 text-black rounded-2xl shadow-2xl shadow-white/20 relative ${selected && "outline-offset-4 outline-2 outline-white/20"}`}
    >
      <p className="font-sans text-gray-400 tracking-widest font-light text-xs mb-2">
        IMAGECARD
      </p>

      <div>
        <AnimatePresence mode="wait">
          {data?.img ? (
            <motion.div
              key="image-preview" // 1. Required key for AnimatePresence
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} // 2. Triggers smoothly now
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Delete image button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 13 }}
                onClick={onImageRemoved}
                className="absolute flex justify-center items-center text-white top-8 right-2 bg-red-500 border border-red-400 w-6 h-6 rounded-full shadow-lg shadow-red-500/50"
              >
                {/* Cross SVG */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
              <img
                src={data.img}
                alt="Uploaded card content"
                className="rounded-xl w-full h-auto"
              />
            </motion.div>
          ) : (
            <div className="h-50 flex flex-col items-center justify-center">
              {/* Image SVG */}

              <label
                htmlFor="fileInput"
                className="flex flex-col gap-4 p-4 w-full h-full items-center justify-center text-center cursor-pointer font-bold italic text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="48"
                  height="48"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="4" ry="4"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                Click here to add an image to this card
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={onImageAdded}
                className="hidden"
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Handles */}
      <Handle
        id="left-target"
        type="target"
        position={Position.Left}
        className="w-4! h-4! bg-gray-500! border-2! border-white! shadow-lg shadow-gray-500/50"
      />
      <Handle
        id="bottom-target"
        type="target"
        position={Position.Bottom}
        className="w-4! h-4! bg-gray-500! border-2! border-white! shadow-lg shadow-gray-500/50"
      />
      <Handle
        id="top-source"
        type="source"
        position={Position.Top}
        className="w-4! h-4! bg-gray-500! border-2! border-white! shadow-lg shadow-gray-500/50"
      />
      <Handle
        id="right-source"
        type="source"
        position={Position.Right}
        className="w-4! h-4! bg-gray-500! border-2! border-white! shadow-lg shadow-gray-500/50"
      />
      <Handle
        id="left-target"
        type="source"
        position={Position.Left}
        className="w-4! h-4! bg-gray-500! border-2! border-white! shadow-lg shadow-gray-500/50"
      />
      <Handle
        id="bottom-target"
        type="source"
        position={Position.Bottom}
        className="w-4! h-4! bg-gray-500! border-2! border-white! shadow-lg shadow-gray-500/50"
      />
      <Handle
        id="top-source"
        type="target"
        position={Position.Top}
        className="w-4! h-4! bg-gray-500! border-2! border-white! shadow-lg shadow-gray-500/50"
      />
      <Handle
        id="right-source"
        type="target"
        position={Position.Right}
        className="w-4! h-4! bg-gray-500! border-2! border-white! shadow-lg shadow-gray-500/50"
      />
    </motion.div>
  );
};

export default ImageCard;
