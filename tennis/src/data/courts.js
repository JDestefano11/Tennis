// Mock data for tennis courts
import { getCourtsFromLocalStorage, saveCourtsToLocalStorage } from '../utils/localStorage';

// Function to match court images with their surface types
const getCourtImageBySurface = (surface) => {
  // Local SVG fallback images for each surface type
  const localFallbacks = {
    'Clay': '/court-clay.svg',
    'Grass': '/court-grass.svg',
    'Hard': '/court-hard.svg',
    'Carpet': '/court-carpet.svg',
    'Artificial turf': '/court-artificial.svg'
  };
  
  // Group remote images by court surface
  const surfaceImageMap = {
    'Clay': ['https://source.unsplash.com/400x300/?clay-tennis-court', 'https://source.unsplash.com/400x300/?clay-tennis-court-2'],
    'Grass': ['https://source.unsplash.com/400x300/?grass-tennis-court', 'https://source.unsplash.com/400x300/?grass-tennis-court-2'],
    'Hard': [
      'https://source.unsplash.com/400x300/?hard-tennis-court', 
      'https://source.unsplash.com/400x300/?hard-tennis-court-2'
    ],
    'Carpet': ['https://source.unsplash.com/400x300/?carpet-tennis-court', 'https://source.unsplash.com/400x300/?carpet-tennis-court-2'],
    'Artificial turf': [
      'https://source.unsplash.com/400x300/?artificial-turf-tennis-court', 
      'https://source.unsplash.com/400x300/?artificial-turf-tennis-court-2'
    ]
  };
  
  // Check if we should use local SVG fallbacks (randomly for demonstration)

  const useLocalImages = Math.random() < 0.5; 
  
  if (useLocalImages) {
    // Return local SVG fallback image
    return localFallbacks[surface] || '/court-hard.svg';
  } else {
    // Get the appropriate image array for this surface
    const surfaceImages = surfaceImageMap[surface] || ['https://source.unsplash.com/400x300/?tennis-court'];
    // Return a random image from the appropriate category
    return surfaceImages[Math.floor(Math.random() * surfaceImages.length)];
  }
};

const generateMockCourts = () => {
  const courts = [];
  const surfaces = ['Clay', 'Hard', 'Grass', 'Carpet', 'Artificial turf'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Miami', 'Atlanta', 'Boston', 
    'San Francisco', 'Seattle', 'Denver', 'Washington DC', 'Nashville', 'Portland'];
  const amenities = ['Locker rooms', 'Pro shop', 'Lessons available', 'Tournaments', 'Night lighting', 
    'Water fountain', 'Restrooms', 'Parking', 'Seating area', 'Shade structures', 'Snack bar',
    'Ball machine rental', 'Court reservation system'];
  
  for (let i = 1; i <= 60; i++) {
    const randomRating = (Math.random() * 4 + 1).toFixed(1);
    const randomReviewCount = Math.floor(Math.random() * 200);
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomSurface = surfaces[Math.floor(Math.random() * surfaces.length)];
    const courtCount = Math.floor(Math.random() * 10) + 1;
    
    // Select 2-5 random amenities
    const courtAmenities = [];
    const amenitiesCount = Math.floor(Math.random() * 4) + 2;
    const shuffledAmenities = [...amenities].sort(() => 0.5 - Math.random());
    for (let j = 0; j < amenitiesCount; j++) {
      courtAmenities.push(shuffledAmenities[j]);
    }

    // Generate random reviews
    const reviews = [];
    // Create between 1-8 reviews per court
    const reviewCount = Math.floor(Math.random() * 8) + 1;
    for (let k = 0; k < reviewCount; k++) {
      const reviewRating = Math.floor(Math.random() * 5) + 1;
      const reviewDates = [
        '2024-08-15', '2024-09-02', '2024-07-22', 
        '2024-08-30', '2024-09-15', '2024-06-10'
      ];
      const randomDate = reviewDates[Math.floor(Math.random() * reviewDates.length)];
      
      reviews.push({
        id: `review-${i}-${k}`,
        user: `User${Math.floor(Math.random() * 1000)}`,
        rating: reviewRating,
        date: randomDate,
        comment: getRandomComment(reviewRating)
      });
    }

    // Generate a random price range
    const minPrice = Math.floor(Math.random() * 20) + 10; // $10-30
    const maxPrice = minPrice + Math.floor(Math.random() * 30) + 10; // $min+10 to $min+40
    
    // Calculate actual average rating from reviews
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const actualRating = reviews.length > 0 ? parseFloat((totalRating / reviews.length).toFixed(1)) : 0;
    
    courts.push({
      id: `court-${i}`,
      name: `${randomCity} ${getRandomCourtName(i)}`,
      location: `${randomCity}, USA`,
      image: getCourtImageBySurface(randomSurface),
      rating: actualRating,
      reviewCount: reviews.length, 
      surface: randomSurface,
      courtCount: courtCount,
      amenities: courtAmenities,
      description: `A beautiful ${randomSurface.toLowerCase()} court located in the heart of ${randomCity}. Features ${courtCount} well-maintained courts suitable for all skill levels.`,
      priceRange: `$${minPrice}-$${maxPrice}/hr`,
      operatingHours: '7:00 AM - 10:00 PM',
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      website: `https://www.${randomCity.toLowerCase().replace(/\s/g, '')}tennis.com`,
      reviews: reviews
    });
  }
  return courts;
};

