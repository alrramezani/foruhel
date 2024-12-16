import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import useAuth, { LoginRequest } from "./useAuth";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const credentials: LoginRequest = {
  username: "foruhel",
  password: "foruhel",
};

describe("useAuth Hook", () => {
  const createWrapper = () => {
    const queryClient = new QueryClient();
    function QueryClientWrapper({ children }: { children: React.ReactNode }) {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );
    }
    return QueryClientWrapper;
  };
  it("calls login API with correct credentials", async () => {
    const mockResponse = { data: { message: "Login successful" } };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate(credentials);
    });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "/api/auth/login",
      credentials
    );
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });

  it("handles successful login", async () => {
    const mockResponse = { data: { message: "Login successful" } };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    let onSuccessCalled = false;

    await act(async () => {
      result.current.mutate(credentials, {
        onSuccess: (data) => {
          expect(data).toEqual(mockResponse);
          onSuccessCalled = true;
        },
      });
    });

    expect(onSuccessCalled).toBe(true);
  });

  it("handles failed login", async () => {
    const mockError = new Error("Invalid credentials");
    mockedAxios.post.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    let onErrorCalled = false;

    await act(async () => {
      result.current.mutate(credentials, {
        onError: (error) => {
          expect(error).toBe(mockError);
          onErrorCalled = true;
        },
      });
    });

    expect(onErrorCalled).toBe(true);
  });
});
