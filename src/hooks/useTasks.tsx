
import { useState, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  userId: string;
}

export const useTasks = (userId: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Симулира REST API заявка за зареждане на задачи
    const loadTasks = () => {
      const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const userTasks = allTasks.filter((task: Task) => task.userId === userId);
      setTasks(userTasks);
    };

    loadTasks();
  }, [userId]);

  const saveTasks = (updatedTasks: Task[]) => {
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const otherUserTasks = allTasks.filter((task: Task) => task.userId !== userId);
    const newAllTasks = [...otherUserTasks, ...updatedTasks];
    localStorage.setItem('tasks', JSON.stringify(newAllTasks));
    setTasks(updatedTasks);
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'userId'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      userId: userId
    };

    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );
    saveTasks(updatedTasks);
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask
  };
};
