import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

export const useSocket = (): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = io("https://circle-api-production-2c82.up.railway.app", {
      withCredentials: true,
    });
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  return socket;
};
