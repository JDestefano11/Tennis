import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CourtDetailPage from './pages/CourtDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="court/:id" element={<CourtDetailPage />} />
          <Route path="*" element={
            <div className="text-center p-10">
              <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
              <p className="text-gray-600">The page you're looking for doesn't exist.</p>
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
