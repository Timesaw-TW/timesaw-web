import { Environment, getEnv } from "../environment";

const mockEnv: Environment = {
  baseUri: "http://base.com",
  backendUri: "http://backend.com",
};

describe("#environment", () => {
  process.env.NEXT_PUBLIC_BASE_URI = mockEnv.baseUri;
  process.env.NEXT_PUBLIC_BACKEND_URI = mockEnv.backendUri;

  it("should return an Environment object", () => {
    expect(getEnv()).toStrictEqual(mockEnv);
  });
});
