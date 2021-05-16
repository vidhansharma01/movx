import Container from '@app/components/common/Container';
import PaginationBar from '@app/components/common/PaginationBar';
import withLoader from '@app/components/hoc/withLoader';
import PeopleList from '@app/components/people/PeopleList';
import { numberWithCommas } from '@app/helpers/helperFunctions';
import useDocumentTitle from '@app/hooks/useDocumentTitle';
import usePageSaver from '@app/hooks/usePageSaver';
import { fetchPeople } from '@app/redux/actions/peopleActions';
import { IRootState } from '@app/types/types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const People = () => {
  const { people, isLoading } = useSelector((state: IRootState) => ({
    people: state.people.people,
    isLoading: state.misc.isLoading
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();
  const query = '/person/popular?';

  useDocumentTitle('Discover People | MOVX');
  useEffect(() => {
    if (people) {
      dispatch(fetchPeople(query, currentPage));
    }
  }, []);

  const handlePageChange = (page: number) => {
    if (people?.page !== page) {
      dispatch(fetchPeople(query, page));
      setCurrentPage(page)
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Popular People</h1>
          <h3>{numberWithCommas(people?.total_results || 0)} People</h3>
        </div>
      </div>
      <PeopleList
        people={people?.results || []}
        templateCount={10}
      />
      {people && (
        <PaginationBar
          activePage={people.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={people.total_pages}
          totalPage={people.total_pages}
        />
      )}
    </Container>
  );
};

export default withLoader('people')(People);
