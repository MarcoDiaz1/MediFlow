
import { createContext } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  updateUser: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);
