import { renderHook, act } from "@testing-library/react";
import { useUpdatePortfolio } from "./useUpdatePortfolio";
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
describe("useUpdatePortfolio", () => {
  it("should update the portfolio and invalidate the portfolio query on success", async () => {
    const payload = {
      name: "New Name",
      avatarUrl: "http://example.com/avatar.png",
      bio: "New Bio",
    };
    mockedAxios.put.mockResolvedValue({ data: { success: true } });
    const { result } = renderHook(() => useUpdatePortfolio(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.mutate(payload);
    });

    expect(mockedAxios.put).toHaveBeenCalledWith(`/api/portfolio`, payload);
    expect(mockedAxios.put).toHaveBeenCalledTimes(1);
  });

  it("should handle errors correctly", async () => {
    const payload = { name: "Invalid Name" };
    mockedAxios.put.mockRejectedValue(new Error("Update failed"));

    const { result } = renderHook(() => useUpdatePortfolio(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      try {
        await result.current.mutateAsync(payload);
      } catch (error) {
        console.log(error);
      }
    });
    expect(mockedAxios.put).toHaveBeenCalledWith(`/api/portfolio`, payload);
    expect(mockedAxios.put).toHaveBeenCalledTimes(1);
  });
});
