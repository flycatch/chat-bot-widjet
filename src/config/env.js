const env = {
  development: {
    API_URL: "http://143.244.183.63:8080/api/v1",
    BASE_URL: "http://143.244.183.63:8080/api/v1",
  },
  production: {
    API_URL: "http://143.244.183.63:8080/api/v1",
    BASE_URL: "http://143.244.183.63:8080/api/v1",
  },
  test: {
    API_URL: "http://143.244.183.63:8080/api/v1",
    BASE_URL: "http://143.244.183.63:8080/api/v1",
  },
};

export const env_var = env[process.env.NODE_ENV];
