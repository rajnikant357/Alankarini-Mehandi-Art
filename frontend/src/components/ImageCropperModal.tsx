import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, Check, Maximize2, Move, Layers, Palette, RefreshCw, Crop } from 'lucide-react';

export type AspectRatioType = 'square' | 'service' | 'portrait' | 'wide';
export type FitModeType = 'cover' | 'contain' | 'blur';

interface ImageCropperModalProps {
  imageSrc: string;
  targetAspect?: AspectRatioType;
  title?: string;
  onCropComplete: (croppedDataUrl: string) => void;
  onCancel: () => void;
}

export function ImageCropperModal({
  imageSrc,
  targetAspect = 'square',
  title = 'Crop & Fit Image for Website',
  onCropComplete,
  onCancel,
}: ImageCropperModalProps) {
  const [aspect, setAspect] = useState<AspectRatioType>(targetAspect);
  const [fitMode, setFitMode] = useState<FitModeType>('cover');
  const [zoom, setZoom] = useState<number>(1);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);
  const [bgColor, setBgColor] = useState<string>('#faf7f2');
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Aspect ratio dimensions mapping
  const getAspectDimensions = useCallback((aspectType: AspectRatioType) => {
    switch (aspectType) {
      case 'square':
        return { width: 800, height: 800, ratio: '1:1 (Gallery Card)' };
      case 'service':
        return { width: 800, height: 600, ratio: '4:3 (Service Card)' };
      case 'portrait':
        return { width: 800, height: 1000, ratio: '4:5 (Cover Photo)' };
      case 'wide':
        return { width: 960, height: 540, ratio: '16:9 (Banner)' };
      default:
        return { width: 800, height: 800, ratio: '1:1 (Square)' };
    }
  }, []);

  // Reset controls to defaults
  const handleReset = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
    setRotation(0);
    setFitMode('cover');
  };

  // Render crop preview onto canvas
  const renderCanvas = useCallback(() => {
    const img = imgRef.current;
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const { width: targetW, height: targetH } = getAspectDimensions(aspect);

    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, targetW, targetH);

    // Render background depending on fitMode
    if (fitMode === 'contain') {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, targetW, targetH);
    } else if (fitMode === 'blur') {
      ctx.save();
      ctx.filter = 'blur(20px) brightness(0.8)';
      const scaleBg = Math.max(targetW / img.naturalWidth, targetH / img.naturalHeight);
      const bgW = img.naturalWidth * scaleBg;
      const bgH = img.naturalHeight * scaleBg;
      ctx.drawImage(img, (targetW - bgW) / 2, (targetH - bgH) / 2, bgW, bgH);
      ctx.restore();
    }

    // Prepare transformations for image
    ctx.save();
    ctx.translate(targetW / 2 + panX, targetH / 2 + panY);
    ctx.rotate((rotation * Math.PI) / 180);

    // Calculate base scaling according to fitMode
    let baseScale = 1;
    const isRotated90 = rotation % 180 !== 0;
    const effectiveImgW = isRotated90 ? img.naturalHeight : img.naturalWidth;
    const effectiveImgH = isRotated90 ? img.naturalWidth : img.naturalHeight;

    if (fitMode === 'cover') {
      baseScale = Math.max(targetW / effectiveImgW, targetH / effectiveImgH);
    } else {
      // contain or blur
      baseScale = Math.min(targetW / effectiveImgW, targetH / effectiveImgH);
    }

    const finalScale = baseScale * zoom;
    const drawW = img.naturalWidth * finalScale;
    const drawH = img.naturalHeight * finalScale;

    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    // Update real-time preview data URL
    try {
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setPreviewUrl(dataUrl);
    } catch (e) {
      console.warn('Canvas toDataURL failed', e);
    }
  }, [aspect, fitMode, zoom, panX, panY, rotation, bgColor, getAspectDimensions]);

  // Load image element
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgRef.current = img;
      renderCanvas();
    };
    img.src = imageSrc;
  }, [imageSrc, renderCanvas]);

  // Re-render when controls change
  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Drag pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanX(e.clientX - dragStart.x);
    setPanY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - panX, y: e.touches[0].clientY - panY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      setPanX(e.touches[0].clientX - dragStart.x);
      setPanY(e.touches[0].clientY - dragStart.y);
    }
  };

  const handleApply = () => {
    if (previewUrl) {
      onCropComplete(previewUrl);
    }
  };

  const activeDim = getAspectDimensions(aspect);

  return (
    <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-[#faf7f2] rounded-3xl max-w-4xl w-full border-2 border-[#c5a059]/30 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#5d0e0e] text-[#faf3df] px-6 py-4 flex justify-between items-center border-b border-[#c5a059]/30 shrink-0">
          <div className="flex items-center gap-2.5">
            <Crop size={20} className="text-[#c5a059]" />
            <div>
              <h3 className="font-serif font-bold text-lg leading-tight">{title}</h3>
              <p className="text-[10px] text-[#c5a059] uppercase tracking-wider font-sans font-medium">
                Adjust & Fit Photo to Match Website Card Preview Shape
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Top Control Toolbar: Aspect Ratio & Fit Mode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Aspect Ratio Selector */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-2 font-sans flex items-center gap-1.5">
                <Maximize2 size={13} className="text-[#5d0e0e]" />
                Select Card Preview Shape
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'square', label: '1:1 Square', note: 'Gallery' },
                  { id: 'service', label: '4:3 Card', note: 'Services' },
                  { id: 'portrait', label: '4:5 Tall', note: 'Cover' },
                  { id: 'wide', label: '16:9 Banner', note: 'Wide' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setAspect(item.id as AspectRatioType);
                      handleReset();
                    }}
                    className={`px-2.5 py-2 rounded-xl text-xs font-sans font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                      aspect === item.id
                        ? 'bg-[#5d0e0e] text-[#faf3df] shadow-md border border-[#c5a059]/40'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[9px] opacity-75 font-normal">{item.note}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fit Mode Selector */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-2 font-sans flex items-center gap-1.5">
                <Layers size={13} className="text-[#5d0e0e]" />
                Image Fitting Option
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'cover', label: 'Crop & Zoom', desc: 'Fills full frame' },
                  { id: 'contain', label: 'Fit Whole Image', desc: 'No cutoff edges' },
                  { id: 'blur', label: 'Blurred Backdrop', desc: 'Aesthetic blur' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFitMode(item.id as FitModeType)}
                    className={`px-2.5 py-2 rounded-xl text-xs font-sans font-bold flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                      fitMode === item.id
                        ? 'bg-[#5d0e0e] text-[#faf3df] shadow-md border border-[#c5a059]/40'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[9px] opacity-75 font-normal">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Canvas Interactive Work Area & Live Card Preview Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Interactive Drag & Crop Canvas Area */}
            <div className="lg:col-span-7 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider font-sans flex items-center gap-1">
                  <Move size={12} /> Click & Drag to reposition
                </span>
                <span className="text-[10px] bg-[#efe1b4]/50 text-[#5d0e0e] px-2 py-0.5 rounded-full font-bold uppercase font-sans">
                  {activeDim.ratio}
                </span>
              </div>

              {/* Canvas viewport container with interactive drag */}
              <div
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
                className="relative overflow-hidden rounded-2xl border-2 border-dashed border-[#c5a059]/40 bg-gray-900 cursor-grab active:cursor-grabbing flex items-center justify-center shadow-inner select-none max-w-full"
                style={{
                  width: '100%',
                  aspectRatio: aspect === 'square' ? '1/1' : aspect === 'service' ? '4/3' : aspect === 'portrait' ? '4/5' : '16/9',
                  maxHeight: '340px',
                }}
              >
                {/* Hidden processing canvas */}
                <canvas ref={canvasRef} className="hidden" />

                {/* Render preview image directly from generated dataUrl */}
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Cropped Live Preview"
                    className="w-full h-full object-contain pointer-events-none"
                  />
                ) : (
                  <div className="text-gray-400 text-xs font-sans animate-pulse">Loading image preview...</div>
                )}
              </div>

              {/* Sliders and Fine Controls */}
              <div className="w-full mt-4 space-y-3 pt-3 border-t border-gray-100">
                {/* Zoom control */}
                <div className="flex items-center gap-3">
                  <ZoomOut size={15} className="text-gray-500 shrink-0" />
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full accent-[#5d0e0e] cursor-pointer"
                  />
                  <ZoomIn size={15} className="text-gray-500 shrink-0" />
                  <span className="text-xs font-bold text-gray-700 w-10 text-right font-sans">
                    {Math.round(zoom * 100)}%
                  </span>
                </div>

                {/* Rotate & Color controls row */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setRotation((r) => (r + 90) % 360)}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <RotateCw size={13} />
                    Rotate ({rotation}°)
                  </button>

                  {/* Fit mode background color picker */}
                  {fitMode === 'contain' && (
                    <div className="flex items-center gap-1.5">
                      <Palette size={13} className="text-gray-500" />
                      <span className="text-[10px] font-bold uppercase text-gray-500">Bg:</span>
                      {[
                        { color: '#faf7f2', label: 'Cream' },
                        { color: '#ffffff', label: 'White' },
                        { color: '#5d0e0e', label: 'Maroon' },
                        { color: '#1a1a1a', label: 'Black' },
                      ].map((item) => (
                        <button
                          key={item.color}
                          type="button"
                          onClick={() => setBgColor(item.color)}
                          className={`w-5 h-5 rounded-full border transition-transform ${
                            bgColor === item.color ? 'scale-125 border-[#5d0e0e] ring-2 ring-[#c5a059]' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: item.color }}
                          title={item.label}
                        />
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 text-xs font-sans text-gray-500 hover:text-[#5d0e0e] hover:underline cursor-pointer"
                  >
                    <RefreshCw size={11} /> Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Live Website Card Preview Box */}
            <div className="lg:col-span-5 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
              <span className="text-[11px] font-bold text-[#5d0e0e] uppercase tracking-wider mb-2 font-sans flex items-center gap-1">
                ✨ Website Card Preview
              </span>
              <p className="text-[11px] text-gray-500 mb-3 font-sans">
                This shows exactly how your uploaded photo will render inside the live website's card:
              </p>

              {/* Realistic card preview matching GallerySection styling */}
              <div className="bg-[#f5efe4] rounded-2xl border border-[#c5a059]/20 shadow-md overflow-hidden max-w-xs mx-auto w-full">
                <div
                  className="relative overflow-hidden bg-gray-100"
                  style={{
                    aspectRatio: aspect === 'square' ? '1/1' : aspect === 'service' ? '4/3' : aspect === 'portrait' ? '4/5' : '16/9',
                  }}
                >
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Website Preview Card"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-2 right-2 bg-[#5d0e0e]/90 text-[#faf3df] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#c5a059]/30">
                    Live Fit
                  </div>
                </div>

                <div className="p-3">
                  <span className="text-[9px] font-bold text-[#c5a059] uppercase tracking-widest block mb-0.5">
                    Alankarini Showcase
                  </span>
                  <h4 className="font-serif font-bold text-[#5d0e0e] text-xs">
                    Sample Card Preview
                  </h4>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="bg-[#f5efe4] px-6 py-4 border-t border-[#c5a059]/20 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
          <span className="text-xs text-gray-600 font-sans text-center sm:text-left">
            💡 <strong>Tip:</strong> Drag photo to center henna details, or select <em>Fit Whole Image</em> to avoid cutting off patterns.
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] hover:text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
            >
              <Check size={16} />
              Apply & Save Cropped Photo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
