import React, { useState } from "react";

const AddList = ({ displayTasks }) => {
  const [task, setTask] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("http://localhost:5000/add", {
        method: "POST",
        body: JSON.stringify({ task }),
        headers: { "content-type": "application/json" },
      });
      if (resp.status === 201) {
        displayTasks();
        setTask("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit} className="input-group">
            <input
              className="form-control glass-box"
              type="text"
              placeholder="Enter your tasks"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button className=" btn-primary submit-btn" type="submit">
              Add task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddList;
