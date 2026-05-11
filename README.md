# Tech Hub Innovation Center - Web Portal

![Tech Hub Banner](https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072)

A premium, modern web portal for **Tech Hub Innovation Center**, designed to facilitate student registrations for government-funded IT programs (NAVTTC) and capture leads for custom software development services.

---

## 🚀 Key Features

### 1. **Modern UI/UX Design**
- **Glassmorphism Aesthetic**: Uses semi-transparent layers, backdrop blurs, and vibrant gradients for a cutting-edge feel.
- **Fluid Animations**: Powered by `Framer Motion` for smooth page transitions, scroll-triggered reveals, and interactive hover effects.
- **Full Responsiveness**: Optimized for mobile, tablet, and desktop with custom breakpoints to ensure layout stability.

### 2. **Core Pages & Modules**
- **Home**: Dynamic hero section with Swiper slider, quick-info stats, and featured program previews.
- **About Us**: Showcases the mission, story, and **Interactive Expert Instructor Profiles**.
- **Programs**: Comprehensive listing of IT courses with enrollment triggers.
- **Services**: High-conversion lead capture page for custom software solutions.
- **Showcase**: Student projects, latest events, and a technical blog.
- **Registration**: Official NAVTTC-aligned admission portal.

### 3. **Administrative Features**
- **Full Content CMS**: Manage Blogs, Events, Instructors, and Program Settings from a secure dashboard.
- **Smart Image System**: Robust local image storage with proxy-serving for seamless cross-origin reliability.
- **Social Connectivity**: Integrated LinkedIn and WhatsApp contact links for all staff, manageable via Admin Portal.

---

## 🚦 Installation & Setup

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Local installation or MongoDB Atlas URI)

### 2. Clone & Install
```bash
git clone <your-repository-url>
npm install
cd server && npm install
```

### 3. Environment Setup
Create a `.env` file in the `server` directory based on `.env.example`:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
NODE_ENV=development
```

### 4. Run the Application
Run both frontend and backend concurrently from the root directory:
```bash
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
- **Admin Portal**: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)

---

## 🛠️ Technical Implementation Details

### **Image Management**
The project uses a hybrid **Local Disk Storage** system:
- **Storage Location**: `server/uploads/`
- **Smart Serving**: A custom backend route checks for images on disk first, with a fallback to the database for legacy media storage.
- **Vite Proxy**: Configured in `vite.config.js` to eliminate CORS issues and port mismatches during development.

### **Security**
- **Helmet**: Configured with specific `Cross-Origin-Resource-Policy` to allow the frontend to safely display backend images.
- **JWT Authentication**: Secure access control for all administrative routes.

---

## 📁 Project Structure

```bash
tech-hub-web/
├── server/             # Backend (Express API)
│   ├── uploads/        # Local image storage
│   ├── controllers/    # Request handlers
│   ├── models/         # Mongoose schemas
│   └── routes/         # API endpoints
├── src/                # Frontend (React)
│   ├── components/     # UI components & sections
│   ├── pages/          # Route pages & Dashboard
│   └── api/            # API client (Axios Proxy)
└── index.css           # Global Design System
```

---

## 🛡️ Governance & Standards
The portal is designed to meet **NAVTTC** and **PM Youth Program** guidelines, providing a secure and professional environment for student data collection.

---
© 2026 Tech Hub Innovation Center. All rights reserved.
