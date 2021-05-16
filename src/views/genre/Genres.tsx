import Container from '@app/components/common/Container';
import LoadingScreen from '@app/components/common/LoadingScreen';
import GenreCard from '@app/components/genres/GenreCard';
import { isEmpty } from '@app/helpers/helperFunctions';
import useDocumentTitle from '@app/hooks/useDocumentTitle';
import { fetchGenres } from '@app/redux/actions/genreActions';
import { IRootState } from '@app/types/types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



const Genres = () => {
  const { genres, isLoading } = useSelector((state: IRootState) => ({
    genres: state.genre.genres,
    isLoading: state.misc.isLoading
  }));
  const dispatch = useDispatch();

  useDocumentTitle('Genres | MOVX');
  useEffect(() => {
    if (isEmpty(genres)) {
      dispatch(fetchGenres('/genre/movie/list?'));
    }
  }, []);

  return (
    <Container>
      {isLoading && <LoadingScreen message="Loading Genres" />}
      {genres.length >= 1 && (
        <>
          <div className="header__title text-center">
            <br /><br />
            <h1>Genres</h1>
          </div>
          <div className="genre__wrapper">
            {genres.map((genre) => {
              return (
                <GenreCard
                  genre={genre}
                  key={genre.id}
                />
              );
            })}
          </div>
        </>
      )}
    </Container>
  );
};

export default Genres;
