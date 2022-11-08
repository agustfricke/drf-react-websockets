import React, { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import logo from "./images/speak.png";
import Tilt from "react-parallax-tilt";

export default function App() {


  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const { sendJsonMessage } = useWebSocket("ws://127.0.0.1:8000/", {
    onOpen: () => {
      console.log("Connected!");
    },
    onClose: () => {
      console.log("Disconnected!");
    },
    
    onMessage: (e) => {
      const data = JSON.parse(e.data);
      switch (data.type) {
        case "welcome_message":
          setWelcomeMessage(data.message);
          break;
        case "chat_message_echo":
          setMessageHistory((prev) => prev.concat(data));
          break;
        default:
          console.error("Unknown message type!");
          break;
      }
    }
  });


  function handleChangeMessage(e) {
    setMessage(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  const handleSubmit = () => {
    sendJsonMessage({
      type: "chat_message",
      message,
      name
    });
    setName("");
    setMessage("");
  };

  return (
    <div className="flex justify-center">
      <div className="m-8">

        <p className="mt-5 text-center text-3xl font-bold tracking-tight text-gray-900 my-10">
          <span className="block xl:inline">{welcomeMessage}</span>{' '} <br></br>
          <span className="block text-indigo-600 xl:inline">Tech con Agust</span>{' '} <br></br>
        </p>

        <div className="flex justify-center mt-6">
          <Tilt>
            <img
              src={logo}
              alt="home pic"
              className="img-fluid flex justify-center"
              style={{ maxHeight: "350px" }}
            />
          </Tilt>
        </div>

      </div>

      <div className='flex justify-center mt-8'>
        <div class="max-w-2xl border rounded">
          <div class="">

            <div class="relative flex justify-center p-3 border-b border-gray-300">
              <img class="object-cover w-10 h-10 rounded-full"
                src={logo} alt="username" />
              <span class="block ml-2 pt-2 font-bold text-gray-600">Tech con Agust</span>
            </div>

            <div class="relative w-full p-6 overflow-y-auto h-[30rem]">
              <ul class="space-y-2">

                {messageHistory.map((message) => (

                  <li class="flex justify-center">
                    <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span className="block text-indigo-600 xl:inline">{message.name}</span>
                      <span class="block">{message.message}</span>
                    </div>
                  </li>

                ))}

              </ul>
            </div>

            <div class="flex items-center justify-between w-full p-3 border-t border-gray-300">
              <input type="text" placeholder="Username"
                onChange={handleChangeName}
                value={name}
                class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="Username" required />

              <input type="text" placeholder="Message"
                onChange={handleChangeMessage}
                value={message}
                class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="Message" required />

              <button type='submit' onClick={handleSubmit}>
                <svg class="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}