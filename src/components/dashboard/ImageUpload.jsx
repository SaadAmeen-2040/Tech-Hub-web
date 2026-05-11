import React, { useState } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../api/api';

const ImageUpload = ({ value, onChange, onUploading, label = "Upload Image" }) => {
  const [uploading, setUploading] = useState(false);

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
      <label className="block text-sm font-medium text-gray-400">{label}</label>
      
      {value ? (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
            <button 
              type="button"
              onClick={clearImage}
              className="p-3 bg-red-600 rounded-xl text-white hover:bg-red-700 transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <label className={`
          flex flex-col items-center justify-center w-full aspect-video rounded-2xl border-2 border-dashed 
          border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 transition-all cursor-pointer
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
            <p className="text-xs text-gray-500">SVG, PNG, JPG or WEBP (MAX. 5MB)</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;
