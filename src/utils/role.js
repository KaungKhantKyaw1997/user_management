export const saveRole = (role) => {
  localStorage.setItem("role", role);
};

export const getRole = () => {
  return localStorage.getItem("role");
};

export const clearRole = () => {
  localStorage.removeItem("role");
};
