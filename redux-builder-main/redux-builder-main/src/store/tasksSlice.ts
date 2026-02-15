import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskFormData } from '../types/task';

interface TasksState {
  tasks: Task[];
  filter: 'all' | 'pending' | 'in_progress' | 'completed';
}

const initialState: TasksState = {
  tasks: [],
  filter: 'all',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskFormData>) => {
      const newTask: Task = {
        id: crypto.randomUUID(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.tasks.unshift(newTask);
    },
    updateTask: (state, action: PayloadAction<{ id: string; data: Partial<TaskFormData> }>) => {
      const { id, data } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          ...data,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<TasksState['filter']>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
