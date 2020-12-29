import React, { useState } from 'react';

function TodoForm(props) {
  const [text, setText] = useState(props.edit ? props.edit.value : '');
  const [scheduledFor, setScheduledFor] = useState(null);
  const [status, setStatus] = useState("");

  const handleTextChange = e => {
    setText(e.target.value);
  };

  const handleDateChange = e => {
    setScheduledFor(e.target.value);
  }

  const handleStatusChange = e => {
    setStatus(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: text,
      scheduledFor: scheduledFor,
      status: status,
    });
    setText("");
    setScheduledFor(null);
    setStatus("");
  };

  return (
    <form onSubmit={handleSubmit} className=''>
      {props.edit ? (
        <>
          <input
            placeholder="Update your item"
            value={text}
            onChange={handleTextChange}
            name="text"
            className=''
          />
          <input
            placeholder="Update your item scheduled date"
            type="date"
            value={scheduledFor}
            onChange={handleDateChange}
            name="scheduled date"
            className=''
          />
          <select
            name="status"
            value={status}
            onChange={handleStatusChange}
          >
            <option>Status</option>
            {["TODO", "DOING", "DONE"].map(
              (value, index) => (
                <option key={index} value={value}>{value}</option>
              )
            )}
          </select>
          <button onClick={handleSubmit} className="">
            Update
          </button>
        </>
      ) : (
          <>
            <input
              placeholder="Add a todo"
              value={text}
              onChange={handleTextChange}
              name="text"
              className=""
            />
            <input
              placeholder="Add your item scheduled date"
              type="date"
              value={scheduledFor}
              onChange={handleDateChange}
              name="scheduled date"
              className=''
            />
            <select
              name="status"
              value={status}
              onChange={handleStatusChange}
            >
              <option>Status</option>
              {["TODO", "DOING", "DONE"].map(
                (value, index) => (
                  <option key={index} value={value}>{value}</option>
                )
              )}
            </select>
            <button onClick={handleSubmit} className=''>
              Add todo
          </button>
          </>
        )}
    </form>
  );
}

export default TodoForm;