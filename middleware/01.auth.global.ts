import type {ITokenTypes} from "~/types/tokenType";

const publicRouter: {[key: string]: boolean} = {
  "/": true,
  "/login": true,
  "/join": true,
  "/weather": true,
  "/situation": true,
  "/behavior": true,
  "/disasterbag": true,
};

export default defineNuxtRouteMiddleware(async (to, from) => {
  const cookie = useCookie("AccessToken");
  const auth = useAuth();
  const cofing = useRuntimeConfig();
  const isPublicRouter = (path: string) => {
    if (publicRouter[to.path]) return true;
    if (path.startsWith("/behavior")) return true;
    return false;
  };

  if (!cookie.value && !isPublicRouter) {
    auth.value.id = null;
    return navigateTo("/");
  }
  if (cookie.value) {
    if (to.path === "/login" || to.path === "join") {
      return navigateTo("/");
    }
    if (import.meta.server) {
      const jwt = import("jsonwebtoken");
      try {
        const ok = (await jwt).verify(
          cookie.value + "",
          cofing.cookieKEY
        ) as ITokenTypes;
        auth.value.id = Number(ok.id);
        if (ok) return;
      } catch (error) {
        const err = error as Error;
        auth.value.id = null;
        console.log(err.message);
        return navigateTo("/");
      }
    }
  }
});
