import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';

function App() {
  return (
    <div className="meals">
<<<<<<< HEAD
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Login } />
          <Route exact path="/drinks" component={ Login } />
          <Route exact path="/meals/:id-da-receita" component={ Login } />
          <Route exact path="/drinks/:id-da-receita" component={ Login } />
          <Route exact path="/meals/:id-da-receita/in-progress" component={ Login } />
          <Route exact path="/drinks/:id-da-receita/in-progress" component={ Login } />
          <Route exact path="/profile" component={ Login } />
          <Route exact path="/done-recipes" component={ Login } />
          <Route exact path="/favorite-recipes" component={ Login } />
        </Switch>
      </BrowserRouter>
      {/* <span className="logo">TRYBE</span>
=======
      <span className="logo">TRYBE 2.0</span>
>>>>>>> origin
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object> */}
    </div>
  );
}

export default App;
