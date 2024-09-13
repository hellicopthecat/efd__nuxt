export default defineEventHandler((event) => {
  deleteCookie(event, "AccessToken");
});
