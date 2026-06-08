import { useState } from "react";

export const AddMovie = () => {
    const [title, setTitle ] = useState("");
    const [year, setYear] = useState("");
    const [genre, setGenre] = useState("")

    const handleClick = () => {
        fetch("http://localhost:8000/movies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        title: title,
                        year: year,
                        genre: genre
                    }
                )
        })
        .then(() => window.location.reload())
    };

    const handleTitleChange = (e) => setTitle(e.target.value)
    const handleYearChange = (e) => setYear(e.target.value)
    const handleGenreChange = (e) => setGenre(e.target.value)

    return(
        <>  <p>Title</p>
            <input value={title} onChange={handleTitleChange}/>
            <p>Year</p>
            <input value={year} onChange={handleYearChange}/>
            <p>Genre</p>
            <input value={genre} onChange={handleGenreChange}/>
            <br/>
            <br/>
            <button onClick={handleClick}>Add movie</button>
        </>
    )
};