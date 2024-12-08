import { SendButton } from './Buttons.jsx';
import _ from 'lodash';
import React, { useRef, useState } from "react";
// import { updateMessagesArray } from '../utils.js';

const state = {
  messages: [] 
};

const updateMessagesArray = (e) => {
  const [input] = e.target.children;
  if (input.value.length > 0) {
    state.messages.push({id: _.uniqueId, message: input.value});
    return state;
  };
};



const messagesTest = [
  { id: 1, message: 'one'},
  { id: 2, message: 'two'},
  { id: 3, message: 'three'},
];

const test = messagesTest.map((val) => (
  <div className="text-break mb-2" id={val.id}>
    <b>admin</b>: {val.message}
  </div>
));

const children = state.messages.map((message) => (
  <div className="text-break mb-2" id={message.id}>
    <b>admin</b>: {message.message}
  </div>
));



const EnterMessageForm = () => {
  const containerRef = useRef(null);

  const handleSubmit = (e, messagesArray) => {
  const [input] = e.target.children;

  messagesArray = state.messages;
  e.preventDefault();
  updateMessagesArray(e);

  const messageNode = document.createElement('li');
  messageNode.classList.add('nav-item', 'w-100');
  messageNode.innerText = input.value;

  containerRef.current.appendChild(messageNode); 

  input.value = "";
};
  return (
    <>
    <div id="messages-box" ref={containerRef} class="chat-messages overflow-auto px-5 ">
    </div>
    <form noValidate="" className="py-1 border rounded-2" onSubmit={handleSubmit}>
      <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control"/>
      <SendButton />
    </form>
    </>
  )
};

export default EnterMessageForm;
