import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="status-page" id="main-content" tabIndex={-1}>
      <h1>Page not found</h1>
      <p>This page may have moved or may not be available in the beta.</p>
      <Link to="/degrees?from=current-bellini-student">Open Degree Explorer</Link>
      <Link to="/">Select your user group</Link>
    </main>
  );
}
