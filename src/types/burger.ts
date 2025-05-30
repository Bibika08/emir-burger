import type { BurgerIngredient } from './ingredient';

export interface SavedBurger {
  id?: string;
  name: string;
  ingredients: BurgerIngredient[];
  totalPrice: number;
  createdAt: Date;
}