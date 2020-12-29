import axios from 'axios';


const api = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    'Content-Type': 'application/json'
  }
});


async function listTodoItems() {
  const response = await api.get('todo/');
  return response.data;
}

async function createTodoItem(todoItem) {
  const response = await api.post('todo/', todoItem);
  return response.data;
}

async function updateTodoItem(id, todoItem) {
  todoItem.id = id;
  const response = await api.put('todo/', todoItem);
  return response.data;
}

async function deleteTodoItem(id) {
  const response = await api.delete(`todo/${id}`)
  return response.data
}


export {
  listTodoItems,
  createTodoItem,
  updateTodoItem,
  deleteTodoItem
};