// Helper functions for generating mock data
function getRandomCourtName(index) {
  const names = [
    'Tennis Club', 'Tennis Center', 'Sports Complex', 'Recreation Center', 
    'Tennis Academy', 'Community Courts', 'Park Tennis', 'Tennis Gardens', 
    'Athletic Club', 'Tennis Association', 'Sports Club', 'Indoor Tennis', 
    'Racquet Club', 'Tennis Park'
  ];
  
  return names[index % names.length];
}

function getRandomComment(rating) {
  const positiveComments = [
    "Great courts with excellent maintenance!",
    "Absolutely love playing here, great atmosphere and friendly staff.",
    "Perfect surface and excellent amenities. Would recommend!",
    "Best courts in the city! Always well maintained.",
    "Professional environment and great for all skill levels."
  ];
  
  const neutralComments = [
    "Decent courts but sometimes gets crowded.",
    "Average facilities but good location.",
    "Good courts but could use better maintenance.",
    "Not bad, but there are better options in the area.",
    "Court quality is okay, but the amenities are lacking."
  ];
  
  const negativeComments = [
    "Courts need maintenance, cracks everywhere.",
    "Poor lighting and no amenities.",
    "Overpriced for what they offer.",
    "Difficult to reserve, always booked.",
    "Staff is unfriendly and courts are poorly maintained."
  ];
  
  if (rating >= 4) {
    return positiveComments[Math.floor(Math.random() * positiveComments.length)];
  } else if (rating >= 3) {
    return neutralComments[Math.floor(Math.random() * neutralComments.length)];
  } else {
    return negativeComments[Math.floor(Math.random() * negativeComments.length)];
  }
}

// Try to get courts from localStorage first
let courts = getCourtsFromLocalStorage();

// If not in localStorage, generate new mock data and save it
if (!courts) {
  courts = generateMockCourts();
  saveCourtsToLocalStorage(courts);
}

export default courts;

// Export a function to update a court in the data and save to localStorage
export const updateCourt = (updatedCourt) => {
  // Find and update the court 
  const updatedCourts = courts.map(court => 
    court.id === updatedCourt.id ? updatedCourt : court
  );
  
  // Update our reference
  courts = updatedCourts;
  
  // Save to localStorage
  saveCourtsToLocalStorage(courts);
  
  return courts;
};
