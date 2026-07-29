import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  MiniMap,
  addEdge,
  Panel,
  useReactFlow,
  ReactFlowProvider,
  useEdges,
  useNodes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useRef, useState } from "react";
import NoteCard from "./components/NoteCard";
import TaskCard from "./components/TaskCard";
import LoadingScreen from "./components/LoadingScreen";
import ParentCard from "./components/ParentCard";
import ImageCard from "./components/ImageCard";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

const nodeTypes = {
  note: NoteCard,
  task: TaskCard,
  parent: ParentCard,
  image: ImageCard,
};

const initialNodes = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" },
    type: "note",
  },
];

const initialEdges = [];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow(); // Translates screen coords into canvas coords
  const [viewMiniMap, setViewMiniMap] = useState(false);
  const allEdges = useEdges();
  const allNodes = useNodes();

  // Saving
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    try {
      if (!isLoaded) return;
      localStorage.setItem("allNodes", JSON.stringify(allNodes));
      localStorage.setItem("allEdges", JSON.stringify(allEdges));
    } catch (error) {
      console.error("Storage full! Image too large for localStorage.", error);
      alert("Image is too large to save to localStorage!");
    }
  }, [allNodes, allEdges]);

  // Loading
  useEffect(() => {
    try {
      const n = JSON.parse(localStorage.getItem("allNodes"));
      const e = JSON.parse(localStorage.getItem("allEdges"));

      console.log("Loading success!");

      if (!n) return;
      if (!e) return;

      setNodes(n);
      setEdges(e);
    } catch (error) {
      console.error(`An application-crashing error occured: ${error.message}`);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Connects nodes
  const onConnect = useCallback(
    (connection) => {
      setEdges((prevEdges) =>
        addEdge(
          {
            ...connection,
            id: crypto.randomUUID(),
            animated: true,
          },
          prevEdges,
        ),
      );
    },
    [setEdges],
  );
  // For viewing minimap after loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setViewMiniMap(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const addNode = (type, position) => {
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: crypto.randomUUID(),
        position,
        data: {},
        type,
      },
    ]);
  };

  // Drag-and-drop handlers
  const onDragStart = (e, nodeType) => {
    e.dataTransfer.setData("text/plain", nodeType);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("text/plain");
    if (!type) return;

    const { x, y } = screenToFlowPosition({ x: e.clientX, y: e.clientY });
    addNode(type, { x, y });
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        minZoom={0.3}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver} // Dropping onto the canvas
        onDrop={onDrop}
        fitView
        colorMode="dark"
        panOnDrag={false}
        panOnScroll={true}
        selectionOnDrag={true}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          animated: true,
          style: {
            stroke: "gray",
            strokeWidth: 2,
          },
        }}
      >
        {/* Sidebar */}
        <Panel position="top-right">
          <Show when="signed-out">
            <SignInButton />
            <SignUpButton />
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </Panel>
        <Panel position="center-left">
          <div className="flex flex-col items-center gap-2 w-16 h-[60vh] rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 p-2">
            {/* Notes button */}
            <button
              className="group flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/5 transition-all duration-200 hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95"
              draggable={true}
              onDragStart={(e) => onDragStart(e, "note")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-zinc-300 transition-colors group-hover:text-white"
              >
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                <path d="m15 5 4 4" />
              </svg>
            </button>
            {/* Task button */}
            <button
              className="group flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/5 transition-all duration-200 hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95"
              draggable={true}
              onDragStart={(e) => onDragStart(e, "task")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-zinc-300 transition-colors group-hover:text-white"
              >
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="m9 14 2 2 4-4" />
              </svg>
            </button>
            {/* Parent card button */}
            <button
              className="group flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/5 transition-all duration-200 hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95"
              draggable={true}
              onDragStart={(e) => onDragStart(e, "parent")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-zinc-300 transition-colors group-hover:text-white"
              >
                {/* Folder Body */}
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                {/* Front Flap Accent Line */}
                <path d="M2 10h20" />
              </svg>
            </button>
            {/* Image button */}
            <button
              className="group flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/5 transition-all duration-200 hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95"
              draggable={true}
              onDragStart={(e) => onDragStart(e, "image")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-zinc-300 transition-colors group-hover:text-white"
              >
                <rect x="3" y="3" width="18" height="18" rx="4" ry="4"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </button>
          </div>
        </Panel>

        <Panel position="top-left">
          <LoadingScreen />
        </Panel>
        <Background />
        {viewMiniMap && <MiniMap />}
      </ReactFlow>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
