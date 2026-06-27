import AnimeCard from './AnimeCard'
import './AnimeRow.css'

function AnimeRow({ title, animes, watchlist, setWatchlist }) {
  return (
    <div className="anime-row">
      <h2 className="anime-row-title">{title}</h2>
      <div className="anime-row-cards">
        {animes.map(anime => (
          <AnimeCard
            key={anime.id}
            anime={anime}
            watchlist={watchlist}
            setWatchlist={setWatchlist}
          />
        ))}
      </div>
    </div>
  )
}

export default AnimeRow