import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404: Page Not Found</h1>
      <h2>Sorry!</h2>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default NotFound;
