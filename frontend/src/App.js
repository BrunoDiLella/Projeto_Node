import React from 'react';
import './App.css';

import logo from './assets/logo.svg';

function App() {
  return (
    <div className="container">
      <img src={logo} alt="AirCnC"/>

      <div className="content">
        <p>
          texto
        </p>

        <form>
          <label htmlFor="email*"E-MAIL ></label>
        </form>
      </div>
    </div>
  );
}

export default App;
 