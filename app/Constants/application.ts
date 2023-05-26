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
        `${base}/user/login`,
        `${base}/vendor/register`,
        `${base}/customer/verify-OTP`,
        `/admin/sign-in`,
    ],
};

