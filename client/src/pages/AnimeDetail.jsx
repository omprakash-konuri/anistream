import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './AnimeDetail.css'

function AnimeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [anime, setAnime] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:3000/api/v1/animes/${id}`).then(r => r.json()),
      fetch(`http://localhost:3000/api/v1/animes/${id}/episodes`).then(r => r.json())
    ]).then(([animeData, episodesData]) => {
      setAnime(animeData)
      setEpisodes(episodesData)
      setLoading(false)
    })
  }, [id])

  if (loading) return <h2>Loading...</h2>

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    return `${mins} min`
  }

  return (
    <div className="anime-detail">
      <div className="anime-detail-hero">
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
          <p>No episodes available.</p>
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