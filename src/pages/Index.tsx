
import { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Dashboard from '../components/Dashboard';
import { useAuth } from '../hooks/useAuth';

const Index = () => {
  const [showRegister, setShowRegister] = useState(false);
  const { user, login, register, logout } = useAuth();

  if (user) {
    return <Dashboard user={user} onLogout={logout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            TaskMaster Pro
          </h1>
          <p className="text-gray-600">
            Управлявайте задачите си ефективно
          </p>
        </div>

        {!showRegister ? (
          <LoginForm 
            onLogin={login} 
            onSwitchToRegister={() => setShowRegister(true)} 
          />
        ) : (
          <RegisterForm 
            onRegister={register}
            onSwitchToLogin={() => setShowRegister(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default Index;
