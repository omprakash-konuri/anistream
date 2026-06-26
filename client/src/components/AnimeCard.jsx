import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './AnimeCard.css'

function AnimeCard({ anime }) {
  const navigate = useNavigate()
  const { token } = useAuth()
  const [inWatchlist, setInWatchlist] = useState(false)

  useEffect(() => {
    if (!token) return

    fetch('http://localhost:3000/api/v1/watchlist', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        const found = data.some(item => item.id === anime.id)
        setInWatchlist(found)
      })
  }, [anime.id, token])

  const handleWatchlist = async (e) => {
    e.stopPropagation()

    if (inWatchlist) {
      await fetch(`http://localhost:3000/api/v1/watchlist/${anime.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setInWatchlist(false)
    } else {
      await fetch('http://localhost:3000/api/v1/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ anime_id: anime.id })
      })
      setInWatchlist(true)
    }
  }

  return (
    <div className="anime-card" onClick={() => navigate(`/anime/${anime.id}`)}>
      <div className="anime-card-image">
        {anime.thumbnail_url ? (
          <img src={anime.thumbnail_url} alt={anime.title} />
        ) : (
          <div className="anime-card-placeholder">
            {anime.title.charAt(0)}
          </div>
        )}
        <button
          className={`watchlist-btn ${inWatchlist ? 'active' : ''}`}
          onClick={handleWatchlist}
        >
          {inWatchlist ? '♥' : '♡'}
        </button>
      </div>
      <div className="anime-card-info">
        <h4>{anime.title}</h4>
        <span className={`status ${anime.status}`}>{anime.status}</span>
      </div>
    </div>
  )
}

export default AnimeCard