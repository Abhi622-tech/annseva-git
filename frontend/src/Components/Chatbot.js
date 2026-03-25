import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./styles/Chatbot.css"; // Custom styles
import api from "../api/axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: "Hello! How can I assist you?", fromBot: true }]);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, fromBot: false }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await api.post("http://localhost:3001/chatbot", { message: input });
      setMessages([...newMessages, { text: res.data.response, fromBot: true }]);
    } catch (error) {
      setMessages([...newMessages, { text: "Error connecting to chatbot.", fromBot: true }]);
    }

    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Button to Open Chat */}
      <button className="chat-button" onClick={() => setShowChat(true)}>💬</button>

      {showChat && (
        <motion.div
          className="chat-popup"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <div className="chat-header">
            <h3>Annseva Chatbot</h3>
            <button className="close-btn" onClick={() => setShowChat(false)}>✖</button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <p key={index} className={msg.fromBot ? "bot-message" : "user-message"}>
                {msg.text}
              </p>
            ))}
            {isTyping && <p className="typing-indicator">Typing...</p>}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Chatbot;
