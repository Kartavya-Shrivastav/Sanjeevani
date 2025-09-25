import React, { useState, useEffect } from 'react';
import { FaPaperPlane, FaSun, FaMoon, FaBars, FaTimes, FaPlus, FaComments } from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose, onSelectChat }) => {
  const [chats, setChats] = useState([]);

  const handleNewChat = () => {
    onSelectChat(null);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-30 ${
          isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-xl z-40 transform transition-transform duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700 flex flex-col ${
          isOpen ? 'translate-x-0 w-80' : '-translate-x-full w-80'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FaComments className="text-white text-sm" />
            </div>
            <span className="font-semibold text-gray-800 dark:text-gray-100">Sanjeevani</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <FaTimes className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 group border border-gray-200 dark:border-gray-700"
          >
            <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900 transition-colors duration-200">
              <FaPlus className="w-3 h-3 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">New chat</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="space-y-2">
            {chats.length === 0 ? (
              <div className="text-center text-gray-400 dark:text-gray-500 mt-8 text-sm">
                No previous chats
              </div>
            ) : (
              chats.map((chat, idx) => (
                <button
                  key={idx}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
                  onClick={() => onSelectChat(chat)}
                >
                  <div className="flex items-center gap-3">
                    <FaComments className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200" />
                    <span className="text-sm text-gray-700 dark:text-gray-200 truncate">
                      {chat.title || `Chat #${idx + 1}`}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
