# Tech Hub Innovation Center - Web Portal

![Tech Hub Banner](https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072)

A premium, modern web portal for **Tech Hub Innovation Center**, designed to facilitate student registrations for government-funded IT programs (NAVTTC) and capture leads for custom software development services.

---

## 🚀 Key Features

### 1. **Modern UI/UX Design**
- **Glassmorphism Aesthetic**: Uses semi-transparent layers, backdrop blurs, and vibrant gradients for a cutting-edge feel.
- **Fluid Animations**: Powered by `Framer Motion` for smooth page transitions, scroll-triggered reveals, and interactive hover effects.
- **Full Responsiveness**: Optimized for mobile, tablet, and desktop with custom breakpoints (e.g., 1150px) to ensure perfect layout stability.

### 2. **Core Pages & Modules**
- **Home**: Dynamic hero section with Swiper slider, quick-info stats, and featured program previews.
- **About Us**: Showcases the mission, story, and expert instructors.
- **Programs**: Comprehensive listing of IT courses (AI, Web, Cyber Security, etc.) with enrollment triggers.
- **Services (Software Development)**: High-conversion lead capture page for custom ERP, E-commerce, and Cloud solutions.
- **Showcase**: Student projects, latest events, and a technical blog.
- **Registration**: Official NAVTTC-aligned admission portal with multi-step data capture.

### 3. **Advanced Forms**
- **Quote Request (Software Dev)**: Features intelligent project categorization, AI automation toggles, and multi-country support.
- **Official Admission**: Detailed form capturing student metadata, academic background, and WhatsApp connectivity.
- **Contact Us**: Clean, floating-label contact form for direct inquiries.

---

## 🚦 Installation & Setup

Follow these steps to get the full-stack project running on your local machine:

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Local installation or MongoDB Atlas URI)

### 2. Clone the Repository
```bash
git clone <your-repository-url>
cd Tech-Hub-web
```

### 3. Setup Backend
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your MongoDB URI, JWT secret, and Cloudinary credentials.

### 4. Setup Frontend
1. Return to the root directory:
   ```bash
   cd ..
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```

### 5. Run the Application
You can run both the frontend and backend concurrently from the root directory:
```bash
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Admin Login**: http://localhost:5173/admin/login

---

## 🔐 Environment Variables (Server)
| Variable | Description |
| --- | --- |
| `PORT` | Server port (default: 5000) |
| `MONGODB_URI` | Your MongoDB connection string |
| `JWT_SECRET` | Secret key for authentication |
| `CLOUDINARY_*` | Media storage credentials |

---

## 🛠️ Technology Stack

- **Frontend**: React.js 18
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Backend**: Node.js & Express
- **Database**: MongoDB (Mongoose)

---

## 📁 Project Structure

```bash
tech-hub-web/
├── server/             # Backend (Express API)
│   ├── config/         # Database & Cloudinary config
│   ├── controllers/    # Request handlers
│   ├── models/         # Mongoose schemas
│   └── routes/         # API endpoints
├── src/                # Frontend (React)
│   ├── components/     # UI components
│   ├── pages/          # Route pages
│   └── api/            # API client configuration
└── index.css           # Global styles
```

---

## 🛡️ Governance & Standards
The portal is designed to meet **NAVTTC** and **PM Youth Program** guidelines, providing a secure and professional environment for student data collection.

---
© 2026 Tech Hub Innovation Center. All rights reserved.
