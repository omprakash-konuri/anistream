import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Navbar from './components/Navbar'
import AnimeDetail from './pages/AnimeDetail'
import './App.css'


function App() {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/browse' element={<Browse/>}/>
          <Route path='/anime/:id'element={<AnimeDetail />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App