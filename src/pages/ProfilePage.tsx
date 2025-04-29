import React, {useEffect, useState} from 'react';
import {RecipeResponse, UserResponse} from "../backend/apiService";
import RecipeCard from "../components/RecipeCard";
import profileImage from "../resources/gazpacho_profile.png";
import '../style/pages/ProfilePage.scss';
import Loading from "../components/Loading";
import * as api from "../backend/apiService";

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<UserResponse|undefined>(undefined);
    const [savedRecipes, setSavedRecipes] = useState<RecipeResponse[]>([]);

    useEffect(() => {
        api.fetchUser().then(res => {
            setUser(res);
            api.fetchRecipesBatch(res.savedRecipeIds)
                .then(r => setSavedRecipes(r));
        });
    }, []);

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
                {savedRecipes.map(recipe => (
                    <RecipeCard
                        key={recipe.id}
                        id={recipe.id}
                        name={recipe.name}
                        allergens={recipe.allergens}
                        image={recipe.image}
                        initIsSaved={user.savedRecipeIds.includes(recipe.id)}
                    />
                ))
                }
            </div>
        </div>
    );
};

export default ProfilePage;