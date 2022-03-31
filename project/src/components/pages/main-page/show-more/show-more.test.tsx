import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import ShowMore from './show-more';

const onFakeClick = jest.fn();

describe('Component: ShowMore', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ShowMore onClick={onFakeClick}/>
      </Router>,
    );

    expect(screen.getByText(/Show more/i)).toBeInTheDocument();
  });
});
