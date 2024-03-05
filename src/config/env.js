const env = {
  development: {
    API_URL: "https://support-api.flycatchtech.in/api/v1",
    BASE_URL: "https://support-api.flycatchtech.in/api/v1",
  },
  production: {
    API_URL: "https://support-api.flycatchtech.in/api/v1",
    BASE_URL: "https://support-api.flycatchtech.in/api/v1",
  },
  test: {
    API_URL: "https://support-api.flycatchtech.in/api/v1",
    BASE_URL: "https://support-api.flycatchtech.in/api/v1",
  },
};

export const env_var = env[process.env.NODE_ENV];
