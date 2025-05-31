
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '../hooks/useTasks';
import { toast } from 'sonner';

interface TaskItemProps {
  task: Task;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem = ({ task, onUpdate, onDelete }: TaskItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed });
    toast.success(
      task.completed ? 'Задачата е маркирана като активна' : 'Задачата е завършена!'
    );
  };

  const handleDelete = () => {
    if (window.confirm('Сигурни ли сте, че искате да изтриете тази задача?')) {
      onDelete(task.id);
      toast.success('Задачата е изтрита');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Висок';
      case 'medium': return 'Среден';
      case 'low': return 'Нисък';
      default: return priority;
    }
  };

  return (
    <div className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
      task.completed ? 'bg-gray-50 opacity-75' : 'bg-white'
    }`}>
      <div className="flex items-start space-x-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleToggleComplete}
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={`font-semibold ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {task.title}
            </h3>
            
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                getPriorityColor(task.priority)
              }`}>
                {getPriorityText(task.priority)}
              </span>
              
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                {isExpanded ? '−' : '+'}
              </Button>
              
              <Button
                onClick={handleDelete}
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700"
              >
                🗑️
              </Button>
            </div>
          </div>
          
          {isExpanded && (
            <div className="mt-3 space-y-2">
              <p className={`text-sm ${
                task.completed ? 'text-gray-500' : 'text-gray-600'
              }`}>
                {task.description}
              </p>
              
              <div className="text-xs text-gray-400">
                Създадена: {new Date(task.createdAt).toLocaleDateString('bg-BG', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
