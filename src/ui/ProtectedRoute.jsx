import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  // Load the authenticated user
  const navigate = useNavigate();

  const { isAuthenticated, isLoading, fetchStatus } = useUser();
  // If there is no authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isLoading && !isAuthenticated && fetchStatus !== 'fetching') navigate('/login');
    },
    [isAuthenticated, isLoading, fetchStatus, navigate]
  );
  // While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // If there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
