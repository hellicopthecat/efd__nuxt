import {REFRESHTOKEN} from "~/utils/constants/constants";

export default defineEventHandler(async (event) => {
  try {
    const refreshToken = getCookie(event, REFRESHTOKEN);
    return refreshToken;
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
  }
});
