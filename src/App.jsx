import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api.github.com/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-black min-h-screen p-10">
      <h1 className="text-white text-4xl font-bold mb-12 text-center">
       React application With Github API
      </h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className="
              bg-white/20 backdrop-blur-lg
              border border-white/30
              rounded-2xl p-6
              flex flex-col items-center text-center
              shadow-xl
              hover:scale-105 transition-transform duration-300
            "
          >
            {/* Avatar */}
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-24 h-24 rounded-full border-4 border-white/40 mb-4"
            />

            {/* User Info */}
            <h2 className="text-white text-lg font-semibold truncate w-full">
              {user.login}
            </h2>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-300 text-sm mt-2 hover:underline truncate w-full"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
