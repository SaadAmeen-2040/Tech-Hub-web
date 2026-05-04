import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Learn IT Skills",
    highlight: "For FREE",
    description: "Empowering the next generation of tech leaders. Join Tech Hub Institute in collaboration with Government initiatives to master Web Development, Graphic Design, and Freelancing.",
  },
  {
    title: "Master Modern",
    highlight: "Technology",
    description: "Get hands-on experience with the latest tools and frameworks. From React to Photoshop, we cover everything you need to succeed in the digital age.",
  },
  {
    title: "Build Your",
    highlight: "Future",
    description: "Turn your passion into a profession. Our certified programs are designed to make you job-ready and confident in your skills.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds for better readability

    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 pt-20">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl animate-float" style={{ animationDelay: "0s" }}></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-purple-100/50 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] bg-blue-100/50 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div key={current} className="animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-wide uppercase mb-6">
            Trusted by 5,000+ Students
          </span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 tracking-tight mb-8 min-h-[2.5em] md:min-h-[auto]">
            {slide.title} <br />
            <span className="text-gradient">{slide.highlight}</span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed mb-12 min-h-[4.5em]">
            {slide.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all duration-300 shadow-xl shadow-indigo-500/25 transform hover:-translate-y-1"
            >
              Apply Now
            </button>
            <Link
              to="/programs"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all duration-300 transform hover:-translate-y-1"
            >
              Browse Programs
            </Link>
          </div>

          {/* Slider Indicators */}
          <div className="mt-12 flex justify-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === index ? "bg-indigo-600 w-8" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Floating Icons / Tech Stack */}
        <div className="mt-16 grid grid-cols-3 md:grid-cols-6 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {["JS", "RE", "PS", "AI", "TW", "ND"].map((tech) => (
            <div key={tech} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                <span className="font-bold text-slate-800">{tech}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}