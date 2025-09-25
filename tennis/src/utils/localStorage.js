// Key for storing our court data in localStorage
const COURTS_STORAGE_KEY = 'tennis_courts_data';

/**
 * Save courts data to localStorage
 * @param {Array} courts - The courts array to save
 */
export const saveCourtsToLocalStorage = (courts) => {
  try {
    localStorage.setItem(COURTS_STORAGE_KEY, JSON.stringify(courts));
    return true;
  } catch (error) {
    console.error('Error saving courts to localStorage:', error);
    return false;
  }
};

/**
 * Get saved courts data from localStorage
 * @returns {Array|null} The saved courts array or null if not found
 */
export const getCourtsFromLocalStorage = () => {
  try {
    const savedCourts = localStorage.getItem(COURTS_STORAGE_KEY);
    return savedCourts ? JSON.parse(savedCourts) : null;
  } catch (error) {
    console.error('Error retrieving courts from localStorage:', error);
    return null;
  }
};
