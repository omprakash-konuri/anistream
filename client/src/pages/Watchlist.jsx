import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import AnimeCard from '../components/AnimeCard'
import './Watchlist.css'
import { apiFetch } from '../utils/api'

function Watchlist() {
  const { token } = useAuth()
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(true)

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
          <p>No anime saved yet.</p>
          <a href="/browse">Browse Anime</a>
        </div>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map(anime => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Watchlist