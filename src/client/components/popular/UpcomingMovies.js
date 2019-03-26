import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingScreen from '../layout/LoadingScreen'; 
import MovieCard from '../movies/MovieCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';

// actions
import { fetchRequest, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const UpcomingMovies = (props) => {
  const { upcomingMovies } = props;
  const queryString = 'movie/upcoming?';

  useEffect(() => {
    if (isEmpty(props.upcomingMovies)) {
      props.fetchRequest('FETCH_UPCOMING_MOVIES', queryString);
    }
  }, []);

  const handlePageChange = (e) => {
    if (props.upcomingMovies.page !== e && !props.isLoading) {
      props.isCurrentlyFetching();
      props.fetchRequest('FETCH_UPCOMING_MOVIES', queryString, e);
    }
  };
 
  return (
    <React.Fragment>
      {isEmpty(upcomingMovies) && <LoadingScreen />}
      <div className="container">
        <div className="container__wrapper container__movies">
          {!isEmpty(upcomingMovies) && (
            <React.Fragment>
              <div className="movie__header">
                <div className="movie__header-title">
                  <h1>Upcoming Movies</h1>
                  <h3>{numberWithCommas(upcomingMovies.total_results)} Movies</h3>
                </div>
              </div>
              <div className="movie__wrapper">
                {upcomingMovies.results.map((movie, index) => {
                  return (
                    <MovieCard 
                        category="movie"
                        key={`${movie.id}_${index}`}
                        movie={movie} 
                    />
                  )
                })}
              </div>
              <PaginationBar 
                  activePage={upcomingMovies.page}
                  itemsCountPerPage={1}
                  onChange={handlePageChange}
                  pageRangeDisplayed={10}
                  totalItemsCount={upcomingMovies.total_pages}
                  totalPage={upcomingMovies.total_pages}
            />
            <Footer />
            </React.Fragment>
          )}
        </div>  
    </div>
    </React.Fragment>
  );
};

UpcomingMovies.propTypes = {
  fetchRequest: PropTypes.func,
  isCurrentlyFetching: PropTypes.func,
  upcomingMovies: PropTypes.shape({
    page: PropTypes.number,
    total_page: PropTypes.number,
    total_results: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object)
  })
};

const mapStateToProps = ({ upcomingMovies }) => ({
  upcomingMovies
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingMovies);
