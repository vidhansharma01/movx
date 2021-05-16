import PaginationBar from '@app/components/common/PaginationBar';
import MovieList from '@app/components/movies/MovieList';
import { searchMovies } from '@app/redux/actions/searchActions';
import { IRootState } from '@app/types/types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

const SearchMovieTab = () => {
  const dispatch = useDispatch();
  const { query } = useParams<{ query: string }>();
  const { movies, isLoading } = useSelector((state: IRootState) => ({
    movies: state.search.movies,
    isLoading: state.misc.isLoading
  }))
  const handlePageChange = (page: number) => {
    if (movies?.page !== page && !isLoading) {
      dispatch(searchMovies(`/search/movie?query=${query}`, page));
    }
  };

  return (movies && movies.results.length !== 0) ? (
    <>
      <MovieList movies={movies.results} />
      <PaginationBar
        activePage={movies.page}
        itemsCountPerPage={1}
        onChange={handlePageChange}
        pageRangeDisplayed={10}
        totalItemsCount={movies.total_pages}
        totalPage={movies.total_pages}
      />
    </>
  ) : (
    <div className="search__no-result">
      <h1>No movie found.</h1>
      <i className="fa fa-film" />
    </div>
  );
};

export default SearchMovieTab;
