 import { useState } from 'react'
 import {Chatbot} from 'supersimpledev'

 import './ChatInput.css'

 export function ChatInput({ chatMessages, setChatMessages }) {
        const [inputText, setInputText] = useState('');

        function saveInputText(event) {
          setInputText(event.target.value);
        }

        function sendMessage() {
          const newChatMessages = [
            ...chatMessages,
            {
              message: inputText,
              sender: 'user',
              id: crypto.randomUUID()
            }
          ];

          setChatMessages(newChatMessages);

          const response = Chatbot.getResponse(inputText);
          setChatMessages([
            ...newChatMessages,
            {
              message: response,
              sender: 'bot',
              id: crypto.randomUUID()
            }
          ]);

          setInputText('');
        }

        return (
          <div className="input-container">
            <input
              className = "input-text"
              placeholder="Send a message to Chatbot"
              size="30"
              onChange={saveInputText}
              value={inputText}
            />
            <button
              className="send-button"
              onClick={sendMessage}
            >Send</button>
          </div>
        );
      }