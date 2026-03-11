import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Saved from './pages/Saved';
import Upload from './pages/Upload.jsx';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup  />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/saved" element={<Saved  />}  />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}





