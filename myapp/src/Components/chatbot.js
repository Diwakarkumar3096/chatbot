import React, { useState } from 'react';

const Chatbot = () => {
  const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

  const [messages, setMessages] = useState([]);

  const getRandomUser = () => {
    const randomIndex = Math.floor(Math.random() * user_list.length);
    return user_list[randomIndex];
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const input = e.target.elements.message.value;
    if (input.trim() !== '') {
      const randomUser = getRandomUser();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: randomUser, likes: 0 },
      ]);
      generateResponse(input, randomUser);
    }
    e.target.elements.message.value = '';
  };

  const generateResponse = (input, sender) => {
    const lowerInput = input.toLowerCase();
    let response = '';
    if (lowerInput.includes('name')) {
      response = `My name is Chatbot. Nice to meet you, ${sender}!`;
    } else if (lowerInput.includes('age')) {
      response = `I am a chatbot, so I don't have an age.`;
    } else if (lowerInput.includes('skill') || lowerInput.includes('skills')) {
      response = `As a chatbot, my skills include answering questions and assisting with conversations.`;
    } else {
      response = 'I am a chatbot! How can I assist you?';
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: response, sender: 'bot', likes: 0 },
    ]);
  };

  const handleLike = (index) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[index].likes++;
      return updatedMessages;
    });
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <span className="username">{message.sender}:</span> {message.text}
            <button className="like-button" onClick={() => handleLike(index)}>
              Like
            </button>
            <span className="like-count">{message.likes}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input type="text" name="message" placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
