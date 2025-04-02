import React from 'react';
import RecipeCard from '../components/RecipeCard';
import '../style/pages/RecipesPage.scss';

const dummyRecipes = [
    {
        id: 1,
        name: 'Spaghetti Bolognese',
        allergens: ['Gluten'],
        image: 'https://img.taste.com.au/5qlr1PkR/taste/2016/11/spaghetti-bolognese-106560-1.jpeg',
    },
    {
        id: 2,
        name: 'Chicken Salad',
        allergens: ['Nuts'],
        image: 'https://kalejunkie.com/wp-content/uploads/2023/04/ChickenSalad_Shot4_121.jpg',
    },
    {
        id: 3,
        name: 'Vegetable Stir Fry',
        allergens: [],
        image: 'https://kristineskitchenblog.com/wp-content/uploads/2024/01/vegetable-stir-fry-22-3.jpg',
    },
];

const RecipesPage: React.FC = () => {
    return (
        <div className="recipes-page">
            <h2>Recipes</h2>
            <div className="recipes-list">
                {dummyRecipes.map(recipe => (
                    <RecipeCard
                        key={recipe.id}
                        id={recipe.id}
                        name={recipe.name}
                        allergens={recipe.allergens}
                        image={recipe.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecipesPage;