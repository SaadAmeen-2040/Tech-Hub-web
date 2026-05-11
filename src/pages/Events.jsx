import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Video, Users, Award } from "lucide-react";
import api from "../api/api";

const pastEvents = [
  { title: "Graduation Ceremony 2025", students: "500+", date: "Dec 2025" },
  { title: "Tech Expo Bahawalpur", visitors: "2000+", date: "Oct 2025" },
  { title: "Freelancing Summit", experts: "10+", date: "Aug 2025" },
];

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        setEvents(res.data.data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="pt-32 pb-24 bg-white overflow-hidden">
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8">
            Connect & <span className="text-gradient">Innovate</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Stay updated with the latest tech seminars, workshops, and graduation 
            ceremonies at Tech Hub Innovation Center.
          </p>
        </motion.div>
      </section>

      {/* Upcoming Events */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-32">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Upcoming Events</h2>
          <div className="h-px grow mx-8 bg-slate-100 hidden md:block"></div>
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm">Join Us</span>
        </div>

        {loading ? (
          <div className="grid lg:grid-cols-2 gap-12">
            {[1, 2].map(i => (
              <div key={i} className="h-96 bg-slate-50 animate-pulse rounded-[3rem]"></div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem]">
            <p className="text-slate-400 text-xl font-medium">No upcoming events scheduled at the moment.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12">
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                viewport={{ once: true }}
                className="group bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img src={event.image || "/assets/events/seminar.png"} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg">
                    {event.category}
                  </div>
                </div>
                <div className="p-10">
                  <div className="flex flex-wrap gap-6 mb-6">
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                      <Calendar className="w-4 h-4 text-indigo-500" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                        <Clock className="w-4 h-4 text-indigo-500" />
                        {event.time}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                      <MapPin className="w-4 h-4 text-indigo-500" />
                      {event.venue || "Tech Hub"}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-slate-600 mb-8 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                  <button 
                    onClick={() => navigate("/contact", { state: { subject: `Event Registration: ${event.title}` } })}
                    className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-indigo-600 transition-all"
                  >
                    Register for Free <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Stats / Past Events Summary */}
      <section className="bg-slate-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <motion.div
                key={index}
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 text-center group hover:bg-indigo-600 transition-all duration-500"
              >
                <div className="text-4xl font-black text-indigo-600 mb-2 group-hover:text-white transition-colors">
                  {event.students || event.visitors || event.experts}
                </div>
                <div className="text-xl font-bold text-slate-900 mb-1 group-hover:text-white transition-colors">
                  {event.title}
                </div>
                <div className="text-slate-400 font-medium group-hover:text-indigo-100 transition-colors">
                  {event.date}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Learning Banner */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]"></div>
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/20 text-indigo-400">
              <Video className="w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Can't join in person?</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join our weekly webinars and live Q&A sessions with industry experts 
              right from the comfort of your home.
            </p>
            <button 
              onClick={() => navigate("/contact", { state: { subject: "Webinar Link Request" } })}
              className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-2xl"
            >
              Watch Live Sessions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
