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
    <div className="row">
      <div className="col-md-4">{todo.title}</div>
      <div className="col-md-2">{todo.scheduledFor}</div>
      <div className="col-md-2">{todo.status}</div>
      <div className="col-md-2">
        {todo.status === "DONE" && todo.timeSpend ? todo.timeSpend : ''}
      </div>
      <div className="col col-sm col-md-2">
        <AiFillDelete
          onClick={() => removeTodo(todo.id)}
          title="Delete Item"
        />
        <AiFillEdit
          onClick={() => handleEditClick(todo)}
          title="Update Item"
        />
        <AiOutlineFileDone
          onClick={() => markAsDone(todo.id, todo)}
          title="Mark as Done"
        />
      </div>
    </div>
  );
}

export default TodoItem