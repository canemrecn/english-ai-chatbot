import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, fetchChatResponse, setLevel, setMode } from '../redux/chatSlice';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

const ChatBot = () => {
    const dispatch = useDispatch();
    const { messages, level, mode, status } = useSelector(state => state.chat);
    const [input, setInput] = useState('');
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const speechRecognition = new window.webkitSpeechRecognition();
            speechRecognition.continuous = false;
            speechRecognition.interimResults = false;
            speechRecognition.lang = 'en-US';
            speechRecognition.onresult = (event) => {
                setInput(event.results[0][0].transcript);
            };
            setRecognition(speechRecognition);
        }
    }, []);

    const startListening = () => recognition && recognition.start();
    const speak = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        synth.speak(utterance);
    };

    const sendMessage = () => {
        if (!input.trim()) return;
        const userMessage = { role: 'user', content: input };
        dispatch(addMessage(userMessage));
        setInput('');
        dispatch(fetchChatResponse({ messages: [...messages, userMessage], level, mode }));
    };

    useEffect(() => {
        if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
            speak(messages[messages.length - 1].content);
        }
    }, [messages]);

    return (
        <div className="chat-container">
            {/* Sayfanın üstüne sabitlenen kontroller */}
            <div className="controls">
                <Dropdown>
                    <Dropdown.Toggle variant="outline-primary" id="dropdown-level">
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => dispatch(setLevel('beginner'))}>Beginner</Dropdown.Item>
                        <Dropdown.Item onClick={() => dispatch(setLevel('intermediate'))}>Intermediate</Dropdown.Item>
                        <Dropdown.Item onClick={() => dispatch(setLevel('advanced'))}>Advanced</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <span className="control-text">My Friend Amy</span>

                <Dropdown>
                    <Dropdown.Toggle variant="outline-primary" id="dropdown-mode">
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => dispatch(setMode('casual'))}>Casual</Dropdown.Item>
                        <Dropdown.Item onClick={() => dispatch(setMode('business'))}>Business</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* Mesajların bulunduğu orta alan */}
            <div className="messages">
                {messages.map((msg, index) => (
                    <p key={index} className={msg.role === 'user' ? 'user' : 'ai'}>
                        <strong>{msg.role === 'user' ? 'You' : 'Amy'}:</strong> {msg.content}
                    </p>
                ))}
            </div>

            {/* Sayfanın altına sabitlenen giriş alanı */}
            <div className="input-container">
                <Button variant="outline-primary" onClick={startListening}>🎤</Button>
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
                <Button variant="outline-success" onClick={sendMessage}>{status === 'loading' ? '...' : 'Send'}</Button>
            </div>
        </div>
    );
};

export default ChatBot;