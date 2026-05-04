import Hero from "../components/sections/Hero";
import ProgramsPreview from "../components/sections/ProgramsPreview";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Stats from "../components/sections/Stats";
import CTA from "../components/sections/CTA";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Stats />
      <ProgramsPreview />
      <WhyChooseUs />
      <CTA />
    </div>
  );
}