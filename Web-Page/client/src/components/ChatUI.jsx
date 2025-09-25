import React, { useState } from 'react';
import { FaPaperPlane, FaComments } from 'react-icons/fa';



const ChatUI = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // {role: 'user'|'ai', content: string}
  const [loading, setLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage) return;
    if (showIntro) setShowIntro(false);
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      if (data.response) {
        setMessages((prev) => [...prev, { role: 'ai', content: data.response }]);
      } else {
        setMessages((prev) => [...prev, { role: 'ai', content: 'Error: No response from server.' }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'ai', content: 'Error: Failed to connect to server.' }]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 overflow-y-auto">
        <div className="max-w-2xl w-full text-center">
          <div
            className={`transition-opacity duration-700 ${showIntro ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none h-0 overflow-hidden'}`}
          >
            <div className="mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                <FaComments className="text-white text-2xl" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                संजीवनी
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                आपकी क्या सहायता कर सकता हूं?
              </p>
            </div>
            {/* Example prompts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mb-4">
              {[
                "स्वास्थ्य सलाह चाहिए",
                "दवा की जानकारी",
                "लक्षणों का विश्लेषण",
                "डॉक्टर से मिलना है"
              ].map((prompt, idx) => (
                <button
                  key={idx}
                  className="p-4 text-left rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setInput(prompt)}
                >
                  <span className="text-sm text-gray-700 dark:text-gray-300">{prompt}</span>
                </button>
              ))}
            </div>
          </div>

          {!showIntro && (
            <>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 text-left">संजीवनी</h1>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 mb-6 p-4 min-h-[120px] max-h-72 overflow-y-auto text-left">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`mb-2 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-4 py-2 rounded-lg text-base max-w-[80%] whitespace-pre-line ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="text-gray-400 dark:text-gray-500 text-sm">Thinking...</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Input area */}
      <div className="p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 p-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="यहाँ लिखें"
                className="flex-1 bg-transparent border-none outline-none resize-none px-4 py-3 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-base leading-6 max-h-32 min-h-[24px]"
                rows={1}
                style={{
                  height: 'auto',
                  minHeight: '24px',
                  maxHeight: '120px'
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className={`p-3 rounded-xl transition-all duration-200 flex items-center justify-center ${
                  input.trim() && !loading
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                <FaPaperPlane className="w-4 h-4" />
              </button>
            </div>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
            Sanjeevani can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
