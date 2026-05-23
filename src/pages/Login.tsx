import { useEffect, useState } from 'react';
import { getSavedUserType } from '../utils/auth';
import { getDashboardRoute } from '../utils/userTypes';

function Login() {
  const [dashboardRoute, setDashboardRoute] = useState('/');

  useEffect(() => {
    async function loadSelectedGroup() {
      const savedUserType = await getSavedUserType();
      const savedDashboardRoute = savedUserType
        ? getDashboardRoute(savedUserType)
        : '';

      setDashboardRoute(savedDashboardRoute || '/');
    }

    loadSelectedGroup();
  }, []);

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-label="USF login placeholder">
        <div className="auth-heading">
          <h1>Welcome!</h1>
          <p>
            Continue with your USF login to access the platform. After login,
            you will be directed to your dashboard.
          </p>
        </div>

        <div className="auth-actions">
          <a className="button-link" href={dashboardRoute}>
            Continue with USF Login
          </a>
        </div>
      </section>
    </main>
  );
}

export default Login;
