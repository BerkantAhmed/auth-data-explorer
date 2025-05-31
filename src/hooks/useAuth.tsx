
import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверява дали има запазен потребител при зареждане
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (data: LoginData): Promise<boolean> => {
    try {
      // Симулира API заявка за вход
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => 
        u.email === data.email && u.password === data.password
      );

      if (foundUser) {
        const userWithoutPassword = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name
        };
        setUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Грешка при вход:', error);
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      // Симулира API заявка за регистрация
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Проверява дали потребителят вече съществува
      if (users.find((u: any) => u.email === data.email)) {
        return false;
      }

      const newUser = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        password: data.password
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      const userWithoutPassword = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      };
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return true;
    } catch (error) {
      console.error('Грешка при регистрация:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return {
    user,
    loading,
    login,
    register,
    logout
  };
};
