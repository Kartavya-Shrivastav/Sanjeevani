import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import ChatUI from "./components/ChatUI";
import "./index.css";

function App() {
  const [showChat, setShowChat] = useState(false);
  return showChat ? <ChatUI /> : <LandingPage onStartChat={() => setShowChat(true)} />;
}

export default App;