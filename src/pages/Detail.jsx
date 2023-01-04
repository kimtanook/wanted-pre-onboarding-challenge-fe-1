import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Detail = () => {
  const [detailTodo, setDetailTodo] = useState([]);
  const param = useParams();
  const getTodos = async () => {
    const userToken = localStorage.getItem('userToken');
    const detailTodoData = await axios.get(
      `http://localhost:8080/todos/${param.id}`,
      {
        headers: { Authorization: userToken },
      }
    );
    const todoData = detailTodoData.data.data;
    setDetailTodo(todoData);
  };
  useEffect(() => {
    getTodos();
  }, []);
  const navigate = useNavigate();
  return (
    <StDetailWrap>
      <StPageName>상세페이지</StPageName>
      <div>
        <div>제목 : {detailTodo.title}</div>
        <div>내용 : {detailTodo.content}</div>
        <div>만든 날짜 : {detailTodo.createdAt}</div>
        <div>수정 날짜 : {detailTodo.updatedAt}</div>
      </div>
      <StButton
        onClick={() => {
          navigate('/');
        }}
      >
        메인으로
      </StButton>
    </StDetailWrap>
  );
};
export default Detail;

const StDetailWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  padding: 20px;
`;
const StPageName = styled.div`
  margin-bottom: 10px;
`;
const StButton = styled.button`
  margin: 3px;
  border: none;
  border-radius: 15px;
  background-color: black;
  color: white;
  width: 60px;
  height: 20px;
`;
