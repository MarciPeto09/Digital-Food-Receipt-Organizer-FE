import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Chat = ({ onClose, unSeenCount, updateUnseenCounts }) => {
  const API_URL = "http://localhost:8080/api";
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [content, setContent] = useState("");
  const messageEndRef = useRef(null);
  const { t } = useTranslation();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");


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

        await axios.put(`${API_URL}/message/markAsSeen`, null, {
          params: { senderId: selectedUserId, receiverId: userId },
          headers: { Authorization: `Bearer ${token}` },
        });

        updateUnseenCounts();

      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };
    fetchMessages();
  }, [selectedUserId, userId, token]);

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

      updateUnseenCounts();
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
    <div
      className="d-flex flex-column h-100"
      style={{
        width: '100%', 
        background: '#fafafa',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        borderRadius: '20px',
        overflow: 'hidden',
      }}
    >

      {/* Chat Header */}
      <div className="border-bottom p-3 d-flex justify-content-between align-items-center bg-white shadow-sm">
        <strong style={{ fontSize: '1.1rem' }}>Messages</strong>
        <button
          onClick={onClose}
          className="btn btn-sm btn-light border-0"
          style={{ fontSize: '1.2rem' }}
        >
          ✕
        </button>
      </div>

      {/* Main Body */}
      <div className="d-flex flex-grow-1" style={{ overflow: 'hidden' }}>
        {/* Left Sidebar */}
        <div
          className="border-end bg-white"
          style={{
            width: '30%',
            minWidth: '120px',
            overflowY: 'auto',
            padding: '1rem',
          }}
        >
          <h6 className="text-muted mb-3">Chats</h6>
          <div className="list-group border-0">
            {users
              .filter((u) => u.id !== Number(userId))
              .map((user) => (
                <button
                  key={user.id}
                  className={`list-group-item list-group-item-action border-0 rounded-pill mb-1 ${selectedUserId === user.id ? 'bg-primary text-black' : ''
                    }`}
                  style={{ background: 'linear-gradient(135deg, #fffbe6 0%, #ffe5b4 100%)' }}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  <div className="d-flex align-items-center">
                    {user.photo ? (
                      <img
                        src={`http://localhost:8080/uploads/${user.photo}`}
                        alt={user.username}
                        className="rounded-circle me-2"
                        style={{ width: 36, height: 36, objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        className="me-2 bg-secondary text-black rounded-circle d-flex justify-content-center align-items-center"
                        style={{ width: 36, height: 36, fontSize: 14 }}
                      >
                        {user.username[0].toUpperCase()}
                      </div>
                    )}
                    <span className="text-truncate">{user.username}</span>
                    {unSeenCount[user.id] > 0 && (
                      <span className="badge bg-danger rounded-pill ms-2">
                        {unSeenCount[user.id]}
                      </span>
                    )}
                  </div>
                </button>
              ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="d-flex flex-column flex-grow-1">
          {/* Chat Header */}
          <div className="border-bottom p-3 bg-white">
            <h6 className="m-0">
              {selectedUserId
                ? users.find((u) => u.id === selectedUserId)?.username
                : 'Select a conversation'}
            </h6>
          </div>

          {/* Messages */}
          <div
            className="flex-grow-1 overflow-auto p-3"
            style={{
              background: '#f0f0f0',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`d-flex mb-2 ${msg.senderId === Number(userId)
                    ? 'justify-content-end'
                    : 'justify-content-start'
                  }`}
              >
                <div
                  className={`px-3 py-2 rounded-pill shadow-sm ${msg.senderId === Number(userId)
                      ? 'bg-primary text-black'
                      : 'bg-white'
                    }`}
                  style={{
                    maxWidth: '75%',
                    fontSize: '0.95rem',
                    lineHeight: '1.4',
                    background: 'linear-gradient(135deg, #fffbe6 0%, #ffe5b4 100%)',
                  }}
                >
                  {msg.content}
                  {msg.senderId === Number(userId) && (
                    <small className="d-block text-end" style={{ fontSize: '0.7rem' }}>
                      {msg.seen ? '✓ Seen' : '✓ Sent'}
                    </small>
                  )}
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          {/* Message Input */}
          {selectedUserId && (
            <form
              onSubmit={handleSendMessage}
              className="d-flex border-top bg-white p-3 align-items-center"
              style={{ minHeight: '60px' }}
            >
              <input
                type="text"
                className="form-control me-2 rounded-pill px-3"
                placeholder="Message..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ fontSize: '0.95rem' }}
              />
              <button
                type="submit"
                className="btn btn-light rounded-pill px-4"
              >
                <i className="bi bi-send fs-5"></i>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );


};

export default Chat;
