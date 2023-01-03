const TodoItem = ({ todoData }) => {
  return (
    <div>
      <div>TodoItem</div>
      <div>{todoData.title}</div>
      <div>{todoData.content}</div>
      <div>{todoData.createdAt}</div>
      <div>{todoData.updatedAt}</div>
    </div>
  );
};
export default TodoItem;
