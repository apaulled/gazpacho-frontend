import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import '../style/pages/SearchPage.scss';
import RecipeCard from "../components/RecipeCard";
import {RecipeResponse, searchRecipes} from "../backend/apiService";
import * as api from "../backend/apiService";

// TODO: remove placeholder

const placeholderRecipe = {
    id: 100,
    name: 'Spaghetti Bolognese',
    allergens: ['Gluten'],
    image: 'https://img.taste.com.au/5qlr1PkR/taste/2016/11/spaghetti-bolognese-106560-1.jpeg'
}

const SearchPage: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [inputValue, setInputValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [recipes, setRecipes] = useState<RecipeResponse[]>([]);

    const [savedIds, setSavedIds] = useState<number[]>([]);

    useEffect(() => {
        api.fetchUser().then(res => setSavedIds(res.savedRecipeIds));
    }, []);

    const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        if (event.target.value.length > 0) {
            setLoading(true);
            searchRecipes(event.target.value).then(res => {
                setRecipes(res);
                setLoading(false);
            });
        } else {
            setRecipes([]);
        }
    }

    return (
        <div className="search-page">
            <div className="input-wrapper">
                <SearchIcon className="input-icon"/>
                <input
                    ref={inputRef}
                    className="input"
                    placeholder="Search for Recipes"
                    value={inputValue}
                    onChange={onTextChange}
                />
                {loading && <CircularProgress className="loading-indicator" size={24} thickness={5}/>}
            </div>
            <div className="recipes-list">
                {recipes.map(recipe => (
                    <RecipeCard
                        key={recipe.id}
                        id={recipe.id}
                        name={recipe.name}
                        allergens={recipe.allergens || placeholderRecipe.allergens}
                        image={recipe.image || placeholderRecipe.image}
                        initIsSaved={savedIds.includes(recipe.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SearchPage;