import { SendButton } from './Buttons.jsx';
import _ from 'lodash';

const state = {
  messages: [] 
};

const messageBox = document.querySelector('#messages-box')

const updateMessagesArray = (e) => {
  const [input] = e.target.children;
  if (input.value.length > 0) {
    state.messages.push({id: _.uniqueId, message: input.value});
    // console.log(messages)
    return state;
  };
};


// const children = state.messages.map((message) => (
//   <div className="text-break mb-2">
//     <b>admin</b>: {message.message}
//   </div>
// ));

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

const handleSubmit = (e, messagesArray) => {
  messagesArray = state.messages;
  e.preventDefault();
  updateMessagesArray(e);

  console.log(messagesArray)
  // messageBox.appendChild(children)
  
};

const EnterMessageForm = () => {
  return (
    <>
    <div id="messages-box" class="chat-messages overflow-auto px-5 ">
      {test}
    </div>
    <form noValidate="" className="py-1 border rounded-2" onSubmit={handleSubmit}>
      <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control"/>
      <SendButton />
    </form>
    </>
  )
};

export default EnterMessageForm;
