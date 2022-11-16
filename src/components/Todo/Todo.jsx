import React, { useEffect, useRef, useState } from "react";

import "./Todo.css";

const Todo = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (name) {
      props.editTask(props.id, name);
      setName("");
      setIsEditing(false);
    } else {
      alert("Type something in input first");
    }
  };

  const viewTemplate = (
    <div
      className="temp"
      style={{
        boxShadow: `${
          props.mode === "dark"
            ? " #1B2631 0px 20px 30px -10px"
            : "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
        }`,
        backgroundColor: `${props.mode === "dark" ? "#154360" : "white"}`,
      }}
    >
      <div className="temp-form">
        <p
          className={`fs-4 fw-bolder font-monospace text-${
            props.mode === "dark" ? "light" : "muted"
          } text-decoration-underline`}
          style={{ zIndex: "2" }}
        >
          {props.index + 1}
        </p>
        <span
          className={`fs-4 fw-bolder font-monospace text-${
            props.mode === "dark" ? "light" : "muted"
          }`}
          style={{ marginRight: "1rem", zIndex: "2" }}
        >
          .
        </span>

        <div
          className="form-check"
          id="viewtemp-label-check"
          style={{ zIndex: "2" }}
        >
          <input
            className="form-check-input checkbox"
            type="checkbox"
            defaultChecked={props.completed}
            id={props.id}
            onClick={() => props.toggleTaskCompleted(props.id)}
          />
          <label
            className={`form-check-label text-${
              props.mode === "dark" ? "light" : "dark"
            }`}
            htmlFor={props.id}
          >
            {props.name}
          </label>
        </div>
      </div>

      <div className="todo-buttons mt-3 mb-4">
        <div>
          <button
            id="edit-cancel-button"
            type="button"
            className={`btn btn-outline-${
              props.mode === "dark" ? "danger" : "primary"
            } mb-2`}
            onClick={() => setIsEditing(true)}
            ref={editButtonRef}
          >
            Edit
          </button>

          <button
            id="delete-save-button"
            type="button"
            className={`btn btn-outline-${
              props.mode === "dark" ? "info" : "danger"
            } mb-2`}
            onClick={() => props.deleteTask(props.id)}
          >
            Delete
          </button>
        </div>

        <p className={`time text-${props.mode === "dark" ? "light" : "dark"}`}>
          {props.created_at_date}
          {", "}
          <br />
          <span className={`text-${props.mode === "dark" ? "info" : "dark"}`}>
            {props.created_at_time}
          </span>
        </p>
      </div>
    </div>
  );

  const editingTemplate = (
    <div
      className={`temp ${props.mode === "dark" && "temp-edit"}`}
      style={{
        boxShadow: `${
          props.mode === "light" &&
          // ? " #2E4053 0px 0px 50px -10px, #2E4053 0px 0px 50px -10px"
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
        }`,

        backgroundColor: `${
          props.mode === "dark" ? "rgb(40, 55, 65)" : "white"
        }`,
      }}
    >
      <div className="col-sm-12 temp-form">
        <p
          className={`fs-4 fw-bolder font-monospace text-${
            props.mode === "dark" ? "light" : "muted"
          } text-decoration-underline`}
          style={{ zIndex: "2" }}
        >
          {props.index + 1}
        </p>
        <span
          className={`fs-4 fw-bolder font-monospace text-${
            props.mode === "dark" ? "light" : "muted"
          }`}
          style={{ marginRight: "1rem", zIndex: "2" }}
        >
          .
        </span>
        <input
          type="text"
          id={props.id}
          className="form-control editInput"
          placeholder="Changing task"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={name}
          onChange={handleChange}
          ref={editFieldRef}
          style={{
            background: "transparent",
            color: `${props.mode === "dark" ? "white" : "#212F3C"}`,
            transition: "2.5s all",
            zIndex: "2",
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              if (name) {
                props.editTask(props.id, name);
                setName("");
                setIsEditing(false);
              } else {
                alert("Ullu k pathy kuch likh to sai pehly.");
              }
            }
          }}
        ></input>
      </div>

      <div className="todo-buttons mt-3 mb-4">
        <button
          id="edit-cancel-button"
          type="button"
          className={`btn btn-outline-${
            props.mode === "dark" ? "info" : "danger"
          } mb-2`}
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>

        <button
          id="delete-save-button"
          type="button"
          className={`btn btn-outline-${
            props.mode === "dark" ? "danger" : "primary"
          } mb-2`}
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
      {/* <hr style={{ color: `${props.mode === "dark" ? "white" : "blue"}` }} /> */}
    </div>
  );

  useEffect(() => {
    if (isEditing) {
      editFieldRef.current.focus();
    }
  }, [isEditing]);

  return isEditing ? (
    <div className="todo-item">{editingTemplate}</div>
  ) : (
    <div className="todo-item">{viewTemplate}</div>
  );
};

export default Todo;
