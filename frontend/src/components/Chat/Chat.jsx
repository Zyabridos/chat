import ChannelBox from "./ChannelBox.jsx";
import Channels from './Channels.jsx';
import Navbar from "../Navbar.jsx";
import EnterMessageForm from "./EnterMessageForm/EnterMessageForm.jsx";
import MainWindow from './/MainWindow/MainWindow.jsx'

const Chat = () => {
  document.body.classList.add('h-100', 'bg-light');
  document.body.setAttribute('id', 'root');
  return (
    <MainWindow />
    // <div className="h-100">
    //   <div className="h-100" id="chat">
    //     <div className="d-flex flex-column h-100">
    //       <Navbar />
    //       <div className="container h-100 my-4 overflow-hidden rounded shadow">
    //         <div className="row h-100 bg-white flex-md-row">
    // <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
    //   <Channels />
    //   <ChannelBox />
    //   <EnterMessageForm />
    // </div>
    //         </div>
    //       </div>
    //       </div>
    //   </div>
    // </div>
  )
};

export default Chat;