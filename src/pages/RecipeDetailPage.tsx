import React, {useEffect, useState} from "react";
import '../style/pages/RecipeDetailPage.scss';
import * as api from "../backend/apiService";
import {useParams} from "react-router-dom";
import {RecipeResponse} from "../backend/apiService";
import Loading from "../components/Loading";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const RecipeDetailPage: React.FC = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState<RecipeResponse|undefined>(undefined);
    const [isSaved, setIsSaved] = useState<boolean>(false);

    useEffect(() => {
        if (recipeId) {
            const idNumber = Number(recipeId);
            api.fetchRecipe(idNumber).then((res) => {
                setRecipe(res);
                api.fetchUser().then(res => {
                    setIsSaved(res.savedRecipeIds.includes(idNumber));
                });
            });
        }
    }, [recipeId]);

    const handleBookmarkClicked = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!recipe) return;
        if (!isSaved) api.saveRecipe(recipe.id).then();
        else api.removeSavedRecipe(recipe.id).then();
        setIsSaved(!isSaved);
    };

    return !recipe ? (<Loading />) : (
        <div className="recipe-detail">
            <div className="top-section">
                <img className="recipe-image" src={recipe.image} alt={recipe.name} />
                <div className="recipe-info">
                    <div className="name-section">
                        <h1>{recipe.name}</h1>
                        <div
                            className="bookmark-container"
                            onClick={handleBookmarkClicked}
                        >
                            {
                                isSaved ?
                                    (<BookmarkIcon fontSize="large" />) :
                                    (<BookmarkBorderIcon fontSize="large" />)
                            }
                        </div>
                    </div>
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
                    <div className="description-container">
                        <p>{recipe.description}</p>
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