import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SavedBurger } from '../types/burger';
import { FirebaseService } from '../services/firebaseService';

const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const [burgers, setBurgers] = useState<SavedBurger[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBurgers();
  }, []);

  const loadBurgers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const burgersData = await FirebaseService.getAllBurgers();
      setBurgers(burgersData);
    } catch (error) {
      setError('Ошибка при загрузке меню');
      console.error('Error loading burgers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBurger = async (id: string, name: string) => {
    if (window.confirm(`Вы уверены, что хотите удалить бургер "${name}"?`)) {
      try {
        await FirebaseService.deleteBurger(id);
        setBurgers(prev => prev.filter(burger => burger.id !== id));
        alert('Бургер успешно удален');
      } catch (error) {
        alert('Ошибка при удалении бургера');
        console.error('Error deleting burger:', error);
      }
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getIngredientsList = (ingredients: any[]) => {
    return ingredients
      .filter(ing => ing.count > 0)
      .map(ing => `${ing.name} (${ing.count})`)
      .join(', ');
  };

  if (isLoading) {
    return (
      <div className="menu-container">
        <div className="loading-container">
          <div className="loading-spinner">Загрузка меню...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-container">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={loadBurgers} className="retry-button">
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1 className="menu-title">Меню Бургеров</h1>
        <button 
          onClick={() => navigate('/')}
          className="create-button"
        >
          Создать новый бургер
        </button>
      </div>

      {burgers.length === 0 ? (
        <div className="empty-menu">
          <p className="empty-message">Меню пока пустое</p>
          <p className="empty-subtitle">Создайте свой первый бургер!</p>
          <button 
            onClick={() => navigate('/')}
            className="create-first-button"
          >
            Создать бургер
          </button>
        </div>
      ) : (
        <div className="burgers-grid">
          {burgers.map((burger) => (
            <div key={burger.id} className="burger-card">
              <div className="burger-card-header">
                <h3 className="burger-card-title">{burger.name}</h3>
                <div className="burger-card-price">{burger.totalPrice} сом</div>
              </div>
              
              <div className="burger-card-content">
                <div className="ingredients-info">
                  <strong>Ингредиенты:</strong>
                  <p className="ingredients-list">
                    {getIngredientsList(burger.ingredients) || 'Только булочка'}
                  </p>
                </div>
                
                <div className="burger-date">
                  Создан: {formatDate(burger.createdAt)}
                </div>
              </div>
              
              <div className="burger-card-actions">
                <button
                  onClick={() => navigate(`/edit/${burger.id}`)}
                  className="edit-button"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDeleteBurger(burger.id!, burger.name)}
                  className="delete-button"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuPage;