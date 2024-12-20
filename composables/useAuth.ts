export const useAuth = async () => {
  const getUid = await $fetch("/api/auth/getUid", {method: "GET"});
  return getUid;
};
