import axios from 'axios';
import { useState } from 'react';

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
  };
  return (
    <div>
      <div>TodoCreate</div>
      <form onSubmit={createTodo}>
        <div>
          <input
            type="text"
            onChange={onChangeTitle}
            placeholder="title"
            required
          />
        </div>
        <div>
          <input
            type="text"
            onChange={onChangeContent}
            placeholder="content"
            required
          />
        </div>
        <button type="submit">완료</button>
      </form>
    </div>
  );
};
export default TodoCreate;
