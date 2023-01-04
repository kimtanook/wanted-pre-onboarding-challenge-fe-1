import axios from 'axios';
import { useEffect } from 'react';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {todos.map((item) => (
        <div key={item.id}>
          <TodoItem todoData={item} todos={todos} setTodos={setTodos} />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
