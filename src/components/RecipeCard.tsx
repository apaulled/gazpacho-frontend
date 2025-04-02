import React from 'react';
import '../style/components/RecipeCard.scss';

interface RecipeCardProps {
    id: number;
    name: string;
    allergens: string[];
    image: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, name, allergens, image }) => {
    return (
        <div className="recipe-card">
            <img src={image} alt={name} className="recipe-image" />
            <div className="recipe-details">
                <a
                    href={`/recipe/${id}`}
                >
                    <h3 className="recipe-name">{name}</h3>
                </a>
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