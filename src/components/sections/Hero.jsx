import { useNavigate, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import { Clock, User, Award, ArrowRight, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Kickstart Your",
    highlight: "IT Career",
    desc: "100% Free 3-Months Advanced IT Courses with International Certification. Join Tech Hub Innovation Center Bahawalpur today.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072",
    tag: "Batch 2026 Open",
  },
  {
    title: "Advanced Skill",
    highlight: "Development",
    desc: "Specialized tracks for 16-years education and intermediate students. Morning, Evening, and Weekend classes available.",
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=2071",
    tag: "Morning | Evening | Weekend",
  },
  {
    title: "Global Industry",
    highlight: "Standards",
    desc: "Age limit 18-40 years. Master AI, Cyber Security, Digital Marketing, and more with international standards of training.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071",
    tag: "Age Limit: 18-40 Years",
  },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1500}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div className="relative h-full w-full">
                {/* Background Image with Overlay */}
                <motion.div 
                  initial={{ scale: 1.05 }}
                  animate={isActive ? { scale: 1 } : { scale: 1.05 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.img})` }}
                >
                  <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[1px]"></div>
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-950/40"></div>
                </motion.div>

                {/* Content */}
                <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-20">
                  <div className="max-w-5xl">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <div className="flex justify-center mb-8 gap-4 flex-wrap">
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          className="inline-block py-1.5 px-4 rounded-full bg-indigo-600/30 border border-indigo-400/30 text-indigo-200 text-sm font-bold tracking-widest uppercase backdrop-blur-md shadow-lg"
                        >
                          {slide.tag}
                        </motion.span>
                      </div>
                      
                      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-8 leading-tight drop-shadow-2xl">
                        {slide.title} <br />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-300">
                          {slide.highlight}
                        </span>
                      </h1>

                      <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-200 leading-relaxed mb-12 font-medium drop-shadow-md">
                        {slide.desc}
                      </p>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <motion.button
                          whileHover={{ scale: 1.05, translateY: -4 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate("/contact")}
                          className="w-full sm:w-auto px-6 py-3 sm:px-10 sm:py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg sm:text-xl hover:bg-indigo-700 transition-all duration-300 shadow-2xl shadow-indigo-600/40 flex items-center justify-center gap-2"
                        >
                          Apply Now <ArrowRight className="w-6 h-6" />
                        </motion.button>
                        <motion.div
                          whileHover={{ scale: 1.05, translateY: -4 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            to="/programs"
                            className="w-full sm:w-auto px-6 py-3 sm:px-10 sm:py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-lg sm:text-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                          >
                            Browse Programs
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        <div className="hidden md:flex absolute inset-y-0 left-8 z-20 items-center">
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: "rgba(99, 102, 241, 1)" }}
            whileTap={{ scale: 0.9 }}
            className="swiper-button-prev-custom w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-2xl"
          >
            <ChevronLeft className="w-8 h-8" />
          </motion.button>
        </div>
        <div className="hidden md:flex absolute inset-y-0 right-8 z-20 items-center">
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: "rgba(99, 102, 241, 1)" }}
            whileTap={{ scale: 0.9 }}
            className="swiper-button-next-custom w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-2xl"
          >
            <ChevronRight className="w-8 h-8" />
          </motion.button>
        </div>
      </Swiper>

      {/* Global Swiper Overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-swiper .swiper-pagination {
          bottom: 40px !important;
        }
        .custom-bullet {
          width: 40px !important;
          height: 4px !important;
          background: rgba(255, 255, 255, 0.2) !important;
          opacity: 1 !important;
          margin: 0 6px !important;
          transition: all 0.5s ease !important;
          border-radius: 2px !important;
          display: inline-block !important;
        }
        .swiper-pagination-bullet-active {
          background: #6366f1 !important;
          width: 60px !important;
        }
      `}} />
    </section>
  );
}