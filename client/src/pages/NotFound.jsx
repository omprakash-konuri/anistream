import { useNavigate } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>This page doesn't exist.</p>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  )
}

export default NotFound