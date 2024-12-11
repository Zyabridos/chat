import React, { useState, useRef } from "react";
import addSymbol from '../../assets/add-symbol.png';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import c from "classnames";

const Channels = () => {
  const [channels, setChannels] = useState([
    { key: 1, name: "general" },
    { key: 2, name: "random" },
    { key: 3, name: "tech" }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState('general');
  const [newChannelName, setNewChannelName] = useState("");

  const containerRef = useRef(null);

  // Обработчик для добавления нового канала
  const handleAddChannel = (e) => {
    e.preventDefault();

    if (newChannelName.trim()) {
      const newChannel = {
        key: channels.length + 1, // Новый ключ для канала
        name: newChannelName
      };
      setChannels([...channels, newChannel]);
      setNewChannelName(""); // очищаем поле ввода после добавления канала
      setIsModalOpen(false); // закрываем модальное окно
    }
  };

  // Открытие модального окна для добавления канала
  const handleOpen = () => {
    document.body.classList.add('h-100', 'bg-light', 'modal-open');
    document.body.setAttribute('style', 'overflow: hidden;');
    document.body.setAttribute('data-rr-ui-modal-open', '');
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  // Обработчик выбора канала
  const handleChannelClick = (channelName) => {
    setActiveChannel(channelName);
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

      <ListGroup as="ul" ref={containerRef} id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <ListGroup.Item as="li" className="nav-item w-100" key={channel.key}>
            <button
              type="button"
              className={c("w-100 rounded-0 text-start btn", {
                'btn-secondary': activeChannel === channel.name, // Подсветка активного канала
                'btn-light': activeChannel !== channel.name, // Для неактивных каналов
              })}
              onClick={() => handleChannelClick(channel.name)} // Обрабатываем клик по каналу
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Модальное окно для добавления нового канала */}
      {isModalOpen && (
        <div className="modal show" tabIndex="-1" aria-hidden="true" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title h4">Добавить канал</div>
                <button type="button" aria-label="Close" data-bs-dismiss="modal" onClick={handleClose} className="btn btn-close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddChannel}>
                  <div>
                    <input
                      name="name"
                      id="name"
                      className="mb-2 form-control"
                      placeholder="Введите название канала"
                      value={newChannelName}
                      onChange={(e) => setNewChannelName(e.target.value)} // обновляем имя канала
                    />
                    <div className="invalid-feedback"></div>
                    <div className="d-flex justify-content-end">
                      <button type="button" className="me-2 btn btn-secondary" onClick={handleClose}>Отменить</button>
                      <button type="submit" className="btn btn-primary">Добавить</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Channels;
