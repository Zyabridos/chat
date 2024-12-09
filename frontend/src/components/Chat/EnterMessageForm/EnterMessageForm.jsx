import { SendButton } from './Buttons.jsx';
import _ from 'lodash';
import React, { useRef, useState } from "react";
// import { updateMessagesArray } from '../utils.js';
import state from '../state.js'


const updateMessagesArray = (e) => {
  const [input] = e.target.children;
  if (input.value.length > 0) {
    state.messages.push({id: _.uniqueId, message: input.value});
    return state;
  };
};

const MessageComponent = ({ userName, message }) => {
  return (
    <div className="text-break mb-2">
      <b>{userName}</b>: {message}
    </div>
  );
};

const EnterMessageForm = () => {
  const [index, setIndex] = useState(0);
  const [components, setComponents] = useState([]);
  const [inputText, setInputText] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault(); 
    updateMessagesArray(e)

    setComponents(prevComponents => [
        ...prevComponents,
        <MessageComponent userName='admin' key={state.messages[index].id} message={state.messages[index].message} />
      ]);
      setIndex(prevIndex => prevIndex + 1);
    setInputText('')
};

const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  return (
    <>
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {components}
    </div>
    <form noValidate="" className="py-1 border rounded-2" onSubmit={handleSubmit}>
      <input 
        name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control"
        value={inputText} 
        onChange={handleInputChange} />
      <SendButton />
    </form>
    </>
  )
};

export default EnterMessageForm;
