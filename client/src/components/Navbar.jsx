import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        AniStream
      </div>
      <div className="navbar-links">
        <Link to='/'>Home</Link>
        <Link to='/browse'>Browse</Link>
      </div>
    </nav>
  )
}

export default Navbar