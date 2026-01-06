// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React, { useState, useEffect } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Define the fetching function
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api.github.com/users');
        const data = await response.json()
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    // 2. Call the function
    fetchUsers();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-slate-800 min-header-screen p-8 min-h-screen">
      <h1 className="text-white text-2xl font-bold mb-8 text-center">
        React Application with GitHub API and useEffect
      </h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {users.map((user) => (
          <div key={user.id} className="bg-slate-100 p-4 flex items-center space-x-4 rounded shadow-md">
            {/* Avatar */}
            <img 
              src={user.avatar_url} 
              alt={user.login} 
              className="w-16 h-16 rounded-full border-2 border-gray-300"
            />
            
            {/* User Info */}
            <div className="overflow-hidden">
              <h2 className="font-bold text-gray-800 truncate">{user.login}</h2>
              <a 
                href={user.html_url} 
                target="_blank" 
                rel="noreferrer" 
                className="text-blue-500 text-xs hover:underline block truncate"
              >
                {user.html_url}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;