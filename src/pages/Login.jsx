import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnIsDisable, setBtnIsDisable] = useState(true);
  const MIN_PASSWORD_LENGTH = 6;
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // branch git merge main-group-9

  const emailHandleChange = ({ target }) => {
    setEmail(target.value);
  };

  const passwordHandleChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleSubmit = () => {
    // setEmail('');
  };

  const checkValidInput = () => {
    const passwordLength = password.length;
    if (EMAIL.test(email) && passwordLength >= MIN_PASSWORD_LENGTH) {
      setBtnIsDisable(false);
    }
  };
  return (
    <main>
      Login
      <form action="">
        <label htmlFor="#">
          <input
            type="email"
            name="email"
            id="email"
            data-testid="email-input"
            onChange={ ({ target }) => {
              emailHandleChange({ target });
              checkValidInput();
            } }
            value={ email }
          />
        </label>

        <label htmlFor="#">
          <input
            type="password"
            name="password"
            id="password"
            data-testid="password-input"
            onChange={ ({ target }) => {
              passwordHandleChange({ target });
              checkValidInput();
            } }
            value={ password }
          />
        </label>

        <button
          type="submit"
          data-testid="login-submit-btn"
          onClick={ handleSubmit }
          disabled={ btnIsDisable }
        >
          Enter
        </button>
      </form>
    </main>
  );
}

export default Login;
