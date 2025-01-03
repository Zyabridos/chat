/* eslint-disable arrow-body-style */
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import React from 'react';
import MessagesContainer from './Messages/MessagesContainer.jsx';
import Navbar from '../Navbar.jsx';
import Channels from './Channels/Chanells.jsx';
// import Message from './Messages/Message.jsx';

// const Chat = () => {
//   return (
//     <Container fluid className="chat-container">
//       <Navbar />
//       <Row className="h-100 m-0">
//         {' '}
//         {/* height-100, margin-0 чтобы убрать лишние отступы/}
//         {/* занимает 2/12 на большом экране и 3/12 на среднем */}
//         <Col xs={12} md={3} lg={2} className="border-end bg-light px-0 d-flex flex-column">
//           <Channels />
//         </Col>
//         <Col xs={12} md={9} lg={10} className="p-0 d-flex flex-column">
//           <MessagesContainer />
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Chat;

const Chat = () => {
  return (
    <>
      <Navbar />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            {/* <div className="d-flex flex-column h-100"> */}
            <Channels />
          </div>
          <div className="col p-0 h-100">
            <MessagesContainer />
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
