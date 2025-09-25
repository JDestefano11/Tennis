import React, { useState, useRef } from 'react';
import useZoomPan from '../hooks/useZoomPan';

const CourtDetailView = ({ image, name, surface, onClose }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imageRef = useRef(null);
  

  const {
    scale,
    position, 
    dragging,
    containerRef,
    handleMouseDown,
    handleDoubleClick,
    setScale
  } = useZoomPan();
  
  // Get surface-specific fallback image
  const getFallbackImage = (surface) => {
    const fallbacks = {
      'Clay': '/court-clay.svg',
      'Grass': '/court-grass.svg',
      'Hard': '/court-hard.svg',
      'Carpet': '/court-carpet.svg',
      'Artificial turf': '/court-artificial.svg'
    };
    return fallbacks[surface] || '/court-hard.svg';
  };
  


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
        {/* Header with close button only */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 flex justify-end z-10">
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/40 transition-colors rounded-full p-2"
            aria-label="Close detailed view"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Image container */}
        <div 
          ref={containerRef}
          className="h-full w-full flex items-center justify-center bg-gray-900 cursor-grab overflow-hidden"
          style={{ cursor: dragging ? 'grabbing' : 'grab' }}
        >
          {!loaded && !error && (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white text-sm">Loading high-resolution image...</p>
            </div>
          )}
          
          <div 
            style={{ 
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: dragging ? 'none' : 'transform 0.2s ease-out',
              transformOrigin: 'center',
              willChange: 'transform',
            }}
          >
            <img
              ref={imageRef}
              src={image}
              alt={`${name} - ${surface} Court`}
              className={`max-h-[80vh] max-w-full object-contain transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setLoaded(true)}
              onError={(e) => {
                console.error('Error loading image in detail view');
                e.target.onerror = null;
                e.target.src = getFallbackImage(surface);
                setError(true);
                setLoaded(true);
              }}
              onMouseDown={handleMouseDown}
              onDoubleClick={handleDoubleClick}
              draggable="false"
            />
          </div>
        </div>
        
        {/* Information footer with zoom controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="text-white text-sm text-center sm:text-left">
              <p className="hidden sm:block">Double-click to reset • Use mouse wheel to zoom • Drag to pan when zoomed</p>
              <p className="sm:hidden">Pinch to zoom • Double-tap to reset • Drag to move</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setScale(Math.max(0.5, scale - 0.5))}
                className="bg-white/20 hover:bg-white/40 transition-colors rounded-full p-2"
                aria-label="Zoom out"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="text-white text-sm font-medium">{Math.round(scale * 100)}%</span>
              <button 
                onClick={() => setScale(Math.min(5, scale + 0.5))}
                className="bg-white/20 hover:bg-white/40 transition-colors rounded-full p-2"
                aria-label="Zoom in"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourtDetailView;
