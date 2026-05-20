import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/sections/Hero";
import QuickInfo from "../components/sections/QuickInfo";
import AdmissionAnnouncement from "../components/sections/AdmissionAnnouncement";
import ProgramsPreview from "../components/sections/ProgramsPreview";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Stats from "../components/sections/Stats";
import BlogPreview from "../components/sections/BlogPreview";
import TestimonialsPreview from "../components/sections/TestimonialsPreview";
import CTA from "../components/sections/CTA";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#testimonials") {
      setTimeout(() => {
        const element = document.getElementById("testimonials");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, [location]);

  return (
    <div className="overflow-x-hidden">
      <Hero />
      <QuickInfo />
      <AdmissionAnnouncement />
      <Stats />
      <ProgramsPreview />
      <WhyChooseUs />
      <TestimonialsPreview />
      <BlogPreview />
      <CTA />
    </div>
  );
}
