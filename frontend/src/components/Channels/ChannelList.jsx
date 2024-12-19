import React from 'react';
import { ListGroup, Dropdown } from 'react-bootstrap';
import c from 'classnames';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveChannel } from '../../slices/channelsSlice';

const ChannelList = ({ channels, activeChannel, handleDeleteChannel, handleOpenEditModal }) => {
  const dispatch = useDispatch();

  const handleChannelClick = (channel) => {
    dispatch(setActiveChannel(channel.id));
  };

  const renderManagementButton = (channel) => {
    if (channel.removable) {
      return (
        <Dropdown align="end">
          <Dropdown.Toggle variant="link" id={`dropdown-${channel.id}`} className="btn btn-anthracite">
            <span className="visually-hidden">Управление каналом</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as="button" onClick={() => handleDeleteChannel(channel.id)}>
              Удалить
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => handleOpenEditModal(channel)}>
              Переименовать
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
    return null;
  };

  return (
    <ListGroup as="ul" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block position-relative">
      {channels.map((channel) => (
        <ListGroup.Item as="li" className="nav-item w-100" key={channel.id}>
          <div className="d-flex justify-content-between align-items-center w-100">
            <button
              type="button"
              className={c('w-100 rounded-0 text-start btn', {
                'btn-secondary': activeChannel === channel.id,
                'btn-light': activeChannel !== channel.id,
              })}
              onClick={() => handleChannelClick(channel)}
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>
            {renderManagementButton(channel)}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ChannelList;
