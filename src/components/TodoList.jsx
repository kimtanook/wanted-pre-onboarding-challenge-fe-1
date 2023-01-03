import axios from 'axios';
import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, setTodos }) => {
  const getTodos = async () => {
    const userToken = localStorage.getItem('userToken');
    const todosData = await axios.get('http://localhost:8080/todos', {
      headers: { Authorization: userToken },
    });
    const todoData = todosData.data.data;
    setTodos(todoData);
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div>
      <div>todoList</div>
      {todos.map((item) => (
        <div key={item.id}>
          <TodoItem todoData={item} />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
