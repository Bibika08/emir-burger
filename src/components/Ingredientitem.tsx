import React from 'react';
import type { Ingredient } from '../types/ingredient';

interface IngredientItemProps {
  ingredient: Ingredient;
  count: number;
  onAdd: () => void;
  onRemove: () => void;
}

const IngredientItem: React.FC<IngredientItemProps> = ({ 
  ingredient, 
  count, 
  onAdd, 
  onRemove 
}) => {
  return (
    <div className="ingredient-item">
      <button 
        className="ingredient-button"
        onClick={onAdd}
      >
        <img 
          src={ingredient.image} 
          alt={ingredient.name}
          className="ingredient-image"
        />
        <span className="ingredient-name">{ingredient.name}</span>
      </button>
      
      <span className="ingredient-count">x{count}</span>
      
      <button 
        className="remove-button"
        onClick={onRemove}
        disabled={count === 0}
      >
        🗑️
      </button>
    </div>
  );
};

export default IngredientItem;