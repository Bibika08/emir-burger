import React, { useState } from 'react';
import type { BurgerIngredient } from './types/ingredient';
import { INGREDIENTS } from './constants/ingredients';
import { calculatePrice } from './utils/calculatePrice';
import IngredientItem from './components/Ingredientitem';
import Burger from './components/Burger';
import './App.css';

const App: React.FC = () => {
  const [burgerIngredients, setBurgerIngredients] = useState<BurgerIngredient[]>(
    INGREDIENTS.map(ingredient => ({
      name: ingredient.name,
      count: 0
    }))
  );

  const addIngredient = (ingredientName: string) => {
    setBurgerIngredients(prev =>
      prev.map(item =>
        item.name === ingredientName
          ? { ...item, count: item.count + 1 }
          : item
      )
    );
  };

  const removeIngredient = (ingredientName: string) => {
    setBurgerIngredients(prev =>
      prev.map(item =>
        item.name === ingredientName && item.count > 0
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  const totalPrice = calculatePrice(burgerIngredients);

  return (
    <div className="app">
      <div className="ingredients-section">
        <h1 className="ingredients-title">Ingredients</h1>
        <div className="ingredients-list">
          {INGREDIENTS.map(ingredient => {
            const burgerIngredient = burgerIngredients.find(
              item => item.name === ingredient.name
            );
            
            return (
              <IngredientItem
                key={ingredient.name}
                ingredient={ingredient}
                count={burgerIngredient?.count || 0}
                onAdd={() => addIngredient(ingredient.name)}
                onRemove={() => removeIngredient(ingredient.name)}
              />
            );
          })}
        </div>
      </div>

      <div className="burger-section">
        <Burger 
          ingredients={burgerIngredients}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
};

export default App;