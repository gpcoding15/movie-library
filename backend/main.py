from fastapi import FastAPI
from models import Movie

app = FastAPI()

movies = [
        {
            "title": "Matrix",
            "year": 1999,
            "genre": "Sci-Fi"
        },
        {
            "title": "Interstellar",
            "year": 2014,
            "genre": "Sci-Fi"
        }
    ]

@app.get("/movies")
def get_movies():
    
    return movies

@app.get("/movies/search/")
def get_title(title: str):
    result = []
    for movie in movies:
        if title.lower()  in movie["title"].lower():
            result.append(movie)
    return result
 
@app.post("/movies")
def create_movie(movie: Movie):
    movies.append(movie.model_dump())
    return movie

