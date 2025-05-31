
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface AddTaskFormProps {
  onAddTask: (task: {
    title: string;
    description: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
  }) => void;
  onClose: () => void;
}

const AddTaskForm = ({ onAddTask, onClose }: AddTaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Моля въведете заглавие на задачата');
      return;
    }

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      completed: false,
      priority
    });

    toast.success('Задачата е добавена успешно!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Нова задача</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-gray-700 font-medium">
              Заглавие *
            </Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Въведете заглавие на задачата..."
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-700 font-medium">
              Описание
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Въведете описание на задачата..."
              rows={3}
            />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">
              Приоритет
            </Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">🟢 Нисък приоритет</SelectItem>
                <SelectItem value="medium">🟡 Среден приоритет</SelectItem>
                <SelectItem value="high">🔴 Висок приоритет</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Отказ
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Добави задача
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
