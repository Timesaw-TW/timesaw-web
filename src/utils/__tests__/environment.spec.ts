import { Environment, getEnv } from "../environment";

const mockEnv: Environment = {
  graphqlUri: "http://example.com/graphql",
};

describe("#environment", () => {
  process.env.GRAPHQL_URI = mockEnv.graphqlUri;

  it("should return an Environment object", () => {
    expect(getEnv()).toEqual(mockEnv);
  });
});
