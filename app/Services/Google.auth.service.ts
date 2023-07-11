import dotenv from "dotenv";
dotenv.config();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
export default new GoogleStrategy(
  {
    // @ts-ignore
    clientID: process.env.GOOGLE_CLIENT_ID,
    // @ts-ignore
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/user/google/callback",
  },
  async function (
    accessToken: any,
    refreshToken: any,
    profile: any,
    done: any
  ) {
    return done(null, profile);
  }
);
