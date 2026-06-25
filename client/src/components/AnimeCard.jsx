import { useNavigate } from 'react-router-dom'
import './AnimeCard.css'

function AnimeCard({ anime }) {
  const navigate = useNavigate()

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
      </div>
      <div className="anime-card-info">
        <h4>{anime.title}</h4>
        <span className={`status ${anime.status}`}>{anime.status}</span>
      </div>
    </div>
  )
}

export default AnimeCard