import { nanoid } from "nanoid";
import { useEffect } from "react";
import { useState, useRef } from "react";
import FilterButtons from "./components/FilterButtons/FilterButtons";
import Firefly from "./components/Firefly/Firefly";
import InputForm from "./components/InputForm";
import SearchForm from "./components/SearchForm/SearchForm";
import Todo from "./components/Todo/Todo";
import ToggleMode from "./components/ToggleMode";
import Calendar from "react-calendar";
import { BsFillCalendarCheckFill } from "react-icons/bs";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [filter, setFilter] = useState("All");
  const [mode, setMode] = useState("dark");
  const [search, setSearch] = useState("");
  const [calDate, setCalDate] = useState(new Date());
  const [showCal, setShowCal] = useState(false);

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "white";
    } else if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#212F3C";
    }
  };

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButtons key={name} name={name} setFilter={setFilter} mode={mode} />
  ));

  const addTask = (newName) => {
    const newTask = {
      name: newName,
      id: `todo-${nanoid()}`,
      completed: false,
      created_at_date: new Date().toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      created_at_time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => id !== task.id);
    setTasks(updatedTasks);
  };

  const editTask = (id, newName) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return {
          ...task,
          name: newName,
          created_at_date: new Date().toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          created_at_time: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const taskList = tasks
    .filter(
      (task) =>
        task.created_at_date ===
        calDate.toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
    )
    .filter(FILTER_MAP[filter])
    .filter((task) => task.name.toLowerCase().includes(search.toLowerCase()))
    .map((task, index) => (
      <Todo
        key={task.id}
        id={task.id}
        name={task.name}
        completed={task.completed}
        created_at_date={task.created_at_date}
        created_at_time={task.created_at_time}
        index={index}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
        mode={mode}
      />
    ));

  const addTaskInput = useRef(null);
  const prevTasksCount = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTasksCount === -1) {
      addTaskInput.current.focus();
    }
  }, [tasks.length, prevTasksCount]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);

  function onChange(calDate) {
    setCalDate(calDate);
  }

  return (
    <>
      <BsFillCalendarCheckFill
        className="calendar-icon"
        onClick={() => setShowCal(!showCal)}
      />
      <Calendar
        onChange={onChange}
        value={calDate}
        className={`${showCal && "block"}`}
      />

      <div className="todo-app">
        <div className="toggle-mode">
          <ToggleMode toggleMode={toggleMode} mode={mode} />
        </div>

        <InputForm addTask={addTask} mode={mode} addTaskInput={addTaskInput} />

        <div>
          <div className="filter-list">
            <p
              className={`task-count text-${
                mode === "dark" ? "info" : "danger"
              }`}
            >
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"} remaining.
            </p>
            <div
              className="btn-group mb-3"
              role="group"
              aria-label="Basic example"
            >
              {filterList}
            </div>
            <SearchForm mode={mode} setSearch={setSearch} />
          </div>

          <div className="task-list">
            {taskList.length !== 0 ? (
              taskList
            ) : (
              <p
                className="no-task"
                style={{ color: `${mode === "dark" ? "aqua" : "#212F3C"}` }}
              >
                No task
              </p>
            )}
          </div>
        </div>
      </div>
      {mode === "dark" && <div className="abc"><Firefly /></div>}
    </>
  );
}

export default App;
