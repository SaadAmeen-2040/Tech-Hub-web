import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Code2, 
  LineChart, 
  Users, 
  Lightbulb, 
  Globe, 
  Rocket, 
  Smartphone, 
  Database,
  Layers,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Award,
  Cpu
} from "lucide-react";

const services = [
  
  {
    title: "Vocational Training",
    description: "International standard technical education for youth, focusing on job-ready skills and certification.",
    icon: <GraduationCap className="w-12 h-12" />,
    features: ["NAVTTC Certified", "PMYSDP Implementation", "Hands-on Projects", "Industry Workshops"],
    color: "bg-indigo-600",
    highlight: true
  },

  {
    title: "Software Development",
    description: "Tailored digital products for startups and enterprises, ranging from e-commerce to AI-driven automation.",
    icon: <Code2 className="w-12 h-12" />,
    features: ["Custom ERP & E-commerce", "AI & LLM Integration", "Mobile & Web Apps", "Final Year Projects (FYP)"],
    color: "bg-indigo-600",
    highlight: true
  },
  
  {
    title: "Corporate Training",
    description: "Upgrade your team's technical capabilities with our specialized corporate workshops.",
    icon: <LineChart className="w-10 h-10" />,
    features: ["Custom Curriculum", "On-site Training", "Digital Transformation", "Performance Analytics"],
    color: "bg-slate-900",
  },
  {
    title: "Career Counseling",
    description: "Guiding students towards successful careers in the global technology marketplace.",
    icon: <Lightbulb className="w-10 h-10" />,
    features: ["Job Placement", "Resume Building", "Interview Prep", "Industry Networking"],
    color: "bg-slate-900",
  }
];

const devTech = [
  { name: "Frontend", icons: ["React", "Next.js", "Vue.js", "Tailwind"] },
  { name: "Backend", icons: ["Node.js", "Python", "Go", "FastAPI"] },
  { name: "AI & Automation", icons: ["OpenAI", "LangChain", "TensorFlow", "Bots"] },
  { name: "Cloud & DevOps", icons: ["AWS", "Docker", "Kubernetes", "Redis"] },
];

