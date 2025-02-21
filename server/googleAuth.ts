import {google} from "googleapis";

export const initGoogleAuth = () => {
  const config = useRuntimeConfig();
  const oauth2Client = new google.auth.OAuth2(
    config.public.GOOGLE_OAUTH_CLIENT,
    config.GOOGLE_OAUTH_CLIENT_SECREY,
    "https://efd.netlify.app/api/auth/social/googleRedirect"
  );
  return oauth2Client;
};
