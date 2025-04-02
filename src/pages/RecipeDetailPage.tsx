import React from "react";
import '../style/pages/RecipeDetailPage.scss';

const dummyRecipe =
    {
        id: 1,
        name: 'Spaghetti Bolognese',
        allergens: ['Gluten'],
        ingredients: ['Spaghetti', 'Tomato Sauce', 'Beef'],
        steps: ['Boil water', 'Cook beef', 'Combine'],
        image: 'https://img.taste.com.au/5qlr1PkR/taste/2016/11/spaghetti-bolognese-106560-1.jpeg',
    };

const RecipeDetailPage: React.FC = () => {
    const [recipe, setRecipe] = React.useState(dummyRecipe);

    return (
        <div className="recipe-detail">
            <div className="top-section">
                <img className="recipe-image" src={recipe.image} alt={recipe.name} />
                <div className="recipe-info">
                    <h1>{recipe.name}</h1>
                    <div className="ingredients-container">
                        <h2>Ingredients</h2>
                        <ul className="ingredients-list">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index} className="ingredient-item">{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="allergens-container">
                        <h2>Allergens</h2>
                        <ul className="allergens-list">
                            {recipe.allergens.map((allergen, index) => (
                                <li key={index} className="allergen-item">{allergen}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="steps-section">
                <h2>Steps</h2>
                <ol>
                    {recipe.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default RecipeDetailPage;