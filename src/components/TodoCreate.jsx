import axios from 'axios';
import { useState } from 'react';

const TodoCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  const createTodo = async () => {
    const userToken = localStorage.getItem('userToken');
    await axios.post(
      'http://localhost:8080/todos',
      { title: title, content: content },
      {
        headers: { Authorization: userToken },
      }
    );
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
