import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

function Admin() {
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [animes, setAnimes] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'ongoing',
    release_year: '',
    thumbnail_url: '',
    banner_url: ''
  })
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/')
      return
    }

    fetch('http://localhost:3000/api/v1/animes', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setAnimes(data)
        setLoading(false)
      })
  }, [user, token])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3000/api/v1/animes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form)
    })

    const data = await response.json()

    if (response.ok) {
      setAnimes([...animes, data])
      setMessage('Anime added successfully!')
      setForm({
        title: '',
        description: '',
        status: 'ongoing',
        release_year: '',
        thumbnail_url: '',
        banner_url: ''
      })
    } else {
      setMessage(data.errors?.join(', '))
    }
  }

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/v1/animes/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    setAnimes(animes.filter(a => a.id !== id))
  }

  if (loading) return <h2>Loading...</h2>

  return (
    <div className="admin">
      <h1>Admin Panel</h1>

      <div className="admin-form-section">
        <h2>Add New Anime</h2>
        {message && <p className="admin-message">{message}</p>}
        <form className="admin-form" onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
          <input name="release_year" placeholder="Release Year" type="number" value={form.release_year} onChange={handleChange} />
          <input name="thumbnail_url" placeholder="Thumbnail URL" value={form.thumbnail_url} onChange={handleChange} />
          <input name="banner_url" placeholder="Banner URL" value={form.banner_url} onChange={handleChange} />
          <button type="submit">Add Anime</button>
        </form>
      </div>

      <div className="admin-list-section">
        <h2>All Anime ({animes.length})</h2>
        <div className="admin-anime-list">
          {animes.map(anime => (
            <div key={anime.id} className="admin-anime-item">
              <div className="admin-anime-info">
                <h4>{anime.title}</h4>
                <span className={`status ${anime.status}`}>{anime.status}</span>
                <span>{anime.release_year}</span>
              </div>
              <button
                className="admin-delete-btn"
                onClick={() => handleDelete(anime.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Admin