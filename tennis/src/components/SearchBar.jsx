import { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Debounced search effect
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      onSearch(searchTerm);
    }, 300); // 300ms delay for typing
    
    return () => clearTimeout(delaySearch);
  }, [searchTerm, onSearch]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm); 
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-stretch overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg focus-within:shadow-lg focus-within:border-blue-300">
        {/* Left side icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className="w-5 h-5 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        
        {/* Input field */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Search by name, location, or surface..."
          className="w-full py-3 pl-12 pr-10 border-none text-gray-700 bg-transparent focus:outline-none focus:ring-0"
          aria-label="Search for tennis courts"
          autoComplete="off"
          spellCheck="false"
        />
        
        {/* Clear button */}
        {searchTerm && (
          <button 
            type="button" 
            onClick={() => {
              setSearchTerm('');
              onSearch('');
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <div className="h-5 w-5 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
        )}
        
        {/* Search button*/}
        <button 
          type="submit" 
          className="hidden sm:flex items-center justify-center h-auto bg-blue-700 text-white px-6 hover:bg-blue-800 transition-colors font-medium text-sm whitespace-nowrap"
          aria-label="Search"
        >
          Search
        </button>
      </div>
      
      {/* Search tip with better styling */}
      <div className="text-xs text-blue-300 mt-2.5 text-center hidden sm:block">
        <span className="bg-blue-700/20 rounded-md py-1 px-2 inline-flex items-center">
          <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Tip: Type at least 3 characters for better search results
        </span>
      </div>
    </form>
  );
};

export default SearchBar;
