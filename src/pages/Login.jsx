import React from 'react';
import { useHistory } from 'react-router-dom';
// import Footer from '../component/Footer';

function Login() {
  const history = useHistory();
  console.log(history);
  return (
    <div>
      Login
      {/* {console.log(history.location.pathname)} */}
    </div>
  );
}

export default Login;
