import meatImage from './assets/meat.png';
import cheeseImage from './assets/cheese.png';
import lettuceImage from './assets/lettuce.png';
import baconImage from './assets/bacon.png';
import { Ingredient } from './types';

export const INGREDIENTS: Ingredient[] = [
  { name: 'Meat', price: 80, image: meatImage },
  { name: 'Cheese', price: 50, image: cheeseImage },
  { name: 'Salad', price: 10, image: lettuceImage },
  { name: 'Bacon', price: 60, image: baconImage },
];