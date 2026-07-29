import React, { useEffect, useState } from "react";
import {
  Position,
  useNodes,
  useEdges,
  useNodeId,
  Handle,
  useUpdateNodeInternals,
  useReactFlow,
} from "@xyflow/react";
import { motion } from "motion/react";

export default function ParentCard({ id, data, selected }) {
  const nodeId = useNodeId();
  const allEdges = useEdges();
  const allNodes = useNodes();
  const [connectedNodes, setConnectedNodes] = useState([]);
  const updateNodeInternals = useUpdateNodeInternals();
  const { updateNodeData } = useReactFlow();

  const [notes, setNotes] = useState(0);
  const [tasks, setTasks] = useState(0);
  const [parents, setParents] = useState(0);
  const [images, setImages] = useState(0);

  const [title, setTitle] = useState(data?.title);
  const [totalWords, setTotalWords] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [totalCompletedTasks, setTotalCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  useEffect(() => {
    let wordCount = 0;
    let charCount = 0;

    let totalTasksCount = 0;
    let completedTasksCount = 0;

    connectedNodes.forEach((node) => {
      if (node.type === "note") {
        const title = node.data?.title || "";
        const text = node.data?.text || "";

        // Count words safely (prevents empty strings from counting as 1 word)
        const titleWords = title.trim() ? title.trim().split(/\s+/).length : 0;
        const textWords = text.trim() ? text.trim().split(/\s+/).length : 0;

        wordCount += titleWords + textWords;
        charCount += title.length + text.length;
      }

      if (node.type === "task") {
        const allTasks = Array.isArray(node.data?.tasks) ? node.data.tasks : [];
        const completedTasks = allTasks.filter((task) => task?.isCompleted);

        // Add to your running totals
        totalTasksCount += allTasks.length;
        completedTasksCount += completedTasks.length;
      }
    });

    // Set the calculated total once instead of adding to previous state inside a loop
    setTotalTasks(totalTasksCount);
    setTotalCompletedTasks(completedTasksCount);
    setTotalWords(wordCount);
    setTotalChars(charCount);
  }, [connectedNodes]);

  // Saving tasks to ReactFlow data
  useEffect(() => {
    updateNodeData(id, { title });
  }, [title]);

  // BFS node searching
  useEffect(() => {
    if (!nodeId) return;

    let visited = new Set();
    let queue = [nodeId];

    while (queue.length > 0) {
      const currentId = queue.shift();

      allEdges.forEach((edge) => {
        const sourceNode = allNodes.find((node) => edge.source === node.id);
        if (
          currentId === edge.source &&
          !visited.has(edge.target) &&
          edge.target !== nodeId
        ) {
          queue.push(edge.target);
          visited.add(edge.target);
        }
        if (
          currentId === edge.target &&
          !visited.has(edge.source) &&
          edge.source !== nodeId
        ) {
          if (nodeId === edge.target && sourceNode.type === "parent") return;
          queue.push(edge.source);
          visited.add(edge.source);
        }
      });
    }
    const nodes = [];
    allNodes.forEach((node) => {
      if (visited.has(node.id)) {
        nodes.push(node);
      }
    });
    setConnectedNodes(nodes);
  }, [allEdges, allNodes, nodeId]);

  useEffect(() => {
    setNotes(connectedNodes.filter((node) => node.type === "note").length);
    setTasks(connectedNodes.filter((node) => node.type === "task").length);
    setParents(connectedNodes.filter((node) => node.type === "parent").length);
    setImages(connectedNodes.filter((node) => node.type === "image").length);
  }, [connectedNodes]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onAnimationComplete={() => nodeId && updateNodeInternals(nodeId)}
      className={`relative w-60 h-60 rounded-[3rem] bg-linear-to-br from-emerald-50 via-green-50 to-emerald-100/80 border border-green-200/60 shadow-xl shadow-green-900/10 flex flex-col p-4 select-none ${selected && "outline-offset-4 outline-2 outline-white/20"}`}
    >
      {/* Floating Editable Title Input */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 w-full min-w-37.5 px-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="nodrag nopan w-full px-3 py-1 text-xs font-bold text-center text-emerald-800/60 bg-linear-to-br from-emerald-50 via-green-50 to-emerald-100/80 backdrop-blur-md border border-emerald-200/80 shadow-sm rounded-full focus:outline-none placeholder:text-emerald-900/20"
          placeholder="Personal"
        />
      </div>

      {/* Center Content */}
      <div className="z-10 flex gap-2 flex-col px-4 pointer-events-auto">
        {/* Node Types Badges */}
        <div className="flex gap-2 scale-75 justify-center">
          <div className="flex items-center gap-1">
            <p className="text-[0.7rem] text-emerald-600 font-bold">{notes}</p>
            <span className="text-[10px] font-medium leading-none px-2 py-0.5 rounded-full bg-emerald-200/50 text-emerald-900 border border-emerald-300/40">
              note
            </span>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-[0.7rem] text-emerald-600 font-bold">{tasks}</p>
            <span className="text-[10px] font-medium leading-none px-2 py-0.5 rounded-full bg-emerald-200/50 text-emerald-900 border border-emerald-300/40">
              task
            </span>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-[0.7rem] text-emerald-600 font-bold">
              {parents}
            </p>
            <span className="text-[10px] font-medium leading-none px-2 py-0.5 rounded-full bg-emerald-200/50 text-emerald-900 border border-emerald-300/40">
              parent
            </span>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-[0.7rem] text-emerald-600 font-bold">{images}</p>
            <span className="text-[10px] font-medium leading-none px-2 py-0.5 rounded-full bg-emerald-200/50 text-emerald-900 border border-emerald-300/40">
              image
            </span>
          </div>
        </div>
        <span className="flex items-end text-4xl font-black italic tracking-tight text-emerald-900/80 drop-shadow-sm border-b pb-2 border-green-900/20">
          {connectedNodes.length}
          <p className="text-sm text-emerald-800/60">connected nodes</p>
        </span>

        <div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-black italic tracking-tight text-emerald-900/80 drop-shadow-sm">
              {totalCompletedTasks}
            </span>
            <h1 className="text-[0.5rem] text-emerald-800/60 font-black italic tracking-tighter">
              /{totalTasks} tasks completed
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-black italic tracking-tight text-emerald-900/80 drop-shadow-sm">
              {totalChars || 0}
            </span>
            <h1 className="text-[0.5rem] text-emerald-800/60 font-black italic tracking-tighter">
              chars, and
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-black italic tracking-tight text-emerald-900/80 drop-shadow-sm">
              {totalWords || 0}
            </span>
            <h1 className="text-[0.5rem] text-emerald-800/60 font-black italic tracking-tighter">
              words typed
            </h1>
          </div>
        </div>
      </div>

      {/* Handles */}
      {/* TOP: Target (Red) & Source (Green) */}
      <Handle
        id="top-target"
        type="target"
        position={Position.Top}
        style={{
          left: "33%",
          backgroundColor: "#ef4444",
          width: "14px",
          height: "14px",
          border: "2px solid #ffffff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
        }}
      />
      <Handle
        id="top-source"
        type="source"
        position={Position.Top}
        style={{
          left: "67%",
          backgroundColor: "#10b981",
          width: "14px",
          height: "14px",
          border: "2px solid #ffffff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
        }}
      />

      {/* RIGHT: Target (Red) & Source (Green) */}
      <Handle
        id="right-target"
        type="target"
        position={Position.Right}
        style={{
          top: "33%",
          backgroundColor: "#ef4444",
          width: "14px",
          height: "14px",
          border: "2px solid #ffffff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
        }}
      />
      <Handle
        id="right-source"
        type="source"
        position={Position.Right}
        style={{
          top: "67%",
          backgroundColor: "#10b981",
          width: "14px",
          height: "14px",
          border: "2px solid #ffffff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
        }}
      />

      {/* BOTTOM: Target (Red) & Source (Green) */}
      <Handle
        id="bottom-target"
        type="target"
        position={Position.Bottom}
        style={{
          left: "33%",
          backgroundColor: "#ef4444",
          width: "14px",
          height: "14px",
          border: "2px solid #ffffff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
        }}
      />
      <Handle
        id="bottom-source"
        type="source"
        position={Position.Bottom}
        style={{
          left: "67%",
          backgroundColor: "#10b981",
          width: "14px",
          height: "14px",
          border: "2px solid #ffffff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
        }}
      />

      {/* LEFT: Target (Red) & Source (Green) */}
      <Handle
        id="left-target"
        type="target"
        position={Position.Left}
        style={{
          top: "33%",
          backgroundColor: "#ef4444",
          width: "14px",
          height: "14px",
          border: "2px solid #ffffff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
        }}
      />
      <Handle
        id="left-source"
        type="source"
        position={Position.Left}
        style={{
          top: "67%",
          backgroundColor: "#10b981",
          width: "14px",
          height: "14px",
          border: "2px solid #ffffff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
        }}
      />
    </motion.div>
  );
}
