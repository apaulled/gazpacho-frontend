import React, {useEffect, useState} from 'react';
import {RecipeResponse, UserResponse} from "../backend/apiService";
import RecipeCard from "../components/RecipeCard";
import profileImage from "../resources/gazpacho_profile.png";
import '../style/pages/ProfilePage.scss';
import Loading from "../components/Loading";
import * as api from "../backend/apiService";

const dummyRecipes: RecipeResponse[] = [
    {
        id: 1,
        name: 'Spaghetti Bolognese',
        steps: [],
        ingredients: [],
        allergens: ['Gluten'],
        image: 'https://img.taste.com.au/5qlr1PkR/taste/2016/11/spaghetti-bolognese-106560-1.jpeg',
    },
    {
        id: 2,
        name: 'Chicken Salad',
        steps: [],
        ingredients: [],
        allergens: ['Nuts'],
        image: 'https://kalejunkie.com/wp-content/uploads/2023/04/ChickenSalad_Shot4_121.jpg',
    },
    {
        id: 3,
        name: 'Vegetable Stir Fry',
        steps: [],
        ingredients: [],
        allergens: [],
        image: 'https://kristineskitchenblog.com/wp-content/uploads/2024/01/vegetable-stir-fry-22-3.jpg',
    },
]

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<UserResponse|undefined>(undefined);
    const [savedRecipes, setSavedRecipes] = useState<RecipeResponse[]>([]);

    useEffect(() => {
        api.fetchUser().then(res => {
            setUser(res);
            res.savedRecipeIds.forEach(id => {
                api.fetchRecipe(id).then(res2 => {
                    const tempRecipes = [...savedRecipes];
                    tempRecipes.push(res2);
                    // Must copy the list every time because of how React handles state
                    setSavedRecipes(tempRecipes);
                });
            });
        });
    });

    return !user ? (<Loading />) : (
        <div className="profile-container">
            <div className="profile-header">
                <img src={profileImage} alt="Profile Placeholder" className="profile-image"/>
                <div className="profile-info">
                    <h1 className="fancy-text">{user.email}</h1>
                    <h2 className="fancy-text">Saved Recipes: {user.savedRecipeIds.length}</h2>
                </div>
            </div>
            <div className="saved-recipes">
                {/*savedRecipes.map(recipe => (
                    <RecipeCard
                        key={recipe.id}
                        id={recipe.id}
                        name={recipe.name}
                        allergens={recipe.allergens}
                        image={recipe.image}
                        isSaved={false}
                    />
                ))*/
                    // TODO: replace dummy recipes with the real list
                }
                {dummyRecipes.map(recipe => (
                    <RecipeCard
                        key={recipe.id}
                        id={recipe.id}
                        name={recipe.name}
                        allergens={recipe.allergens}
                        image={recipe.image}
                        isSaved={false}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProfilePage;