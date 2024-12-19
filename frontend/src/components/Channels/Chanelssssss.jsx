// Channels.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { setChannels, setActiveChannel } from '../../slices/channelsSlice';
import routes from '../../routes';
import ChannelList from './ChannelList';
import AddChannelModal from './AddChannelModal';
import EditChannelModal from './EditChannelModal';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channels = useSelector((state) => state.channelsInfo.channels);
  const activeChannel = useSelector((state) => state.channelsInfo.activeChannel);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [editingChannel, setEditingChannel] = useState(null);
  const [profanityError, setProfanityError] = useState('');
  const [emptyChannelNameError, setEmptyChannelNameError] = useState('');

  const handleAddChannel = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (!newChannelName.trim()) {
      setEmptyChannelNameError(t('channelsFormErrors.emptyChannelName'));
      return;
    }

    
    if (leoProfanity.check(newChannelName)) {
      setProfanityError(t('channelsFormErrors.profanityDetected'));
      return;
    }

    try {
      const response = await axios.post(
        routes.channelsPath(),
        { name: newChannelName },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data) {
        dispatch(setChannels([...channels, response.data]));
        setNewChannelName('');
        setIsModalOpen(false);
        toast.success(t('toast.channelCreated'));
      } else {
        throw new Error('Ошибка при добавлении канала');
      }
    } catch (err) {
      console.error('Ошибка при добавлении канала:', err);
      setError(err.response ? err.response.data.message : t('error.addChannelFailed'));
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenEditModal = (channel) => {
    setEditingChannel(channel);
    setNewChannelName(channel.name);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingChannel(null);
    setNewChannelName('');
  };

  const fetchChannels = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (!token) {
      setError(t('error.tokenNotFound'));
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(routes.channelsPath(), {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data) {
        dispatch(setChannels(response.data));
      } else {
        throw new Error(t('error.fetchChannels'));
      }
    } catch (err) {
      console.error(err);
      setError(err.response ? err.response.data.message : t('error.fetchChannels'));
    } finally {
      setLoading(false);
    }
  };

  const handleEditChannel = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (!newChannelName.trim()) {
      setEmptyChannelNameError(t('channelsFormErrors.emptyChannelName'));
      return;
    }

    try {
      const response = await axios.put(
        `${routes.channelsPath()}/${editingChannel.id}`,
        { name: newChannelName },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data) {
        dispatch(setChannels(
          channels.map((channel) =>
            channel.id === editingChannel.id ? { ...channel, name: newChannelName } : channel
          )
        ));
        setError(null);
        toast.success(t('toast.channelRenamed'))
        handleCloseEditModal();
      } else {
        throw new Error('Ошибка при редактировании канала');
      }
    } catch (err) {
      console.error('Ошибка при редактировании канала:', err);
      setError(err.response ? err.response.data.message : t('error.editChannelFailed'));
    }
  };

  useEffect(() => {
    fetchChannels();
  }, [dispatch, t]);

  return (
    <div>
      <ChannelList
        channels={channels}
        activeChannel={activeChannel}
        handleOpenEditModal={handleOpenEditModal}
      />
      <AddChannelModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        t={t}
        handleAddChannel={handleAddChannel} // Передаем handleAddChannel
        newChannelName={newChannelName}
        setNewChannelName={setNewChannelName}
        emptyChannelNameError={emptyChannelNameError}
        profanityError={profanityError}
      />
      <EditChannelModal
        isEditModalOpen={isEditModalOpen}
        handleCloseEditModal={handleCloseEditModal}
        t={t}
        editingChannel={editingChannel}
        handleEditChannel={handleEditChannel}
      />
    </div>
  );
};

export default Channels;
