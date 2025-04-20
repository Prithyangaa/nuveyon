import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center my-4">
      <h1 className="display-1">404</h1>
      <h2>Page Not Found</h2>
      <p className="lead">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </div>
  );
}

export default NotFound;