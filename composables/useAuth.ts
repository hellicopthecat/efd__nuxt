export const useAuth = () => {
  return useState("auth", () => ({id: null as null | number}));
};
