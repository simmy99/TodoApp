import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false, isEditing: false }]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    const updatedTodos = todos.map((item, i) =>
      i === index ? { ...item, isEditing: !item.isEditing } : { ...item, isEditing: false }
    );
    setTodos(updatedTodos);
  };

  const handleSaveTodo = (index, editedText) => {
    const updatedTodos = todos.map((item, i) =>
      i === index ? { ...item, text: editedText, isEditing: false } : item
    );
    setTodos(updatedTodos);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="container border p-5 mt-4 bg-light">
      <div className="row">
        <div className="col-12">
          <h1 className="mt-4 fw-bold">Todo App</h1>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col d-flex justify-content-end">
          <p>Completed: {completedCount}/{totalCount}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button
                className="btn btn-lg mr-2 bgbutton rounded-0"
                onClick={handleAddTodo}
                style={{ fontSize: '25px', color: 'black', fontWeight: 'bold' }}
              >
                +
              </button>
            </div>
            <div style={{ marginRight: '5px' }}></div>
            <input
              type="text"
              className="form-control text-black bgbutton"
              placeholder="Add a Todo...."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {todos.length === 0 ? (
            <p className="text-center mt-4">Add your first todo :)</p>
          ) : (
            <ul className="list-group">
              {todos.map((todo, index) => (
                <li className="list-group-item d-flex align-items-center" key={index}>
                  <input
                    type="checkbox"
                    className="mr-3 custom-checkbox"
                    style={{ width: '18px', height: '18px' }}
                    checked={todo.completed}
                    onChange={() => {
                      const updatedTodos = todos.map((item, i) =>
                        i === index ? { ...item, completed: !item.completed } : item
                      );
                      setTodos(updatedTodos);
                    }}
                  />
                  &nbsp;
                  {todo.isEditing ? (
                    <input
                      type="text"
                      className="form-control flex-grow-1"
                      value={todo.text}
                      onChange={(e) => {
                        const editedText = e.target.value;
                        const updatedTodos = todos.map((item, i) =>
                          i === index ? { ...item, text: editedText } : item
                        );
                        setTodos(updatedTodos);
                      }}
                    />
                  ) : (
                    <span className={`flex-grow-1 ${todo.completed ? 'text-decoration-line-through' : ''}`}>
                      {todo.text}
                    </span>
                  )}
                  {todo.isEditing ? (
                    <button
                      className="btn btn-sm ml-2 text-success fw-bold"
                      onClick={() => handleSaveTodo(index, todo.text)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm ml-2 text-primary fw-bold"
                      onClick={() => handleEditTodo(index)}
                    >
                      ✎
                    </button>
                  )}
                  <button
                    className="btn btn-sm ml-2 text-danger fw-bold"
                    onClick={() => handleDeleteTodo(index)}
                  >
                    ⌫ 
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
