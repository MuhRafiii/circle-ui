export type AuthContextType = {
  isAuthenticated: boolean;
  login: (isAuthenticated: boolean) => void;
  logout: () => void;
};
