import React, {useEffect, useState} from 'react';
import RecipeCard from '../components/RecipeCard';
import '../style/pages/RecipesPage.scss';
import {RecipeResponse} from "../backend/apiService";
import * as api from "../backend/apiService";
import {useParams} from "react-router-dom";

// TODO: remove placeholder

const placeholderRecipe = {
    id: 100,
    name: 'Spaghetti Bolognese',
    allergens: ['Gluten'],
    image: 'https://img.taste.com.au/5qlr1PkR/taste/2016/11/spaghetti-bolognese-106560-1.jpeg'
}

const RecipesPage: React.FC = () => {
    const [recipes, setRecipes] = useState<RecipeResponse[]>([]);

    useEffect(() => {
        api.searchRecipes("").then(r => setRecipes(r));
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
                        allergens={recipe.allergens ? recipe.allergens : placeholderRecipe.allergens}
                        image={recipe.image ? recipe.image : placeholderRecipe.image}
                        isSaved={false}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecipesPage;