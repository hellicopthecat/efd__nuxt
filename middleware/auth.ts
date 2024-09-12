import prisma from "~/lib/prisma";
interface ITokenObj {
  id: number;
  uid: string;
}
const publicRouter = ["/login", "/join"];
const protectRouter = [""];
export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig();
  const cookie = useCookie("AccessToken");
  if (import.meta.server) {
    if (protectRouter.includes(to.path) && !cookie.value) {
      return navigateTo("/");
    }
    try {
      const jwt = await import("jsonwebtoken");
      const token = jwt.verify(
        cookie.value + "",
        config.cookieKEY
      ) as ITokenObj;

      if (!token && protectRouter.includes(to.path)) {
        return navigateTo("/");
      }
      if (token && publicRouter.includes(to.path)) {
        return navigateTo("/");
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  return;
});
