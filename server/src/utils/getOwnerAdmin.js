export const getOwnerAdminId = (user) => {
  if (user.role === "SUB_ADMIN") {
    return user.parentAdminId;
  }
  if (user.role === "ADMIN") {
    return user._id;
  }
  return null;
};
