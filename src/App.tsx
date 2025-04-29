import React from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipesPage from './pages/RecipesPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import './style/App.scss';
import LoginPage from "./pages/LoginPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";

const App: React.FC = () => {
    return (
        <Router>
            <Main />
        </Router>
    );
};

const Main: React.FC = () => {
    const location = useLocation();
    const hideNavbar = location.pathname === '/hideable';

    return (
        <div className="app-container">
            {!hideNavbar && <Navbar />}
            <div className="content">
                <Routes>
                    <Route path="/" Component={RecipesPage} />
                    <Route path="/recipes" Component={RecipesPage} />
                    <Route path="/search" Component={SearchPage} />
                    <Route path="/profile" Component={ProfilePage} />
                    <Route path="/login" Component={LoginPage} />
                    <Route path="/recipe/:recipeId" Component={RecipeDetailPage} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
