import React from "react";
import "./style.css";

export default function Main() {
  const [input, setInput] = React.useState('');
  const [todos, setTodos] = React.useState([]);
  const [editValue, setEditValue] = React.useState('');

  function handleAdd() {
    if (!input) return;
    setTodos([...todos, { text: input, isEditing: false, isCompleted: false }]);
    setInput('');
  }

  function handleEdit(index) {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        todo.isEditing = true;
      }
      return todo;
    });
    setTodos(newTodos);
    setEditValue(todos[index].text);
  }

  function handleSave(index) {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        todo.text = editValue;
        todo.isEditing = false;
      }
      return todo;
    });
    setTodos(newTodos);
  }

  function handleRemove(index) {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  }

  function handleCompletion(index) {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(newTodos);
  }

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <input 
        type="text" 
        onChange={(e) => setInput(e.target.value)} 
        value={input}
        placeholder="Enter a new todo"
      />
      <button onClick={handleAdd}> + Add Todo</button>
      
      {todos.length > 0 ? (
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item" style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
              {todo.isEditing ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button onClick={() => handleSave(index)}>Save</button>
                </>
              ) : (
                <>
                  <span>{todo.text}</span>
                  <div className="todo-buttons">
                    <button
                      onClick={() => handleEdit(index)}
                      disabled={todo.isCompleted || todo.isEditing}
                    >
                    Edit
                    </button>
                    <button
                      onClick={() => handleRemove(index)}
                      disabled={todo.isEditing}
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleCompletion(index)}
                      disabled={todo.isEditing}
                    >
                      Complete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No todos available. Add a todo to get started!</p>
      )}
    </div>
  );
}
