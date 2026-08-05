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
import NoteCard from "../components/NoteCard";
import TaskCard from "../components/TaskCard";
import LoadingScreen from "../components/LoadingScreen";
import ParentCard from "../components/ParentCard";
import ImageCard from "../components/ImageCard";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/react";

import supabase from "../supabase-client";
import Tutorial from "../components/Tutorial";

const nodeTypes = {
  note: NoteCard,
  task: TaskCard,
  parent: ParentCard,
  image: ImageCard,
};

const initialNodes = [];

const initialEdges = [];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition, toObject } = useReactFlow(); // Translates screen coords into canvas coords
  const [viewMiniMap, setViewMiniMap] = useState(false);
  const allEdges = useEdges();
  const allNodes = useNodes();

  const { user, isSignedIn, isLoaded } = useUser();

  // Saving
  const onSave = async () => {
    const allData = toObject(); // Everything on the canvas: nodes, edges, everything (in JSON)
    if (!allData) return;
    if (user && isSignedIn) {
      // If user exists and is signed in

      // This try block "tries" to send all data to supabase
      try {
        const { data, error } = await supabase
          .from("UserData")
          .upsert({ user_id: user.id, all_data: allData })
          .select();
        console.log("Success saving to Supabase!");

        if (error) {
          // Is there a supabase error?
          console.error("Supabase backend error: ", error);
        }
      } catch (error) {
        // Is there a React error?
        console.error("Error saving to Supabase: ", error);
      }
    } else {
      // If not signed in, use localStorage
      try {
        localStorage.setItem("allData", JSON.stringify(allData));
        console.log("Success saving to localStorage!");
      } catch (error) {
        // Is there a React error?
        console.error("Error saving to localStorage: ", error);
      }
    }
  };
  // Loading
  const onLoad = async () => {
    if (user && isSignedIn) {
      // If user exists and is signed in

      // This try block "tries" to get all data from supabase, make it readable and stick it into the state
      try {
        const { data, error } = await supabase
          .from("UserData")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Supabase backend error:", error);
          return;
        }

        if (!data) {
          console.log("No saved data found");
          return;
        }

        setNodes(data.all_data.nodes ?? []);
        setEdges(data.all_data.edges ?? []);

        console.log("Success loading from Supabase!");
      } catch (err) {
        console.error("Loading failed:", err);
      }
    } else {
      // If not signed in, try to get it from localStorage
      try {
        const data = localStorage.getItem("allData");

        if (!data) return;

        const allData = JSON.parse(data);
        setNodes(allData.nodes);
        setEdges(allData.edges);
        console.log("Success loading from localStorage!");
      } catch (error) {
        // Is there a React error?
        console.error("Error saving to localStorage: ", error);
      }
    }
  };
  // Prevents loading from happening more than once
  const hasLoaded = useRef(false);

  // True while we're restoring data from Supabase/localStorage
  const isLoading = useRef(true);

  // Used to skip the automatic save immediately after loading
  const firstSave = useRef(true);

  // Loading data at startup
  useEffect(() => {
    const loadWorkspace = async () => {
      // Wait until Clerk has finished loading
      if (!isLoaded || hasLoaded.current) return;

      console.log("Starting load...");

      // Wait until ALL loading has completed
      await onLoad();

      // Only now do we allow saving
      hasLoaded.current = true;
      isLoading.current = false;

      console.log("Finished loading.");
    };

    loadWorkspace();
  }, [isLoaded, isSignedIn, user]);

  // Prevents saving too frequently
  const timedOut = useRef(false);

  // Autosave whenever nodes or edges change
  useEffect(() => {
    // Do not save before the initial load has completed
    if (!hasLoaded.current) return;

    // Do not save while loading data
    if (isLoading.current) return;

    // Ignore the first render after loading
    // This prevents overwriting loaded data immediately
    if (firstSave.current) {
      firstSave.current = false;
      return;
    }

    // If a save is already waiting, do nothing
    if (timedOut.current) return;

    // Lock saving for 500ms
    timedOut.current = true;

    console.log("Saving...");
    onSave();

    // Unlock after throttle period
    setTimeout(() => {
      timedOut.current = false;
    }, 500);
  }, [allNodes, allEdges]);

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
            <div className="text-right font-spirit">
              <div className="flex gap-4 justify-end">
                <SignInButton mode="modal">
                  <button className="p-2 px-6 bg-white rounded-full font-black text-lg italic">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-linear-to-r from-indigo-600 to-blue-600 p-2 px-6 rounded-full font-black text-lg italic text-white">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
              <p className="text-red-500 max-w-xs text-xs mt-4">
                Warning: signing in will not transfer the current cards in your
                canvas. They will still be in your localStorage.
              </p>
            </div>
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
          <Tutorial />
        </Panel>
        <Background />
        {viewMiniMap && <MiniMap />}
      </ReactFlow>
    </div>
  );
}

export default function Workspace() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
