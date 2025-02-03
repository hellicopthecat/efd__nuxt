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

const isPublicRouter = (path: string) => {
  if (publicRouter[path]) {
    return true;
  } else if (path.startsWith("/behavior")) {
    return true;
  } else {
    return false;
  }
};
export default defineNuxtRouteMiddleware(async (to, from) => {
  const accessToken = useCookie(ACCESSTOKEN).value;
  if (!accessToken) {
    const response = await $fetch("/api/auth/refresh", {method: "POST"});
    if (!response.ok) {
      await $fetch("/api/auth/logout", {method: "POST"});
    }
    if (!isPublicRouter(to.path)) {
      return navigateTo("/");
    }
  } else {
    if (to.path === "/login" || to.path === "/join") {
      return navigateTo("/");
    }
  }
});
