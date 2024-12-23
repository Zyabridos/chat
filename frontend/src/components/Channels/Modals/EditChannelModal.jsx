// components/Channels/Modals/EditChannelForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setChannels } from '../../../slices/channelsSlice';

const EditChannelForm = ({ channel, channels, onClose }) => {
  const dispatch = useDispatch();
  const [channelName, setChannelName] = useState(channel.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Логика изменения канала
    try {
      const updatedChannels = channels.map((ch) =>
        ch.id === channel.id ? { ...ch, name: channelName } : ch
      );
      dispatch(setChannels(updatedChannels));
      toast.success('Канал успешно переименован');
      onClose();
    } catch (error) {
      toast.error('Ошибка переименования канала');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Новое название канала
        <input
          type="text"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default EditChannelForm;
