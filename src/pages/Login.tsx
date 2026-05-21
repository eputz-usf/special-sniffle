import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  function handleContinueWithUsfLogin() {
    navigate('/profile');
  }

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-label="USF login placeholder">
        <div className="auth-heading">
          <h1>Welcome!</h1>
          <p>
            Continue with your USF login to access the platform. After login,
            you will be directed to your profile.
          </p>
        </div>

        <div className="auth-actions">
          <button type="button" onClick={handleContinueWithUsfLogin}>
            Continue with USF Login
          </button>
        </div>
      </section>
    </main>
  );
}

export default Login;
