import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

const TodoCreate = ({ todos, setTodos }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  const createTodo = async (event) => {
    event.preventDefault();
    const userToken = localStorage.getItem('userToken');
    const userData = await axios.post(
      'http://localhost:8080/todos',
      { title: title, content: content },
      {
        headers: { Authorization: userToken },
      }
    );
    setTodos([...todos, userData.data.data]);
    setTitle('');
    setContent('');
  };
  return (
    <div>
      <form onSubmit={createTodo}>
        <div>
          <input
            type="text"
            value={title}
            onChange={onChangeTitle}
            placeholder="title"
            required
            maxLength={13}
          />
        </div>
        <div>
          <input
            type="text"
            value={content}
            onChange={onChangeContent}
            placeholder="content"
            required
            maxLength={100}
          />
        </div>
        <StButton type="submit">완료</StButton>
      </form>
    </div>
  );
};
export default TodoCreate;

const StButton = styled.button`
  margin: 5px;
  border: none;
  border-radius: 20px;
  background-color: black;
  color: white;
  width: 40px;
  height: 20px;
`;
