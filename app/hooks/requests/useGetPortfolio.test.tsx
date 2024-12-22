import { renderHook, waitFor } from "@testing-library/react";
import useGetPortfolio from "./useGetProtfolio";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const createWrapper = () => {
  const queryClient = new QueryClient();
  function QueryClientWrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }
  return QueryClientWrapper;
};

describe("useGetPortfolio", () => {
  it("fetches portfolio data successfully", async () => {
    const mockData = { name: "Test User" };
    mockedAxios.get.mockResolvedValue(mockData);
    const { result } = renderHook(() => useGetPortfolio(), {
      wrapper: createWrapper(),
    });
    expect(mockedAxios.get).toHaveBeenCalledWith("/api/portfolio");
    await waitFor(() => result.current.isSuccess);
    expect(result.current.isSuccess).toEqual(true);
    expect(result.current.data).toEqual(mockData);
  });
});
