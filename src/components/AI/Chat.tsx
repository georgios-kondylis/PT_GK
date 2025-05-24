import React, { useState, useEffect, useRef } from 'react';
import ChatIcon from './ChatIcon';
import CloseChatIcon from './MicroUI.tsx/CloseChatIcon';
import { getAiReply } from '../../fakeAI';

// Types
type Message = {
  role: 'user' | 'ai';
  content: string;
};

const Chat = () => {
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: 'guest' }); // will fix real users later
  const userName = user?.name || 'guest';

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

 const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const aiReply = getAiReply(input, userName);
      setMessages([...updatedMessages, { role: 'ai', content: aiReply }]);
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {!chatIsOpen && <ChatIcon setChatIsOpen={setChatIsOpen} />}

      {chatIsOpen && (
        <div className="h-[500px] w-[400px] bottom-[0px] left-[30px] fixed mainDarkBg rounded-[20px] flex flex-col p-[15px] shadow-lg">
          <CloseChatIcon setChatIsOpen={setChatIsOpen} />

         {messages.length === 0 && (
          <div className="flex gap-6 w-full justify-center items-start mt-6">
            <img className="w-[120px] object-contain" src="/icons/hiAi.png" alt="AI Assistant" />
            <div className="relative bg-white shadow-md rounded-xl w-[220px] p-4">
              <p className="text-sm darkText leading-snug">
                Hi! I'm Georgios' assistant <br />
                I'm here to help you with training-related questions.
              </p>
              <span className="absolute w-5 h-5 bg-white rotate-45 left-[-10px] top-[30%] shadow-md"></span>
            </div>
          </div> )}


          <div className="flex-1 overflow-y-auto text-white space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={`p-2 rounded-md items-center gap-2 ${
                  msg.role === 'user' ? 'justify-end flex flex-row-reverse' : 'justify-start flex' }`}
              >
                {msg.role !== 'user' ? 
                  <img src="/icons/aiChatIcon.png" className="w-[40px] rounded-full" alt="" />
                 : user.name !== 'guest' ? 
                  <div className="text-[25px] flex justify-center items-center w-[35px] h-[33px] mainLightDarkBg rounded-full">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                 : 
                  <i className="fa-solid fa-circle-user | text-[27px] text-[#b6b6b6]"></i>
                }
                <div className={`w-[100%] px-[10px] py-[5px] rounded-md ${
                    msg.role === 'user' ? 'mainLightDarkBg text-right' : 'mainAiAnswerColor text-left self-start' }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && ( <div className="text-gray-400 italic">AI is typing...</div> )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2 mt-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 p-2 rounded-md bg-[#2a2a2a] text-white outline-none"
              placeholder="Ask me anything..."
            />
            <button onClick={handleSend} className="mainAiAnswerColor px-4 py-2 rounded-md text-white hover:bg-[#fd8240] transition">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;










// ---------- This is a correct API call to openAI but it wont work unless i pay -----------//
// const handleSend = async () => {
  //   if (!input.trim()) return;

  //   const userMessage: Message = { role: 'user', content: input };
  //   const updatedMessages = [...messages, userMessage];

  //   setMessages(updatedMessages);
  //   setInput('');
  //   setLoading(true);

  //   try {
  //     const res = await fetch('http://localhost:3000/api/chat', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ messages: updatedMessages }),
  //     });

  //     const data: { reply: string } = await res.json();

  //     if (data?.reply) {
  //       setMessages([...updatedMessages, { role: 'ai', content: data.reply }]);
  //     }
  //   } catch (err) {
  //     console.error('Error sending message:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  //--------- THIS IS AN AI BOT IT WORKS BUT IT CCANT LEARN SO MUCH ITS ABIT STUPID BUT FUN TO TALK TO  -----------------//

  // const handleSend = async () => {
//   if (!input.trim()) return;

//   const userMessage: Message = { role: 'user', content: input };
//   const updatedMessages = [...messages, userMessage];

//   setMessages(updatedMessages);
//   setInput('');
//   setLoading(true);

//   try {
//     const res = await fetch('https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`
//       },
//       body: JSON.stringify({
//         inputs: `User: ${input}\nAssistant:`
//       })
//     });

//     const data = await res.json();

//     // Safely access the generated text
//     const rawReply = data?.generated_text || data?.[0]?.generated_text || "No reply.";

//     // Remove everything before and including "Assistant:"
//     const cleanedReply = rawReply.split("Assistant:").pop()?.trim() || rawReply;

//     setMessages([...updatedMessages, { role: 'ai', content: cleanedReply }]);

//   } catch (err) {
//     console.error('Error sending message:', err);
//   } finally {
//     setLoading(false);
//   }
// };


//-------------------- MY OWN AND THE ONE IM USING-----------------//

 // const handleSend = async () => {
  //   if (!input.trim()) return;

  //   const userMessage: Message = { role: 'user', content: input };
  //   const updatedMessages = [...messages, userMessage];

  //   setMessages(updatedMessages);
  //   setInput('');
  //   setLoading(true);

  //   setTimeout(() => {
  //     const aiReply = getAiReply(input, userName);
  //     setMessages([...updatedMessages, { role: 'ai', content: aiReply }]);
  //     setLoading(false);
  //   }, 1000);
  // };
