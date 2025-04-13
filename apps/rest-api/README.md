## Authentication Endpoints

- `POST /auth/register` - User registration with role selection (Buyer/Builder)
- `POST /auth/login` - JWT authentication
- `GET /auth/profile` - Get current user profile

## Builder-specific Registration

- `POST /builders/profile` - Create/update builder profile (company name, license number)
- `GET /builders/profile` - Get builder profile details

## Document Upload

- `POST /upload/verify` - Upload KYC verification documents
- `POST /upload/photos` - Upload photos for unit or project {array of blobs, id of object, table (project or unit)}

## Admin Approval Workflow

- `GET /admin/builders` - List builder accounts pending approval
- `PUT /admin/builders/:id/approve` - Approve builder account
- `PUT /admin/builders/:id/reject` - Reject builder account

## Email Verification (Do later)

- `POST /auth/verify-email/send` - Send verification email
- `GET /auth/verify-email/:token` - Verify email with token
