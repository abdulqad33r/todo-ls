import React from "react";
import { useState } from "react";
import "./SearchForm.css";

const SearchForm = (props) => {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    const input = e.target.value;
    setName(input);
    props.setSearch(input);
  };

  return (
    <div className="mb-3 search-form">
      <div className="input-group">
        <div className="form-outline">
          <input
            type="search"
            id="form1"
            className="form-control input searchInput"
            placeholder="Search task"
            value={name}
            onChange={handleChange}
            style={{
              background: `${props.mode === "dark" ? "transparent" : "white"}`,
              color: `${props.mode === "dark" ? "white" : "#212F3C"}`,
              transition: "1s all",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
