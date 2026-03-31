# MediCare - Role-Based Authentication System Documentation

## Overview

This document describes the complete role-based authentication and authorization system implemented in the MediCare healthcare management frontend application.

## System Architecture

### Roles

The system supports three distinct user roles:

1. **Admin**
   - Full system access
   - Can manage users, view all patients and appointments
   - Access to system settings and reports
   - Dashboard: `/admin`

2. **Patient**
   - Personal appointment management
   - View own medical records
   - Health profile management
   - Dashboard: `/patient`

3. **Receptionist**
   - Patient and appointment management
   - Handle bookings and registrations
   - Dashboard: `/receptionist`

## File Structure

```
src/
├── components/
│   ├── routes/
│   │   ├── ProtectedRoutes.jsx      # Base protected route component
│   │   ├── RoleBasedRoute.jsx        # Role-specific route component
│   │   ├── PublicRoutes.jsx          # Public route component
│   │   └── Logout.jsx               # Logout button component
│   └── layout/
│       ├── Navbar.jsx               # Enhanced navigation with role-based menus
│       └── Footer.jsx               # Footer component
├── pages/
│   ├── AdminDashboard.jsx           # Admin dashboard with system management
│   ├── PatientDashboard.jsx         # Patient medical profile & appointments
│   ├── ReceptionistDashboard.jsx    # Receptionist patient/appointment management
│   ├── UnauthorizedPage.jsx         # Access denied page
│   ├── Login.jsx                    # Login with role-based redirect
│   ├── Signup.jsx                   # Signup form
│   └── Home.jsx                     # Landing page
├── services/
│   └── auth.js                      # API endpoints for authentication
├── features/
│   └── authSlice.js                 # Redux auth state management
├── utils/
│   └── roleUtils.js                 # Role utility functions
└── App.jsx                          # Main app routing configuration
```

## Authentication Flow

### Login Flow

```
User enters credentials
         ↓
Login API called (POST /auth/login)
         ↓
Server validates credentials
         ↓
JWT token issued + user data returned
         ↓
Redux store updated with user info
         ↓
Role checked (getDashboardRoute)
         ↓
User redirected to role-specific dashboard
```

### Protected Route Flow

```
Access protected route
         ↓
ProtectedRoute/RoleBasedRoute component
         ↓
useMeQuery() - Check authentication
         ↓
Is authenticated?
├─ No  → Redirect to /login
├─ Yes → Check role
│      ├─ Role allowed?
│      ├─ Yes → Render component
│      └─ No  → Redirect to /unauthorized
```

## Key Components

### RoleBasedRoute Component

```javascript
<RoleBasedRoute allowedRoles={["admin"]}>
  <AdminDashboard />
</RoleBasedRoute>
```

- Validates authentication
- Checks user role against allowed roles
- Redirects to appropriate location if unauthorized

### ProtectedRoute Component

```javascript
<ProtectedRoute allowedRoles={["patient", "receptionist"]}>
  <SomeProtectedPage />
</ProtectedRoute>
```

- Base protected route component
- Can optionally check specific roles
- Shows loading state while authenticating

### PublicRoute Component

- Wraps public pages (Login, Signup)
- Redirects authenticated users to their dashboard
- Prevents authenticated users from accessing public pages

## Role Utility Functions

Located in `src/utils/roleUtils.js`:

### getDashboardRoute(role)
Returns the appropriate dashboard URL for a given role.

```javascript
getDashboardRoute("admin")        // Returns: "/admin"
getDashboardRoute("patient")      // Returns: "/patient"
getDashboardRoute("receptionist") // Returns: "/receptionist"
```

### getRoleName(role)
Returns a friendly display name for a role.

```javascript
getRoleName("admin")        // Returns: "Administrator"
getRoleName("patient")      // Returns: "Patient"
getRoleName("receptionist") // Returns: "Receptionist"
```

### hasRequiredRole(userRole, requiredRoles)
Checks if user has required role(s).

```javascript
hasRequiredRole("admin", ["admin", "receptionist"])  // Returns: true
hasRequiredRole("patient", ["admin", "receptionist"]) // Returns: false
```

## Routing Configuration

All routes are configured in `src/App.jsx`:

### Public Routes
- `/login` - Login page
- `/signup` - Registration page
- `/home` - Home/landing page

### Protected Routes (Role-Based)
- `/admin` - Admin dashboard (only admins)
- `/patient` - Patient dashboard (only patients)
- `/receptionist` - Receptionist dashboard (only receptionists)
- `/unauthorized` - Access denied page

### Special Routes
- `/` - Redirects to authenticated user's dashboard
- `*` - Catches all undefined routes, redirects to `/`

