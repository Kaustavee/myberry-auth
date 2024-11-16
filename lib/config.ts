type Environment = "development" | "production" | "test";

function isEnvironment(env: string = "production"): env is Environment {
  return ["development", "production", "test"].includes(env);
}

const DENO_ENV = Deno.env.get("DENO_ENV");

const ENVIRONMENT: Environment = isEnvironment(DENO_ENV)
  ? DENO_ENV
  : "development";

export { ENVIRONMENT };
