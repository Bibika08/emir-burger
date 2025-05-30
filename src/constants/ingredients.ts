import type { Ingredient } from '../types/ingredient';

import meatImage from '../assets/meat.png';
import cheeseImage from '../assets/cheese.png';
import saladImage from '../assets/salad.png';
import baconImage from '../assets/bacon.png';

export const BASE_PRICE = 30;

export const INGREDIENTS: Ingredient[] = [
  {
    name: 'Meat',
    price: 80,
    image: meatImage,
  },
  {
    name: 'Cheese',
    price: 50,
    image: cheeseImage,
  },
  {
    name: 'Salad',
    price: 10,
    image: saladImage,
  },
  {
    name: 'Bacon',
    price: 60,
    image: baconImage,
  },
];