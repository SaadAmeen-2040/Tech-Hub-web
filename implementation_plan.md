# Implementation Plan - Tech Hub Innovation Center SaaS Portal

Building a complete production-level SaaS-style IT Institute Management Web Portal using React.js, Tailwind CSS 4, Node.js, Express.js, MongoDB Atlas, Cloudinary, and EmailJS.

## User Review Required

> [!IMPORTANT]
> The current project is using React 19 and Tailwind CSS 4. I will continue using these versions as they are modern and future-proof, despite the request mentioning React 18.
> Please provide your **MongoDB Atlas Connection String**, **Cloudinary Credentials**, and **EmailJS Keys** when you are ready to connect the services. For now, I will use environment variable placeholders in a `.env` file.

## Proposed Changes

### 1. Infrastructure & Backend Setup
I will create a `server/` directory for the backend and initialize it with Node.js and Express.

#### [NEW] `server/package.json`
Dependencies: `express`, `mongoose`, `dotenv`, `cors`, `helmet`, `jsonwebtoken`, `bcryptjs`, `multer`, `cloudinary`, `multer-storage-cloudinary`, `cookie-parser`, `express-rate-limit`, `express-mongo-sanitize`, `xss-clean`.

#### [NEW] `server/config/db.js`
MongoDB Atlas connection setup.

#### [NEW] `server/models/`
Schemas for:
- `User` (Admin & Staff roles)
- `Course` (Programs & Courses)
- `Admission` (Student applications)
- `Blog` (News & Articles)
- `Event` (Institute events)
- `Testimonial` (Student reviews)
- `Gallery` (Images/Videos)
- `Contact` (Inquiries)
- `QuoteRequest` (Software services)

#### [NEW] `server/routes/` & `server/controllers/`
Modular REST APIs for all the above models.

### 2. Frontend Enhancements
I will update the existing React application to include the Admin Dashboard and integrate with the backend.

#### [MODIFY] `package.json`
Install missing dependencies: `axios`, `react-hook-form`, `react-hot-toast`, `recharts`, `clsx`, `tailwind-merge`.

#### [NEW] `src/api/`
Axios instance and API service functions for backend communication.

#### [NEW] `src/dashboard/`
Admin Dashboard components and layouts.
- `DashboardLayout.jsx`
- `Sidebar.jsx`
- `StatsCard.jsx`
- `AdminOverview.jsx`
- `ManageCourses.jsx`
- `ManageAdmissions.jsx`
- etc.

#### [NEW] `src/context/AuthContext.jsx`
State management for admin authentication.

#### [MODIFY] `src/routes.jsx`
Add protected routes for the Admin Dashboard and new public routes (Course Details).

### 3. Features & Integrations
- **Authentication**: JWT-based secure login with refresh tokens and secure cookies.
- **File Uploads**: Cloudinary integration for course thumbnails and gallery.
- **Email Notifications**: EmailJS integration for contact and admission forms.
- **SEO**: Meta tags and semantic HTML for all pages.

## Verification Plan

### Automated Tests
- I will use the browser tool to verify the frontend UI and responsiveness.
- I will test API endpoints using the browser or scratch scripts.

### Manual Verification
- Verify Admin login flow.
- Test form submissions (Admission, Quote Request).
- Check dashboard analytics charts.
- Verify file uploads to Cloudinary.
- Confirm EmailJS notifications are triggered.

---

## Folder Structure

### Backend (`server/`)
- `config/`: Database and service configurations.
- `controllers/`: Logic for API endpoints.
- `middleware/`: Auth, validation, and security middlewares.
- `models/`: Mongoose schemas.
- `routes/`: Express route definitions.
- `utils/`: Helper functions.
- `index.js`: Main entry point.

### Frontend (`src/`)
- `api/`: Axios services.
- `components/`: UI components (Common, Layout, Sections, Dashboard).
- `context/`: Auth and Theme contexts.
- `hooks/`: Custom hooks for data fetching.
- `pages/`: Page components.
- `routes.jsx`: Routing configuration.
- `utils/`: Constants and helper functions.
