import React, {ChangeEvent, useRef, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import '../style/pages/SearchPage.scss';
import RecipeCard from "../components/RecipeCard";
import {RecipeResponse, searchRecipes} from "../backend/apiService";

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
    {
        id: 3,
        name: 'Vegetable Stir Fry',
        steps: [],
        ingredients: [],
        allergens: [],
        image: 'https://kristineskitchenblog.com/wp-content/uploads/2024/01/vegetable-stir-fry-22-3.jpg',
    },
    {
        id: 3,
        name: 'Vegetable Stir Fry',
        steps: [],
        ingredients: [],
        allergens: [],
        image: 'https://kristineskitchenblog.com/wp-content/uploads/2024/01/vegetable-stir-fry-22-3.jpg',
    },
    {
        id: 3,
        name: 'Vegetable Stir Fry',
        steps: [],
        ingredients: [],
        allergens: [],
        image: 'https://kristineskitchenblog.com/wp-content/uploads/2024/01/vegetable-stir-fry-22-3.jpg',
    },
    {
        id: 3,
        name: 'Vegetable Stir Fry',
        steps: [],
        ingredients: [],
        allergens: [],
        image: 'https://kristineskitchenblog.com/wp-content/uploads/2024/01/vegetable-stir-fry-22-3.jpg',
    },
    {
        id: 3,
        name: 'Vegetable Stir Fry',
        steps: [],
        ingredients: [],
        allergens: [],
        image: 'https://kristineskitchenblog.com/wp-content/uploads/2024/01/vegetable-stir-fry-22-3.jpg',
    },
    {
        id: 3,
        name: 'Vegetable Stir Fry',
        steps: [],
        ingredients: [],
        allergens: [],
        image: 'https://kristineskitchenblog.com/wp-content/uploads/2024/01/vegetable-stir-fry-22-3.jpg',
    },
];

const SearchPage: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [inputValue, setInputValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [recipes, setRecipes] = useState<RecipeResponse[]>(dummyRecipes);

    const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setLoading(true);
        searchRecipes(inputValue).then(res => {
            setRecipes(res);
            setLoading(false);
        });
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
                        allergens={recipe.allergens}
                        image={recipe.image}
                        isSaved={false}
                    />
                ))}
            </div>
        </div>
    );
};

export default SearchPage;