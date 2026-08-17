import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import SingleBlog from "./pages/SingleBlog";
import Dashboard from "./pages/Dashboard";
import SavedBlogs from "./pages/SavedBlogs";

function App() {

  return (

    <div>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/create" element={<CreateBlog />} />

        <Route path="/edit/:id" element={<EditBlog />} />

        <Route path="/blog/:id" element={<SingleBlog />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/saved" element={<SavedBlogs />} />

      </Routes>

    </div>

  );

}

export default App;