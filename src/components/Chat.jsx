import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Chat = ({ onClose }) => {
    const API_URL = "http://localhost:8080/api";
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [content, setContent] = useState("");
    const messageEndRef = useRef(null);
    const { t } = useTranslation();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");


    const location = useLocation();
  const hideChatPaths = ["/", "/register"];
  const shouldHideChat = hideChatPaths.includes(location.pathname);
  if (shouldHideChat) return null;

  
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${API_URL}/users`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(res.data);
            } catch (err) {
                console.error("Failed to load users", err);
            }
        };
        fetchUsers();
    }, []);

    
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUserId) return;
            try {
                const res = await axios.get(`${API_URL}/message/getMessageBetweenUser`, {
                    params: { senderId: userId, receiverId: selectedUserId },
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMessages(res.data);
                scrollToBottom();
            } catch (err) {
                console.error("Failed to load messages", err);
            }
        };
        fetchMessages();
    }, [selectedUserId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!content.trim() || !selectedUserId) return;

        try {
            const res = await axios.post(`${API_URL}/message/send`, {
                senderId: userId,
                recipientId: selectedUserId,
                content: content.trim(),
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMessages(prev => [...prev, res.data]);
            setContent("");
            scrollToBottom();
        } catch (err) {
            console.error("Failed to send message", err);
        }
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

   return (
  <div className="d-flex flex-column h-100" style={{ width: "100%" }}>
    {/* Chat Header */}
    <div className="border-bottom p-2 bg-light d-flex justify-content-between align-items-center">
      <strong>Chat</strong>
      <button onClick={onClose} className="btn btn-sm btn-outline-secondary">✕</button>
    </div>

    {/* Main Chat Body */}
    <div className="d-flex flex-grow-1" style={{ overflow: "hidden" }}>
      {/* Left Sidebar - Users */}
      <div className="border-end p-3 overflow-auto" style={{ width: "35%", minWidth: "120px" }}>
        <h6 className="mb-3">Messages</h6>
        <div className="list-group">
          {users
            .filter((u) => u.id !== Number(userId))
            .map((user) => (
              <button
                key={user.id}
                className={`list-group-item list-group-item-action ${
                  selectedUserId === user.id ? "active" : ""
                }`}
                onClick={() => setSelectedUserId(user.id)}
              >
                {user.username}
              </button>
            ))}
        </div>
      </div>

      {/* Right Side - Messages and Input */}
      <div className="d-flex flex-column flex-grow-1">
        {/* Header */}
        <div className="border-bottom p-3 bg-white">
          <h6 className="m-0">
            {selectedUserId
              ? `Chat with ${users.find((u) => u.id === selectedUserId)?.username || ""}`
              : "Select a conversation"}
          </h6>
        </div>

        {/* Messages */}
        <div className="flex-grow-1 overflow-auto p-3 bg-white">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`d-flex mb-2 ${
                msg.senderId === Number(userId) ? "justify-content-end" : "justify-content-start"
              }`}
            >
              <div
                className={`p-2 rounded ${
                  msg.senderId === Number(userId)
                    ? "bg-primary text-white"
                    : "bg-light"
                }`}
                style={{ maxWidth: "75%" }}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        {/* Message Input */}
        {selectedUserId && (
          <form
            onSubmit={handleSendMessage}
            className="d-flex border-top p-3 bg-light"
            style={{ minHeight: "60px" }}
          >
            <input
              type="text"
              className="form-control me-2"
              placeholder="Type a message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  </div>
);

};

export default Chat;
