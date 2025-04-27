import React, { useState } from "react";
import initialTodos from "../data";

function Main() {
  const [todos, setTodos] = useState(initialTodos);
  const [newTask, setNewTask] = useState("");

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      task: newTask,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const activeTasks = todos.filter((todo) => !todo.completed);
  const completedTasks = todos.filter((todo) => todo.completed);

  return (
    <div className="mainContainer">
      <div className="addTask">
        <input
          type="text"
          placeholder="Enter task"
          value={newTask}
          onChange={handleChange}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="taskColumns">
        <div className="taskColumn">
          <h2>To Do</h2>
          {activeTasks.length === 0 ? (
            <p className="emptyMsg">No active tasks 🎉</p>
          ) : (
            activeTasks.map((todo) => (
              <div key={todo.id} className="taskCard">
                <div>
                  <input
                    type="checkbox"
                    onChange={() => toggleComplete(todo.id)}
                  />
                  <span>{todo.task}</span>
                </div>
                <button onClick={() => deleteTask(todo.id)}>❌</button>
              </div>
            ))
          )}
        </div>

        <div className="taskColumn">
          <h2>Completed</h2>
          {completedTasks.length === 0 ? (
            <p className="emptyMsg">No completed tasks</p>
          ) : (
            completedTasks.map((todo) => (
              <div key={todo.id} className="taskCard completedCard">
                <div>
                  <input
                    type="checkbox"
                    checked
                    onChange={() => toggleComplete(todo.id)}
                  />
                  <span>{todo.task}</span>
                </div>
                <button onClick={() => deleteTask(todo.id)}>❌</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
