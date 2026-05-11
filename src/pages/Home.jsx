import Hero from "../components/sections/Hero";
import QuickInfo from "../components/sections/QuickInfo";
import ProgramsPreview from "../components/sections/ProgramsPreview";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Stats from "../components/sections/Stats";
import BlogPreview from "../components/sections/BlogPreview";
import CTA from "../components/sections/CTA";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <QuickInfo />
      <Stats />
      <ProgramsPreview />
      <WhyChooseUs />
      <BlogPreview />
      <CTA />
    </div>
  );
}
