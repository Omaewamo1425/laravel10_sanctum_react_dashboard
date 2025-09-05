import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

import { setUser, clearAuth } from "./store/authSlice";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import User from "./pages/user_management/user/UserList";
import Permission from "./pages/user_management/permission/PermissionList";
import Role from "./pages/user_management/role/RoleList";
import Forbidden from "./pages/Forbidden";
import ProtectedRoute from "./components/ProtectedRoute";
import PageLoader from "./components/common/PageLoader"; 
import SelectSystem from "./pages/SelectSystem";
import { System } from "./pages/maintenance/system/System";

export default function App() {
  const token = useSelector((state) => state.auth.token);
  const permissions = useSelector((state) => state.auth.permissions);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (token) {
        try {
          const res = await axios.get("http://localhost:8000/api/user_info", {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setUser(res.data));
        } catch (error) {
          console.error("Failed to fetch user info", error);
          dispatch(clearAuth());
        }
      }
      setLoading(false); // Done loading whether token exists or not
    };

    fetchUserInfo();
  }, [token]);

  if (loading || (token && permissions.length === 0)) {
    return <PageLoader />;
  }

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/home" />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <SelectSystem />
          }
        />
        {/* MAINTENANCE */}

        <Route
          path="/system"
          element={
            <ProtectedRoute >
              <System />
            </ProtectedRoute>
          }
        />

        {/* USER MANAGEMENT */}

        <Route
          path="/users"
          element={
            <ProtectedRoute permission="view-users">
              <User />
            </ProtectedRoute>
          }
        />

        <Route
          path="/permission"
          element={
            <ProtectedRoute permission="view-permissions">
              <Permission />
            </ProtectedRoute>
          }
        />

        <Route
          path="/role"
          element={
            <ProtectedRoute permission="view-roles">
              <Role />
            </ProtectedRoute>
          }
        />

        <Route
          path="/role"
          element={
            <ProtectedRoute permission="view-roles">
              <Role />
            </ProtectedRoute>
          }
        />

        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
