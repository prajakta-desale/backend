const base = '/api';

export default {
    url: {
        base,
    },
    timers: {

    },
    env: {

    },
    authorizationIgnorePath: [
        `/user/register`,
        `/user/login`,
        `/vendor/register`,
        `/admin/sign-in`,
        `/admin/register`,
        `/user/reset-pass`
    ],
};

