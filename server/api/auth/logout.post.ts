import {
  ACCESSTOKEN,
  REFRESHTOKEN,
  USERTOKEN,
} from "~/utils/constants/constants";

export default defineEventHandler((event) => {
  deleteCookie(event, ACCESSTOKEN);
  deleteCookie(event, REFRESHTOKEN);
  deleteCookie(event, USERTOKEN);
});
