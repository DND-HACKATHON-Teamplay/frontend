import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import OAuthCallback from './pages/OAuthCallback/OAuthCallback';
import Home from './pages/Home/Home';
import './App.css';
import './styles/globals.css';
import RegisterElder from './pages/RegisterElder/RegisterElder';
import DetailChat from './pages/DetailChat/DetailChat';
import Setting from './pages/Setting/Setting';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="register" element={<RegisterElder />} />
        <Route path="detailchat" element={<DetailChat />} />
        <Route path="setting" element={<Setting />} />
      </Routes>
    </Router>
  );
}

export default App;
