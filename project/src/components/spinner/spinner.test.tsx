import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render } from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <Spinner />
      </Router>,
    );

    expect(container.firstChild).toHaveClass('lds-ripple');
  });
});
