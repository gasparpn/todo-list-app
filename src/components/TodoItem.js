import React, { useState } from 'react'
import TodoForm from './TodoForm'
import { AiFillEdit, AiFillDelete, AiOutlineFileDone } from 'react-icons/ai'

function TodoItem({ todo, removeTodo, updateTodo, markAsDone }) {

  const [edit, setEdit] = useState({
    id: null,
    title: '',
    status: '',
    scheduledFor: null,
    finishedAt: null,
  });

  const submitUpdate = newTodo => {
    updateTodo(edit.id, newTodo);
    setEdit({
      id: null,
      title: '',
      status: '',
      scheduledFor: null,
      finishedAt: null,
    });
  };

  const handleEditClick = todo => {
    setEdit({
      id: todo.id,
      title: todo.title,
      status: todo.status,
      scheduledFor: todo.scheduledFor,
      finishedAt: todo.finishedAt,
      timeSpend: todo.timeSpend,
    })
  }

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    <div>
      <div>{todo.scheduledFor}</div>
      <div>{todo.status}</div>
      {todo.status === "DONE" && todo.timeSpend ? (
        <div>{todo.timeSpend}</div>
      ) : ''}
      <div className='icons'>
        <AiFillDelete
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <AiFillEdit
          onClick={() => handleEditClick(todo)}
          className='edit-icon'
        />
        <AiOutlineFileDone
          onClick={() => markAsDone(todo.id, todo)}
          className='edit-icon'
        />
      </div>
    </div>
  );
}

export default TodoItem