import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { BurgerIngredient } from '../types/ingredient';
import { INGREDIENTS } from '../constants/ingredients';
import { calculatePrice } from '../utils/calculatePrice';
import { FirebaseService } from '../services/firebaseService';
import IngredientItem from './Ingredientitem';
import Burger from './Burger';

interface BurgerConstructorProps {
  isEdit?: boolean;
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [burgerIngredients, setBurgerIngredients] = useState<BurgerIngredient[]>(
    INGREDIENTS.map(ingredient => ({
      name: ingredient.name,
      count: 0
    }))
  );
  
  const [burgerName, setBurgerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingBurger, setLoadingBurger] = useState(false);

  // Загружаем данные бургера для редактирования
  useEffect(() => {
    if (isEdit && id) {
      loadBurgerForEdit(id);
    }
  }, [isEdit, id]);

  const loadBurgerForEdit = async (burgerId: string) => {
    setLoadingBurger(true);
    try {
      const burger = await FirebaseService.getBurgerById(burgerId);
      if (burger) {
        setBurgerName(burger.name);
        setBurgerIngredients(burger.ingredients);
      } else {
        alert('Бургер не найден');
        navigate('/menu');
      }
    } catch (error) {
      alert('Ошибка при загрузке бургера');
      console.error(error);
    } finally {
      setLoadingBurger(false);
    }
  };

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

  const handleSaveBurger = async () => {
    if (!burgerName.trim()) {
      alert('Пожалуйста, введите название бургера');
      return;
    }

    if (burgerIngredients.every(ingredient => ingredient.count === 0)) {
      alert('Добавьте хотя бы один ингредиент');
      return;
    }

    setIsLoading(true);
    try {
      const totalPrice = calculatePrice(burgerIngredients);
      
      if (isEdit && id) {
        await FirebaseService.updateBurger(id, {
          name: burgerName,
          ingredients: burgerIngredients,
          totalPrice
        });
        alert('Бургер успешно обновлен!');
      } else {
        await FirebaseService.addBurger({
          name: burgerName,
          ingredients: burgerIngredients,
          totalPrice,
          createdAt: new Date()
        });
        alert('Бургер успешно добавлен в меню!');
      }
      
      navigate('/menu');
    } catch (error) {
      alert('Ошибка при сохранении бургера');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = calculatePrice(burgerIngredients);

  if (loadingBurger) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="constructor-container">
      <div className="constructor-header">
        <h1 className="constructor-title">
          {isEdit ? 'Редактировать бургер' : 'Конструктор Бургеров'}
        </h1>
        <button 
          onClick={() => navigate('/menu')}
          className="menu-button"
        >
          Перейти к меню
        </button>
      </div>

      <div className="constructor-content">
        <div className="ingredients-section">
          <h2 className="ingredients-title">Ingredients</h2>
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

      <div className="burger-form">
        <div className="form-group">
          <label htmlFor="burger-name" className="form-label">
            Название бургера:
          </label>
          <input
            id="burger-name"
            type="text"
            value={burgerName}
            onChange={(e) => setBurgerName(e.target.value)}
            placeholder="Введите название бургера"
            className="form-input"
            maxLength={50}
          />
        </div>
        
        <button
          onClick={handleSaveBurger}
          disabled={isLoading}
          className="save-button"
        >
          {isLoading 
            ? 'Сохранение...' 
            : isEdit 
              ? 'Обновить бургер' 
              : 'Добавить в меню'
          }
        </button>
      </div>
    </div>
  );
};

export default BurgerConstructor;