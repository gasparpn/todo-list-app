import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';


function TodoForm(props) {
  const [title, setTitle] = useState(props.edit ? props.edit.value : "");
  const [scheduledFor, setScheduledFor] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [finishedAt, setfinishedAt] = useState("");
  const [timeSpend, settimeSpend] = useState("");
  const [status, setStatus] = useState("");

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleDateChange = e => {
    setScheduledFor(e);
  }

  const handleStatusChange = e => {
    setStatus(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    let moment = require('moment-timezone');
    props.onSubmit({
      title: title,
      scheduledFor: scheduledFor,
      scheduledAt: moment().tz("America/Sao_Paulo").format("YYYY-MM-DDTHH:mm:ss"),
      status: status,
    });
    setTitle("");
    setScheduledFor("");
    setStatus("");
    setScheduledAt("");
    settimeSpend("");
    setfinishedAt("");
  };

  return (
    <form className=''>
      {props.edit ? (
        <>
          <input
            placeholder="Update your item"
            value={title}
            onChange={handleTitleChange}
            name="title"
            className=''
          />
          <DateTimePicker
            onChange={handleDateChange}
            value={scheduledFor}
          />
          <select
            name="status"
            value={status}
            onChange={handleStatusChange}
          >
            <option>Status</option>
            {["TODO", "DOING"].map(
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
              value={title}
              onChange={handleTitleChange}
              name="title"
              className=""
            />
            <DateTimePicker
              onChange={handleDateChange}
              value={scheduledFor}
              format="yyyy-MM-dd hh:mm:s"
            />
            <select
              name="status"
              value={status}
              onChange={handleStatusChange}
            >
              <option>Status</option>
              {["TODO", "DOING"].map(
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