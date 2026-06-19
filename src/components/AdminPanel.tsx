import React, { useState, useRef } from 'react';
import { Shield, Key, Check, Plus, Trash2, Edit2, RotateCcw, Save, Smartphone, MapPin, Instagram, Trash, Image, AlertCircle, FileText } from 'lucide-react';
import { ProfileInfo, GalleryItem, MehndiService, GalleryCategory } from '../types';
import { DEFAULT_PASSCODE, checkAdminPasscode, setAdminPasscode } from '../lib/store';

interface AdminPanelProps {
  profile: ProfileInfo;
  services: MehndiService[];
  gallery: GalleryItem[];
  updateProfile: (fields: Partial<ProfileInfo>) => void;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  editGalleryItem: (id: string, fields: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  addService: (service: Omit<MehndiService, 'id'>) => void;
  updateService: (id: string, fields: Partial<MehndiService>) => void;
  deleteService: (id: string) => void;
  resetToDefaults: () => void;
}

export function AdminPanel({
  profile,
  services,
  gallery,
  updateProfile,
  addGalleryItem,
  editGalleryItem,
  deleteGalleryItem,
  addService,
  updateService,
  deleteService,
  resetToDefaults
}: AdminPanelProps) {
  
  // Auth state
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active admin tab: 'profile' | 'services' | 'gallery' | 'settings'
  const [activeTab, setActiveTab] = useState<'profile' | 'services' | 'gallery' | 'settings'>('profile');

  // Service Form state
  const [serviceEditingId, setServiceEditingId] = useState<string | null>(null);
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceImage, setServiceImage] = useState('');
  const serviceFileRef = useRef<HTMLInputElement>(null);

  // Gallery Form state
  const [galleryEditingId, setGalleryEditingId] = useState<string | null>(null);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState<GalleryCategory>('bridal');
  const [galleryDesc, setGalleryDesc] = useState('');
  const [galleryPrice, setGalleryPrice] = useState('');
  const [galleryImage, setGalleryImage] = useState('');
  const galleryFileRef = useRef<HTMLInputElement>(null);

  // Profile Form states (mapped locally, then saved)
  const [profBusinessName, setProfBusinessName] = useState(profile.businessName);
  const [profArtistName, setProfArtistName] = useState(profile.artistName);
  const [profPhone, setProfPhone] = useState(profile.phone);
  const [profWhatsapp, setProfWhatsapp] = useState(profile.whatsapp);
  const [profInstagram, setProfInstagram] = useState(profile.instagram);
  const [profInstagramUrl, setProfInstagramUrl] = useState(profile.instagramUrl);
  const [profLocation, setProfLocation] = useState(profile.location);
  const [profExperience, setProfExperience] = useState(profile.experience);
  const [profBio, setProfBio] = useState(profile.bio);
  const [profCoverPhoto, setProfCoverPhoto] = useState(profile.coverPhoto);
  const coverFileRef = useRef<HTMLInputElement>(null);

