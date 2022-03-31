import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import Loading from './loading';

describe('Component: Loading', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Loading />
      </Router>,
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
