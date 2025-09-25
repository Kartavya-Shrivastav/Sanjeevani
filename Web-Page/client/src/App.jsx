import React, { useState } from 'react';
import ChatUI from './components/ChatUI';
import Sidebar from './components/Sidebar';
import './index.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectChat = (chat) => {
    // chat loading logic
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelectChat={handleSelectChat}
      />
      <div className="flex flex-col h-full">
        <button
          className="absolute top-4 left-4 z-40 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
        <ChatUI />
      </div>
    </div>
  );
}

export default App;
