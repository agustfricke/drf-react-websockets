import React, { Component } from 'react';
import logo from "./images/speak.png";
import Tilt from "react-parallax-tilt";
import { w3cwebsocket as W3CWebSocket } from "websocket";



class App extends Component {

  state = {
    isLoggedIn: false,
    messages: [],
    value: '',
    name: '',
    room: 'TechconAgust',
  }

  client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/' + this.state.room + '/');

  onButtonClicked = (e) => {
    this.client.send(JSON.stringify({
      type: "message",
      message: this.state.value,
      name: this.state.name
    }));
    this.state.value = ''
    e.preventDefault();
  }

  componentDidMount() {
    this.client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    this.client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('got reply! ', dataFromServer.type);
      if (dataFromServer) {
        this.setState((state) =>
        ({
          messages: [...state.messages,
          {
            msg: dataFromServer.message,
            name: dataFromServer.name,
          }]
        })
        );
      }
    };
  }

  render() {

    return (
      <div>
        {this.state.isLoggedIn ?
          <div className='flex justify-center mt-8'>
            <div class="max-w-2xl border rounded">

              <div class="">
                <div class="relative flex justify-center p-3 border-b border-gray-300">
                  <img class="object-cover w-10 h-10 rounded-full"
                    src={logo} alt="username" />
                  <span class="block ml-2 pt-2 font-bold text-gray-600">{this.state.room}</span>

                </div>

                <div class="relative w-full p-6 overflow-y-auto h-[30rem]">

                  {this.state.messages.map(message =>

                    <ul class="space-y-2">
                      {message.name === this.state.name ?
                        <li class="flex justify-end">
                          <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                            <span className="block text-indigo-600 xl:inline">{message.name}</span>
                            <span class="block">{message.msg}</span>
                          </div>
                        </li>

                        :

                        <li class="flex justify-start">
                          <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                            <span className="block text-indigo-600 xl:inline">{message.name}</span>
                            <span class="block">{message.msg}</span>
                          </div>
                        </li>
                      }
                    </ul>
                )}
                </div>

                <form onSubmit={this.onButtonClicked}>
                  <div class="flex items-center justify-between w-full p-3 border-t border-gray-300">
                    <input type="text" placeholder="Message"
                      value={this.state.value}
                      fullWidth
                      onChange={e => {
                        this.setState({ value: e.target.value });
                        this.value = this.state.value;
                      }}
                      class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                      name="message" required />

                    <button type='submit'>

                      <svg class="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path
                          d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>
                  </div>
               </form>
              </div>
            </div>
          </div>


          :


          <div className='flex justify-center' >
            <div className="m-8">
              <p className="mt-5 text-center text-3xl font-bold tracking-tight text-gray-900 my-10">

                <span className="block xl:inline">WELCAME TO</span>{' '}
                <span className="block text-indigo-600 xl:inline">CHAT APP</span>{' '} <br></br>
                <form noValidate onSubmit={value => this.setState({ isLoggedIn: true })}>

                  <div className="my-8 flex rounded-md shadow-sm">
                    <input
                      value={this.state.room}
                      onChange={e => {
                        this.setState({ room: e.target.value });
                        this.value = this.state.room;
                      }}
                      type="text"
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Room"
                    />
                  </div>

                  <div className="my-8 flex rounded-md shadow-sm">
                    <input
                      value={this.state.name}
                      onChange={e => {
                        this.setState({ name: e.target.value });
                        this.value = this.state.name;
                      }}
                      type="text"
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Name"
                    />
                  </div>


                  <div className="my-8 flex justify-center" >
                    <button
                      style={{ textDecoration: 'none' }}
                      className=" flex  items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-3 md:px-10 md:text-lg"
                    >
                      GET STARTED
                    </button>
                  </div>
                </form>
              </p>
            </div>

            <div className="m-9 pt-6">
              <Tilt>
                <img
                  src={logo}
                  alt="home pic"
                  className="img-fluid"
                  style={{ maxHeight: "250px" }}
                />
              </Tilt>
            </div>
          </div>
        }
      </div>
    )
  }
}
export default (App)
