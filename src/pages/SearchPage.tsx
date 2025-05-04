import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import '../style/pages/SearchPage.scss';
import RecipeCard from "../components/RecipeCard";
import {RecipeResponse, searchRecipes} from "../backend/apiService";
import * as api from "../backend/apiService";


const SearchPage: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [inputValue, setInputValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [recipes, setRecipes] = useState<RecipeResponse[]>([]);

    const [savedIds, setSavedIds] = useState<number[]>([]);
    const [searchType, setSearchType] = useState<'name'|'ingredient'|'allergen'>('name');

    useEffect(() => {
        api.fetchUser().then(res => setSavedIds(res.savedRecipeIds));
    }, []);

    const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        if (event.target.value.length > 0) {
            setLoading(true);
            searchRecipes(event.target.value, searchType).then(res => {
                setRecipes(res);
                setLoading(false);
            });
        } else {
            setRecipes([]);
        }
    }

    const onTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSearchType(e.target.value as 'name'|'ingredient'|'allergen');

        if (inputValue.length > 0) {
            setLoading(true);
            searchRecipes(inputValue, e.target.value as 'name'|'ingredient'|'allergen')
                .then(res => {
                    setRecipes(res);
                    setLoading(false);
                });
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
                <select
                  className="search-type-dropdown"
                  value={searchType}
                  onChange={onTypeChange}
                >
                    <option value="name">Name</option>
                    <option value="ingredient">Ingredient</option>
                    <option value="allergen">Allergen</option>
                </select>
                {loading && <CircularProgress className="loading-indicator" size={24} thickness={5}/>}
            </div>
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

export default SearchPage;