## Authentication State Management

### Redux Store (authSlice.js)

```javascript
{
  auth: {
    user: {
      _id: "user_id",
      name: "John Doe",
      email: "john@example.com",
      role: "admin"
    },
    isAuthenticated: true,
    loading: false
  }
}
```

### Accessing Auth State

```javascript
const { user, isAuthenticated, loading } = useSelector(state => state.auth);
```

## API Integration

### Authentication Endpoints

All endpoints managed by RTK Query in `src/services/auth.js`:

```javascript
// Login
POST /auth/login
Body: { email, password }

// Signup
POST /auth/signup
Body: { name, email, password, role }

// Get Current User
GET /auth/me

// Logout
POST /auth/logout
```

### API Error Handling

```javascript
try {
  await loginUser(credentials).unwrap();
  // Handle success
} catch (error) {
  // error.data.error - Server error message
  toast.error(error?.data?.error || "Login failed");
}
```

## Enhanced Navbar Features

The updated Navbar component includes:

- **Role-based Navigation**: Different menu items for different roles
- **Profile Dropdown**: Quick access to user info and logout
- **Responsive Design**: Mobile-friendly navigation menu
- **Loading States**: Feedback during logout
- **Logo Navigation**: Click logo to go to dashboard

### Role-Specific Navigation

```javascript
Admin:       Dashboard → Users → Settings
Patient:     Dashboard → Appointments
Receptionist: Dashboard → Patients
```

## Error Handling

### Unauthorized Access
When user tries to access a route they're not authorized for:
- Redirected to `/unauthorized` page
- Shows user their current dashboard option
- Allows return to their role's dashboard

### Token Expiry
- Handled by backend endpoint validation
- If token expired, user is redirected to login
- New login required to get new token

### Network Errors
- Toast notifications for failed operations
- User-friendly error messages
- Automatic retry capability

## Best Practices Implemented

1. **Security**
   - JWT tokens handled securely via credentials
   - Protected routes validate on every access
   - Proper role-based authorization checks

2. **Performance**
   - Redux caching for auth state
   - RTK Query for efficient API calls
   - Conditional rendering based on role

3. **User Experience**
   - Loading states during authentication
   - Clear error messages
   - Smooth navigation between dashboards
   - Responsive design

4. **Code Quality**
   - Reusable utility functions
   - Modular components
   - Clean separation of concerns
   - Comprehensive error handling

## Usage Examples

### Protecting a Route by Role

```javascript
<Route
  path="/admin-settings"
  element={
    <RoleBasedRoute allowedRoles={["admin"]}>
      <AdminSettings />
    </RoleBasedRoute>
  }
/>
```

### Getting User Info in Components

```javascript
import { useSelector } from "react-redux";

function MyComponent() {
  const { user } = useSelector(state => state.auth);
  
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Role: {user?.role}</p>
    </div>
  );
}
```

### Redirecting Based on Role

```javascript
import { useNavigate } from "react-router-dom";
import { getDashboardRoute } from "@/utils/roleUtils";
import { useSelector } from "react-redux";

function MyComponent() {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  
  const handleRedirect = () => {
    const route = getDashboardRoute(user?.role);
    navigate(route);
  };
  
  return <button onClick={handleRedirect}>Go to Dashboard</button>;
}
```

## Testing Roles Locally

### Admin Login
- Email: admin@example.com
- Role: admin
- Dashboard: /admin

### Patient Login
- Email: patient@example.com
- Role: patient
- Dashboard: /patient

### Receptionist Login
- Email: receptionist@example.com
- Role: receptionist
- Dashboard: /receptionist

## Future Enhancements

1. **Role Permissions Matrix**: More granular permissions per role
2. **Multi-Role Support**: Users with multiple roles ability
3. **Account Settings**: User profile management page
4. **Audit Logging**: Track admin actions
5. **Two-Factor Authentication**: Enhanced security
6. **Session Management**: Active session monitoring
7. **Role Switching**: Admins switching between roles
8. **Permission-Based UI**: Show/hide UI elements based on permissions

## Troubleshooting

### User stuck on login page
- Clear browser cache/cookies
- Check network tab for API errors
- Verify backend is running

### Dashboard not loading after login
- Check Redux DevTools for auth state
- Verify user role in response
- Check console for errors

### Redirect loop
- Clear auth Redux state
- Check ProtectedRoute allowedRoles configuration
- Verify apiState is being reset on logout

## Support

For issues or questions regarding the role-based authentication system, please check:
1. Console error messages
2. Network tab (API responses)
3. Redux DevTools (auth state)
4. This documentation

---

**Last Updated**: March 31, 2026
**Version**: 1.0.0
