const base = "/api";

export default {
  url: {
    base,
  },
  timers: {},
  env: {},
  authorizationIgnorePath: [`/user/register`, `/user/sign-in`],
};
