
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface RegisterFormProps {
  onRegister: (data: { name: string; email: string; password: string }) => Promise<boolean>;
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onRegister, onSwitchToLogin }: RegisterFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Моля попълнете всички полета');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Паролите не съвпадат');
      return;
    }

    if (password.length < 6) {
      toast.error('Паролата трябва да бъде поне 6 символа');
      return;
    }

    setLoading(true);
    const success = await onRegister({ name, email, password });
    
    if (success) {
      toast.success('Успешна регистрация!');
    } else {
      toast.error('Потребител с този email вече съществува');
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-gray-700 font-medium">
            Име
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Вашето име"
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-700 font-medium">
            Email адрес
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            placeholder="example@email.com"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="password" className="text-gray-700 font-medium">
            Парола
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            placeholder="••••••••"
            required
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
            Потвърдете паролата
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
        disabled={loading}
      >
        {loading ? 'Регистрация...' : 'Регистрация'}
      </Button>

      <div className="text-center">
        <p className="text-gray-600">
          Вече имате акаунт?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Влезте тук
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
