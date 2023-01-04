import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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
    <StMainWrap>
      {!userToken ? <Navigate to="/auth/signin" replace={true} /> : null}
      <div>
        <StButton onClick={onClickLogOut}>로그아웃</StButton>
      </div>
      <StMainTitle>Todo List</StMainTitle>
      <TodoCreate todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </StMainWrap>
  );
};

export default Main;

const StMainWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StMainTitle = styled.div`
  margin: 10px;
  font-size: 40px;
`;
const StButton = styled.button`
  margin: 5px;
  border: none;
  border-radius: 20px;
  background-color: black;
  color: white;
  height: 25px;
`;
