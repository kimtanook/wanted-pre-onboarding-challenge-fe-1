import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TodoItem = ({ todoData, todos, setTodos }) => {
  const [toggle, setToggle] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const navigate = useNavigate();
  const userToken = localStorage.getItem('userToken');

  const onClickToggle = () => {
    setToggle(!toggle);
  };
  const onChangeNewTitle = (event) => {
    setNewTitle(event.target.value);
  };
  const onChangeNewContent = (event) => {
    setNewContent(event.target.value);
  };

  const updateTodo = async (event) => {
    event.preventDefault();
    await axios.put(
      `http://localhost:8080/todos/${todoData.id}`,
      {
        title: newTitle,
        content: newContent,
      },
      {
        headers: { Authorization: userToken },
      }
    );
    onClickToggle();
    const newTodos = todos.map((item) => {
      if (item.id === todoData.id) {
        return {
          ...item,
          title: newTitle,
          content: newContent,
        };
      } else {
        return item;
      }
    });
    setTodos(newTodos);
  };

  const deleteTodo = async () => {
    const userData = await axios.delete(
      `http://localhost:8080/todos/${todoData.id}`,
      {
        headers: { Authorization: userToken },
      }
    );
    const newTodos = todos.filter((item) => item.id !== todoData.id);
    console.log('userData.id : ', userData.id);
    setTodos(newTodos);
  };
  return (
    <StTodoItemContainer>
      {toggle ? (
        <StForm onSubmit={updateTodo}>
          <StTitleInput
            type="text"
            onChange={onChangeNewTitle}
            placeholder="수정할 제목"
            required
            maxLength={13}
          />
          <StContentInput
            type="text"
            onChange={onChangeNewContent}
            placeholder="수정할 내용"
            required
            maxLength={100}
          />
          <button>완료</button>
        </StForm>
      ) : (
        <div>
          <StTitle>{todoData.title}</StTitle>
          <StContent>{todoData.content}</StContent>
        </div>
      )}
      <StCreatedAt>{todoData.createdAt}</StCreatedAt>
      <div>
        <StButton onClick={onClickToggle}>{toggle ? '취소' : '수정'}</StButton>
        <StButton onClick={deleteTodo}>삭제</StButton>
      </div>
      <div>
        <StButton
          onClick={() => {
            navigate(`/todos/${todoData.id}`);
          }}
        >
          상세보기
        </StButton>
      </div>
    </StTodoItemContainer>
  );
};
export default TodoItem;

const StTodoItemContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
`;
const StTitle = styled.div`
  font-size: 25px;
  margin-top: 10px;
  background-color: black;
  color: white;
  text-align: center;
  width: 300px;
`;
const StContent = styled.div`
  font-size: 25px;
  margin-bottom: 26px;
  text-align: center;
  width: 300px;
`;
const StForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StCreatedAt = styled.div`
  font-size: 15px;
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
const StTitleInput = styled.input`
  height: 32px;
  width: 200px;
`;
const StContentInput = styled.input`
  height: 32px;
  width: 200px;
`;
