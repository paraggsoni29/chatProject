import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			const socket = io("https://chat-app-production-7um9.onrender.com", {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socket);

			// Listen for the list of online users
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			// Clean up the socket when the component unmounts or when authUser changes
			return () => {
				socket.close();
				setSocket(null);
			};
		}
	}, [authUser]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};
