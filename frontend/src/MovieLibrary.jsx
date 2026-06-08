import { useState, useEffect } from "react";

export const MovieLibrary = () => {
    const [ movie, setMovie ] = useState([]);
    const [ search, setSearch ] = useState("")
    
    useEffect(()=>{
        fetch("http://localhost:8000/movies")
        .then(response => response.json())
        .then(data => { 
            setMovie(data)
        })
        .catch(error => console.log("ERROR", error))
    }, [])

    const handleChange = (e) => setSearch(e.target.value)

    const filteredMovies = movie.filter((movieData) => movieData.title.toLowerCase().includes(search.toLowerCase()))
    
    const handleDelete = (title) => {
        fetch(`http://localhost:8000/movies/${title}`, {
            method: "DELETE"
        })
        setMovie(movie.filter(movieData => movieData.title != title))
    }

    return(
        <>
        <p>Search movie</p>
       <input type="text" value={search} onChange={handleChange} />
       {filteredMovies.map((movieData) => {
        console.log(filteredMovies, "HOLA")
        return(
            <div key={movieData.title}>
                <p>{movieData.title}</p>
                <button
                    onClick={() => {
                        handleDelete(movieData.title)
                        }}> Delete movie
                </button>
            </div>
        )
        })}
       </>
    )
};