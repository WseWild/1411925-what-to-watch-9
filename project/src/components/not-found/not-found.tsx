import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import { AppRoute } from '../../const';

export default function NotFound(): JSX.Element {
  return (
    <div className="page-content">
      <div>
        <h1>404 Page Not Found</h1>
        <Link to={AppRoute.Main}>
          to Main Page
        </Link>
      </div>
      <Footer />
    </div>
  );
}
