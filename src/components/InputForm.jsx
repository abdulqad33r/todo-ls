import React, { useState } from "react";

const InputForm = (props) => {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleAddTask = () => {
    if (name) {
      props.addTask(name);
      setName("");
    } else {
      alert("Type something in input first");
    }
  };

  return (
    <div className="input-group mb-3 input-form">
      <button
        className={`btn btn-outline-${
          props.mode === "dark" ? "danger" : "primary"
        }`}
        type="button"
        id="addBtn"
        onClick={handleAddTask}
      >
        Add
      </button>
      <input
        style={{
          background: `${props.mode === "dark" ? "transparent" : "white"}`,
          color: `${props.mode === "dark" ? "white" : "#212F3C"}`,
          transition: "all 1s",
        }}
        type="text"
        className="form-control input"
        placeholder="Enter task"
        aria-label="Enter task"
        aria-describedby="basic-addon1"
        value={name}
        onChange={handleChange}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            if (name) {
              props.addTask(name);
              setName("");
            } else {
              alert("Type something in input first.");
            }
          }
        }}
        ref={props.addTaskInput}
      />
    </div>
  );
};

export default InputForm;
