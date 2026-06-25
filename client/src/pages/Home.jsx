import { useState, useEffect } from 'react'
import AnimeRow from '../components/AnimeRow'
import './Home.css'

function Home() {
  const [animes, setAnimes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/animes')
      .then(res => res.json())
      .then(data => {
        setAnimes(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <h2>Loading...</h2>

  const ongoing = animes.filter(a => a.status === 'ongoing')
  const completed = animes.filter(a => a.status === 'completed')

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to AniStream</h1>
        <p>Watch your favourite anime, anytime.</p>
      </div>
      <AnimeRow title="Ongoing" animes={ongoing} />
      <AnimeRow title="Completed" animes={completed} />
      <AnimeRow title="All Anime" animes={animes} />
    </div>
  )
}

export default Home