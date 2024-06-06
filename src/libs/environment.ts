export interface Environment {
  baseUri: string;
  backendUri: string;
}

export function getEnv(): Environment {
  const env: Environment = {
    baseUri: process.env.NEXT_PUBLIC_BASE_URI ?? "",
    backendUri: process.env.NEXT_PUBLIC_BACKEND_URI ?? "",
  };

  return env;
}
