import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Reviews from '../components/Reviews';
import CourtDetailView from '../components/CourtDetailView';
import courts, { updateCourt } from '../data/courts';

const CourtDetailPage = () => {
  const { id } = useParams();
  const [court, setCourt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);

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

  useEffect(() => {
    // Find the court with the matching ID
    const foundCourt = courts.find(c => c.id === id);
    setCourt(foundCourt || null);
    setLoading(false);
  }, [id]);

  // Handle adding a new review
  const handleAddReview = (courtId, newReview) => {
    setCourt(prevCourt => {
      if (!prevCourt) return null;
      
      // Get updated reviews with the new one
      const updatedReviews = [newReview, ...prevCourt.reviews];
      
      // Create a new court object with the new review added
      const updatedCourt = {
        ...prevCourt,
        reviews: updatedReviews,
        reviewCount: updatedReviews.length,
        // Recalculate the average rating
        rating: calculateAverageRating(updatedReviews)
      };
      
      // Update court in the global state and localStorage
      updateCourt(updatedCourt);
      
      return updatedCourt;
    });
  };

  // Calculate average rating from reviews
  const calculateAverageRating = (reviews) => {
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
  };

  // Render stars for the rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={`star-${i}`} className="text-yellow-400 text-xl">★</span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={`star-${i}`} className="text-yellow-400 text-xl">⯨</span>
        );
      } else {
        stars.push(
          <span key={`star-${i}`} className="text-gray-300 text-xl">★</span>
        );
      }
    }
    
    return stars;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!court) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Court Not Found</h2>
        <p className="text-gray-600">The tennis court you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero section with image and main details */}
      <div className="bg-white overflow-hidden rounded-lg shadow-lg mb-6 xl:mb-8">
        <div className="relative">
          {/* Full width image with different heights for responsive design - no animation */}
          <div className="relative h-72 sm:h-96 lg:h-[500px] w-full">
            <img 
              src={court.image} 
              alt={court.name} 
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.onerror = null;
                setImageLoaded(true);
                // Use surface-specific fallback image
                e.target.src = getFallbackImage(court.surface);
              }}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200"></div>
            )}
            
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            {/* Surface tag - top right */}
            <div className="absolute top-4 right-4">
              <span className="bg-white text-gray-800 font-medium py-1 px-4 rounded-md shadow-md">
                {court.surface}
              </span>
            </div>
            
            {/* View detailed court button */}
            <div className="absolute top-4 left-4 z-10">
              <button 
                onClick={() => setShowDetailView(true)}
                className="bg-white/90 hover:bg-white text-gray-800 font-medium py-2 px-3 sm:py-3 sm:px-5 md:text-lg rounded-md shadow-md flex items-center transition-all hover:shadow-lg"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6 mr-1 sm:mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="truncate sm:whitespace-normal">View Court Details</span>
              </button>
            </div>
          </div>
          
          {/* Court name, location and price */}
          <div className="absolute bottom-0 left-0 w-full p-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2 drop-shadow-md">
                  {court.name}
                </h1>
                <p className="text-lg text-gray-100 drop-shadow-sm">{court.location}</p>
              </div>
              <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-lg font-bold shadow-md">
                {court.priceRange}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content section with tabs for different information */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        {/* Rating summary bar */}
        <div className="bg-gray-50 border-b border-gray-100 p-4 md:p-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center mr-3">
              <div className="flex">
                {renderStars(court.rating)}
              </div>
              <span className="ml-2 font-medium text-lg">{court.rating}</span>
            </div>
            <span className="text-gray-600">({court.reviewCount} reviews)</span>
          </div>
        </div>
        
        {/* Main content with information */}
        <div className="p-6 xl:p-8">
          {/* About section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">About</h2>
            <p className="text-gray-700 leading-relaxed max-w-4xl">{court.description}</p>
          </div>
          
          {/* Details and amenities section*/}
          <div className="mb-8">
            <div className="flex flex-col xl:flex-row gap-8">
              {/* Left column - Details */}
              <div className="bg-gray-50 p-6 rounded-lg xl:w-1/3">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">Details</h2>
                <ul className="space-y-4">
                  <li>
                    <span className="block text-sm text-gray-500 mb-1">HOURS</span>
                    <span className="font-medium">{court.operatingHours}</span>
                  </li>
                  <li>
                    <span className="block text-sm text-gray-500 mb-1">PHONE</span>
                    <span className="font-medium">{court.phone}</span>
                  </li>
                  <li>
                    <span className="block text-sm text-gray-500 mb-1">WEBSITE</span>
                    <a href={court.website} target="_blank" rel="noopener noreferrer" 
                       className="font-medium text-blue-600 hover:underline">
                      {court.website.replace('https://www.', '')}
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Right column - Amenities  */}
              <div className="bg-gray-50 p-6 rounded-lg xl:w-2/3">
                <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-y-4 gap-x-8 xl:gap-x-12">
                  {court.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Reviews section */}
          <div className="pt-4 xl:pt-6">
            <div className="max-w-full overflow-hidden">
              <Reviews 
                courtId={court.id} 
                reviews={court.reviews} 
                onAddReview={handleAddReview} 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Court detail view modal */}
      {showDetailView && (
        <CourtDetailView
          image={court.image}
          name={court.name}
          surface={court.surface}
          onClose={() => setShowDetailView(false)}
        />
      )}
    </div>
  );
};

export default CourtDetailPage;
