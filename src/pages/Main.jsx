import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import TodoCreate from '../components/TodoCreate';
import TodoList from '../components/TodoList';

const Main = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const userToken = localStorage.getItem('userToken');
  const onClickLogOut = () => {
    localStorage.removeItem('userToken');
    navigate('/auth/signin');
  };
  return (
    <div>
      {!userToken ? <Navigate to="/auth/signin" replace={true} /> : null}
      <div>
        <button onClick={onClickLogOut}>로그아웃</button>
      </div>
      <div>메인</div>
      <TodoCreate todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default Main;
