import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface LoginRequest {
  username: string;
  password: string;
}

const useAuth = () => {
  const login = useMutation({
    mutationFn: (credentials:LoginRequest) => {
      return axios.post("/api/auth/login", credentials);
    },
  });
  return login;
};
export default useAuth;
