const env = {
  // development: {
  //   API_URL: "https://support-api.flycatchtech.in/api/v1",
  //   BASE_URL: "https://support-api.flycatchtech.in/api/v1",
  // },
  // production: {
  //   API_URL: "https://support-api.flycatchtech.in/api/v1",
  //   BASE_URL: "https://support-api.flycatchtech.in/api/v1",
  // },
  // test: {
  //   API_URL: "https://support-api.flycatchtech.in/api/v1",
  //   BASE_URL: "https://support-api.flycatchtech.in/api/v1",
  // },
  development: {
    API_URL: "https://support.flycatchtech.in/api/v1",
    API_V2_URL: "https://support.flycatchtech.in/api/v2",
    BASE_URL: "https://support.flycatchtech.in",
  },
  production: {
    API_URL: "https://support.flycatchtech.in/api/v1",
    API_V2_URL: "https://support.flycatchtech.in/api/v2",
    BASE_URL: "https://support.flycatchtech.in",
  },
  test: {
    API_URL: "https://support.flycatchtech.in/api/v1",
    API_V2_URL: "https://support.flycatchtech.in/api/v2",
    BASE_URL: "https://support.flycatchtech.in",
  },
};

export const env_var = env[process.env.NODE_ENV];
