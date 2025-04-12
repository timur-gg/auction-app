
## Authentication Endpoints
- `POST /auth/register` - User registration with role selection (Buyer/Builder)
- `POST /auth/login` - JWT authentication
- `GET /auth/profile` - Get current user profile
- `PUT /auth/profile` - Update user profile  

## Email Verification (Do later)
- `POST /auth/verify-email/send` - Send verification email
- `GET /auth/verify-email/:token` - Verify email with token

## Builder-specific Registration
- `POST /builders/profile` - Create/update builder profile (company name, license number)
- `GET /builders/profile` - Get builder profile details

## KYC Document Verification
- `POST /documents/upload` - Upload KYC verification documents
- `GET /documents` - List user's uploaded documents
- `GET /documents/:id` - Get document details
- `DELETE /documents/:id` - Remove document

## Admin Approval Workflow
- `GET /admin/builders` - List builder accounts pending approval
- `PUT /admin/builders/:id/approve` - Approve builder account
- `PUT /admin/builders/:id/reject` - Reject builder account

Additionally, implement all other endpoints in TechnicalSec.md for units, projects, and auctions when you're ready to expand beyond the registration flow.
