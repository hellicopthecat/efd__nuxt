import {initGoogleAuth} from "~/server/googleAuth";
import crypto from "crypto";
export default defineEventHandler(async (event) => {
  const oauth2Client = initGoogleAuth();
  const state = crypto.randomUUID();
  setCookie(event, "oauth_state", state, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 5,
  });
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
    ],
    state,
  });

  return sendRedirect(event, authUrl);
});
