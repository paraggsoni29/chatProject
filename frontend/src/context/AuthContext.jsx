import { createContext, useContext, useState, useEffect } from 'react';


// Create the AuthContext
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AuthContext Provider component
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    return JSON.parse(localStorage.getItem("chat-user")) || null;
  });

  // Persist authUser state in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("chat-user", JSON.stringify(authUser));
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );

};
