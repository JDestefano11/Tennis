
![Tennis Courts App](./tennis/public/tennis-ball.svg)

A modern web application for discovering and exploring tennis courts. This intuitive platform allows users to browse courts by surface type, view detailed information about each facility, and read or submit reviews.

## 🎾 Features

- **Responsive Design**: Optimized for both mobile and desktop experiences
- **Court Discovery**: Browse through a curated selection of tennis courts
- **Surface Filtering**: Filter courts by surface type (Clay, Grass, Hard, Carpet, Artificial turf)
- **Smart Search**: Find courts by name, location, or surface type
- **Detailed Court Information**:
  - High-resolution images with interactive zoom/pan functionality
  - Court specifications and surface details
  - Available amenities and facilities
  - User reviews and ratings
- **Review System**: Submit and read reviews for courts
- **Modern UI**: Clean, intuitive interface with smooth transitions

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tennis-courts.git
   cd tennis-courts
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Access the application:
   ```
   http://localhost:5173
   ```

## 🖥️ Technologies Used

- **React**: Front-end UI library for building component-based interfaces
- **React Router**: Navigation and routing for multi-page experience
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Vite**: Next-generation frontend tooling for faster development
- **localStorage API**: Client-side data persistence

## 📱 Usage Guide

### Home Page

The home page presents a collection of tennis courts with:
- Search bar for finding specific courts
- Surface type filter
- Court cards displaying preview information

### Court Detail Page

Click on any court card to access:
- Large court images with zoom and pan capability
- Surface and location information
- Available amenities
- User reviews and ratings
- Option to submit your own review

### Filtering and Searching

- Use the surface filters to narrow down courts by type
- Use the search bar to find courts by name or location
- Clear filters button to reset your selections

## 📋 Future Improvements

With additional development time beyond the initial 4-hour scope, the following improvements would be implemented:

### Code Architecture Enhancements
- **State Management**: Implement Redux or React Context for more efficient state management
- **TypeScript Integration**: Convert the codebase to TypeScript for better type safety and developer experience
- **Component Refactoring**: Further break down components for better reusability and maintainability
- **Custom Hooks**: Create more custom hooks to abstract complex logic
- **Testing**: Add comprehensive unit and integration tests with Jest and React Testing Library

### Performance Optimizations
- **Code Splitting**: Implement lazy loading for components to reduce initial load time
- **Memoization**: Use React.memo, useMemo, and useCallback more extensively
- **Image Optimization**: Implement responsive images and lazy loading
- **Virtual Scrolling**: Add virtualization for long lists to improve performance

### Feature Expansion
- **User Authentication**: Add login/signup functionality with user profiles
- **Booking System**: Integrate court booking and reservation capabilities
- **Maps Integration**: Add interactive maps showing court locations
- **Advanced Filtering**: Filter by price, amenities, availability, etc.
- **Favorites**: Allow users to save favorite courts
- **Notifications**: Court availability alerts and booking reminders

### UI/UX Improvements
- **Dark Mode**: Implement theme switching capability
- **Animation Enhancements**: Add more subtle animations for a polished feel
- **Accessibility**: Improve keyboard navigation and screen reader support
- **Multi-language Support**: Add internationalization

## 📦 Project Structure

```
tennis/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── data/          # Mock data and data handlers
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main application component
│   ├── main.jsx       # Application entry point
│   └── index.css      # Global styles
├── index.html         # HTML template
└── package.json       # Project dependencies and scripts
```

## 💡 Development Notes

- Mock data was generated using an AI coding assistant to create a realistic dataset
- The application uses localStorage for data persistence in this demonstration
- The zoom and pan functionality in the image viewer was extracted into a custom hook for better maintainability

## 🙏 Acknowledgments

- Tennis court images sourced from various open-source libraries
- UI design inspiration from modern sports and booking applications
- SVG icons from Heroicons

---

