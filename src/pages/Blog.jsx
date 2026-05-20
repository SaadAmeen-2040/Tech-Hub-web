import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, User, ArrowRight, TrendingUp, Newspaper, Eye, X, MessageSquare } from "lucide-react";
import api from "../api/api";

const categories = ["All Posts", "General", "Tech News", "Tutorial", "Student Success", "Events", "Career Tips"];

export default function Blog() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All Posts");
  const [search, setSearch] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loadingArticle, setLoadingArticle] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get('/blogs');
        // Only show published blogs for public view
        setBlogs(res.data.data.filter(b => b.isPublished));
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Success! ${email} has been subscribed to the Tech Hub newsletter.`);
      setEmail("");
    }
  };

  const handleReadArticle = async (id) => {
    setLoadingArticle(true);
    try {
      const res = await api.get(`/blogs/${id}`);
      setSelectedBlog(res.data.data);
      // Increment locally so view count updates immediately
      setBlogs(prev => prev.map(b => b._id === id ? { ...b, views: (b.views || 0) + 1 } : b));
    } catch (err) {
      console.error("Failed to load article", err);
    } finally {
      setLoadingArticle(false);
    }
  };

  const filteredBlogs = blogs
    .filter(b => filter === "All Posts" || b.category === filter)
    .filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase()));

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-indigo-50 to-purple-50 border border-indigo-100/80 text-indigo-600 font-bold text-sm mb-6 shadow-xs">
            <Newspaper className="w-4 h-4 text-indigo-500 animate-pulse" />
            <span className="tracking-wide">Tech Hub Insights</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.15] mb-6 tracking-tight">
            Our Latest <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Tech Stories</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
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
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                  filter === cat ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-medium"
            />
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {loading ? (
          <div className="grid lg:grid-cols-3 gap-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-slate-50 animate-pulse rounded-[2.5rem]"></div>
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-xl font-medium">No blog posts found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
            {filteredBlogs.map((post, index) => (
              <motion.div
                key={post._id}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img src={post.image || "/assets/blog/success.png"} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl font-bold text-xs text-indigo-600 shadow-sm">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-slate-400 text-xs sm:text-sm font-medium">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {post.author || "Admin"}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {post.views || 0} views
                      </div>
                    </div>
                    <h3 className="font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors text-xl sm:text-2xl line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed line-clamp-3 text-sm sm:text-base">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 mt-auto">
                  <button 
                    onClick={() => handleReadArticle(post._id)}
                    className="flex items-center gap-2 font-black text-indigo-600 group-hover:gap-4 transition-all text-xs sm:text-sm uppercase tracking-wider disabled:opacity-50"
                    disabled={loadingArticle}
                  >
                    Read Full Article <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="mt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-indigo-600 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6 sm:mb-8 text-indigo-300" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 leading-tight">Join the Tech Hub Newsletter</h2>
            <p className="text-base sm:text-lg text-indigo-100 mb-8 sm:mb-10 leading-relaxed">
              Subscribe to get the latest tech insights and institutional 
              updates delivered directly to your inbox every week.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="flex-1 px-6 py-3.5 sm:px-8 sm:py-4 bg-white rounded-2xl text-slate-900 font-bold border-none focus:ring-4 focus:ring-indigo-300 outline-none text-sm sm:text-base"
              />
              <button 
                type="submit"
                className="px-8 py-3.5 sm:px-10 sm:py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm sm:text-base hover:bg-slate-800 transition-all shadow-2xl"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Premium Full Article Modal Reader */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col border border-slate-100"
            >
              {/* Sticky Top Header */}
              <div className="flex justify-between items-center px-8 py-5 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg">
                    {selectedBlog.category}
                  </span>
                  {selectedBlog.tags && selectedBlog.tags.map(tag => (
                    <span key={tag} className="text-xs text-slate-400 font-medium">#{tag}</span>
                  ))}
                </div>
                <button 
                  onClick={() => setSelectedBlog(null)}
                  className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-900 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto p-8 sm:p-12 space-y-8 flex-1">
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                  {selectedBlog.title}
                </h1>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-slate-700">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      {selectedBlog.author ? selectedBlog.author[0].toUpperCase() : 'A'}
                    </div>
                    {selectedBlog.author || "Admin Team"}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} />
                    {new Date(selectedBlog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye size={16} />
                    {selectedBlog.views || 0} views
                  </div>
                </div>

                {/* Main Banner Image */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 shadow-md">
                  <img 
                    src={selectedBlog.image || "/assets/blog/success.png"} 
                    alt={selectedBlog.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Blog Body HTML/Markdown Parser */}
                <div className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed whitespace-pre-line space-y-6">
                  {selectedBlog.content}
                </div>
              </div>

              {/* Sticky Bottom Actions */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
                <p className="text-sm text-slate-500">Interested in this topic or training?</p>
                <button 
                  onClick={() => {
                    setSelectedBlog(null);
                    navigate("/contact", { state: { subject: `Inquiry regarding: ${selectedBlog.title}` } });
                  }}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
                >
                  <MessageSquare size={16} /> Inquire About This Article
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
