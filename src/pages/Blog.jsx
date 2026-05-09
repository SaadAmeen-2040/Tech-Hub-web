import { motion } from "framer-motion";
import { Search, Tag, Calendar, User, ArrowRight, TrendingUp, Newspaper } from "lucide-react";

const posts = [
  {
    title: "How IT Training Changed My Life: A Success Story",
    excerpt: "From a local graduate to a global freelancer, read about how 3 months of focused training opened doors to international opportunities.",
    category: "Success Stories",
    author: "Admin",
    date: "May 08, 2026",
    image: "/src/assets/blog/success.png",
    featured: true
  },
  {
    title: "Top 5 AI Trends to Watch in 2026",
    excerpt: "Exploring the latest advancements in generative AI and how they are impacting the local tech industry in Pakistan.",
    category: "Tech Trends",
    author: "Engr. Salman",
    date: "May 05, 2026",
    image: "/src/assets/projects/ai_dashboard.png"
  },
  {
    title: "Mastering the MERN Stack in 90 Days",
    excerpt: "Our comprehensive guide to becoming a professional full-stack developer through the NAVTTC program.",
    category: "Education",
    author: "Asad Ullah",
    date: "April 28, 2026",
    image: "/src/assets/projects/ecommerce.png"
  },
  {
    title: "Why Bahawalpur is the Next Tech Hub",
    excerpt: "Analyzing the growth of software houses and IT centers in the heart of South Punjab.",
    category: "Industry News",
    author: "Admin",
    date: "April 15, 2026",
    image: "/src/assets/events/seminar.png"
  }
];

const categories = ["All Posts", "Tech Trends", "Success Stories", "Education", "Industry News"];

export default function Blog() {
  return (
    <div className="pt-32 pb-24 bg-white overflow-hidden">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm mb-6">
            <Newspaper className="w-4 h-4" />
            <span>Tech Hub Insights</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8">
            Our Latest <span className="text-gradient">Tech Stories</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Stay informed with expert insights, student achievements, and 
            technological breakthroughs from our innovation center.
          </p>
        </motion.div>
      </section>

      {/* Categories & Search */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <div className="flex flex-wrap items-center justify-between gap-8 border-b border-slate-100 pb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat, i) => (
              <button 
                key={i} 
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                  i === 0 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full pl-12 pr-6 py-3.5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-medium"
            />
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 ${
                post.featured ? "lg:col-span-2 grid md:grid-cols-2" : ""
              }`}
            >
              <div className="relative aspect-square md:aspect-auto overflow-hidden bg-slate-100">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl font-bold text-sm text-indigo-600 shadow-sm">
                  {post.category}
                </div>
              </div>
              <div className="p-10 flex flex-col justify-center">
                <div className="flex items-center gap-6 mb-6 text-slate-400 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                </div>
                <h3 className={`font-black text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors ${
                  post.featured ? "text-3xl md:text-4xl" : "text-2xl"
                }`}>
                  {post.title}
                </h3>
                <p className="text-slate-600 mb-8 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <button className="flex items-center gap-3 font-black text-indigo-600 group-hover:gap-5 transition-all mt-auto">
                  Read Full Article <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-indigo-600 rounded-[3.5rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <TrendingUp className="w-16 h-16 mx-auto mb-8 text-indigo-300" />
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Join the Tech Hub Newsletter</h2>
            <p className="text-xl text-indigo-100 mb-12 leading-relaxed">
              Subscribe to get the latest tech insights and institutional 
              updates delivered directly to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-8 py-5 bg-white rounded-2xl text-slate-900 font-bold border-none focus:ring-4 focus:ring-indigo-300 outline-none"
              />
              <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-2xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
