
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface LoginFormProps {
  onLogin: (data: { email: string; password: string }) => Promise<boolean>;
  onSwitchToRegister: () => void;
}

const LoginForm = ({ onLogin, onSwitchToRegister }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Моля въведете email и парола');
      return;
    }

    setLoading(true);
    const success = await onLogin({ email, password });
    
    if (success) {
      toast.success('Успешен вход!');
    } else {
      toast.error('Грешен email или парола');
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
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
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
        disabled={loading}
      >
        {loading ? 'Влизане...' : 'Вход'}
      </Button>

      <div className="text-center">
        <p className="text-gray-600">
          Нямате акаунт?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Регистрирайте се
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
