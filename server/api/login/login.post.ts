export default defineEventHandler(async (event) => {
  const a = await readBody(event);
  return sendRedirect(event, "/", 200);
});
