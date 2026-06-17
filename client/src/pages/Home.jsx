import { useState, useEffect } from 'react'

function Home() {
  const [animes, setAnimes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/animes')
      .then(response => response.json())
      .then(data => {
        setAnimes(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <h2>Loading...</h2>

  return (
    <div>
      <h1>Anime List</h1>
      {animes.map(anime => (
        <div key={anime.id}>
          <h3>{anime.title}</h3>
          <p>{anime.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Home