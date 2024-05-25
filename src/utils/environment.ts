export interface Environment {
  backendUri: string;
  graphqlUri: string;
}

export function getEnv(): Environment {
  const env: Environment = {
    backendUri: process.env.BACKEND_URI ?? "",
    graphqlUri: process.env.GRAPHQL_URI ?? "",
  };

  return env;
}
