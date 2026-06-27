import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { apiFetch } from '../utils/api'
import './AnimeCard.css'

function AnimeCard({ anime, watchlist = [], setWatchlist }) {
  const navigate = useNavigate()
  const { token } = useAuth()
  const inWatchlist = watchlist.some(item => item.id === anime.id)

  const handleWatchlist = async (e) => {
    e.stopPropagation()

    if (inWatchlist) {
      await apiFetch(`/api/v1/watchlist/${anime.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setWatchlist(watchlist.filter(item => item.id !== anime.id))
    } else {
      await apiFetch('/api/v1/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ anime_id: anime.id })
      })
      setWatchlist([...watchlist, anime])
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