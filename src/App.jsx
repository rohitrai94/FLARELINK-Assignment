import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage when the app initializes
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleSidebar = () => setSidebarOpen((prevState) => !prevState);

  const addTask = (task) => setTasks([...tasks, task]);
  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filter and sort tasks by active tab
  
    const filteredTasks = tasks
  .filter((task) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Completed') return task.completed;
    if (activeTab === 'Upcoming') return !task.completed;
    return true;
  })
  .sort((a, b) => {
    if (activeTab === 'Priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0; // No sorting for other tabs
  });

  // Count tasks
  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="app-container">
      <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className={`main-content ${!sidebarOpen ? 'expanded' : ''}`}>
        <TaskList
          tasks={filteredTasks}
          addTask={addTask}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          searchQuery={searchQuery}
          completedCount={completedCount}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
}

export default App;
