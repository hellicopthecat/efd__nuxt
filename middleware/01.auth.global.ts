import {ACCESSTOKEN} from "~/utils/constants/constants";

const publicRouter: {[key: string]: boolean} = {
  "/": true,
  "/login": true,
  "/join": true,
  "/weather": true,
  "/weatherSpecial": true,
  "/behavior": true,
  "/disasterbag": true,
};

export default defineNuxtRouteMiddleware(async (to, from) => {
  const refreshToken = await $fetch("/api/auth/getRefresh", {method: "GET"});
  const accessToken = useCookie(ACCESSTOKEN, {
    httpOnly: false,
    sameSite: true,
    secure: true,
    maxAge: 60 * 60 * 3,
    path: "/",
  });

  const isPublicRouter = (path: string) => {
    if (publicRouter[to.path]) {
      return true;
    } else if (path.startsWith("/behavior")) {
      return true;
    }
    return false;
  };
  if (accessToken.value && refreshToken) {
    if (to.path === "/login" || to.path === "/join") {
      return navigateTo("/");
    }
  }
  if (!accessToken.value && !refreshToken && !isPublicRouter(to.path)) {
    return navigateTo("/");
  }
  //refresh Token
  if (!accessToken.value) {
    if (refreshToken) {
      try {
        const response = await $fetch("/api/auth/refresh", {method: "POST"});
        accessToken.value = response;
        if (!accessToken.value) {
          throw new Error("Token refresh failed");
        }
      } catch (error) {
        const err = error as Error;
      }
    }
  }
});
