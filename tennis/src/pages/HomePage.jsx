import { useState, useEffect } from 'react';
import CourtCard from '../components/CourtCard';
import SearchBar from '../components/SearchBar';
import courts from '../data/courts';

// Get unique surface types from courts
const surfaceTypes = [...new Set(courts.map(court => court.surface))];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSurface, setSelectedSurface] = useState('');
  const [filteredCourts, setFilteredCourts] = useState(courts);

  // Filter courts based on search term and surface type
  useEffect(() => {
    let filtered = courts;
    
    // Apply search term filter with improved matching to avoid too many results
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      
      // If the search term is very short (1-2 characters), do a more strict search
      if (term.length <= 2) {
        // For very short terms, only match start of words to avoid too many results
        filtered = filtered.filter(court => {
          const nameMatches = court.name.toLowerCase().split(' ').some(word => word.startsWith(term));
          const locationMatches = court.location.toLowerCase().split(' ').some(word => word.startsWith(term));
          const surfaceMatches = court.surface.toLowerCase().startsWith(term);
          
          return nameMatches || locationMatches || surfaceMatches;
        });
      } else {
        // For longer terms, use regular includes matching
        filtered = filtered.filter(court => (
          court.name.toLowerCase().includes(term) ||
          court.location.toLowerCase().includes(term) ||
          court.surface.toLowerCase().includes(term)
        ));
      }
    }
    
    // Apply surface filter
    if (selectedSurface) {
      filtered = filtered.filter(court => court.surface === selectedSurface);
    }

    setFilteredCourts(filtered);
  }, [searchTerm, selectedSurface]);

  // Handle search from search bar component
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      {/* Hero search section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 w-full px-4 py-10 mb-10 shadow-lg overflow-hidden">
     
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              Find Your Perfect Tennis Court
            </h1>
            <p className="text-blue-100 mb-8 text-sm sm:text-base">Search from our professionally curated selection of premium courts in your area</p>
            <div className="max-w-xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>

      {/* Content area with container */}
      <div className="container mx-auto px-4 py-6 2xl:max-w-[1600px]">
        {/* Title section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {(searchTerm || selectedSurface) ? 'Search Results' : 'All Tennis Courts'}
          </h2>
        </div>
        
        {/* Desktop-optimized surface filter */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-10 overflow-hidden">
          <div className="flex items-center border-b border-gray-100 p-3 md:p-4 bg-gray-50">
            <svg className="w-5 h-5 text-blue-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <h3 className="text-sm md:text-base font-medium text-gray-700">Filter by Surface Type</h3>
          </div>
          
          <div className="p-3 md:p-4">
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center lg:justify-start">
              <button 
                onClick={() => setSelectedSurface('')}
                className={`whitespace-nowrap text-xs md:text-sm py-1.5 md:py-2 px-3 md:px-4 rounded-md transition-all duration-200 border ${!selectedSurface 
                  ? 'bg-blue-600 text-white border-blue-700 shadow-sm' 
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
              >
                All Surfaces
              </button>
              
              {surfaceTypes.map(surface => {
                // Get appropriate color based on surface type
                const getSurfaceColor = (surface, selected) => {
                  if (!selected) return '';
                  const colors = {
                    'Clay': 'bg-red-600 border-red-700 text-white',
                    'Grass': 'bg-green-600 border-green-700 text-white',
                    'Hard': 'bg-blue-600 border-blue-700 text-white',
                    'Carpet': 'bg-amber-600 border-amber-700 text-white',
                    'Artificial turf': 'bg-emerald-600 border-emerald-700 text-white'
                  };
                  return colors[surface] || 'bg-blue-600 border-blue-700 text-white';
                };
                
                return (
                  <button
                    key={surface}
                    onClick={() => setSelectedSurface(surface)}
                    className={`whitespace-nowrap text-xs md:text-sm py-1.5 md:py-2 px-3 md:px-4 rounded-md transition-all duration-200 border ${selectedSurface === surface 
                      ? getSurfaceColor(surface, true) 
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                  >
                    {surface}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filtered results message */}
        {(searchTerm || selectedSurface) && (
          <div className="bg-white border border-gray-200 p-4 rounded-lg mb-6 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center">
                {filteredCourts.length > 0 ? (
                  <div className="flex items-center bg-blue-50 text-blue-700 p-2 rounded-md mr-3">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">
                      {filteredCourts.length} {filteredCourts.length === 1 ? 'result' : 'results'} found
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center bg-amber-50 text-amber-700 p-2 rounded-md mr-3">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="font-medium">
                      No matches found
                    </span>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm bg-gray-100 text-gray-800 border border-gray-200">
                      <span className="text-xs text-gray-500 mr-1">Search:</span>
                      "{searchTerm}"
                    </span>
                  )}
                  
                  {selectedSurface && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm bg-gray-100 text-gray-800 border border-gray-200">
                      <span className="text-xs text-gray-500 mr-1">Surface:</span>
                      {selectedSurface}
                    </span>
                  )}
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSurface('');
                }}
                className="flex items-center text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Clear All Filters
              </button>
            </div>
            
            {filteredCourts.length === 0 && (
              <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-200">
                <p>Try adjusting your search criteria or selecting a different surface type.</p>
              </div>
            )}
          </div>
        )}

        {/* Court grid  */}
        {filteredCourts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredCourts.map(court => (
              <div key={court.id} className="lg:max-w-lg xl:max-w-2xl mx-auto w-full">
                <CourtCard court={court} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">No courts found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
