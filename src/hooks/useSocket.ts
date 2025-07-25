import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

export const useSocket = (): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = io("http://localhost:3000", { withCredentials: true });
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  return socket;
};
