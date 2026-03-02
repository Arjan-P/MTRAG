1. **Database & Prisma Setup**
   - Initialize Prisma
   - Create a `.env` file with a `DATABASE_URL` variable
   - Generate a Prisma client
   - Define the schema with the required models (Organization, User, Membership, Project, Role enum)
   - Add constraints (unique email on User, unique combination of userId and orgId on Membership)
   - Define foreign keys and cascade delete behavior
   - Run migrations and test the database manually
2. **User Module**
   - Create a user endpoint for registration (POST /auth/register)
     - Validate input with Zod
     - Hash password with bcrypt
     - Enforce unique email
     - Return a safe response (no password hash)
   - Create a login endpoint (POST /auth/login)
     - Verify user exists
     - Compare password hash
     - Issue a JWT access token
     - Return the token
   - Configure JWT with a secret from an environment variable, expiration, and proper payload structure
3. **Authentication Middleware**
   - Create an auth middleware
     - Extract the Bearer token
     - Verify the JWT
     - Attach the user ID to the request
     - Return a 401 error on failure
   - Test a protected route (e.g., GET /me)
4. **Organization Module (Tenant Layer)**
   - Create an organization endpoint (POST /orgs)
     - Require authentication
     - Create an organization
     - Automatically create a Membership with role OWNER
     - Use a transaction (important)
   - Create a list of user's organizations (GET /orgs)
     - Return only orgs the user is a member of
     - Use a membership join
5. **Membership Logic (Critical)**
   - Create a helper function to check if a user has a specific role in an organization (requireOrgRole)
     - Verify membership exists
     - Verify role matches
     - Throw a 403 error if not
   - Create an invite user to an organization endpoint (POST /orgs/:id/invite)
     - Require admin/owner role
     - Check if the user exists
     - Create a membership
     - Prevent duplicate membership
6. **Project Module**
   - Create a project endpoint (POST /orgs/:orgId/projects)
     - Require admin/owner role
     - Link the project to the org
     - Return the project
   - Create a list of projects for an organization (GET /orgs/:orgId/projects)
     - Verify membership
     - Return only org projects
   - Create a project endpoint (GET /projects/:id)
     - Verify membership via project → org
     - Return the project
     - Not leak cross-tenant data
7. **Security Requirements (MANDATORY)**
   - Never expose passwordHash or internal IDs unnecessarily
   - Always scope queries by org
   - Use transactions for critical multi-table writes (e.g., Org creation + owner membership)
8. **Error Handling Layer**
   - Create a centralized error handler middleware
     - Handles Zod errors
     - Handles Prisma errors
     - Handles JWT errors
     - Returns a structured JSON error response
9. **API Testing**
   - Test the following endpoints:
     - Register
     - Login
     - Create org
     - Invite member
     - Create project
     - Access project as member
     - Attempt cross-org access (must fail)
