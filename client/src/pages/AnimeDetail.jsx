import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { apiFetch } from '../utils/api'
import './AnimeDetail.css'

function AnimeDetail() {
  const { token } = useAuth()
  const { id } = useParams()
  const navigate = useNavigate()
  const [anime, setAnime] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      apiFetch(`/api/v1/animes/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(r => r.json()),
      apiFetch(`/api/v1/animes/${id}/episodes`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(r => r.json())
    ]).then(([animeData, episodesData]) => {
      setAnime(animeData)
      setEpisodes(episodesData)
      setLoading(false)
    })
  }, [id, token])

  if (loading) {
    return (
      <div className="anime-detail">
        <div className="anime-detail-hero" style={{ background: 'var(--bg-secondary)', height: '200px', borderRadius: '8px', marginBottom: '40px' }}></div>
        <div style={{ height: '24px', width: '200px', background: 'var(--bg-secondary)', borderRadius: '4px', marginBottom: '20px' }}></div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{ height: '80px', background: 'var(--bg-secondary)', borderRadius: '8px', marginBottom: '12px' }}></div>
        ))}
      </div>
    )
  }

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    return `${mins} min`
  }

  return (
    <div className="anime-detail">
      <div
        className="anime-detail-hero"
        style={{
          backgroundImage: anime.banner_url
            ? `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(20,20,20,1)), url(${anime.banner_url})`
            : 'none'
        }}
      >
        <div className="anime-detail-info">
          <h1>{anime.title}</h1>
          <div className="anime-detail-meta">
            <span className={`status ${anime.status}`}>{anime.status}</span>
            <span>{anime.release_year}</span>
          </div>
          <p className="anime-detail-description">{anime.description}</p>
        </div>
      </div>

      <div className="episodes-section">
        <h2>Episodes</h2>
        {episodes.length === 0 ? (
          <div className="episodes-empty">
            <p>No episodes available yet.</p>
          </div>
        ) : (
          <div className="episodes-list">
            {episodes.map(episode => (
              <div
                key={episode.id}
                className="episode-card"
                onClick={() => navigate(`/watch/${episode.id}`)}
              >
                <div className="episode-number">
                  S{episode.season_number} E{episode.episode_number}
                </div>
                <div className="episode-info">
                  <h4>{episode.title}</h4>
                  <p>{episode.description}</p>
                </div>
                <div className="episode-duration">
                  {formatDuration(episode.duration_seconds)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AnimeDetail