export default function Stats() {
  const stats = [
    { label: "Graduated Students", value: "5,000+", icon: "🎓" },
    { label: "Success Rate", value: "95%", icon: "📈" },
    { label: "Partner Companies", value: "120+", icon: "🤝" },
    { label: "Expert Instructors", value: "50+", icon: "🏆" },
  ];

  return (
    <section className="py-20 bg-indigo-600 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">{stat.value}</div>
              <div className="text-indigo-100 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
