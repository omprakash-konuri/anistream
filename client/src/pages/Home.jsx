import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { apiFetch } from '../utils/api'
import AnimeRow from '../components/AnimeRow'
import './Home.css'

function Home() {
  const { token } = useAuth()
  const [animes, setAnimes] = useState([])
  const [watchlist, setWatchlist] = useState([])
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

  if (loading) return <h2>Loading...</h2>

  const ongoing = animes.filter(a => a.status === 'ongoing')
  const completed = animes.filter(a => a.status === 'completed')

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to AniStream</h1>
        <p>Watch your favourite anime, anytime.</p>
      </div>
      <AnimeRow title="Ongoing" animes={ongoing} watchlist={watchlist} setWatchlist={setWatchlist} />
      <AnimeRow title="Completed" animes={completed} watchlist={watchlist} setWatchlist={setWatchlist} />
      <AnimeRow title="All Anime" animes={animes} watchlist={watchlist} setWatchlist={setWatchlist} />
    </div>
  )
}

export default Home