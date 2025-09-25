import React, { useState, useEffect } from 'react';

import ChatUI from './components/ChatUI';
import Sidebar from './components/Sidebar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './components/ui/dropdown-menu';
import { Toggle } from './components/ui/toggle';
import { FaSun, FaMoon } from 'react-icons/fa';
import { FaBars, FaTimes } from 'react-icons/fa';
import './index.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "English";
    }
    return "English";
  });
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const html = document.documentElement;
      if (darkMode) {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
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

      {/* Language dropdown & Dark mode toggle */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 hover:text-gray-800 dark:hover:text-gray-100">
              🌐 {language}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuItem onClick={() => setLanguage("English")}> 
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("Hindi")}> 
              हिंदी
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("Odia")}> 
              ଓଡ଼ିଆ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Toggle
          aria-label="Toggle dark mode"
          variant="outline"
          size="default"
          pressed={darkMode}
          onPressedChange={setDarkMode}
          className="ml-1"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600 dark:text-gray-300" />}
        </Toggle>
      </div>
      
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