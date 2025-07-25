import type { UserState } from "./user";

export type AuthContextType = {
  login: (user: UserState) => void;
  logout: () => void;
};
