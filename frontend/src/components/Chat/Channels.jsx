import Modal from './Modal.jsx';
import addSymbol from '../../assets/add-symbol.png'
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

const Channels = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Define function that will open the modal
  const handleOpen = () => {
    setIsModalOpen(true);
  };

  // Define function that will close the modal
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <Container className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>Каналы</b>
      <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleOpen}>
        <img src={addSymbol} className="rounded-circle" alt="Добавить канал" width='20px' height='20px'/>
        <span className="visually-hidden">+</span>
      </button>
    </Container>
    <ListGroup as="ul" id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {/* тут, понятно, переделаем на пропсы и на дефолтные пропсы (каналы general и random)
      класс Secondary присваивается тому каналу, который открыт
       */}
      <ListGroup.Item as="li" className="nav-item w-100">
        <button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
          <span className="me-1">#</span>
          general
        </button>
      </ListGroup.Item>
      <ListGroup.Item as="li" className="nav-item w-100">
        <button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
          <span className="me-1">#</span>
          random
        </button>
      </ListGroup.Item>
    </ListGroup>
    <Modal />
    </>
  )
};

export default Channels;
