import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Layout, Target, Award, MessageSquare, Plus, Trash2, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import ImageUpload from '../../components/dashboard/ImageUpload';
import api from '../../api/api';

const ManageSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/settings');
      const data = res.data.data;
      // Ensure contact and socials exist with defaults
      if (!data.contact) {
        data.contact = {
          address: 'Opp. Moon College and Sir Sadiq Banquet Hall, Ring Road Near Saddar Pulli, Bahawalpur',
          phone: '+92 308 0620868',
          email: 'info@techhubinstitute.pk'
        };
      }
      if (!data.socials) {
        data.socials = {
          facebook: '#',
          twitter: '#',
          instagram: '#',
          linkedin: '#',
          whatsapp: '923080620868'
        };
      }
      setSettings(data);
    } catch (err) {
      console.error('Failed to load settings', err);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handlePrincipalChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      principal: { ...prev.principal, [name]: value }
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      contact: { ...prev.contact, [name]: value }
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      socials: { ...prev.socials, [name]: value }
    }));
  };

  const handleMessageChange = (index, value) => {
    const newMessage = [...settings.principal.message];
    newMessage[index] = value;
    setSettings(prev => ({
      ...prev,
      principal: { ...prev.principal, message: newMessage }
    }));
  };

  const addMessagePara = () => {
    setSettings(prev => ({
      ...prev,
      principal: { ...prev.principal, message: [...prev.principal.message, ''] }
    }));
  };

  const removeMessagePara = (index) => {
    const newMessage = settings.principal.message.filter((_, i) => i !== index);
    setSettings(prev => ({
      ...prev,
      principal: { ...prev.principal, message: newMessage }
    }));
  };

  const handleValueChange = (index, field, value) => {
    const newValues = [...settings.coreValues];
    newValues[index] = { ...newValues[index], [field]: value };
    setSettings(prev => ({ ...prev, coreValues: newValues }));
  };

  const handleStatChange = (index, field, value) => {
    const newStats = [...settings.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setSettings(prev => ({ ...prev, stats: newStats }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/settings', settings);
      toast.success('Settings updated successfully!');
    } catch (err) {
      console.error('Failed to update settings', err);
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading settings...</div>;
  if (!settings) return <div className="text-center py-20 text-red-500">Error loading settings. Please check backend connection.</div>;

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Site Content Management</h1>
          <p className="text-gray-400">Update Mission, Vision, Contacts, Socials, and Principal details.</p>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all text-white disabled:opacity-50"
        >
          {saving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
        {/* Principal Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] space-y-6"
        >
          <div className="flex items-center gap-3 text-blue-500 mb-2">
            <Layout size={24} />
            <h2 className="text-xl font-bold text-white">Principal Information</h2>
          </div>

          <div className="space-y-4">
            <ImageUpload 
              value={settings.principal.image} 
              onChange={(val) => setSettings(prev => ({
                ...prev,
                principal: { ...prev.principal, image: val }
              }))}
              label="Principal Photo"
            />
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Principal Name</label>
              <input 
                name="name"
                value={settings.principal.name}
                onChange={handlePrincipalChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Designation</label>
              <input 
                name="designation"
                value={settings.principal.designation}
                onChange={handlePrincipalChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Visionary Title (e.g. Principal & IT Visionary)</label>
              <input 
                name="visionaryTitle"
                value={settings.principal.visionaryTitle}
                onChange={handlePrincipalChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-400">Principal Message Paragraphs</label>
                <button 
                  type="button" 
                  onClick={addMessagePara}
                  className="text-blue-500 hover:text-blue-400 text-xs flex items-center gap-1"
                >
                  <Plus size={14} /> Add Paragraph
                </button>
              </div>
              {settings.principal.message.map((para, i) => (
                <div key={i} className="flex gap-2">
                  <textarea 
                    value={para}
                    onChange={(e) => handleMessageChange(i, e.target.value)}
                    rows={3}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all resize-none text-sm"
                  />
                  <button 
                    type="button" 
                    onClick={() => removeMessagePara(i)}
                    className="p-2 text-gray-500 hover:text-red-500 self-start"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mission & Vision Section */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] space-y-6"
          >
            <div className="flex items-center gap-3 text-purple-500 mb-2">
              <Target size={24} />
              <h2 className="text-xl font-bold text-white">Mission & Vision</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Our Mission</label>
                <textarea 
                  value={settings.mission}
                  onChange={(e) => setSettings({...settings, mission: e.target.value})}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all resize-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Our Vision</label>
                <textarea 
                  value={settings.vision}
                  onChange={(e) => setSettings({...settings, vision: e.target.value})}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all resize-none text-sm"
                />
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] space-y-6"
          >
            <div className="flex items-center gap-3 text-emerald-500 mb-2">
              <Award size={24} />
              <h2 className="text-xl font-bold text-white">Site Statistics</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {settings.stats.map((stat, i) => (
                <div key={i} className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500">{stat.label}</label>
                  <input 
                    value={stat.value}
                    onChange={(e) => handleStatChange(i, 'value', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500 transition-all font-bold"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact & Socials Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-2 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] space-y-6"
        >
          <div className="flex items-center gap-3 text-emerald-400 mb-2">
            <Globe size={24} />
            <h2 className="text-xl font-bold text-white">Contact & Social Media Links</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Contact Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Address</label>
                <input 
                  name="address"
                  value={settings.contact?.address || ''}
                  onChange={handleContactChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                <input 
                  name="phone"
                  value={settings.contact?.phone || ''}
                  onChange={handleContactChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input 
                  name="email"
                  value={settings.contact?.email || ''}
                  onChange={handleContactChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Social Media Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">Social Media Links</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Facebook URL</label>
                  <input 
                    name="facebook"
                    value={settings.socials?.facebook || ''}
                    onChange={handleSocialChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Instagram URL</label>
                  <input 
                    name="instagram"
                    value={settings.socials?.instagram || ''}
                    onChange={handleSocialChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Linkedin URL</label>
                  <input 
                    name="linkedin"
                    value={settings.socials?.linkedin || ''}
                    onChange={handleSocialChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Twitter URL</label>
                  <input 
                    name="twitter"
                    value={settings.socials?.twitter || ''}
                    onChange={handleSocialChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">WhatsApp Number (e.g. 923080620868)</label>
                <input 
                  name="whatsapp"
                  value={settings.socials?.whatsapp || ''}
                  onChange={handleSocialChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Core Values Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] space-y-6"
        >
          <div className="flex items-center gap-3 text-blue-400 mb-2">
            <MessageSquare size={24} />
            <h2 className="text-xl font-bold text-white">Core Values</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {settings.coreValues.map((val, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
                <input 
                  value={val.title}
                  onChange={(e) => handleValueChange(i, 'title', e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 pb-2 text-white font-bold focus:outline-none focus:border-blue-500"
                />
                <textarea 
                  value={val.description}
                  onChange={(e) => handleValueChange(i, 'description', e.target.value)}
                  rows={3}
                  className="w-full bg-transparent text-sm text-gray-400 focus:outline-none resize-none"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default ManageSettings;
