import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { listTodoItems, createTodoItem, deleteTodoItem, updateTodoItem } from '../services/todo'
import moment from 'moment';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    refreshListItems();
  }, []);

  const refreshListItems = async () => {
    const todos = await listTodoItems();
    todos.forEach(todo => {
      if (todo.status === "DONE") {
        let finalDate = moment(todo.finishedAt);
        let initialDate = moment(todo.scheduledAt);
        todo.timeSpend = moment.utc(finalDate.diff(initialDate)).format("HH:mm:ss")
      }
    });
    setTodos(todos);
  }

  const addTodo = async todo => {
    try {
      await createTodoItem(todo);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Can't create the todo item, please verify the informations and try again.");
    }
    await refreshListItems();
  }

  const updateTodo = async (id, newTodoItem) => {
    try {
      await updateTodoItem(id, newTodoItem);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Can't update the Todo item, please verify if the scheduled date is bigger than now.");
    }
    await refreshListItems();
  }

  const removeTodo = async (id) => {
    try {
      await deleteTodoItem(id);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Can't delete the Todo item, please verify if it's DONE and try again.");
    }
    await refreshListItems();
  };

  const markAsDone = async (id, todo) => {
    todo.status = "DONE";
    todo.finishedAt = moment()
    try {
      await updateTodoItem(id, todo);

      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Can't mark item as DONE, please verify if the dates are correct and try again.");
    }
    await refreshListItems();
  }

  return (
    <>
      { errorMessage &&
        <h4 className="text-center mb-5"> {errorMessage} </h4>}


      <div className="container">
        <h1 className="text-center mb-5">Bravi Todo List</h1>
        <TodoForm onSubmit={addTodo} />
        <div className="row mt-5">
          <div className="col-md-4 font-weight-bold">Description</div>
          <div className="col-md-2 font-weight-bold">Scheduled For</div>
          <div className="col-md-2 font-weight-bold">Status</div>
          <div className="col-md-2 font-weight-bold">Time Spend</div>
          <div className="col-md-2 font-weight-bold">Options</div>
        </div>
        {todos.map(
          (todo, index) => (
            <div className="mt-5">
              <TodoItem
                key={index}
                todo={todo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
                markAsDone={markAsDone}
              />
            </div>
          )
        )}
      </div>
    </>
  );
}

export default TodoList;