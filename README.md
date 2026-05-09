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

## 🛠️ Technology Stack

- **Frontend**: React.js 18
- **Styling**: Tailwind CSS 4.0 (Modern utility-first framework)
- **Icons**: Lucide React (Crisp, scalable vector icons)
- **Animations**: Framer Motion
- **Carousels**: Swiper.js
- **Routing**: React Router v7
- **Build Tool**: Vite (Lightning-fast development environment)

---

## 📁 Project Structure

```bash
src/
├── components/
│   ├── forms/          # Reusable form components (Contact, Registration)
│   ├── layout/         # Core layout (Navbar, Footer, MainLayout)
│   ├── sections/       # Modular homepage sections (Hero, Stats, CTA)
│   └── utils/          # Helper components (ScrollToTop)
├── data/               # Static data for programs and instructors
├── pages/              # Main route components
└── index.css           # Global styles and Tailwind configuration
```

---

## 🚦 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🛡️ Governance & Standards
The portal is designed to meet **NAVTTC** and **PM Youth Program** guidelines, providing a secure and professional environment for student data collection.

---
© 2026 Tech Hub Innovation Center. All rights reserved.
