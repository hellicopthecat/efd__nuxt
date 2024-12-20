import {useCookie} from "nuxt/app";
import {ACCESSTOKEN} from "~/utils/constants/constants";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    // const get = await getSession(event, {password: config.cookieKEY});
    // const session = await useSession(event, {password: config.cookieKEY});
    // console.log(get.id);
    // console.log(session.id);
    // console.log(session.data);
    return {};
  } catch (error) {
    const err = error as Error;
  }
});
