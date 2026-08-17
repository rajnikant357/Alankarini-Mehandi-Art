import React, { useState, useRef, useEffect } from 'react';
import { Shield, Mail, Lock, Check, Plus, Trash2, Edit2, RotateCcw, Save, Smartphone, MapPin, Instagram, Trash, Image, AlertCircle, FileText, LogOut, KeyRound, Send, CheckCircle2, Crop } from 'lucide-react';
import { ProfileInfo, GalleryItem, MehndiService, GalleryCategory } from '../types';
import { supabase } from '../lib/supabase';
import { extractRupeeAmount } from '../lib/format';
import type { Session } from '@supabase/supabase-js';
import { ImageCropperModal, AspectRatioType } from './ImageCropperModal';

interface AdminPanelProps {
  profile: ProfileInfo;
  services: MehndiService[];
  gallery: GalleryItem[];
  updateProfile: (fields: Partial<ProfileInfo>) => Promise<unknown>;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<unknown>;
  editGalleryItem: (id: string, fields: Partial<GalleryItem>) => Promise<unknown>;
  deleteGalleryItem: (id: string) => Promise<unknown>;
  addService: (service: Omit<MehndiService, 'id'>) => Promise<unknown>;
  updateService: (id: string, fields: Partial<MehndiService>) => Promise<unknown>;
  deleteService: (id: string) => Promise<unknown>;
  resetToDefaults: () => Promise<unknown>;
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
  // Supabase auth state
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Password reset state
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetStatus, setResetStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isForgotMode, setIsForgotMode] = useState(false);

  // Image Cropper Modal State
  const [cropperState, setCropperState] = useState<{
    isOpen: boolean;
    rawImageSrc: string;
    targetAspect: AspectRatioType;
    onComplete: (croppedDataUrl: string) => void;
    title?: string;
  }>({
    isOpen: false,
    rawImageSrc: '',
    targetAspect: 'square',
    onComplete: () => {},
  });

  // Listen for Supabase auth state changes (session persistence)
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setAuthLoading(false);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAuthenticated = !!session;

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

  const [profAboutPhoto, setProfAboutPhoto] = useState(profile.aboutPhoto || profile.coverPhoto);
  const aboutFileRef = useRef<HTMLInputElement>(null);

  const [profGmbLink, setProfGmbLink] = useState(profile.gmbLink || '');
  const [profGmbReviewLink, setProfGmbReviewLink] = useState(profile.gmbReviewLink || '');
  const [profGmbReviewsCount, setProfGmbReviewsCount] = useState(profile.gmbReviewsCount || '');
  const [profGmbRating, setProfGmbRating] = useState(profile.gmbRating || '');

  useEffect(() => {
    setProfBusinessName(profile.businessName);
    setProfArtistName(profile.artistName);
    setProfPhone(profile.phone);
    setProfWhatsapp(profile.whatsapp);
    setProfInstagram(profile.instagram);
    setProfInstagramUrl(profile.instagramUrl);
    setProfLocation(profile.location);
    setProfExperience(profile.experience);
    setProfBio(profile.bio);
    setProfCoverPhoto(profile.coverPhoto);
    setProfAboutPhoto(profile.aboutPhoto || profile.coverPhoto);
    setProfGmbLink(profile.gmbLink || '');
    setProfGmbReviewLink(profile.gmbReviewLink || '');
    setProfGmbReviewsCount(profile.gmbReviewsCount || '');
    setProfGmbRating(profile.gmbRating || '');
  }, [profile]);

  const [succMessage, setSuccMessage] = useState('');

  // Security Rate Limiter (5 failed attempts = 5 min lockout)
  const MAX_FAILED_ATTEMPTS = 5;
  const LOCKOUT_MS = 5 * 60 * 1000;

  const [failedAttempts, setFailedAttempts] = useState<number>(() => {
    const saved = sessionStorage.getItem('admin_failed_attempts');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [lockoutUntil, setLockoutUntil] = useState<number | null>(() => {
    const saved = sessionStorage.getItem('admin_lockout_until');
    if (!saved) return null;
    const lockTime = parseInt(saved, 10);
    return lockTime > Date.now() ? lockTime : null;
  });

  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);

  useEffect(() => {
    if (!lockoutUntil) {
      setSecondsRemaining(0);
      return;
    }

    const updateTimer = () => {
      const remaining = Math.max(0, Math.ceil((lockoutUntil - Date.now()) / 1000));
      setSecondsRemaining(remaining);
      if (remaining === 0) {
        setLockoutUntil(null);
        setFailedAttempts(0);
        sessionStorage.removeItem('admin_failed_attempts');
        sessionStorage.removeItem('admin_lockout_until');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutUntil && Date.now() < lockoutUntil) return;

    setLoginLoading(true);
    setAuthError('');

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    setLoginLoading(false);

    if (error) {
      const nextAttempts = failedAttempts + 1;
      setFailedAttempts(nextAttempts);
      sessionStorage.setItem('admin_failed_attempts', nextAttempts.toString());

      if (nextAttempts >= MAX_FAILED_ATTEMPTS) {
        const lockUntil = Date.now() + LOCKOUT_MS;
        setLockoutUntil(lockUntil);
        sessionStorage.setItem('admin_lockout_until', lockUntil.toString());
        setAuthError('Too many failed login attempts. Security lockout engaged for 5 minutes.');
      } else {
        setAuthError(`${error.message} (${MAX_FAILED_ATTEMPTS - nextAttempts} attempts remaining)`);
      }
    } else {
      setFailedAttempts(0);
      setLockoutUntil(null);
      sessionStorage.removeItem('admin_failed_attempts');
      sessionStorage.removeItem('admin_lockout_until');
      setSuccMessage('Successfully unlocked admin dashboard!');
      setTimeout(() => setSuccMessage(''), 3000);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setLoginEmail('');
    setLoginPassword('');
  };

  // Profile save helper
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        businessName: profBusinessName,
        artistName: profArtistName,
        phone: profPhone,
        whatsapp: profWhatsapp,
        instagram: profInstagram,
        instagramUrl: profInstagramUrl,
        location: profLocation,
        experience: profExperience,
        bio: profBio,
        coverPhoto: profCoverPhoto,
        aboutPhoto: profAboutPhoto,
        gmbLink: profGmbLink,
        gmbReviewLink: profGmbReviewLink,
        gmbReviewsCount: profGmbReviewsCount,
        gmbRating: profGmbRating,
      });
      setSuccMessage('Profile Information Saved successfully!');
      setTimeout(() => setSuccMessage(''), 3000);
    } catch (error) {
      alert('Profile could not be saved to the database.');
      console.error(error);
    }
  };

  // File & Crop Handlers
  const handleFileSelectForCropping = (
    e: React.ChangeEvent<HTMLInputElement>,
    targetAspect: AspectRatioType,
    onComplete: (croppedDataUrl: string) => void,
    title?: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCropperState({
          isOpen: true,
          rawImageSrc: reader.result as string,
          targetAspect,
          onComplete,
          title,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const openCropperForUrl = (
    url: string,
    targetAspect: AspectRatioType,
    onComplete: (croppedDataUrl: string) => void,
    title?: string
  ) => {
    if (!url) {
      alert('Please enter or select an image first.');
      return;
    }
    setCropperState({
      isOpen: true,
      rawImageSrc: url,
      targetAspect,
      onComplete,
      title,
    });
  };

  // Service form saving
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceTitle || !serviceDesc) {
      alert("Please fill out Title and Description.");
      return;
    }

    const payload = {
      title: serviceTitle,
      description: serviceDesc,
      startingPrice: extractRupeeAmount(servicePrice),
      imageUrl: serviceImage || 'https://images.unsplash.com/photo-1610444383437-020df1ae9d9b?auto=format&fit=crop&q=80&w=800'
    };

    try {
      if (serviceEditingId) {
        await updateService(serviceEditingId, payload);
        setSuccMessage('Service Package updated successfully!');
      } else {
        await addService(payload);
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
    } catch (error) {
      alert('Service could not be published to the database.');
      console.error(error);
    }
  };

  // Fill Service Form for editing
  const handleStartEditService = (srv: MehndiService) => {
    setServiceEditingId(srv.id);
    setServiceTitle(srv.title);
    setServiceDesc(srv.description);
    setServicePrice(extractRupeeAmount(srv.startingPrice));
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
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle || !galleryImage) {
      alert("Please provide a Title and upload or enter an Image.");
      return;
    }

    const payload = {
      title: galleryTitle,
      category: galleryCategory,
      description: galleryDesc,
      price: extractRupeeAmount(galleryPrice),
      imageUrl: galleryImage
    };

    try {
      if (galleryEditingId) {
        await editGalleryItem(galleryEditingId, payload);
        setSuccMessage('Gallery Masterpiece updated successfully!');
      } else {
        await addGalleryItem(payload);
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
    } catch (error) {
      alert('Gallery item could not be published to the database.');
      console.error(error);
    }
  };

  // Edit Gallery
  const handleStartEditGallery = (item: GalleryItem) => {
    setGalleryEditingId(item.id);
    setGalleryTitle(item.title);
    setGalleryCategory(item.category);
    setGalleryDesc(item.description || '');
    setGalleryPrice(extractRupeeAmount(item.price));
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

  // Passcode revision is no longer needed — auth is via Supabase

  const handleSendPasswordReset = async (e: React.FormEvent, targetEmailInput?: string) => {
    e.preventDefault();
    const targetEmail = targetEmailInput || resetEmail || loginEmail || session?.user?.email;
    if (!targetEmail) {
      setResetStatus({ type: 'error', message: 'Please enter your admin email address.' });
      return;
    }

    setResetLoading(true);
    setResetStatus(null);

    const { error } = await supabase.auth.resetPasswordForEmail(targetEmail, {
      redirectTo: `${window.location.origin}/#/admin`,
    });

    setResetLoading(false);

    if (error) {
      setResetStatus({ type: 'error', message: error.message });
    } else {
      setResetStatus({
        type: 'success',
        message: `Password reset email sent to ${targetEmail}! Please check your inbox for the reset link.`
      });
    }
  };

  // LOADING STATE while checking Supabase session
  if (authLoading) {
    return (
      <section className="py-16 md:py-24 bg-[#faf7f2] flex justify-center items-center min-h-[60vh] px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#5d0e0e] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-[#5d0e0e] font-sans font-medium">Verifying authentication...</p>
        </div>
      </section>
    );
  }

  // LOGIN SCREEN (if not authenticated via Supabase)
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
            <p className="text-xs text-gray-550 font-sans mt-1">Admin authentication required to edit gallery, profile and services.</p>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 text-xs font-sans rounded-lg font-medium flex items-center gap-1">
              <AlertCircle size={14} />
              <span>{authError}</span>
            </div>
          )}

          {secondsRemaining > 0 && (
            <div className="mb-4 p-3.5 bg-[#5d0e0e]/10 border border-[#5d0e0e]/30 rounded-xl text-xs text-[#5d0e0e] font-sans font-semibold flex items-center gap-2 animate-pulse">
              <Lock size={16} className="shrink-0 text-[#5d0e0e]" />
              <span>Security Lockout Engaged: Try again in {Math.floor(secondsRemaining / 60)}m {secondsRemaining % 60}s</span>
            </div>
          )}

          {isForgotMode ? (
            <form onSubmit={(e) => handleSendPasswordReset(e, loginEmail)} className="space-y-4">
              <div className="text-center mb-2">
                <h3 className="font-serif text-lg font-bold text-[#5d0e0e]">Reset Password</h3>
                <p className="text-xs text-gray-500 font-sans mt-0.5">Enter your email to receive a password reset link.</p>
              </div>

              {resetStatus && (
                <div className={`p-3 rounded-xl text-xs font-sans font-medium flex items-center gap-2 ${
                  resetStatus.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {resetStatus.type === 'success' ? <CheckCircle2 size={16} className="text-emerald-600 shrink-0" /> : <AlertCircle size={16} className="text-red-600 shrink-0" />}
                  <span>{resetStatus.message}</span>
                </div>
              )}

              <div>
                <label htmlFor="reset-admin-email" className="block text-[10px] font-bold text-gray-770 uppercase tracking-widest mb-1.5 font-sans">Admin Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-450 pointer-events-none">
                    <Mail size={16} />
                  </span>
                  <input
                    id="reset-admin-email"
                    type="email"
                    required
                    placeholder="admin@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] hover:text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md active:scale-98 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={14} />
                {resetLoading ? 'Sending Reset Email...' : 'Send Reset Link'}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setIsForgotMode(false); setResetStatus(null); }}
                  className="text-xs text-[#5d0e0e] hover:underline font-sans font-medium cursor-pointer"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="admin-email" className="block text-[10px] font-bold text-gray-770 uppercase tracking-widest mb-1.5 font-sans">Admin Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-450 pointer-events-none">
                    <Mail size={16} />
                  </span>
                  <input
                    id="admin-email"
                    type="email"
                    required
                    disabled={secondsRemaining > 0}
                    placeholder="admin@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="admin-password" className="block text-[10px] font-bold text-gray-770 uppercase tracking-widest font-sans">Password</label>
                  <button
                    type="button"
                    onClick={() => { setIsForgotMode(true); setResetStatus(null); }}
                    className="text-[10px] text-[#5d0e0e] font-semibold hover:underline font-sans cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-450 pointer-events-none">
                    <Lock size={16} />
                  </span>
                  <input
                    id="admin-password"
                    type="password"
                    required
                    disabled={secondsRemaining > 0}
                    placeholder="••••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loginLoading || secondsRemaining > 0}
                className="w-full inline-flex items-center justify-center bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] hover:text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md active:scale-98 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loginLoading ? 'Signing in...' : secondsRemaining > 0 ? `Locked (${secondsRemaining}s)` : 'Unlock Dashboard'}
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-[11px] text-gray-500 font-sans">
              🔒 Access is restricted to the site owner only.
            </p>
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
            <span className="text-xs text-gray-500 font-sans hidden sm:inline">{session?.user?.email}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-250 text-gray-750 font-sans text-xs font-bold py-2 px-4 rounded-lg transition-colors border border-gray-300 cursor-pointer"
            >
              <LogOut size={13} />
              Sign Out
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
            { id: 'settings', label: '4. Data & Security' }
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#c5a059]/20">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Google Maps Profile URL (CID/Public Link)</label>
                  <input
                    type="url"
                    required
                    value={profGmbLink}
                    onChange={(e) => setProfGmbLink(e.target.value)}
                    placeholder="https://www.google.com/maps?cid=..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                  />
                  <p className="text-[10px] text-gray-500 mt-1 font-sans">Used to redirect clients to view your overall maps business listing.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Google Write-Review URL (FID/Direct Prompt)</label>
                  <input
                    type="url"
                    required
                    value={profGmbReviewLink}
                    onChange={(e) => setProfGmbReviewLink(e.target.value)}
                    placeholder="https://search.google.com/local/writereview?fid=..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                  />
                  <p className="text-[10px] text-gray-500 mt-1 font-sans">Used when clients click "Write a Review" to launch the direct rating pop-up.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Live Google Reviews Count</label>
                  <input
                    type="text"
                    required
                    value={profGmbReviewsCount}
                    onChange={(e) => setProfGmbReviewsCount(e.target.value)}
                    placeholder="e.g. 84"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                  />
                  <p className="text-[10px] text-gray-500 mt-1 font-sans">Displays on the website as the total count (e.g. 84+ reviews).</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Live Google Rating Score</label>
                  <input
                    type="text"
                    required
                    value={profGmbRating}
                    onChange={(e) => setProfGmbRating(e.target.value)}
                    placeholder="e.g. 5.0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                  />
                  <p className="text-[10px] text-gray-500 mt-1 font-sans">Displays the overall stars score (e.g. 4.9 or 5.0).</p>
                </div>
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

              {/* 1. Hero Section Photo */}
              <div className="border-t border-[#efe1b4]/40 pt-6">
                <h4 className="font-serif font-bold text-[#5d0e0e] text-base mb-1">1. Hero Section Banner Photograph</h4>
                <p className="text-xs text-gray-600 mb-4 font-sans">
                  This image is displayed on the main homepage banner at the top of the website.
                </p>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-48 aspect-square rounded-2xl overflow-hidden border-2 border-[#c5a059]/35 shrink-0 bg-gray-100">
                    <img 
                      src={profCoverPhoto} 
                      alt="Hero Banner preview" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Hero Image URL</label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={profCoverPhoto}
                          onChange={(e) => setProfCoverPhoto(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                        />
                        {profCoverPhoto && (
                          <button
                            type="button"
                            onClick={() => openCropperForUrl(profCoverPhoto, 'portrait', setProfCoverPhoto, 'Crop Hero Banner Photo (4:5 Card Shape)')}
                            className="inline-flex items-center gap-1 bg-[#efe1b4]/60 hover:bg-[#efe1b4] text-[#5d0e0e] px-3 py-2 rounded-xl text-xs font-bold shrink-0 border border-[#c5a059]/30 transition-colors cursor-pointer"
                            title="Crop & Fit Photo"
                          >
                            <Crop size={14} />
                            <span>Crop / Fit</span>
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Or choose custom file to upload & crop for Hero *</label>
                      <input
                        type="file"
                        ref={coverFileRef}
                        accept="image/*"
                        onChange={(e) => handleFileSelectForCropping(e, 'portrait', setProfCoverPhoto, 'Crop Hero Banner Photo (4:5 Card Shape)')}
                        className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#5d0e0e] file:text-[#faf3df] hover:file:bg-[#7c1818] file:cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. About Sandhya Photo */}
              <div className="border-t border-[#efe1b4]/40 pt-6">
                <h4 className="font-serif font-bold text-[#5d0e0e] text-base mb-1">2. About Sandhya Portrait Photograph</h4>
                <p className="text-xs text-gray-600 mb-4 font-sans">
                  This portrait image is displayed at the top of the <strong>About Us</strong> page ("Meet Artist Sandhya").
                </p>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-48 aspect-square rounded-2xl overflow-hidden border-2 border-[#c5a059]/35 shrink-0 bg-gray-100">
                    <img 
                      src={profAboutPhoto} 
                      alt="About Sandhya portrait preview" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">About Image URL</label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={profAboutPhoto}
                          onChange={(e) => setProfAboutPhoto(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                        />
                        {profAboutPhoto && (
                          <button
                            type="button"
                            onClick={() => openCropperForUrl(profAboutPhoto, 'portrait', setProfAboutPhoto, 'Crop About Sandhya Photo (4:5 Card Shape)')}
                            className="inline-flex items-center gap-1 bg-[#efe1b4]/60 hover:bg-[#efe1b4] text-[#5d0e0e] px-3 py-2 rounded-xl text-xs font-bold shrink-0 border border-[#c5a059]/30 transition-colors cursor-pointer"
                            title="Crop & Fit Photo"
                          >
                            <Crop size={14} />
                            <span>Crop / Fit</span>
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Or choose custom file to upload & crop for About Sandhya *</label>
                      <input
                        type="file"
                        ref={aboutFileRef}
                        accept="image/*"
                        onChange={(e) => handleFileSelectForCropping(e, 'portrait', setProfAboutPhoto, 'Crop About Sandhya Photo (4:5 Card Shape)')}
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
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://..."
                          value={galleryImage}
                          onChange={(e) => setGalleryImage(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                        />
                        {galleryImage && (
                          <button
                            type="button"
                            onClick={() => openCropperForUrl(galleryImage, 'square', setGalleryImage, 'Crop Gallery Item Photo (1:1 Square Card Shape)')}
                            className="inline-flex items-center gap-1 bg-[#efe1b4]/60 hover:bg-[#efe1b4] text-[#5d0e0e] px-3 py-2 rounded-xl text-xs font-bold shrink-0 border border-[#c5a059]/30 transition-colors cursor-pointer"
                            title="Crop & Fit Photo"
                          >
                            <Crop size={14} />
                            <span>Crop / Fit</span>
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Or choose file from device to upload & crop *</label>
                      <input
                        type="file"
                        ref={galleryFileRef}
                        accept="image/*"
                        onChange={(e) => handleFileSelectForCropping(e, 'square', setGalleryImage, 'Crop Gallery Item Photo (1:1 Square Card Shape)')}
                        className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#5d0e0e] file:text-[#faf3df] hover:file:bg-[#7c1818] file:cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  {/* Image preview box */}
                  <div className="md:col-span-4 flex flex-col items-center gap-2">
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
                    {galleryImage && (
                      <button
                        type="button"
                        onClick={() => openCropperForUrl(galleryImage, 'square', setGalleryImage, 'Crop Gallery Item Photo (1:1 Square Card Shape)')}
                        className="text-[11px] font-bold text-[#5d0e0e] hover:underline flex items-center gap-1 cursor-pointer font-sans"
                      >
                        <Crop size={12} /> Adjust Crop / Fit
                      </button>
                    )}
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
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://..."
                          value={serviceImage}
                          onChange={(e) => setServiceImage(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                        />
                        {serviceImage && (
                          <button
                            type="button"
                            onClick={() => openCropperForUrl(serviceImage, 'service', setServiceImage, 'Crop Service Package Photo (4:3 Card Shape)')}
                            className="inline-flex items-center gap-1 bg-[#efe1b4]/60 hover:bg-[#efe1b4] text-[#5d0e0e] px-3 py-2 rounded-xl text-xs font-bold shrink-0 border border-[#c5a059]/30 transition-colors cursor-pointer"
                            title="Crop & Fit Photo"
                          >
                            <Crop size={14} />
                            <span>Crop / Fit</span>
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Or choose custom file to upload & crop *</label>
                      <input
                        type="file"
                        ref={serviceFileRef}
                        accept="image/*"
                        onChange={(e) => handleFileSelectForCropping(e, 'service', setServiceImage, 'Crop Service Package Photo (4:3 Card Shape)')}
                        className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#5d0e0e] file:text-[#faf3df] hover:file:bg-[#7c1818] file:cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  {/* Preview box */}
                  <div className="md:col-span-4 flex flex-col items-center gap-2">
                    <div className="w-28 aspect-square rounded-xl overflow-hidden border border-gray-300 bg-gray-50 flex items-center justify-center relative">
                      {serviceImage ? (
                        <img 
                          src={serviceImage} 
                          alt="Visual upload preview" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-[10px] text-gray-400 font-sans text-center px-2">No photo uploaded</span>
                      )}
                    </div>
                    {serviceImage && (
                      <button
                        type="button"
                        onClick={() => openCropperForUrl(serviceImage, 'service', setServiceImage, 'Crop Service Package Photo (4:3 Card Shape)')}
                        className="text-[11px] font-bold text-[#5d0e0e] hover:underline flex items-center gap-1 cursor-pointer font-sans"
                      >
                        <Crop size={12} /> Adjust Crop / Fit
                      </button>
                    )}
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

        {/* TAB 4: DATA & SECURITY CONTROLS */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Auth info */}
            <div className="bg-[#f5efe4]/60 rounded-3xl p-6 md:p-8 border border-[#c5a059]/15">
              <h3 className="text-xl font-serif font-bold text-[#5d0e0e] mb-4">Authentication Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-[#c5a059]" />
                  <span className="text-sm text-gray-700 font-sans">Signed in as: <strong className="text-[#5d0e0e]">{session?.user?.email}</strong></span>
                </div>
                <p className="text-xs text-gray-500 font-sans leading-relaxed">
                  Authentication is managed via Supabase. To change your password or email, visit the Supabase dashboard.
                </p>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors border border-gray-300 cursor-pointer"
                >
                  <LogOut size={13} />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Reset Password Card */}
            <div className="bg-[#f5efe4]/60 rounded-3xl p-6 md:p-8 border border-[#c5a059]/15 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <KeyRound size={20} className="text-[#5d0e0e]" />
                  <h3 className="text-xl font-serif font-bold text-[#5d0e0e]">Reset Admin Password</h3>
                </div>
                <p className="text-xs text-gray-600 font-sans leading-relaxed mb-4">
                  Send a secure password reset link via Supabase Authentication to update your admin credentials.
                </p>

                {resetStatus && (
                  <div className={`mb-4 p-3 rounded-xl text-xs font-sans font-medium flex items-center gap-2 ${
                    resetStatus.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {resetStatus.type === 'success' ? <CheckCircle2 size={16} className="text-emerald-600 shrink-0" /> : <AlertCircle size={16} className="text-red-600 shrink-0" />}
                    <span>{resetStatus.message}</span>
                  </div>
                )}

                <form onSubmit={(e) => handleSendPasswordReset(e, resetEmail || session?.user?.email)} className="space-y-4">
                  <div>
                    <label htmlFor="reset-email-input" className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1.5 font-sans">
                      Admin Account Email
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 pointer-events-none">
                        <Mail size={16} />
                      </span>
                      <input
                        id="reset-email-input"
                        type="email"
                        required
                        placeholder="admin@example.com"
                        value={resetEmail || session?.user?.email || ''}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-900"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] hover:text-white py-3 px-6 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send size={14} />
                    {resetLoading ? 'Sending Reset Link...' : 'Send Password Reset Email'}
                  </button>
                </form>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Image Cropper Modal */}
      {cropperState.isOpen && (
        <ImageCropperModal
          imageSrc={cropperState.rawImageSrc}
          targetAspect={cropperState.targetAspect}
          title={cropperState.title}
          onCropComplete={(croppedUrl) => {
            cropperState.onComplete(croppedUrl);
            setCropperState((prev) => ({ ...prev, isOpen: false }));
          }}
          onCancel={() => setCropperState((prev) => ({ ...prev, isOpen: false }))}
        />
      )}
    </section>
  );
}
