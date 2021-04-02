import { MovieCard } from './MovieCard';

import '../styles/content.scss';

export interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProp {
  movies: MovieProps[];
  selectedGenreTitle: string;
}

export function Content(props: ContentProp) {
  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {props.selectedGenreTitle}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {props.movies.map(movie => (
            <MovieCard 
              key ={movie.imdbID} 
              title={movie.Title} 
              poster={movie.Poster} 
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
