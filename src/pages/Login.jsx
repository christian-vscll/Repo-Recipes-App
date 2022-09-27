import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { saveEmail,
  saveMealsToken, saveDrinksToken } from '../tests/helper/localStorage';
import Header from '../component/Header';
import Footer from '../component/Footer';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnIsDisable, setBtnIsDisable] = useState(true);
  const MIN_PASSWORD_LENGTH = 6;
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (event) => {
    event.preventDefault();
    saveEmail(email);
    saveMealsToken();
    saveDrinksToken();
    history.push('/meals');
  };

  const checkValidInput = () => {
    const passwordLength = password.length;
    if (EMAIL.test(email) && passwordLength >= MIN_PASSWORD_LENGTH) {
      setBtnIsDisable(false);
    } else {
      setBtnIsDisable(true);
    }
  };

  const emailHandleChange = ({ target }) => {
    setEmail(target.value);
    checkValidInput();
  };

  const passwordHandleChange = ({ target }) => {
    setPassword(target.value);
    checkValidInput();
  };

  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <form action="">
          <label htmlFor="#">
            <input
              type="email"
              name="email"
              id="email"
              data-testid="email-input"
              onChange={ ({ target }) => {
                emailHandleChange({ target });
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
        <footer>
          <Footer />
        </footer>
      </main>
    </div>
  );
}

export default Login;
