interface ITokenObj {
  id: number;
  uid: string;
}
const publicRouter = {
  "/login": true,
  "/join": true,
};

export default defineNuxtRouteMiddleware(async (to, from) => {
  const cookie = useCookie("AccessToken");
  const auth = useAuth();
  if (import.meta.server) {
    try {
      if (!cookie.value) {
        auth.value = false;
        if (!publicRouter) {
          return navigateTo("/");
        }
      }
      if (cookie.value) {
        auth.value = true;
        if (publicRouter) {
          if (to.path !== "/") {
            return navigateTo("/");
          }
          return;
        }
      }
    } catch (error) {
      const err = error as Error;
      console.log("err", err.message);
      return navigateTo("/");
    }
  }
});
