import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import JobPost from "./pages/JobPost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicRoute from "./components/PublicRoute";
import AdminHome from './pages/admin/AdminHome';
const App = () => {
  const [isAuth, setAuth] = useState(!!localStorage.getItem("token"));
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<JobPost />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login setAuth={setAuth} />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
