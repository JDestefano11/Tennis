import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <header className="sticky top-0 z-10 bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
        {/* Logo and name */}
        <Link to="/" className="flex items-center group">
          <div className="bg-blue-600 text-white p-2 md:p-2.5 rounded-full overflow-hidden transform transition-transform group-hover:scale-105">
            <svg 
              className="w-6 h-6" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.5"
            >
              <circle cx="12" cy="12" r="10" fill="#ffffff" stroke="none" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9L7.1 5.69C8.45 3.63 10.15 3 12 4zm0 16c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 20.37 13.85 21 12 20z" fill="#2563EB" />
            </svg>
          </div>
          <span className="ml-2 text-xl font-bold text-blue-700 tracking-tight">Tennis Courts</span>
        </Link>
        
        {/* Navigation links */}
        <nav>
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Only show back button on non-home pages */}
            {!isHomePage && (
              <Link 
                to="/"
                className="flex items-center px-3 py-2 text-blue-600 border border-blue-100 rounded-md hover:bg-blue-50 transition-colors"
                aria-label="Return to court listings"
              >
                <svg 
                  className="w-5 h-5 mr-1.5" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" 
                    clipRule="evenodd"
                  />
                </svg>
                <span className="hidden sm:inline font-medium">Back to Courts</span>
                <span className="sm:hidden font-medium">Back</span>
              </Link>
            )}
            
            {/* Always visible Browse link  */}
            <Link 
              to="/"
              className={`px-4 py-2 rounded-md transition-colors ${isHomePage ? 'bg-blue-600 text-white font-medium' : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'}`}
              aria-current={isHomePage ? 'page' : undefined}
            >
              <span className="font-medium">Browse</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
