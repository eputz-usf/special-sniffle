import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccount, getSavedUserType, login } from '../utils/auth';
import { getDashboardRoute } from '../utils/userTypes';

function Login() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'create-account' | 'login'>(
    'create-account',
  );
  const [message, setMessage] = useState('');

  const isCreatingAccount = authMode === 'create-account';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    if (isCreatingAccount) {
      const fullName = String(formData.get('fullName') ?? '');

      await createAccount({
        fullName,
        email,
        password,
      });

      setMessage('');
      navigate('/select-user-type');
      return;
    }

    await login({
      email,
      password,
    });

    const savedUserType = await getSavedUserType();
    const dashboardRoute = savedUserType ? getDashboardRoute(savedUserType) : '';

    if (dashboardRoute) {
      setMessage('');
      navigate(dashboardRoute);
      return;
    }

    setMessage(
      'No saved user group was found yet. Create an account and select a user group first.',
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-label="Account access form">
        <div className="auth-heading">
          <h1>Welcome!</h1>
          <p>
            {isCreatingAccount
              ? 'Create a new account to start using the platform! Already have an account? Go to Log in'
              : 'Log in to return to your dashboard.'}
          </p>
        </div>

        <div className="auth-switcher">
          <button
            className={isCreatingAccount ? 'active' : ''}
            type="button"
            onClick={() => setAuthMode('create-account')}
          >
            Create Account
          </button>
          <button
            className={!isCreatingAccount ? 'active' : ''}
            type="button"
            onClick={() => setAuthMode('login')}
          >
            Log In
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isCreatingAccount && (
            <label>
              Full name
              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                required
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder={
                isCreatingAccount ? 'Create a password' : 'Enter your password'
              }
              required
            />
          </label>

          {isCreatingAccount && (
            <label>
              Confirm password
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                required
              />
            </label>
          )}

          {message && <p className="form-message">{message}</p>}

          <button type="submit">
            {isCreatingAccount ? 'Create account' : 'Log in'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
