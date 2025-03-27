import React from 'react';
import '../style/components/RecipeCard.scss';

interface RecipeCardProps {
    name: string;
    allergens: string[];
    image: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ name, allergens, image }) => {
    return (
        <div className="recipe-card">
            <img src={image} alt={name} className="recipe-image" />
            <div className="recipe-details">
                <h3 className="recipe-name">{name}</h3>
                {allergens && allergens.length > 0 && (
                    <ul className="allergens-list">
                        {allergens.map((allergen, index) => (
                            <li key={index} className="allergen-item">
                                {allergen}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default RecipeCard;