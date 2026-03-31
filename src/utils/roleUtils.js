/**
 * Utility function to get the dashboard route based on user role
 * @param {string} role - User role (admin, patient, receptionist)
 * @returns {string} - Dashboard route path
 */
export const getDashboardRoute = (role) => {
  const roleRoutes = {
    admin: "/admin",
    patient: "/patient",
    receptionist: "/receptionist",
  };

  return roleRoutes[role] || "/";
};

/**
 * Get role-friendly display name
 * @param {string} role - User role
 * @returns {string} - Friendly role name
 */
export const getRoleName = (role) => {
  const roleNames = {
    admin: "Administrator",
    patient: "Patient",
    receptionist: "Receptionist",
  };

  return roleNames[role] || role;
};

/**
 * Check if user has required role(s)
 * @param {string} userRole - Current user role
 * @param {string|string[]} requiredRoles - Required role(s)
 * @returns {boolean} - True if user has required role
 */
export const hasRequiredRole = (userRole, requiredRoles) => {
  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  return roles.includes(userRole);
};
