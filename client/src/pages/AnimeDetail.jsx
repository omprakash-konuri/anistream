import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

function AnimeDetail() {
   const { id } = useParams()
   const [anime, setAnime] = useState(null)

   useEffect(()=>{
    fetch(`http://localhost:3000/api/v1/animes/${id}`)
    .then((response)=> response.json())
    .then((data)=>setAnime(data))
   },[id])

   if (!anime){
    return <p>Loading...</p>
   }
   return(
    // <div>
    //     <h1>Anime Detail Page for ID: {id}</h1>
    // </div>

    <div>
        <h1>{anime.title}</h1>
        <p>{anime.description}</p>
        <p>Released: {anime.release_year}</p>
        <p>Status:{anime.status}</p>
    </div>
   )    
}

export default AnimeDetail