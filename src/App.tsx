import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipesPage from './pages/RecipesPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import './style/App.scss';

const App: React.FC = () => {
  return (
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" Component={RecipesPage} />
              <Route path="/recipes" Component={RecipesPage} />
              <Route path="/search" Component={SearchPage} />
              <Route path="/profile" Component={ProfilePage} />
            </Routes>
          </div>
        </div>
      </Router>
  );
};

export default App;
