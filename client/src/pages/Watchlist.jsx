import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import AnimeCard from '../components/AnimeCard'
import { useNavigate } from 'react-router-dom'
import './Watchlist.css'
import { apiFetch } from '../utils/api'

function Watchlist() {
  const { token } = useAuth()
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    apiFetch('/api/v1/watchlist', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setWatchlist(data)
        setLoading(false)
      })
  }, [token])

  if (loading) return <h2>Loading...</h2>

  return (
    <div className="watchlist">
      <h1>My Watchlist</h1>
      {watchlist.length === 0 ? (
        <div className="watchlist-empty">
            <div className="empty-icon">♡</div>
            <h2>Your watchlist is empty</h2>
            <p>Save anime you want to watch later by clicking the heart icon on any anime card.</p>
            <button onClick={() => navigate('/browse')}>Browse Anime</button>
        </div>
        ) : (
        <div className="watchlist-grid">
            {watchlist.map(anime => (
            <AnimeCard key={anime.id} anime={anime} watchlist={watchlist} setWatchlist={setWatchlist} />
            ))}
        </div>
        )}
    </div>
  )
}

export default Watchlist