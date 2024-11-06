import React, { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // Default import for decoding JWT
import axios from "axios"; // For making API calls

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Store user details

  useEffect(() => {
    const token = localStorage.getItem("jwttoken");
    if (token) {
      const decodedToken = jwtDecode(token); // Decode the JWT
      fetchUser(decodedToken.id); // Fetch user using the decoded id
      setIsAuthenticated(true);
    }
  }, []);

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      setUser({
        ...response.data,
        profileImage: response.data.profileImage || null,
        height: response.data.height || "",
        weight: response.data.weight || "",
        gender: response.data.gender || "",
        age: response.data.age || "",
      });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const login = async (token) => {
    try {
      localStorage.setItem("jwttoken", token);
      const decodedToken = jwtDecode(token);
      await fetchUser(decodedToken.id); // Fetch user using the decoded id
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to log in:", error);
      logout(); // Log out if login fails
    }
  };

  const logout = () => {
    localStorage.removeItem("jwttoken");
    setUser(null); // Clear user data
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
