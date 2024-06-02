const hasAdminPrivileges = (vo_p) => {
  if (vo_p === 1) {
    return true;
  }
  return false;
};

export default hasAdminPrivileges;
