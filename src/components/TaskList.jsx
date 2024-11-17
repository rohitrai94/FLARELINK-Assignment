import React, { useState } from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, addTask, deleteTask, toggleComplete, searchQuery, completedCount, totalCount }) {
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask({ id: Date.now(), text: newTask, completed: false, priority });
      setNewTask('');
      setPriority('Medium');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAddTask();
  };

  // Apply search filter
  const visibleTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="task-list">
      {/* Task Count Section */}
      <div className="task-list-header">
        <h2>Tasks</h2>
        <p className="completed-count">
          Completed Tasks: {completedCount} / {totalCount}
        </p>
      </div>

      {/* Task Items */}
      {visibleTasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        visibleTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
          />
        ))
      )}

      {/* Add Task Section */}
      <div className="add-task-section">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="form-control priority-dropdown"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add new task"
          className="form-control"
        />
        <button onClick={handleAddTask} className="btn btn-primary ml-2">
          Add
        </button>
      </div>
    </div>
  );
}

export default TaskList;
