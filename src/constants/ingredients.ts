import type { Ingredient } from '../types/ingredient';

export const BASE_PRICE = 30;

export const INGREDIENTS: Ingredient[] = [
  {
    name: 'Meat',
    price: 80,
    image: 'meat-placeholder', // Заглушка для изображения
  },
  {
    name: 'Cheese',
    price: 50,
    image: 'cheese-placeholder',
  },
  {
    name: 'Salad',
    price: 10,
    image: 'salad-placeholder',
  },
  {
    name: 'Bacon',
    price: 60,
    image: 'bacon-placeholder',
  },
];