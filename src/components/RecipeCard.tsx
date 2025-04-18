import React from 'react';
import '../style/components/RecipeCard.scss';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

interface RecipeCardProps {
    id: number;
    name: string;
    allergens: string[];
    image: string;
    isSaved: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, name, allergens, image, isSaved }) => {
    const handleBookmarkClicked = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        console.log(`Bookmark clicked for recipe ID: ${id}`);
        //TODO: Implement bookmark functionality
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