import { create } from 'zustand';
import type { Todo, FilterType } from '../types/todo';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => void;
  editTodo: (id: number, title: string) => void;
  deleteTodo: (id: number) => void;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  toggleCompleted: (id: number) => void; 
}

const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  loading: false,
  error: null,
  filter: 'all',

  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20');
      if (!res.ok) throw new Error('Erreur de chargement des todos');
      const data: Todo[] = await res.json();
      set({ todos: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Erreur inconnue', loading: false });
    }
  },

  addTodo: (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };
    set({ todos: [newTodo, ...get().todos] });
  },

  editTodo: (id: number, title: string) => {
    set({
      todos: get().todos.map((todo) =>
        todo.id === id ? { ...todo, title } : todo
      ),
    });
  },

  deleteTodo: (id: number) => {
    set({ todos: get().todos.filter((todo) => todo.id !== id) });
  },

  setFilter: (filter: FilterType) => set({ filter }),


  toggleCompleted: (id: number) => {
    set({
      todos: get().todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    });
  },
}));

export default useTodoStore;
