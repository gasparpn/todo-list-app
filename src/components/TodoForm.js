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
    <form className="form-inline">
      <div class="input-group">
        <div className="form-group mx-3">
          <label>
            Description:
                <input
              className="ml-2"
              placeholder={props.edit ? "Update your descriptio" : "Add a description"}
              value={title}
              onChange={handleTitleChange}
              name="title"
              type="text"
            />
          </label>
        </div>
        <div className="form-group mx-3">
          <label>
            Schedule for:
                  <DateTimePicker
              className="ml-2"
              onChange={handleDateChange}
              value={scheduledFor}
              format="yyyy-MM-dd hh:mm:s"
            />
          </label>
        </div>
        <div className="form-group mx-3">
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
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          Add todo
          </button>
      </div>
    </form>
  );
}

export default TodoForm;