  // Password alteration state
  const [newPass, setNewPass] = useState('');
  const [succMessage, setSuccMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkAdminPasscode(passcode)) {
      setIsAuthenticated(true);
      setAuthError('');
      setSuccMessage('Successfully unlocked admin dashboard!');
      setTimeout(() => setSuccMessage(''), 3000);
    } else {
      setAuthError('Incorrect Admin Passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
  };

  // Profile save helper
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      businessName: profBusinessName,
      artistName: profArtistName,
      phone: profPhone,
      whatsapp: profWhatsapp,
      instagram: profInstagram,
      instagramUrl: profInstagramUrl,
      location: profLocation,
      experience: profExperience,
      bio: profBio,
      coverPhoto: profCoverPhoto
    });
    setSuccMessage('Profile Information Saved successfully!');
    setTimeout(() => setSuccMessage(''), 3000);
  };

  // Convert files to Base64 easily for clientside uploads
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImageState: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageState(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Service form saving
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceTitle || !serviceDesc) {
      alert("Please fill out Title and Description.");
      return;
    }

    const payload = {
      title: serviceTitle,
      description: serviceDesc,
      startingPrice: servicePrice,
      imageUrl: serviceImage || 'https://images.unsplash.com/photo-1610444383437-020df1ae9d9b?auto=format&fit=crop&q=80&w=800'
    };

    if (serviceEditingId) {
      updateService(serviceEditingId, payload);
      setSuccMessage('Service Package updated successfully!');
    } else {
      addService(payload);
      setSuccMessage('New Service Package added successfully!');
    }

    // Reset Service form
    setServiceEditingId(null);
    setServiceTitle('');
    setServiceDesc('');
    setServicePrice('');
    setServiceImage('');
    if (serviceFileRef.current) serviceFileRef.current.value = '';
    setTimeout(() => setSuccMessage(''), 3000);
  };

  // Fill Service Form for editing
  const handleStartEditService = (srv: MehndiService) => {
    setServiceEditingId(srv.id);
    setServiceTitle(srv.title);
    setServiceDesc(srv.description);
    setServicePrice(srv.startingPrice || '');
    setServiceImage(srv.imageUrl);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleCancelEditService = () => {
    setServiceEditingId(null);
    setServiceTitle('');
    setServiceDesc('');
    setServicePrice('');
    setServiceImage('');
    if (serviceFileRef.current) serviceFileRef.current.value = '';
  };

  // Gallery form saving
  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle || !galleryImage) {
      alert("Please provide a Title and upload or enter an Image.");
      return;
    }

    const payload = {
      title: galleryTitle,
      category: galleryCategory,
      description: galleryDesc,
      price: galleryPrice,
      imageUrl: galleryImage
    };

    if (galleryEditingId) {
      editGalleryItem(galleryEditingId, payload);
      setSuccMessage('Gallery Masterpiece updated successfully!');
    } else {
      addGalleryItem(payload);
      setSuccMessage('New Photo added successfully to your Gallery!');
    }

    // Reset Gallery form
    setGalleryEditingId(null);
    setGalleryTitle('');
    setGalleryCategory('bridal');
    setGalleryDesc('');
    setGalleryPrice('');
    setGalleryImage('');
    if (galleryFileRef.current) galleryFileRef.current.value = '';
    setTimeout(() => setSuccMessage(''), 3000);
  };

  // Edit Gallery
  const handleStartEditGallery = (item: GalleryItem) => {
    setGalleryEditingId(item.id);
    setGalleryTitle(item.title);
    setGalleryCategory(item.category);
    setGalleryDesc(item.description || '');
    setGalleryPrice(item.price || '');
    setGalleryImage(item.imageUrl);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleCancelEditGallery = () => {
    setGalleryEditingId(null);
    setGalleryTitle('');
    setGalleryCategory('bridal');
    setGalleryDesc('');
    setGalleryPrice('');
    setGalleryImage('');
    if (galleryFileRef.current) galleryFileRef.current.value = '';
  };

  // Passcode revision saving
  const handleUpdatePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 4) {
      alert("Password must be at least 4 characters long.");
      return;
    }
    setAdminPasscode(newPass);
    setSuccMessage('Security Passcode updated successfully! Please keep this password safe.');
    setNewPass('');
    setTimeout(() => setSuccMessage(''), 4000);
  };

  const handleResetData = () => {
    if (confirm("Are you sure you want to reset everything back to Sandhya's original curated portfolio assets? Your uploaded photos and customizations will be erased.")) {
      resetToDefaults();
      // Reload states
      setSuccMessage('All settings have been successfully reset to factory defaults.');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  // LOGIN SCREEN (if not authenticated)
  if (!isAuthenticated) {
    return (
      <section className="py-16 md:py-24 bg-[#faf7f2] flex justify-center items-center min-h-[60vh] px-4">
        <div className="max-w-md w-full bg-[#f5efe4] rounded-3xl p-8 border-2 border-[#c5a059]/20 shadow-xl relative overflow-hidden">
          {/* Top colored edge */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#5d0e0e]"></div>
          
          <div className="text-center mb-6">
            <div className="mx-auto w-14 h-14 bg-[#5d0e0e] text-[#faf3df] rounded-full flex items-center justify-center mb-4 shadow-md">
              <Shield size={26} />
            </div>
            <h2 className="font-serif text-2xl font-black text-[#5d0e0e]">Sandhya's Workspace</h2>
            <p className="text-xs text-gray-550 font-sans mt-1">Authentication required to edit gallery, profile and services.</p>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 text-xs font-sans rounded-lg font-medium flex items-center gap-1">
              <AlertCircle size={14} />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-pass" className="block text-[10px] font-bold text-gray-770 uppercase tracking-widest mb-1.5 font-sans">Enter Security Passcode</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-450 pointer-events-none">
                  <Key size={16} />
                </span>
                <input
                  id="admin-pass"
                  type="password"
                  required
                  placeholder="••••••••••••••"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-900"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] hover:text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md active:scale-98 cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>

          {/* DEMO CRITICAL: Let the user know the default password so they can explore this amazing dashboard! */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <span className="text-[11px] bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-lg block font-sans">
              ℹ️ Standard Admin demonstration passcode:<br />
              <strong className="text-[#5d0e0e] font-bold text-xs">{DEFAULT_PASSCODE}</strong>
            </span>
          </div>

        </div>
      </section>
    );
  }

  // MAIN AUTHENTICATED DASHBOARD
  return (
    <section className="py-10 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-6 mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#5d0e0e]">Alankarini Control Center</h2>
            <p className="text-xs text-gray-650 font-sans mt-1 font-sans">Hello, Sandhya! Manage your live portfolio catalog, services lists, and bio.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="bg-gray-100 hover:bg-gray-250 text-gray-750 font-sans text-xs font-bold py-2 px-4 rounded-lg transition-colors border border-gray-300 cursor-pointer"
            >
              Lock Dashboard
            </button>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {succMessage && (
          <div className="mb-6 p-4 bg-[#efe1b4] text-[#5d0e0e] border border-[#c5a059]/30 rounded-xl flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold animate-bounce shadow-sm">
            <Check size={18} className="text-emerald-700 shrink-0" />
            <span>{succMessage}</span>
          </div>
        )}

        {/* Tabs Row */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto gap-2">
          {[
            { id: 'profile', label: '1. Profile Info & Cover' },
            { id: 'gallery', label: '2. Design Gallery' },
            { id: 'services', label: '3. Service Pricing' },
            { id: 'settings', label: '4. Passcode Security' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-t-lg font-sans text-xs font-bold uppercase tracking-wider border-t-2 transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#f5efe4] text-[#5d0e0e] border-[#5d0e0e] shadow-inner font-black'
                  : 'text-gray-550 hover:text-gray-900 border-transparent hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTROLLERS */}

        {/* TAB 1: PROFILE MANAGEMENT */}
        {activeTab === 'profile' && (
          <div className="bg-[#f5efe4]/60 rounded-3xl p-6 md:p-8 border border-[#c5a059]/15">
            <h3 className="text-xl font-serif font-bold text-[#5d0e0e] mb-4">Edit Profile Metadata</h3>
            
            <form onSubmit={handleSaveProfile} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Business Brand Name</label>
                  <input
                    type="text"
                    required
                    value={profBusinessName}
                    onChange={(e) => setProfBusinessName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Artist Head Name</label>
                  <input
                    type="text"
                    required
                    value={profArtistName}
                    onChange={(e) => setProfArtistName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Display Call Hotline</label>
                  <input
                    type="text"
                    required
                    value={profPhone}
                    onChange={(e) => setProfPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">WhatsApp Mobile Contact</label>
                  <input
                    type="text"
                    required
                    value={profWhatsapp}
                    onChange={(e) => setProfWhatsapp(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Experience Scale</label>
                  <input
                    type="text"
                    required
                    value={profExperience}
                    onChange={(e) => setProfExperience(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Instagram Display Tag (e.g. @alankarini_mehandi_art)</label>
                  <input
                    type="text"
                    required
                    value={profInstagram}
                    onChange={(e) => setProfInstagram(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Instagram Absolute Link URL</label>
                  <input
                    type="url"
                    required
                    value={profInstagramUrl}
                    onChange={(e) => setProfInstagramUrl(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Studio physical address / location</label>
                <input
                  type="text"
                  required
                  value={profLocation}
                  onChange={(e) => setProfLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-750 uppercase tracking-wider mb-1">Sandhya's About Biography</label>
                <textarea
                  rows={4}
                  required
                  value={profBio}
                  onChange={(e) => setProfBio(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                ></textarea>
              </div>

              {/* Cover Photo */}
              <div className="border-t border-[#efe1b4]/40 pt-6">
                <h4 className="font-serif font-bold text-[#5d0e0e] text-base mb-4">Hero Cover Photograph</h4>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-48 aspect-square rounded-2xl overflow-hidden border-2 border-[#c5a059]/35 shrink-0 bg-gray-100">
                    <img 
                      src={profCoverPhoto} 
                      alt="Current Cover preview" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Manual image URL</label>
                      <input
                        type="url"
                        value={profCoverPhoto}
                        onChange={(e) => setProfCoverPhoto(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Or choose custom file to upload directly *</label>
                      <input
                        type="file"
                        ref={coverFileRef}
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setProfCoverPhoto)}
                        className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#5d0e0e] file:text-[#faf3df] hover:file:bg-[#7c1818] file:cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] hover:text-white py-3.5 px-8 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                >
                  <Save size={16} />
                  Save Profile Settings
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 2: PORTFOLIO GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-10">
            {/* Form */}
            <div className="bg-[#f5efe4]/60 rounded-3xl p-6 md:p-8 border border-[#c5a059]/15">
              <h3 className="text-xl font-serif font-bold text-[#5d0e0e] mb-4">
                {galleryEditingId ? 'Edit Gallery Photo' : 'Add Design to Gallery'}
              </h3>
              
              <form onSubmit={handleSaveGallery} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Design Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Peacock Feet art"
                      value={galleryTitle}
                      onChange={(e) => setGalleryTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Design Category *</label>
                    <select
                      value={galleryCategory}
                      onChange={(e) => setGalleryCategory(e.target.value as GalleryCategory)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-850 font-semibold"
                    >
                      <option value="bridal">Bridal</option>
                      <option value="portrait">Portrait</option>
                      <option value="arabic">Arabic</option>
                      <option value="indo-arabic">Indo-Arabic</option>
                      <option value="festival">Festival</option>
                      <option value="customized">Customized</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Design Price (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹2,500"
                      value={galleryPrice}
                      onChange={(e) => setGalleryPrice(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Short Caption/Description</label>
                  <textarea
                    rows={2}
                    placeholder="Brief description about flow, elements, staining hours..."
                    value={galleryDesc}
                    onChange={(e) => setGalleryDesc(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                  <div className="md:col-span-8 space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Direct Image URL</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={galleryImage}
                        onChange={(e) => setGalleryImage(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Or choose file from device to upload directly *</label>
                      <input
                        type="file"
                        ref={galleryFileRef}
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setGalleryImage)}
                        className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#5d0e0e] file:text-[#faf3df] hover:file:bg-[#7c1818] file:cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  {/* Image preview box */}
                  <div className="md:col-span-4 flex justify-center">
                    <div className="w-28 aspect-square rounded-xl overflow-hidden border border-gray-300 bg-gray-50 flex items-center justify-center relative">
                      {galleryImage ? (
                        <img 
                          src={galleryImage} 
                          alt="Visual upload preview" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-[10px] text-gray-400 font-sans text-center px-2">No photo uploaded</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-[#efe1b4]/40">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] hover:text-white py-2.5 px-6 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                    {galleryEditingId ? 'Save Gallery Changes' : 'Publish Design to Portfolio'}
                  </button>
                  {galleryEditingId && (
                    <button
                      type="button"
                      onClick={handleCancelEditGallery}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-sans text-xs py-2.5 px-4 rounded-lg border border-gray-300 transition-colors"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

              </form>
            </div>

            {/* List Table */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-[#f5efe4]">
                <h3 className="font-serif text-lg font-bold text-[#5d0e0e]">Currently Published Photos ({gallery.length})</h3>
              </div>
              <div className="divide-y divide-gray-200 overflow-y-auto max-h-[120vh]">
                {gallery.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 font-sans">No gallery items loaded.</div>
                ) : (
                  gallery.map((item, index) => (
                    <div key={item.id || index} className="p-4 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap hover:bg-[#fcfbf7]">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-gray-50">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] font-sans">
                            {item.category} {item.price && `• ${item.price}`}
                          </span>
                          <h4 className="font-serif font-bold text-[#5d0e0e] text-sm leading-tight">{item.title}</h4>
                          <p className="text-xs text-gray-500 font-sans line-clamp-1">{item.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStartEditGallery(item)}
                          className="p-2 hover:bg-[#efe1b4]/40 text-[#5d0e0e] rounded-lg border border-gray-200 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Do you want to permanently delete "${item.title}" from your public gallery?`)) {
                              deleteGalleryItem(item.id);
                              setSuccMessage('Item deleted successfully!');
                              setTimeout(() => setSuccMessage(''), 2500);
                            }
                          }}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg border border-gray-200 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: SERVICES MANAGEMENT */}
        {activeTab === 'services' && (
          <div className="space-y-10">
            {/* Form */}
            <div className="bg-[#f5efe4]/60 rounded-3xl p-6 md:p-8 border border-[#c5a059]/15">
              <h3 className="text-xl font-serif font-bold text-[#5d0e0e] mb-4">
                {serviceEditingId ? 'Edit Service Details' : 'Add New Service Package'}
              </h3>
              
              <form onSubmit={handleSaveService} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Service Cover Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Rajasthani bridal"
                      value={serviceTitle}
                      onChange={(e) => setServiceTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Starting Price (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Starting from ₹4,500"
                      value={servicePrice}
                      onChange={(e) => setServicePrice(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Package description / checklist *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Enter detailed checklist..."
                    value={serviceDesc}
                    onChange={(e) => setServiceDesc(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                  <div className="md:col-span-8 space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Service Cover Photo Image URL</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={serviceImage}
                        onChange={(e) => setServiceImage(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Or choose custom file to upload directly *</label>
                      <input
                        type="file"
                        ref={serviceFileRef}
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setServiceImage)}
                        className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#5d0e0e] file:text-[#faf3df] hover:file:bg-[#7c1818] file:cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  {/* Preview box */}
                  <div className="md:col-span-4 flex justify-center">
                    <div className="w-28 aspect-square rounded-xl overflow-hidden border border-gray-300 bg-gray-50 flex items-center justify-center relative">
                      {serviceImage ? (
                        <img 
                          src={serviceImage} 
                          alt="Visual upload preview" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-[10px] text-gray-400 font-sans text-center px-2">No cover loaded</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-[#efe1b4]/40">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] hover:text-white py-2.5 px-6 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                    {serviceEditingId ? 'Save Package Changes' : 'Publish Service Package'}
                  </button>
                  {serviceEditingId && (
                    <button
                      type="button"
                      onClick={handleCancelEditService}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-sans text-xs py-2.5 px-4 rounded-lg border border-gray-300 transition-all cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

              </form>
            </div>

            {/* List table */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-[#f5efe4]">
                <h3 className="font-serif text-lg font-bold text-[#5d0e0e]">Active Service Listing Cards ({services.length})</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {services.map((item, index) => (
                  <div key={item.id || index} className="p-4 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-gray-50">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        {item.startingPrice && (
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] font-sans">
                            {item.startingPrice}
                          </span>
                        )}
                        <h4 className="font-serif font-bold text-[#5d0e0e] text-sm leading-tight">{item.title}</h4>
                        <p className="text-xs text-gray-500 font-sans line-clamp-1 mt-0.5">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStartEditService(item)}
                        className="p-2 hover:bg-[#efe1b4]/40 text-[#5d0e0e] rounded-lg border border-gray-200 transition-colors cursor-pointer"
                        title="Edit Details"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Do you want to permanently delete "${item.title}" from your services catalog?`)) {
                            deleteService(item.id);
                            setSuccMessage('Service deleted successfully!');
                            setTimeout(() => setSuccMessage(''), 2500);
                          }
                        }}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg border border-gray-200 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: SECURITY CONTROLS */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Password Update */}
            <div className="bg-[#f5efe4]/60 rounded-3xl p-6 md:p-8 border border-[#c5a059]/15">
              <h3 className="text-xl font-serif font-bold text-[#5d0e0e] mb-4">Update Workspace Passcode</h3>
              
              <form onSubmit={handleUpdatePasscode} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Type New Administrative Passcode *</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter at least 4 chars"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                  />
                  <p className="text-xs text-gray-500 mt-1 font-sans">Changing this saves immediately to this browser's secure security storage.</p>
                </div>

                <button
                  type="submit"
                  className="bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] hover:text-white py-2.5 px-6 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow"
                >
                  Confirm New Passcode
                </button>
              </form>
            </div>

            {/* factory state reset */}
            <div className="bg-red-50/50 rounded-3xl p-6 md:p-8 border border-red-200 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold text-red-800 mb-3">Restore Master Defaults</h3>
                <p className="text-xs text-gray-600 font-sans leading-relaxed mb-6">
                  Warning: Triggering the default factory reset instantly deletes all your local modifications to Sandhya's phone numbers, bio description paragraph, added custom bridal photographs or services. Ideal for cleaning up draft mock entries.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetData}
                className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow cursor-pointer"
              >
                <RotateCcw size={14} />
                Restore Default Seed Catalog
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
