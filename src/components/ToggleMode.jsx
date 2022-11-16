import React from "react";

const ToggleMode = (props) => {
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        defaultChecked="true"
        role="switch"
        id="flexSwitchCheckDefault"
        onClick={() => props.toggleMode()}
      />
      <label
        className={`form-check-label text-${
          props.mode === "dark" ? "light" : "dark"
        }`}
        htmlFor="flexSwitchCheckDefault"
      >
        Enable {props.mode === "dark" ? "light" : "dark"} mode.
      </label>
    </div>
  );
};

export default ToggleMode;
