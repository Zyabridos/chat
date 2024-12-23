import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import c from 'classnames';
import addSymbol from '../../assets/add-symbol.png';
import { setChannels, setActiveChannel } from '../../slices/channelsSlice.js';
import { openModal } from '../../store/slices/modalSlice.js';
import './Channels.css';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelsInfo.channels);
  const activeChannel = useSelector((state) => state.channelsInfo.activeChannel);

  useEffect(() => {
    dispatch(setChannels([{ id: 1, name: 'general', removable: false }]));
  }, [dispatch]);

  const handleAddChannel = () => {
    dispatch(openModal({ modalType: 'add', modalProps: { channels } }));
  };

  const handleEditChannel = (channel) => {
    dispatch(openModal({ modalType: 'edit', modalProps: { channel, channels } }));
  };

  return (
    <div>
      <button onClick={handleAddChannel}>
        <img src={addSymbol} alt="Add channel" />
      </button>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>
            <span
              className={c('channel-name', { 'btn-secondary': activeChannel === channel.id })}
              onClick={() => dispatch(setActiveChannel(channel.id))}
            >
              {channel.name}
            </span>
            {channel.removable && <button onClick={() => handleEditChannel(channel)}>Edit</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
