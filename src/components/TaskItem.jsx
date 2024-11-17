import React from "react";
import { FaCheck, FaTrash } from "react-icons/fa";

function TaskItem({ task, toggleComplete, deleteTask }) {
  return (
    <div className={`task-item priority-${task.priority.toLowerCase()}`}>
      <span
        className="checkbox"
        onClick={() => toggleComplete(task.id)}
        style={{ cursor: "pointer" }}
      >
        {task.completed ? <FaCheck className="checked" /> : <span className="circle" />}
      </span>
      <span className={task.completed ? "completed-task" : ""}>
        {task.text}
      </span>
      
      <button
        onClick={() => deleteTask(task.id)}
        className="btn btn-link text-danger"
      >
        <FaTrash />
      </button>
    </div>
  );
}

export default TaskItem;
