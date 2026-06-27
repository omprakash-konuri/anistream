import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import './Watch.css'
import { apiFetch } from '../utils/api'

function Watch() {
  const { id } = useParams()
  const [episode, setEpisode] = useState(null)
  const [loading, setLoading] = useState(true)
  const videoRef = useRef(null)
  const playerRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    apiFetch(`/api/v1/episodes/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(res => res.json())
        .then(data => {
        setEpisode(data)
        setLoading(false)
    })
  }, [id])

  useEffect(() => {
    if (episode && videoRef.current) {
      playerRef.current = new Plyr(videoRef.current, {
        controls: [
          'play-large', 'play', 'progress',
          'current-time', 'mute', 'volume',
          'fullscreen'
        ]
      })

      const interval = setInterval(() => {
        if (playerRef.current && !playerRef.current.paused) {
          const progress = Math.floor(playerRef.current.currentTime)
          const token = localStorage.getItem('token')

          apiFetch(`/api/v1/watch_history`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              episode_id: episode.id,
              progress_seconds: progress
            })
          })
        }
      }, 10000)

      return () => {
        if (playerRef.current) playerRef.current.destroy()
        clearInterval(interval)
      }
    }
  }, [episode])

  if (loading) return <h2>Loading...</h2>

  return (
    <div className="watch">
      <div className="watch-player">
        <video
          ref={videoRef}
          controls
          playsInline
        >
          <source src={episode.video_url} type="video/mp4" />
        </video>
      </div>
      <div className="watch-info">
        <h1>{episode.title}</h1>
        <p>{episode.description}</p>
      </div>
    </div>
  )
}

export default Watch