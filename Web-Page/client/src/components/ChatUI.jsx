import React, { useState } from "react";

const ChatUI = () => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Greeting */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-3xl font-semibold text-gray-700 text-center">
          👋 Welcome to Sanjeevani Chat!
        </div>
      </div>
      {/* Prompt Bar */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center px-4 py-3 bg-white border-t border-gray-200"
      >
        <input
          type="text"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition-colors duration-150"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatUI;
