import React, { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../api/api';

const ImageUpload = ({ value, onChange, onUploading, label = "Upload Image" }) => {
  const [uploading, setUploading] = useState(false);
  
  // Auto-detect tab: if value looks like a local relative asset (no http, no uploads path), open Link tab
  const [imageTab, setImageTab] = useState(() => {
    if (value && !value.startsWith('http') && !value.includes('uploads') && !value.startsWith('blob:')) {
      return 'link';
    }
    return 'upload';
  });

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size too large (max 5MB)");
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    if (onUploading) onUploading(true);
    try {
      const res = await api.post('/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onChange(res.data.data);
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      if (onUploading) onUploading(false);
    }
  };

  const clearImage = () => {
    onChange('');
  };

  return (
    <div className="space-y-3">
      {/* Header Selector */}
      <div className="flex justify-between items-center mb-1">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</label>
        <div className="flex gap-1 p-0.5 bg-white/[0.03] border border-white/[0.06] rounded-lg">
          <button
            type="button"
            onClick={() => setImageTab('upload')}
            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
              imageTab === 'upload' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setImageTab('link')}
            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
              imageTab === 'link' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            Direct Link / URL
          </button>
        </div>
      </div>
      
      {/* Mode View */}
      {imageTab === 'upload' ? (
        value ? (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.08] group">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
              <button 
                type="button"
                onClick={clearImage}
                className="p-3 bg-rose-600 rounded-xl text-white hover:bg-rose-700 transition-all shadow-lg"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ) : (
          <label className={`
            flex flex-col items-center justify-center w-full aspect-video rounded-2xl border-2 border-dashed 
            border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-blue-500/50 transition-all cursor-pointer
            ${uploading ? 'opacity-50 pointer-events-none' : ''}
          `}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {uploading ? (
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
              ) : (
                <Upload className="w-10 h-10 text-gray-500 mb-4" />
              )}
              <p className="mb-2 text-sm text-gray-400 font-semibold">
                {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, WEBP or SVG (MAX. 5MB)</p>
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
          </label>
        )
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. project_pharmacy.jpg or https://..."
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all text-sm font-semibold"
          />
          {value && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.08]">
              <img 
                src={value} 
                alt="Link Preview" 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
