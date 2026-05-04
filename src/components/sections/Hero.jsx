import { useNavigate, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Web Development",
    desc: "Master the art of building modern, responsive websites. Learn HTML, CSS, JavaScript, and React from industry experts.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072",
    tag: "Most Popular",
  },
  {
    title: "Graphic Design",
    desc: "Unleash your creativity and design stunning visuals. Master Adobe Photoshop, Illustrator, and modern branding techniques.",
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=2071",
    tag: "Creative Arts",
  },
  {
    title: "Freelancing",
    desc: "Start your journey as a successful freelancer. Learn how to secure high-paying clients on Fiverr, Upwork, and more.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071",
    tag: "Career Growth",
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
            <div className="relative h-full w-full">
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110 group-active:scale-100"
                style={{ backgroundImage: `url(${slide.img})` }}
              >
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-950/20"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl">
                  <div className="animate-fade-in-up">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-600/20 border border-indigo-400/30 text-indigo-300 text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-sm">
                      {slide.tag}
                    </span>
                    
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-8 leading-tight">
                      {slide.title.split(' ').slice(0, -1).join(' ')} <br />
                      <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-purple-400">
                        {slide.title.split(' ').slice(-1)}
                      </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-300 leading-relaxed mb-12 font-medium">
                      {slide.desc}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                      <button
                        onClick={() => navigate("/contact", { state: { program: slide.title } })}
                        className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all duration-300 shadow-2xl shadow-indigo-600/40 transform hover:-translate-y-1 active:scale-95"
                      >
                        Apply Now
                      </button>
                      <Link
                        to="/programs"
                        className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        <div className="hidden md:flex absolute inset-y-0 left-8 z-20 items-center">
          <button className="swiper-button-prev-custom w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all active:scale-90">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex absolute inset-y-0 right-8 z-20 items-center">
          <button className="swiper-button-next-custom w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all active:scale-90">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
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
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </section>
  );
}