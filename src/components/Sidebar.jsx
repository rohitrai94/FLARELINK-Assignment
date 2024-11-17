import React from 'react';
import { FaBars } from 'react-icons/fa';

function Sidebar({ open, toggleSidebar, searchQuery, setSearchQuery, activeTab, setActiveTab }) {
  return (
    <>
      <div className={`sidebar ${open ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Task Manager</h2>
          <FaBars className="menu-icon" onClick={toggleSidebar} />
        </div>
        <div className="sidebar-content">
          <input
            type="text"
            placeholder="Search tasks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control mb-3"
          />
          <ul className="nav flex-column">
            {['All', 'Upcoming', 'Completed', 'Priority'].map((tab) => (
              <li
                key={tab}
                className={`nav-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <button className="btn btn-link">{tab} Tasks</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {!open && (
        <FaBars className="menu-icon-overlay" onClick={toggleSidebar} />
      )}
    </>
  );
}

export default Sidebar;
