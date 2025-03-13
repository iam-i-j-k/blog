import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
        <Route path="/create-blog" element={<AuthGuard><CreateBlog /></AuthGuard>} />
        <Route path="/edit-blog/:id" element={<AuthGuard><EditBlog /></AuthGuard>} />
      </Routes>
    </Router>
  );
}

export default App;
