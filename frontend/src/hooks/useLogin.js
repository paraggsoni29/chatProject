import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext"; // Make sure the path is correct

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext(); // Fixed the typo

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", { // Added the leading slash
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Save the authenticated user data
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
