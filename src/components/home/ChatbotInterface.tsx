// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { MessageSquare, Send, X, Bot } from 'lucide-react';

// interface Message {
//   id: string;
//   text: string;
//   sender: 'user' | 'bot';
//   timestamp: Date;
// }

// export function ChatbotInterface() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       text: "Hello! I'm EduBot, your AI assistant. How can I help you today?",
//       sender: 'bot',
//       timestamp: new Date(),
//     },
//   ]);
//   const [input, setInput] = useState('');

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: input,
//       sender: 'user',
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');

//     // Simulate bot response
//     setTimeout(() => {
//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: "I'm analyzing your query. I'll help you with that right away!",
//         sender: 'bot',
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, botMessage]);
//     }, 1000);
//   };

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(true)}
//         className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
//       >
//         <MessageSquare className="h-6 w-6" />
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 100 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 100 }}
//             className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between p-4 border-b">
//               <div className="flex items-center gap-2">
//                 <Bot className="h-6 w-6 text-indigo-600" />
//                 <div>
//                   <h3 className="font-semibold">EduBot</h3>
//                   <p className="text-xs text-gray-500">
//                     AI Education Assistant
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="p-2 hover:bg-gray-100 rounded-full"
//               >
//                 <X className="h-5 w-5 text-gray-500" />
//               </button>
//             </div>

//             {/* Messages */}
//             <div className="h-96 overflow-y-auto p-4 space-y-4">
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`flex ${
//                     message.sender === 'user' ? 'justify-end' : 'justify-start'
//                   }`}
//                 >
//                   <div
//                     className={`max-w-[80%] p-3 rounded-lg ${
//                       message.sender === 'user'
//                         ? 'bg-indigo-600 text-white'
//                         : 'bg-gray-100 text-gray-800'
//                     }`}
//                   >
//                     <p>{message.text}</p>
//                     <p className="text-xs opacity-75 mt-1">
//                       {message.timestamp.toLocaleTimeString()}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Input */}
//             <div className="p-4 border-t">
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//                   placeholder="Type your message..."
//                   className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <button
//                   onClick={handleSend}
//                   className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//                 >
//                   <Send className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot } from 'lucide-react';
import axios from 'axios'; // Axios for making API requests

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatbotInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm EduBot, your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // To show loading state during API calls

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Make API call to backend
      const response = await axios.post('https://synergy-backend-six.vercel.app/api/test/analyze/', {
        question: input,
      });

      // Add bot response to the chat
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.response, // Assuming backend returns { response: "Your bot response" }
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching response from API:', error);

      // Add error message to the chat
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "Sorry, I couldn't process your request. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chatbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-indigo-600" />
                <div>
                  <h3 className="font-semibold">EduBot</h3>
                  <p className="text-xs text-gray-500">
                    AI Education Assistant
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="text-gray-500 text-sm">EduBot is typing...</div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSend}
                  className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
