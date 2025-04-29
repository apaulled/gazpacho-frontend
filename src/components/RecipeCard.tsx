import React, {useState} from 'react';
import '../style/components/RecipeCard.scss';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import * as api from "../backend/apiService";

interface RecipeCardProps {
    id: number;
    name: string;
    allergens: string[];
    image: string;
    initIsSaved: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, name, allergens, image, initIsSaved }) => {
    const [isSaved, setIsSaved] = useState<boolean>(initIsSaved);

    const handleBookmarkClicked = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!isSaved) api.saveRecipe(id).then();
        else api.removeSavedRecipe(id).then();
        setIsSaved(!isSaved);
    };

    return (
        <div className="recipe-card">
            <div
                className="bookmark-container"
                onClick={handleBookmarkClicked}
            >
                {
                    isSaved ?
                        (<BookmarkIcon />) :
                        (<BookmarkBorderIcon />)
                }
            </div>
            <img src={image} alt={name} className="recipe-image" />
            <div className="recipe-details">
                <a
                    href={`/recipe/${id}`}
                >
                    <h3 className="recipe-name">{name}</h3>
                </a>
                <ul className="allergens-list">
                    {allergens && allergens.length > 0 && allergens.map((allergen, index) => (
                        <li key={index} className="allergen-item">
                            {allergen}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RecipeCard;