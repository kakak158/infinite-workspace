import React, { useEffect, useState } from "react";
import {
  Handle,
  Position,
  useReactFlow,
  useUpdateNodeInternals,
} from "@xyflow/react";
import { motion } from "motion/react";

const TaskCard = ({ id, data, selected }) => {
  // Destructured 'id'
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const updateNodeInternals = useUpdateNodeInternals(); // Recalculate node position after mounting animation
  const { updateNodeData } = useReactFlow();

  // Saving tasks to ReactFlow data
  useEffect(() => {
    updateNodeData(id, { tasks });
  }, [tasks]);

  // Loading
  useEffect(() => {
    if (!data.tasks) return;
    setTasks(data.tasks);
  }, []);

  const addTask = () => {
    if (!text.trim()) return;
    setTasks([
      ...tasks,
      {
        title: text,
        isCompleted: false,
      },
    ]);
    setText("");
  };

  const toggleTask = (index) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  const deleteTask = (indexToDelete) => {
    setTasks((prevTasks) =>
      prevTasks.filter((_, index) => index !== indexToDelete),
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onAnimationComplete={() => updateNodeInternals(id)}
      className={`bg-white p-4 w-80 text-black rounded-2xl shadow-2xl shadow-white/20 ${selected && "outline-offset-4 outline-2 outline-white/20"}`}
    >
      <p className="text-gray-400 tracking-widest font-light text-xs mb-2">
        TASKCARD
      </p>
      {/* Actual task part */}
      <div>
        {/* Adding task segment */}
        <form
          className="flex gap-2 border-b border-gray-300 pb-4"
          onSubmit={(e) => {
            e.preventDefault(); // Prevents page refresh
            addTask();
          }}
        >
          <input
            className="w-full focus:outline-none border-t-3 rounded-xl border border-gray-300 px-2 truncate font-bold italic"
            placeholder="Remember to kill the minions on Saturday"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {/* Plus button */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 13 }}
            className="bg-green-500 border border-green-400 shadow-xl rounded-full p-1.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30px"
              height="30px"
            >
              <path
                fill="white"
                d="M19,10.5H13.5V5A1.5,1.5,0,0,0,12,3.5h0A1.5,1.5,0,0,0,10.5,5v5.5H5A1.5,1.5,0,0,0,3.5,12h0A1.5,1.5,0,0,0,5,13.5h5.5V19A1.5,1.5,0,0,0,12,20.5h0A1.5,1.5,0,0,0,13.5,19V13.5H19A1.5,1.5,0,0,0,20.5,12h0A1.5,1.5,0,0,0,19,10.5Z"
              />
            </svg>
          </motion.button>
        </form>

        <div
          className={`flex flex-col min-h-50 gap-2 ${tasks.length === 0 ? "justify-center items-center" : "flex-col gap-1 mt-2"}`}
        >
          {tasks.length === 0 && (
            <p className="text-zinc-400 text-center">
              Really? No tasks? You can't be very busy...
            </p>
          )}
          {/* Task display */}
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex gap-2 items-center p-2 shadow-lg rounded-xl border border-gray-200"
            >
              <input
                type="checkbox"
                checked={task.isCompleted}
                className="rounded-full text-green-500 focus:outline-none focus:ring-0"
                onChange={() => toggleTask(index)}
              />
              <h2
                className={`font-bold flex-1 ${task.isCompleted && "line-through text-gray-400 font-normal italic"}`}
              >
                {task.title}
              </h2>
              {/* Delete button */}
              <motion.button
                className="p-1 rounded-lg bg-red-500"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 13 }}
                onClick={() => deleteTask(index)}
              >
                <svg
                  xmlns="http://w3.org"
                  viewBox="0 0 24 24"
                  width="20px"
                  height="20px"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 6h18M8 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2" />

                  <path d="M5 6v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6H5z" />

                  <path d="M10 11v6M14 11v6" />
                </svg>
              </motion.button>
            </div>
          ))}
        </div>
      </div>

      {/* Handles (no need to go below here) */}
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

export default TaskCard;
