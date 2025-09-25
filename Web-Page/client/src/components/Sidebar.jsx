import React, { useState, useEffect } from "react";

const Sidebar = ({ isOpen, onClose, onSelectChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("sanjeevani_chats");
    if (stored) setChats(JSON.parse(stored));
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30 transform transition-transform duration-200 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <span className="font-bold text-lg">Previous Chats</span>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          ×
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-56px)]">
        {chats.length === 0 ? (
          <div className="text-gray-400 text-center mt-8">No previous chats</div>
        ) : (
          <ul>
            {chats.map((chat, idx) => (
              <li
                key={idx}
                className="mb-3 cursor-pointer hover:bg-gray-100 rounded px-2 py-1"
                onClick={() => onSelectChat(chat)}
              >
                {chat.title || `Chat #${idx + 1}`}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
