
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  getDoc 
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import type { SavedBurger } from '../types/burger';

const COLLECTION_NAME = 'burgers';

export class FirebaseService {
  // Добавить новый бургер
  static async addBurger(burger: Omit<SavedBurger, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...burger,
        createdAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding burger:', error);
      throw new Error('Failed to add burger');
    }
  }

  // Получить все бургеры
  static async getAllBurgers(): Promise<SavedBurger[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      const burgers: SavedBurger[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        burgers.push({
          id: doc.id,
          name: data.name,
          ingredients: data.ingredients,
          totalPrice: data.totalPrice,
          createdAt: data.createdAt.toDate()
        });
      });
      
      return burgers.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
      console.error('Error getting burgers:', error);
      throw new Error('Failed to get burgers');
    }
  }

  // Получить бургер по ID
  static async getBurgerById(id: string): Promise<SavedBurger | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          name: data.name,
          ingredients: data.ingredients,
          totalPrice: data.totalPrice,
          createdAt: data.createdAt.toDate()
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error getting burger:', error);
      throw new Error('Failed to get burger');
    }
  }

  // Обновить бургер
  static async updateBurger(id: string, burger: Omit<SavedBurger, 'id' | 'createdAt'>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, burger);
    } catch (error) {
      console.error('Error updating burger:', error);
      throw new Error('Failed to update burger');
    }
  }

  // Удалить бургер
  static async deleteBurger(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting burger:', error);
      throw new Error('Failed to delete burger');
    }
  }
}