import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Navbar from './components/Navbar'
import AnimeDetail from './pages/AnimeDetail'
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
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App