const trainingFeatures = [
  { title: "Expert Instructors", desc: "Learn from industry professionals with real-world experience." },
  { title: "Practical Labs", desc: "Hands-on training in state-of-the-art computer laboratories." },
  { title: "Job Placement", desc: "Dedicated support to help you land your dream job in tech." },
  { title: "Free Education", desc: "100% free courses under PM Youth & NAVTTC programs." },
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-24 bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm mb-6">
            <Rocket className="w-4 h-4" />
            <span>Our Dual Expertise</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8">
            Expert Training & <span className="text-gradient">Custom Development</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We bridge the gap between education and industry. Whether you're a student looking 
            for world-class training or a business needing custom software, we deliver excellence.
          </p>
        </motion.div>
      </section>

      {/* Main Services Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-32">
        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-10 rounded-[3rem] border transition-all duration-500 group ${
                service.highlight 
                ? "bg-slate-900 border-slate-800 text-white lg:col-span-2 grid lg:grid-cols-2 gap-12" 
                : "bg-slate-50 border-slate-100 text-slate-900"
              }`}
            >
              <div>
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-xl ${
                  service.highlight ? "bg-indigo-600" : "bg-white text-indigo-600"
                }`}>
                  {service.icon}
                </div>
                <h3 className="text-3xl font-bold mb-6">{service.title}</h3>
                <p className={`text-lg leading-relaxed mb-8 ${
                  service.highlight ? "text-slate-400" : "text-slate-600"
                }`}>
                  {service.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-3">
                      <CheckCircle2 className={`w-5 h-5 ${
                        service.highlight ? "text-indigo-400" : "text-indigo-600"
                      }`} />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                {service.highlight && (
                  <button 
                    onClick={() => navigate(service.title === "Software Development" ? "/software-development" : "/programs")}
                    className="mt-10 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-indigo-700 transition-all"
                  >
                    {service.title === "Software Development" ? "Request a Quote" : "View Courses"} <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {service.highlight && (
                <div className="relative hidden lg:flex items-center justify-center">
                  <div className="absolute inset-0 bg-indigo-600/20 rounded-full blur-[100px]"></div>
                  <div className="relative z-10 grid grid-cols-2 gap-6 w-full text-center">
                    {service.title === "Software Development" ? (
                      <>
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
                          <Smartphone className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
                          <h4 className="font-bold">Mobile/Web</h4>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
                          <Cpu className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
                          <h4 className="font-bold">AI Driven</h4>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
                          <CheckCircle2 className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
                          <h4 className="font-bold">Govt. Verified</h4>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
                          <Award className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
                          <h4 className="font-bold">Intl. Certificate</h4>
                        </div>
                      </>
                    )}
                    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
                      {service.title === "Software Development" ? <Database className="w-10 h-10 text-indigo-400 mx-auto mb-4" /> : <Users className="w-10 h-10 text-indigo-400 mx-auto mb-4" />}
                      <h4 className="font-bold">{service.title === "Software Development" ? "Data Secure" : "Expert Mentors"}</h4>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
                      {service.title === "Software Development" ? <Layers className="w-10 h-10 text-indigo-400 mx-auto mb-4" /> : <Rocket className="w-10 h-10 text-indigo-400 mx-auto mb-4" />}
                      <h4 className="font-bold">{service.title === "Software Development" ? "Scalable" : "Career Boost"}</h4>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Training Excellence Section */}
      <section className="bg-slate-900 py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Why Our <span className="text-indigo-400">Training Programs</span> Stand Out
              </h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {trainingFeatures.map((feature, index) => (
                  <div key={index} className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
                    <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                    <p className="text-slate-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              viewport={{ once: true }}
              className="bg-linear-to-br from-indigo-600 to-purple-600 p-12 rounded-[3rem] text-white"
            >
              <h3 className="text-3xl font-bold mb-6">Enrolling for 2026 Batch</h3>
              <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                We are currently accepting applications for our upcoming 3-month advanced IT courses. 
                Don't miss the chance to learn from the best in the industry for free.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-indigo-300" />
                  <span className="font-bold">100% Free - No Hidden Charges</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-indigo-300" />
                  <span className="font-bold">International Certification</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-indigo-300" />
                  <span className="font-bold">Hands-on Lab Training</span>
                </li>
              </ul>
              <button 
                onClick={() => navigate("/registration")}
                className="w-full py-5 bg-white text-indigo-600 rounded-2xl font-bold text-xl hover:bg-indigo-50 transition-all shadow-2xl"
              >
                Apply for Training
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Software Development Focus Section */}
      <section className="bg-white py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                Our <span className="text-gradient">Tech Stack</span> for Enterprise Solutions
              </h2>
              <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                We use the most modern and reliable technologies to ensure your business 
                stays ahead of the curve. Our development process is agile, transparent, 
                and focused on delivering value.
              </p>
              
              <div className="space-y-8">
                {devTech.map((tech, index) => (
                  <div key={index}>
                    <h4 className="font-bold text-slate-900 mb-4">{tech.name}</h4>
                    <div className="flex flex-wrap gap-3">
                      {tech.icons.map((icon, iIndex) => (
                        <span key={iIndex} className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-slate-600 font-bold text-sm">
                          {icon}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-indigo-600 rounded-[4rem] p-12 flex items-center justify-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-indigo-500 to-purple-600 opacity-50"></div>
                <div className="relative z-10 text-center text-white">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <Code2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Quality Code</h3>
                  <p className="text-indigo-100 text-lg">Clean, maintainable, and scalable architecture for long-term success.</p>
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 hidden md:block">
                <div className="text-4xl font-black text-indigo-600 mb-2">99.9%</div>
                <div className="text-slate-500 font-bold">Uptime Guaranteed</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
          Have a Project in Mind? <br />
          <span className="text-gradient">Let's Build It Together.</span>
        </h2>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
          From concept to launch, we provide full-cycle software development 
          services to help your business thrive in the digital age.
        </p>
        <button 
          onClick={() => navigate("/software-development")}
          className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 transform hover:-translate-y-1"
        >
          Start Your Project Now
        </button>
      </section>
    </div>
  );
}
