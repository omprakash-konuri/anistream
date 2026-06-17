import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Browse() {
    const [animes, setAnimes] = useState([])
    useEffect(() =>{
        fetch('http://localhost:3000/api/v1/animes')
        .then((response)=>response.json())
        .then((data)=> setAnimes(data))
    }, [])
    return( 
    <div>
        <h1> Browse page</h1>
        <ul>
            {/* <li><Link to="/anime/1">Naruto</Link></li>
            <li><Link to="/anime/2">One Piece</Link></li>
            <li><Link to="/anime/3">Attack On Titan</Link></li> */}
            {animes.map((anime) => (
                <li key={anime.id}>
                    <Link to={`/anime/${anime.id}`}>{anime.title}</Link>
                </li>
               )
              )
            }
        </ul>
    </div>
    )
}

export default Browse