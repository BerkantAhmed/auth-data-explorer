
import { useState } from 'react';
import Navigation from './Navigation';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import { useTasks } from '../hooks/useTasks';

interface DashboardProps {
  user: {
    id: string;
    email: string;
    name: string;
  };
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { tasks, addTask, updateTask, deleteTask } = useTasks(user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} onLogout={onLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Добре дошли, {user.name}!
                </h1>
                <p className="text-gray-600">
                  Управлявайте вашите задачи ефективно
                </p>
              </div>
              
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                + Нова задача
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                <h3 className="text-lg font-semibold mb-2">Общо задачи</h3>
                <p className="text-3xl font-bold">{tasks.length}</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
                <h3 className="text-lg font-semibold mb-2">Завършени</h3>
                <p className="text-3xl font-bold">
                  {tasks.filter(task => task.completed).length}
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
                <h3 className="text-lg font-semibold mb-2">Активни</h3>
                <p className="text-3xl font-bold">
                  {tasks.filter(task => !task.completed).length}
                </p>
              </div>
            </div>

            <TaskList 
              tasks={tasks}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
            />
          </div>
        </div>
      </main>

      {showAddForm && (
        <AddTaskForm
          onAddTask={addTask}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
