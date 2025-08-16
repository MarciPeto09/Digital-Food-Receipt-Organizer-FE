import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18n';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ReceiptDetail from  './pages/ReceiptDetail';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import RegistrationUser from './pages/RegistrationUser';
import Profile from './pages/Profile';
import ModificaProfile from './pages/ModificaProfile';
import Ordination from './pages/Ordiation';
import Basket from './pages/Basket';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegistrationUser />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/receipts" element={<ReceiptDetail />}/>
        <Route path="/profile/:id" element={<Profile />}/>
        <Route path="/modificaProfile/:id" element={<ModificaProfile />}/>
        <Route path="/basket" element={<Basket />}/>
        <Route path="/ordination" element={<Ordination/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App
