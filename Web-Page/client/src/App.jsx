import React, { useState, useEffect } from 'react';

import ChatUI from './components/ChatUI';
import Sidebar from './components/Sidebar';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import './index.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleSelectChat = (chat) => {
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Sidebar toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-5 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        <div className="relative w-4 h-4">
          <FaBars className={`absolute inset-0 transition-all duration-300 ${sidebarOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
          <FaTimes className={`absolute inset-0 transition-all duration-300 ${sidebarOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
        </div>
      </button>

      {/* Dark mode toggle */}
      <button
        className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 hover:text-gray-800 dark:hover:text-gray-100"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
      >
        <div className="relative w-4 h-4">
          <FaSun className={`absolute inset-0 transition-all duration-300 ${darkMode ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
          <FaMoon className={`absolute inset-0 transition-all duration-300 ${darkMode ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
        </div>
        <span className="hidden sm:inline text-sm font-medium">
          {darkMode ? 'Light' : 'Dark'}
        </span>
      </button>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelectChat={handleSelectChat}
      />

      {/* Main content */}
      <main className={`h-full transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'ml-0'}`}>
        <ChatUI />
      </main>
    </div>
  );
}

export default App;