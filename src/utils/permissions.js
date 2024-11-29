export const savePermissions = (permissions) => {
  localStorage.setItem("permissions", JSON.stringify(permissions));
};

export const getPermissions = () => {
  const permissions = localStorage.getItem("permissions");
  return permissions ? JSON.parse(permissions) : [];
};

export const clearPermissions = () => {
  localStorage.removeItem("permissions");
};
