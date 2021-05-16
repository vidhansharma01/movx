import React from 'react';
import useDocumentTitle from '@app/hooks/useDocumentTitle';
import { RouteComponentProps } from 'react-router';

const NetworkError: React.FC<RouteComponentProps> = ({ history }) => {
  useDocumentTitle('Network Error');
  const returnHome = () => {
    history.push('/');
  };

  return (
    <div className="error">
      <h1>Network Error</h1>
      <p>It looks like you don't have an intenet connection</p>
      <button
        className="button--primary"
        onClick={returnHome}
      >
        Okay
      </button>
    </div>
  );
};

export default NetworkError;
