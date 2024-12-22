import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetPortfolio = () => {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: () => axios.get(`/api/portfolio`),
  });
};

export default useGetPortfolio;
