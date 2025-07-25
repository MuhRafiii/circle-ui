import type { RootState } from "@/store";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const user = useSelector((state: RootState) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
