export default function WhyChooseUs() {
  const features = [
    {
      title: "Zero Tuition Fees",
      description: "Our programs are fully funded by government initiatives, making quality IT education accessible to everyone.",
      icon: "💎",
    },
    {
      title: "Hands-on Learning",
      description: "Gain practical experience through real-world projects and industry-standard tools and practices.",
      icon: "🛠️",
    },
    {
      title: "Expert Mentors",
      description: "Learn from industry professionals with years of experience in their respective fields.",
      icon: "👨‍🏫",
    },
    {
      title: "Job Readiness",
      description: "We focus on building skills that are in high demand, ensuring you are ready for the job market.",
      icon: "💼",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Why Students <span className="text-gradient">Choose Us</span>
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              At Tech Hub Institute, we are committed to providing top-tier education without the financial burden. 
              Our mission is to bridge the skill gap and empower youth with modern technological capabilities.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="text-3xl shrink-0">{feature.icon}</div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-1">{feature.title}</h4>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="aspect-square bg-indigo-600 rounded-3xl overflow-hidden shadow-2xl relative group">
              {/* This would normally be an image, using a stylized placeholder */}
              <div className="absolute inset-0 bg-linear-to-tr from-indigo-900/40 to-transparent z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-9xl opacity-20 group-hover:scale-110 transition-transform duration-700">🚀</div>
              </div>
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                  <p className="text-white font-medium text-lg italic">
                    "Tech Hub transformed my career. The free courses allowed me to learn without stress, and now I'm working as a freelance developer."
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-400 rounded-full"></div>
                    <div>
                      <p className="text-white font-bold text-sm">Sarah Ahmed</p>
                      <p className="text-indigo-200 text-xs">Web Dev Alumna</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-500 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
