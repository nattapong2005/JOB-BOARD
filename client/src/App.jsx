import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import JobPost from "./pages/JobPost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicRoute from "./components/PublicRoute";
import AdminHome from "./pages/admin/AdminHome";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/company/CreatePost";

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

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Company Route */}
        <Route
          path="/createpost"
          element={
            <ProtectedRoute needRole="company">
              <CreatePost />
            </ProtectedRoute>
          }
        />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute needRole="admin">
              <AdminHome />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
