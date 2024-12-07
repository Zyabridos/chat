import ChannelBox from "./ChannelBox.jsx";
import Channels from './Channels.jsx';
import Navbar from "../Navbar.jsx";
import EnterMessageForm from "./EnterMessageForm/EnterMessageForm.jsx";
import MainWindow from './/MainWindow/MainWindow.jsx'
import Container from 'react-bootstrap/Container';

const Chat = () => {
  document.body.classList.add('h-100', 'bg-light');
  document.body.setAttribute('id', 'root');
  return (
    // <Container className="h-100">
    //   <Container className="h-100" id="chat">
    //     <Container className="d-flex flex-column h-100">
    //       {/* <Navbar /> */}
    //       <Container className="container h-100 my-4 overflow-hidden rounded shadow">
    //         <Container className="row h-100 bg-white flex-md-row">
    // <Container className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <Channels />
      // {/* <ChannelBox /> */}
      // {/* <MainWindow /> */}
    // </Container>
    //         </Container>
    //       </Container>
    //       </Container>
    //   </Container>
    // </Container>
  )
};

export default Chat;