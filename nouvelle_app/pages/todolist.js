import { useState, useEffect } from 'react';

function TodoItem({ todo, onDelete }) {
  return (
    <div>
      {todo}
      <button onClick={() => onDelete(todo)}>Supprimer</button>
    </div>
  );
}

export default function Home({ email }) {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch(`/api/todos?email=${email}`)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, [email]);

  useEffect(() => {
    fetch(`/api/todos?email=${email}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todos),
    });
  }, [todos, email]);

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const deleteTodo = (todoToDelete) => {
    setTodos(todos.filter((todo) => todo !== todoToDelete));
  };

  return (
    <div style={{ backgroundColor: '#F5F5F5', textAlign: 'center', padding: '20px' }}>
    <h1 style={{ fontSize: '48px' }}>To-do list</h1>
    <form onSubmit={addTodo}>
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Ajouter une tâche"
      style={{ padding: '10px', borderRadius: '4px', border: 'none', marginRight: '10px' }}
    />
    <button type="submit" style={{ padding: '10px', borderRadius: '4px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>Ajouter</button>
    </form>
    <ul>
      {todos.map((todo, index) => (
      <li key={index}>
      <TodoItem todo={todo} onDelete={deleteTodo} />
      </li>
      ))}
    </ul>
  </div>
  );
}

Home.getInitialProps = async ({ query }) => {
  return { email: query.email };
};