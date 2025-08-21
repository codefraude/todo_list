import React, { useEffect, useMemo, useState } from 'react';
import useTodoStore from './store/todoStore';
import type { Todo, FilterType } from './types/todo';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import FilterBar from './components/FilterBar';
import Toast from './components/Toast';
import { useToast } from './hooks/useToast';
import SearchBar from './components/SearchBar';

const App: React.FC = () => {
  const {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    editTodo,
    deleteTodo,
    filter,
    setFilter,
    toggleCompleted, 
  } = useTodoStore();

  const [newTitle, setNewTitle] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [query, setQuery] = useState(''); 

  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAdd = async () => {
    const title = newTitle.trim();
    if (!title) return;
    try {
      await addTodo(title);
      setNewTitle('');
      showToast('Todo added.');
    } catch {
      showToast('Failed to add todo.');
    }
  };

  const startEdit = (todo: Todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
  };

  const saveEdit = async () => {
    if (editId == null) return;
    const title = editTitle.trim();
    if (!title) return;
    try {
      await editTodo(editId, title);
      setEditId(null);
      setEditTitle('');
      showToast('Todo updated.');
    } catch {
      showToast('Failed to update todo.');
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle('');
  };

  const remove = async (id: number) => {
    try {
      await deleteTodo(id);
      showToast('Todo deleted.');
    } catch {
      showToast('Failed to delete todo.');
    }
  };


  const toggle = (id: number) => {
    const wasCompleted = todos.find(t => t.id === id)?.completed;
    toggleCompleted(id);
    showToast(wasCompleted ? 'Moved back to In progress.' : 'Marked as completed.');
  };


  const filteredTodos = useMemo(() => {
    const byFilter =
      filter === 'completed'
        ? todos.filter(t => t.completed)
        : filter === 'inprogress'
        ? todos.filter(t => !t.completed)
        : todos;

    const q = query.trim().toLowerCase();
    if (!q) return byFilter;
    return byFilter.filter(t => t.title.toLowerCase().includes(q));
  }, [todos, filter, query]);

  return (
    <div
    style={{
      minHeight: '100svh',
      display: 'flex',
      justifyContent: 'center',     
      padding: 20,
      background: '#222',
      color: '#fff',
      width: '100%',
    }}
    >
      <main  style={{
        width: '100%',
        maxWidth: 900,           
        margin: '0 auto',        
      }}>
       <h1 style={{ textAlign: 'center', marginBottom: 16 }}>Todo List</h1>

        
        <SearchBar value={query} onChange={setQuery} onClear={() => setQuery('')} />

        <TodoInput value={newTitle} onChange={setNewTitle} onAdd={handleAdd} />

        <FilterBar value={filter as FilterType} onChange={setFilter} />

        {loading && <p>Chargement des todos…</p>}
        {error && <p style={{ color: 'salmon' }}>{error}</p>}

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%' }}>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isEditing={editId === todo.id}
              editTitle={editTitle}
              onEditChange={setEditTitle}
              onStartEdit={startEdit}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onDelete={remove}
              onToggle={toggle} 
            />
          ))}
        </ul>
      </main>

      <Toast toast={toast} onClose={hideToast} />
    </div>
  );
};

export default App;
