import React, { useRef, useState } from "react";
import addSymbol from '../../assets/add-symbol.png'
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import c from "classnames";

const channelArray = [
    {key: 1, channelName: "general"},
    {key: 2, channelName: "random"},
  ];

const Channels = () => {
  const [activeChannel, setActiveChannel] = useState(1) // по дефолту первый key массива;
  const containerRef = useRef(null);
  const liRef = useRef(null);

  const handleChannelClick = (channel) => {
    setActiveChannel(activeChannel === channel.key ? null : channel.key);
  };

  const handleAddChannel = (e) => {
    const children = testarray.map((channel) => {
      <li id={channel.key}>{channel.name}</li>
    });

    e.preventDefault();
    const channelNode = document.createElement('li');
    channelNode.classList.add('nav-item', 'w-100');
    channelNode.setAttribute('ref', liRef);

    const channelButton = document.createElement('button');
    channelButton.classList.add('w-100', 'rounded-0', 'text-start', 'btn')
    // <button type="button" class="w-100 rounded-0 text-start btn"><span class="me-1">#</span>random</button>
    channelNode.innerText = "This post is appended!";
    // containerRef.current.appendChild(children);
    containerRef.current.appendChild(channelNode);
    // liRef.current.appendChild(channelButton)
  }

  return (
    <>
    <Container className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>Каналы</b>
      <button type="button" className="p-0 text-primary btn btn-group-vertical">
        <img src={addSymbol} className="rounded-circle" alt="Добавить канал" width='20px' height='20px'/>
        <span className="visually-hidden">+</span>
      </button>
    </Container>
    <ListGroup as="ul" ref={containerRef} id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channelArray.map((channel) => (
          <ListGroup.Item as="li" className="nav-item w-100" key={channel.key}>
            <button type="button" 
            className={c("w-100 rounded-0 text-start btn", {
                'btn-secondary': activeChannel === channel.key,
                'btn-light': activeChannel !== channel.key
              })}
              onClick={() => handleChannelClick(channel)}>
              <span className="me-1">#</span>
              {channel.channelName}
            </button>
          </ListGroup.Item>
        ))}
    </ListGroup>






    {/* Модальное окно */}
    {/* <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title h4">Добавить канал</div>
          <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close"></button>
        </div>
        <div className="modal-body">
          <form className="">
            <div>
              <input name="name" id="name" className="mb-2 form-control"/>
                <label className="visually-hidden" htmlFor="name">Имя канала</label>
                <div className="invalid-feedback"></div>
                <div className="d-flex justify-content-end">
                  <button type="button" className="me-2 btn btn-secondary">Отменить</button>
                  <button type="submit" className="btn btn-primary" onClick={handleAddChannel}>Отправить</button>
                  </div>
                </div>
          </form>
        </div>
      </div>
    </div> */}
    </>
  )
};

export default Channels;