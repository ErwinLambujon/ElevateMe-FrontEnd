import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Assume you have an AuthContext
import { AuthContext } from "./AuthContext";

const api = axios.create({
  baseURL: "https://elevateme-render.onrender.com/api",
});

const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthState } = useContext(AuthContext);

  const Login = async (user) => {
    setIsLoading(true);
    try {
      const response = await api.post("/user/login/", {
        username: user.username,
        password: user.password,
      });

      localStorage.setItem("token", response.data.token);
      setAuthState({ isAuthenticated: true, user: response.data.user });
      navigate("/home", { replace: true });
      // Use a toast notification instead of alert
      // toast.success("Login successful!");
    } catch (err) {
      if (err.response) {
        // toast.error(err.response.data.error || "Login failed");
        console.error("Login failed:", err.response.data);
      } else {
        // toast.error("Unable to connect to the server");
        console.error("Server connection error:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const Logout = async () => {
    setIsLoading(true);
    try {
      await api.post("/user/logout/", {}, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });

      localStorage.removeItem("token");
      sessionStorage.clear();
      setAuthState({ isAuthenticated: false, user: null });
      navigate("/login", { replace: true });
      // toast.success("Logout successful!");
    } catch (err) {
      console.error("Logout error:", err);
      // toast.error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  return { Login, Logout, isLoading };
};

export default useAuth;