import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingScreen from '../layout/LoadingScreen'; 
import PeopleCard from './PeopleCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';

// actions
import { fetchRequest, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const People = (props) => {
  const { people } = props;

  useEffect(() => {
    if (isEmpty(props.people)) {
      props.fetchRequest('FETCH_PEOPLE', 'person/popular?');
    } 
  }, []);

  const handlePageChange = (e) => {
    if (props.people.page !== e) {
      props.isCurrentlyFetching();
      props.fetchRequest('FETCH_PEOPLE', 'person/popular?', e);
    }
  };

  return (
    <React.Fragment>
      {isEmpty(people) && <LoadingScreen />}
      <div className="container">
        <div className="container__wrapper container__movies">
          {!isEmpty(people) && (
            <React.Fragment>
            <div className="movie__header">
              <div className="movie__header-title">
                <h1>Popular People</h1>
                <h3>{numberWithCommas(people.total_results)} People</h3>
              </div>
            </div>
            <div className="movie__wrapper">
              {people.results.map((person) => {
                return (
                  <PeopleCard 
                      category="people"
                      key={person.id}
                      people={person} 
                  />
                )
              })}
            </div>
            <PaginationBar 
                activePage={people.page}
                itemsCountPerPage={1}
                onChange={handlePageChange}
                pageRangeDisplayed={10}
                totalItemsCount={people.total_pages}
                totalPage={people.total_pages}
            />
            <Footer />
            </React.Fragment>
          )}
        </div>  
      </div>
    </React.Fragment>
  );
};

People.propTypes = {
  fetchRequest: PropTypes.func,
  isCurrentlyFetching: PropTypes.func,
  people: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.object),
    page: PropTypes.number,
    total_pages: PropTypes.number,
    total_results: PropTypes.number
  })
};

const mapStateToProps = ({ people }) => ({
  people
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(People);
