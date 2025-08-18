import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18n';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ReceiptDetail from './pages/ReceiptDetail';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import RegistrationUser from './pages/RegistrationUser';
import Profile from './pages/Profile';
import ModificaProfile from './pages/ModificaProfile';
import Ordination from './pages/Ordiation';
import Basket from './pages/Basket';
import Chat from './components/chat';
import React, { useState } from "react";
import { useLocation } from "react-router";

function AppContent() {
  const [showChat, setShowChat] = useState(false);
  const location = useLocation();
  const hideChatPaths = ["/", "/register"];
  const shouldHideChat = hideChatPaths.includes(location.pathname);


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegistrationUser />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/receipts" element={<ReceiptDetail />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/modificaProfile/:id" element={<ModificaProfile />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/ordination" element={<Ordination />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

       {!shouldHideChat && (
        <>
      <button
        onClick={() => setShowChat(prev => !prev)}
        className="btn btn-light border
    rounded-circle
    d-flex
    align-items-center
    justify-content-center
    position-fixed
    end-0
    bottom-0
    m-4
    shadow-sm
  "
        style={{ width: '56px', height: '56px', zIndex: 1050 }}
        aria-label="Chat"
      >
        <i className="bi bi-chat-dots" style={{ fontSize: '1.5rem', color: '#555' }}></i>
      </button>
      {showChat && (
        <div
          className="position-fixed bottom-0 end-0 m-4 border rounded bg-white shadow d-flex flex-column"
          style={{ width: "550px", height: "500px", zIndex: 1051 }}
        >
          <Chat onClose={() => setShowChat(false)} />
        </div>
       )}
        </>
      )}
    </>
  );
}
function App() {
  return (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
  );
};
export default App
