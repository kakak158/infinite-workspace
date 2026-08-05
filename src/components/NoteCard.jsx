import {
  Handle,
  Position,
  useReactFlow,
  useUpdateNodeInternals,
} from "@xyflow/react";
import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";

const NoteCard = ({ id, data, selected }) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const { updateNodeData } = useReactFlow();

  const titleRef = useRef("");
  const textRef = useRef("");

  // 1. Populate initial content ONCE when the component mounts
  useEffect(() => {
    if (titleRef.current) titleRef.current.innerText = data.title || "";
    if (textRef.current) textRef.current.innerText = data.text || "";
  }, []);

  // 2. Stream real-time updates on every keystroke
  const handleTitleInput = (e) => {
    updateNodeData(id, { title: e.currentTarget.innerText });
  };

  const handleTextInput = (e) => {
    updateNodeData(id, { text: e.currentTarget.innerText });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onAnimationComplete={() => updateNodeInternals(id)}
      className={`font-spirit bg-white p-4 w-80 text-black rounded-2xl shadow-2xl shadow-white/20 ${selected && "outline-offset-4 outline-2 outline-white/20"}`}
    >
      <p className="font-sans text-gray-400 tracking-widest font-light text-xs mb-2">
        NOTECARD
      </p>

      {/* 3. Empty divs! React will never touch or reset what you type inside */}
      <div
        ref={titleRef}
        contentEditable
        suppressContentEditableWarning
        className=" nodrag nopan text-3xl font-bold w-full rounded-xl px-1 mb-2 focus:outline-gray-400/20 wrap-break-word"
        placeholder="A bold new title..."
        onInput={handleTitleInput}
      />

      <div
        ref={textRef}
        contentEditable
        suppressContentEditableWarning
        className=" nodrag nopan w-full focus:outline-gray-400/20 wrap-break-word"
        placeholder="And a beautiful piece of body text..."
        onInput={handleTextInput}
      />

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

export default NoteCard;
