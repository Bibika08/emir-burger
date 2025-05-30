import type { BurgerIngredient } from '../types/ingredient';
import { INGREDIENTS, BASE_PRICE } from '../constants/ingredients';

export const calculatePrice = (burgerIngredients: BurgerIngredient[]): number => {
  let totalPrice = BASE_PRICE;
  
  burgerIngredients.forEach(burgerIngredient => {
    const ingredient = INGREDIENTS.find(ing => ing.name === burgerIngredient.name);
    if (ingredient) {
      totalPrice += ingredient.price * burgerIngredient.count;
    }
  });
  
  return totalPrice;
};