import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import { BASE_URL } from './utils/constants/constants';

function App() {

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)


  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/films`);
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const data = await response.json();

      const transformedMovies = data.result.map((movieData) => {
        return {
          id: movieData.properties.episode_id,
          title: movieData.properties.title,
          release_date: movieData.properties.release_date,
          openingText: movieData.properties.opening_crawl,
        };

      });
      setMovies(transformedMovies)
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false)

  }, [])
  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])
  //------------------------ version -with -then

  // function fetchMoviesHandler() {
  //   fetch(`${BASE_URL}/films`).then((response) => {
  //     return response.json();
  //   }).then((data) => {
  //     // console.log(data.result)
  //     const transformedMovies = data.result.map((movieData) => {
  //       return {
  //         id: movieData.properties.episode_id,
  //         title: movieData.properties.title,
  //         release_date: movieData.properties.release_date,
  //         openingText: movieData.properties.opening_crawl,
  //       };

  //     })
  //     setMovies(transformedMovies)
  //   })
  // }

  let content = <p>Found no movies</p>
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  if (error) {
    content = <p>{error}</p>
  }
  if (isLoading) {
    content = <p>...Loading</p>
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {/*    version - conditional rendering
        {isLoading && <p>...Loading</p>}
        {!isLoading && movies.length === 0 && <p>Found no movies</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />} */}
        {console.log(movies)}
      </section>
    </React.Fragment>
  );
}

export default App;
