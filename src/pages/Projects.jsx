import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, Github, Trophy, Code2, Cpu, Palette, Globe, Briefcase } from "lucide-react";

const studentProjects = [
  {
    title: "AI-Powered Health Assistant",
    student: "Muhammad Ahmed",
    course: "Artificial Intelligence",
    image: "/assets/projects/ai_dashboard.png",
    description: "A smart diagnostic system that uses machine learning to predict potential health risks based on symptoms.",
    tags: ["Python", "TensorFlow", "React"],
    type: "AI & ML"
  },
  {
    title: "Luxury Fashion Hub",
    student: "Fatima Noor",
    course: "Web Development",
    image: "/assets/projects/ecommerce.png",
    description: "A full-stack e-commerce platform with real-time inventory management and secure payment integration.",
    tags: ["MERN Stack", "Stripe", "Redux"],
    type: "Web Design"
  },
  {
    title: "Eco-Friendly Brand Identity",
    student: "Zain Ali",
    course: "Graphic Design",
    image: "/assets/blog/success.png",
    description: "Complete visual branding for a sustainable energy company, including logo, packaging, and digital assets.",
    tags: ["Illustrator", "Photoshop", "Figma"],
    type: "Design"
  },
  {
    title: "Secure Enterprise Network",
    student: "Usman Raza",
    course: "Cyber Security",
    image: "/assets/events/seminar.png",
    description: "A robust network architecture designed with ethical hacking defenses and automated intrusion detection.",
    tags: ["Networking", "Cisco", "Linux"],
    type: "Security"
  }
];

const filters = ["All Projects", "AI & ML", "Web Design", "Design", "Security"];

export default function Projects() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All Projects");

  const filteredProjects = activeFilter === "All Projects" 
    ? studentProjects 
    : studentProjects.filter(project => project.type === activeFilter);

  return (
    <div className="pt-32 pb-24 bg-white overflow-hidden">
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-indigo-50 to-purple-50 border border-indigo-100/80 text-indigo-600 font-bold text-sm mb-6 shadow-xs">
            <Trophy className="w-4 h-4 text-indigo-500 animate-pulse" />
            <span className="tracking-wide">Student Excellence</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 leading-[1.15] mb-8 tracking-tight">
            The Student <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Showcase</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Explore the innovative projects built by our students. From AI models to 
            enterprise-grade websites, see what's possible at Tech Hub.
          </p>
        </motion.div>
      </section>

      {/* Filter */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 text-center">
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((filter, i) => (
            <button 
              key={i} 
              onClick={() => setActiveFilter(filter)}
              className={`px-8 py-3 rounded-full font-black text-sm transition-all ${
                activeFilter === filter ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/25" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="group relative bg-slate-900 rounded-[3.5rem] overflow-hidden shadow-2xl transition-all duration-500"
          >
            {/* Image Overlay */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-40 transition-all duration-700" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
              
              {/* Floating Badge */}
              <div className="absolute top-8 left-8 px-5 py-2 bg-indigo-600 text-white rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl">
                {project.type === "AI & ML" && <Cpu className="w-4 h-4" />}
                {project.type === "Web Design" && <Globe className="w-4 h-4" />}
                {project.type === "Design" && <Palette className="w-4 h-4" />}
                {project.type === "Security" && <Code2 className="w-4 h-4" />}
                {project.type}
              </div>

              {/* Hover Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-12 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-10 group-hover:translate-y-0">
                <div className="flex gap-4 mb-6">
                  <button 
                    onClick={() => navigate("/contact", { state: { subject: `Project Inquiry: ${project.title}` } })}
                    className="p-4 bg-white rounded-2xl text-slate-900 hover:bg-indigo-600 hover:text-white transition-all shadow-xl"
                  >
                    <ExternalLink className="w-6 h-6" />
                  </button>
                  <button className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-indigo-600 transition-all border border-white/20">
                    <Github className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Static Content */}
            <div className="p-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  <span className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-1">Created by</span>
                  <h3 className="text-2xl font-black text-white">{project.student}</h3>
                </div>
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10">
                  <Trophy className="w-6 h-6" />
                </div>
              </div>

              <h4 className="text-3xl font-black text-white mb-6 group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h4>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-white/5 rounded-xl text-slate-300 font-bold text-xs uppercase border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Recruitment CTA */}
      <section className="mt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-[3.5rem] p-12 md:p-24 text-center text-white shadow-2xl shadow-indigo-600/30">
          <Briefcase className="w-20 h-20 mx-auto mb-8 text-indigo-200" />
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Looking for Top Talent?</h2>
          <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Our graduates are equipped with industry-standard skills and ready to 
            contribute to your team's success. Hire the best from Tech Hub.
          </p>
          <button 
            onClick={() => navigate("/contact", { state: { subject: "Talent Profile Request" } })}
            className="px-12 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-xl hover:bg-indigo-50 transition-all shadow-xl shadow-white/10"
          >
            Request Talent Profile
          </button>
        </div>
      </section>
    </div>
  );
}
