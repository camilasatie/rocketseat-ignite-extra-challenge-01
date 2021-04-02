import { useEffect, useState } from 'react';

import { SideBar, GenreResponseProps } from './components/SideBar';
import { Content, MovieProps } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  
  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar 
        genres={genres}
        selectedGenreId={selectedGenreId}
        onClickButton={handleClickButton}
      />
      <Content 
        selectedGenreTitle={selectedGenre.title}
        movies={movies}
      />
    </div>
  )
}