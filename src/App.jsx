import { ReactContext } from './context/ReactContext'
import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router'

import DashboardLayout from './pages/DashboardLayout';

import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ProfilPage from './pages/auth/ProfilPage';

import SorularPage from './pages/admin/SorularPage';
import SinavlarPage from './pages/user/SinavlarPage';
import YeniSinavPage from './pages/user/YeniSinavPage';
import SinavPage from './pages/user/SinavPage';

function AuthRoutes() {
  const ctx = useContext(ReactContext);
  return (
    ctx.user
    ? <Outlet />
    : <Navigate to="/login" />
  );
}

function UnAuthRoutes() {
  const ctx = useContext(ReactContext);
  return (
    !ctx.user
    ? <Outlet />
    : <Navigate to="/dashboard" />
  );
}

function AdminPages() {
  const ctx = useContext(ReactContext);
  return (
    ctx.user.yonetici
    ? <Outlet />
    : <Navigate to="/dashboard" />
  );
}

function UserPages() {
  const ctx = useContext(ReactContext);
  return (
    !ctx.user.yonetici
    ? <Outlet />
    : <Navigate to="/dashboard" />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AuthRoutes />}>
          <Route path='/dashboard' element={<DashboardLayout />} >
            <Route path='profil' element={<ProfilPage />} />
            <Route path='' element={<AdminPages />} >
              <Route path='sorular' element={<SorularPage />} />
            </Route>
            <Route path='' element={<UserPages />} >
              <Route path='sinavlar' element={<SinavlarPage />} />
              <Route path='yeniSinav' element={<YeniSinavPage />} />
              <Route path='sinav/:kategori' element={<SinavPage />} />
            </Route>
          </Route>
        </Route>

        <Route element={<UnAuthRoutes />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
