import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { apiFetch } from '../utils/api'
import AnimeCard from '../components/AnimeCard'
import './Browse.css'

function Browse() {
  const { token } = useAuth()
  const [animes, setAnimes] = useState([])
  const [watchlist, setWatchlist] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      apiFetch('/api/v1/animes', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => res.json()),
      apiFetch('/api/v1/watchlist', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => res.json())
    ]).then(([animesData, watchlistData]) => {
      setAnimes(animesData)
      setWatchlist(watchlistData)
      setLoading(false)
    })
  }, [token])

  const filtered = animes
    .filter(a => filter === 'all' || a.status === filter)
    .filter(a => a.title.toLowerCase().includes(search.toLowerCase()))

  if (loading) return <h2>Loading...</h2>

  return (
    <div className="browse">
      <h1>Browse Anime</h1>
      <div className="browse-controls">
        <input
          type="text"
          placeholder="Search anime..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="browse-search"
        />
        <div className="browse-filters">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'ongoing' ? 'active' : ''} onClick={() => setFilter('ongoing')}>Ongoing</button>
          <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
        </div>
      </div>
      <div className="browse-grid">
        {filtered.length > 0 ? (
          filtered.map(anime => (
            <AnimeCard key={anime.id} anime={anime} watchlist={watchlist} setWatchlist={setWatchlist} />
          ))
        ) : (
          <p className="no-results">No anime found.</p>
        )}
      </div>
    </div>
  )
}

export default Browse