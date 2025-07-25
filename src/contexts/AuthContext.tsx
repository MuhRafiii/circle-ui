import { clearUser, setUser } from "@/store/userSlice";
import type { AuthContextType } from "@/types/auth";
import type { UserState } from "@/types/user";
import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      dispatch(setUser(JSON.parse(userData)));
    }
  }, []);

  const login = (user: UserState) => {
    dispatch(setUser(user));
    localStorage.setItem("token", user!.token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(clearUser());
  };

  const contextValue: AuthContextType = {
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
