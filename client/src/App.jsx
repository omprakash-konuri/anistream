import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Navbar from './components/Navbar'
import AnimeDetail from './pages/AnimeDetail'
import Watch from './pages/Watch'
import Watchlist from './pages/Watchlist'
import Admin from './pages/Admin'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import './App.css'


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <div className="app">
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path='/browse' element={
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            } />
            <Route path='/anime/:id' element={
              <ProtectedRoute>
                <AnimeDetail />
              </ProtectedRoute>
            } />
            <Route path='/watch/:id' element={
              <ProtectedRoute>
                <Watch />
              </ProtectedRoute>
            } />
            <Route path='/watchlist' element={
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            } />
            <Route path='/admin' element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App