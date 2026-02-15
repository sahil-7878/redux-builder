import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFilter } from '../store/tasksSlice';

const filters = [
  { value: 'all' as const, label: 'All Tasks' },
  { value: 'pending' as const, label: 'Pending' },
  { value: 'in_progress' as const, label: 'In Progress' },
  { value: 'completed' as const, label: 'Completed' },
];

export default function FilterBar() {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(state => state.tasks.filter);

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => dispatch(setFilter(filter.value))}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            currentFilter === filter.value
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
