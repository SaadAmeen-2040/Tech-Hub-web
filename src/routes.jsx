import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";
import Events from "./pages/Events";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import Registration from "./pages/Registration";
import SoftwareDevelopment from "./pages/SoftwareDevelopment";
import AdminLogin from "./pages/AdminLogin";
import AdminOverview from "./pages/dashboard/AdminOverview";
import ManageCourses from "./pages/dashboard/ManageCourses";
import ManageAdmissions from "./pages/dashboard/ManageAdmissions";
import ManageInquiries from "./pages/dashboard/ManageInquiries";
import ManageQuotes from "./pages/dashboard/ManageQuotes";
import ManageTeachers from "./pages/dashboard/ManageTeachers";
import ManageStudents from "./pages/dashboard/ManageStudents";
import ManageBlog from "./pages/dashboard/ManageBlog";
import ManageEvents from "./pages/dashboard/ManageEvents";
import ManageSettings from "./pages/dashboard/ManageSettings";
import MainLayout from "./components/layout/MainLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ScrollToTop from "./components/utils/ScrollToTop";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/software-development" element={<SoftwareDevelopment />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminOverview />} />
            <Route path="courses" element={<ManageCourses />} />
            <Route path="admissions" element={<ManageAdmissions />} />
            <Route path="students" element={<ManageStudents />} />
            <Route path="teachers" element={<ManageTeachers />} />
            <Route path="events" element={<ManageEvents />} />
            <Route path="blog" element={<ManageBlog />} />
            <Route path="settings" element={<ManageSettings />} />
            <Route path="gallery" element={<div className="text-white p-8">Gallery Management — Coming Soon</div>} />
            <Route path="inquiries" element={<ManageInquiries />} />
            <Route path="quotes" element={<ManageQuotes />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
