// components/Channels/Modals/AddChannelForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setChannels } from '../../../slices/channelsSlice';

const AddChannelForm = ({ channels, token, onClose }) => {
  const dispatch = useDispatch();
  const [channelName, setChannelName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Логика отправки нового канала
    try {
      // Пример отправки канала на сервер
      const newChannel = { id: Date.now(), name: channelName, removable: true }; // Заглушка
      dispatch(setChannels([...channels, newChannel]));
      toast.success('Канал успешно добавлен');
      onClose();
    } catch (error) {
      toast.error('Ошибка добавления канала');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Название канала
        <input
          type="text"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddChannelForm;
