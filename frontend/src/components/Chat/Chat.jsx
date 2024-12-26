import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import MessagesContainer from '../Messages/MessagesContainer.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import Channels from '../Channels/Chanells.jsx';
import './Chat.css';

const Chat = () => {
  // document.body.classList.add('h-100', 'bg-light');
  return (
    <Container fluid className="chat-container">
      <Navbar />
      <Row className="h-100 m-0">
        {' '}
        {/* height-100, margin-0 чтобы убрать лишние отступы/}
        {/* занимает 2/12 на большом экране и 3/12 на среднем */}
        <Col xs={12} md={3} lg={2} className="border-end bg-light px-0 d-flex flex-column">
          <Channels />
        </Col>
        <Col xs={12} md={9} lg={10} className="p-0 d-flex flex-column">
          <MessagesContainer />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
