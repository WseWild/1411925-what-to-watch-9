import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { makeFakeFilm } from '../../../../mocks/film-data';
import FilmTabOverview from './film-tab-overview';

const fakeFilm = makeFakeFilm();

describe('Component: FilmTabOverview', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <FilmTabOverview film={fakeFilm} />
      </Router>,
    );

    expect(screen.getByText(`${fakeFilm.scoresCount} ratings`)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${fakeFilm.director}`)).toBeInTheDocument();
  });
});
