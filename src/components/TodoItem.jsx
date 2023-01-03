import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

const TodoItem = ({ todoData, todos, setTodos }) => {
  const [toggle, setToggle] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

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
      <div>{todoData.id}</div>
      {toggle ? (
        <form onSubmit={updateTodo}>
          <div>
            <input
              type="text"
              onChange={onChangeNewTitle}
              placeholder="수정할 제목"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={onChangeNewContent}
              placeholder="수정할 내용"
            />
          </div>
          <button>완료</button>
        </form>
      ) : (
        <div>
          <div>{todoData.title}</div>
          <div>{todoData.content}</div>
        </div>
      )}
      <div>{todoData.createdAt}</div>
      <div>{todoData.updatedAt}</div>
      <div>
        <button onClick={onClickToggle}>수정</button>
        <button onClick={deleteTodo}>삭제</button>
      </div>
    </StTodoItemContainer>
  );
};
export default TodoItem;

const StTodoItemContainer = styled.div`
  border: 1px solid black;
  margin: 10px;
`;
