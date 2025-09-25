import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Card component to display tennis court preview information
 * with robust image loading and fallbacks
 */
const CourtCard = ({ court }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(court.image);
  
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
  
  // Get appropriate color for surface tag
  const getSurfaceTagColor = (surface) => {
    const colors = {
      'Clay': 'bg-red-600',
      'Grass': 'bg-green-600',
      'Hard': 'bg-blue-600',
      'Carpet': 'bg-amber-700',
      'Artificial turf': 'bg-emerald-600'
    };
    return colors[surface] || 'bg-blue-600';
  };

  const { id, name, image, rating, reviewCount, location, surface } = court;

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={`star-${i}`} className="text-yellow-400">★</span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={`star-${i}`} className="text-yellow-400">⯨</span>
        );
      } else {
        stars.push(
          <span key={`star-${i}`} className="text-gray-300">★</span>
        );
      }
    }
    
    return stars;
  };
  
  return (
    <Link to={`/court/${id}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
          {/* Image container with loading state - optimized for wider desktop cards */}
          <div className="relative aspect-[4/3] md:aspect-[16/9] lg:aspect-[2/1] overflow-hidden">
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}
          
          {/* Court image */}
          <img 
            src={imageSrc} 
            alt={name} 
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              console.warn(`Image error in UI for ${name}:`, e);
              e.target.onerror = null;
              // Use surface-specific fallback
              e.target.src = getFallbackImage(surface);
              setImageLoaded(true);
              setImageError(true);
            }}
          />
          
          {/* Surface label - now positioned top right */}
          <div className="absolute top-3 right-3">
            <span className="bg-white text-gray-800 shadow-md text-xs px-3 py-1 rounded-md font-medium">
              {surface}
            </span>
          </div>
        </div>
        
        {/* Content section - more padding on larger screens */}
        <div className="p-4 md:p-5 lg:p-6 xl:p-7">
          <h3 className="text-lg md:text-xl font-semibold mb-1 truncate">{name}</h3>
          <p className="text-gray-500 text-sm mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </p>
          
          {/* Price display */}
          <div className="mt-1">
            <span className="text-blue-600 font-medium">{court.priceRange}</span>
          </div>
          
          {/* Rating and reviews */}
          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-center">
              <div className="flex mr-2">
                {renderStars(rating)}
              </div>
              <span className="text-sm font-medium">
                {rating}
              </span>
            </div>
            <span className="text-sm text-gray-600">{reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourtCard;
