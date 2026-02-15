import { Task } from '../types/task';
import { Pencil, Trash2, Clock, CheckCircle2, Circle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-gray-100 text-gray-700', icon: Circle },
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700', icon: Clock },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
};

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const config = statusConfig[task.status];
  const StatusIcon = config.icon;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{task.title}</h3>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
              <StatusIcon size={14} />
              {config.label}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Edit task"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{task.description}</p>
      )}

      <div className="text-xs text-gray-400">
        Updated {new Date(task.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
}
