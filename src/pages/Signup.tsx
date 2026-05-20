function Signup() {
  return (
    <main>
      <h1>Create Account</h1>
      <p>
        New users will create an account before choosing their user type during
        first-time onboarding.
      </p>

      <form>
        <label>
          Full name
          <input type="text" placeholder="Full name" />
        </label>

        <label>
          Email
          <input type="email" placeholder="name@example.com" />
        </label>

        <label>
          Password
          <input type="password" placeholder="Create a password" />
        </label>

        <button type="button">Create account</button>
      </form>
    </main>
  );
}

export default Signup;
