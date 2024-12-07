import ChannelBox from "./ChannelBox.jsx";
import Channels from './Channels.jsx';
import Navbar from "../Navbar.jsx";
import EnterMessageForm from "./EnterMessageForm/EnterMessageForm.jsx";

const Chat = () => {
  document.body.classList.add('h-100', 'bg-light')
  return (
    <div class="h-100">
      <div class="h-100" id="chat">
        <div class="d-flex flex-column h-100">
          <Navbar />
          <div class="container h-100 my-4 overflow-hidden rounded shadow">
            <div class="row h-100 bg-white flex-md-row">
    <div class="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <Channels />
      <ChannelBox />
      <EnterMessageForm />
    </div>
            </div>
          </div>
          </div>
      </div>
    </div>
  )
};

export default Chat;