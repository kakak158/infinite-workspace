// App.tsx

import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Workspace from "./pages/Workspace";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/workspace/:workspaceId" element={<Workspace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
