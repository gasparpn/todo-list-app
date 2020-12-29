import React, { useState } from 'react'
import TodoForm from './TodoForm'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'

function TodoItem({ todo, completeTodo, removeTodo, updateTodo }) {

  const [edit, setEdit] = useState({
    id: null,
    text: '',
    status: '',
    scheduledFor: null,
  });

  const submitUpdate = newTodo => {
    updateTodo(edit.id, newTodo);
    setEdit({
      id: null,
      text: '',
      status: '',
      scheduledFor: null,
    });
  };

  const handleEditClick = todo => {
    setEdit({
      id: todo.id,
      text: todo.text,
      status: todo.status,
      scheduledFor: todo.scheduledFor
    })
  }

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    <div
      className={todo.isComplete ? '' : ''}
    >
      <div onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div>{todo.scheduledFor}</div>
      <div>{todo.status}</div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => handleEditClick(todo)}
          className='edit-icon'
        />
      </div>
    </div>
  );
}

export default TodoItem