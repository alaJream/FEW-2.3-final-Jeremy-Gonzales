import React from 'react';
import App from './App';
import StarWars from './StarWars';

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/starwars">Star Wars</a></li>
        </ul>
      </nav>
      <main>
        {window.location.pathname === '/' && <App />}
        {window.location.pathname === '/starwars' && <StarWars />}
      </main>
    </div>
  );
}

export default Layout;
