import { render, waitFor } from "@testing-library/react";
import axios, { AxiosInstance } from "axios";
import AxiosContext from "@/contexts/AxiosContext";
import { axios as axiosConfig } from "@/configs/axios";
import AxiosProvider from "../AxiosProvider";

jest.mock("axios");

describe("#AxiosProvider", () => {
  let mockAxiosInstance: AxiosInstance;

  beforeEach(() => {
    mockAxiosInstance = {
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
      create: jest.fn().mockReturnThis(),
    } as unknown as AxiosInstance;

    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render children correctly when axios instance is set", async () => {
    const { getByText } = render(
      <AxiosProvider>
        <div>Test Child</div>
      </AxiosProvider>
    );

    await waitFor(() => {
      expect(getByText("Test Child")).toBeInTheDocument();
    });
  });

  it("should initialize axios instance with given config", async () => {
    render(
      <AxiosProvider>
        <div>Test Child</div>
      </AxiosProvider>
    );

    await waitFor(() => {
      expect(axios.create).toHaveBeenCalledWith(axiosConfig);
    });
  });

  it("should set up request and response interceptors", async () => {
    render(
      <AxiosProvider>
        <div>Test Child</div>
      </AxiosProvider>
    );

    await waitFor(() => {
      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
    });
  });

  it("should provide axios instance via context", async () => {
    const TestComponent = () => {
      return (
        <AxiosContext.Consumer>
          {(context) => {
            expect(context).toBeDefined();
            expect(context.axios).toBe(mockAxiosInstance);
            return <div>Context Test</div>;
          }}
        </AxiosContext.Consumer>
      );
    };

    render(
      <AxiosProvider>
        <TestComponent />
      </AxiosProvider>
    );

    await waitFor(() => {
      expect(document.body.textContent).toContain("Context Test");
    });
  });
});
