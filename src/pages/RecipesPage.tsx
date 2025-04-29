import React, {useEffect, useState} from 'react';
import RecipeCard from '../components/RecipeCard';
import '../style/pages/RecipesPage.scss';
import {RecipeResponse} from "../backend/apiService";
import * as api from "../backend/apiService";
import {useParams} from "react-router-dom";

const RecipesPage: React.FC = () => {
    const [recipes, setRecipes] = useState<RecipeResponse[]>([]);
    const [savedIds, setSavedIds] = useState<number[]>([]);

    useEffect(() => {
        api.searchRecipes("").then(r => setRecipes(r));
        api.fetchUser().then(res => setSavedIds(res.savedRecipeIds));
    }, []);

    return (
        <div className="recipes-page">
            <h2>Recipes</h2>
            <div className="recipes-list">
                {recipes.map(recipe => (
                    <RecipeCard
                        key={recipe.id}
                        id={recipe.id}
                        name={recipe.name}
                        allergens={recipe.allergens}
                        image={recipe.image}
                        initIsSaved={savedIds.includes(recipe.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecipesPage;