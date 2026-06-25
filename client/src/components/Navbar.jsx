import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        AniStream
      </div>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/browse">Browse</a>
      </div>
      <div className="navbar-user">
        {user ? (
          <>
            <span className="navbar-username">Hi, {user.username}</span>
            <button className="navbar-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <a href="/login" className="navbar-login">Login</a>
        )}
      </div>
    </nav>
  )
}

export default Navbar