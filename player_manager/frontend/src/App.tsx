import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/login';
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App
