export interface Environment {
  graphqlUri: string;
}

export function getEnv(): Environment {
  const env: Environment = {
    graphqlUri: process.env.GRAPHQL_URI ?? "",
  };

  return env;
}
