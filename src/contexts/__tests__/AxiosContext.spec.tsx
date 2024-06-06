import { render } from "@testing-library/react";
import AxiosContext, { useAxios } from "../AxiosContext";
import { axios as axConfig } from "@/configs/axios";
import axios from "axios";

jest.mock("axios");

const TestComponent = () => {
  useAxios();
  return <div>Axios is available</div>;
};

describe("#AxiosContext", () => {
  it("should provide axios instance via context", () => {
    const { getByText } = render(
      <AxiosContext.Provider value={{ axios: axios.create(axConfig) }}>
        <TestComponent />
      </AxiosContext.Provider>
    );

    expect(getByText("Axios is available")).toBeInTheDocument();
  });

  it("should use default Axios instance if no provider is present", () => {
    const { getByText } = render(<TestComponent />);
    expect(getByText("Axios is available")).toBeInTheDocument();
  });
});
