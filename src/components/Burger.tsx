import React from 'react';
import type { BurgerIngredient } from '../types/ingredient';

interface BurgerProps {
  ingredients: BurgerIngredient[];
  totalPrice: number;
}

const Burger: React.FC<BurgerProps> = ({ ingredients, totalPrice }) => {
  const renderIngredients = () => {
    const ingredientElements: JSX.Element[] = [];
    
    ingredients.forEach((ingredient) => {
      for (let i = 0; i < ingredient.count; i++) {
        ingredientElements.push(
          <div 
            key={`${ingredient.name}-${i}`} 
            className={`burger-ingredient burger-${ingredient.name.toLowerCase()}`}
          >
            {ingredient.name}
          </div>
        );
      }
    });
    
    return ingredientElements;
  };

  return (
    <div className="burger-container">
      <h2>Burger</h2>
      <div className="burger">
        <div className="burger-ingredient burger-bread-top">
          <div className="seeds"></div>
          <div className="seeds"></div>
          <div className="seeds"></div>
          <div className="seeds"></div>
        </div>
        
        {renderIngredients()}
        
        <div className="burger-ingredient burger-bread-bottom"></div>
      </div>
      
      <div className="price">
        Price: {totalPrice} сом
      </div>
    </div>
  );
};

export default Burger;