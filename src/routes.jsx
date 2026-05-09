import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import MainLayout from "./components/layout/MainLayout";
import ScrollToTop from "./components/utils/ScrollToTop";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}
