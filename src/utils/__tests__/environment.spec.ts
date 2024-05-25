import { Environment, getEnv } from "../environment";

const mockEnv: Environment = {
  backendUri: "http://backend.com",
  graphqlUri: "http://example.com/graphql",
};

describe("#environment", () => {
  process.env.BACKEND_URI = mockEnv.backendUri;
  process.env.GRAPHQL_URI = mockEnv.graphqlUri;

  it("should return an Environment object", () => {
    expect(getEnv()).toStrictEqual(mockEnv);
  });
});
