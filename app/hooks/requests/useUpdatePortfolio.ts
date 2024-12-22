import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface UpdatePortfolioPayload {
  name?: string;
  avatarUrl?: string;
  bio?: string;
}

export const useUpdatePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:  (payload: UpdatePortfolioPayload) => {
      return axios.put(`/api/portfolio`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });
};
