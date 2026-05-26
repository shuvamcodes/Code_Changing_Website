import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Converter from './pages/Converter'; // Ensure this import points to your file

export default function App() {
  return (
    <Router>
      <Routes>
        {/* This handles your root landing page URL */}
        <Route path="/" element={<Landing />} />
        
        {/* 🔗 THIS IS WHAT WAS MISSING: This catches the /converter path and query params */}
        <Route path="/converter" element={<Converter />} />
      </Routes>
    </Router>
  );
}