from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Movie

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.delete("/movies/{title}")
def delete_movie(title: str):
    for movie in movies:
        if title.lower() == movie["title"].lower():
            movies.remove(movie)
    return movies
