
import { Button } from '@/components/ui/button';

interface NavigationProps {
  user: {
    id: string;
    email: string;
    name: string;
  };
  onLogout: () => void;
}

const Navigation = ({ user, onLogout }: NavigationProps) => {
  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              TaskMaster Pro
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600 hidden md:block">
              Здравей, <span className="font-semibold">{user.name}</span>
            </span>
            
            <Button
              onClick={onLogout}
              variant="outline"
              className="text-gray-600 border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Изход
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
