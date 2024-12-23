import React, { useState, useEffect } from 'react';
import addSymbol from '../../assets/add-symbol.png';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import c from 'classnames'; 
import { useDispatch, useSelector } from 'react-redux';
import { setChannels, setActiveChannel } from '../../store/slices/channelsSlice.js';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import leoProfanity from 'leo-profanity'
import forbiddenWords from '../../dictionary/index.js';
import './Channels.css';
import { toast } from 'react-toastify'; 
import { handleDeleteChannel } from './buttonHandlers.js'; 
import AddChannelModal from './Modals/AddChannellModal.jsx'; 
import EditChannelModal from './Modals/EditChannelModal.jsx'; 
import { fetchChannels } from '../../API/channels.js'; 
import axios from 'axios'
import routes from '../../routes.js';
import { LoadingBar } from '../Attachments.jsx'

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channels = useSelector((state) => state.channelsInfo.channels); // Channels from Redux store
  const activeChannel = useSelector((state) => state.channelsInfo.activeChannel); // Currently active channel from Redux store

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle Add Channel modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to handle Edit Channel modal visibility
  const [editingChannel, setEditingChannel] = useState(null); // State to store the channel being edited

  useEffect(() => {
    // Get user information from localStorage to authenticate API calls
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (!token) {
      setError(t('error.tokenNotFound'));
      setLoading(false);
      return;
    }

    // Function to fetch channels from the server
    const loadChannels = async () => {
      try {
        const data = await fetchChannels(token); // Fetch channels using the API
        dispatch(setChannels(data)); // Store channels in Redux
      } catch (err) {
        // Set error message if fetching channels fails
        setError(err.response ? err.response.data.message : t('error.fetchChannels'));
      } finally {
        setLoading(false);
      }
    };

    loadChannels();
  }, [dispatch, t]);

  useEffect(() => {
    leoProfanity.loadDictionary('ru');
    forbiddenWords.forEach((word) => leoProfanity.add(word));
  }, []); 

  const handleChannelClick = (channel) => {
    dispatch(setActiveChannel(channel.id));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenEditModal = (channel) => {
    setEditingChannel(channel);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingChannel(null);
  };

  const user = JSON.parse(localStorage.getItem('user')); // Get user info from localStorage
  const token = user?.token; // Get token from user data

  // Handle the editing of a channel (renaming the channel)
  const handleEditChannel = async (values, { setSubmitting }) => {
    try {
      const editedChannel = { name: values.name };
      const response = await axios.patch(
        `${routes.channelsPath()}/${editingChannel.id}`,
        editedChannel, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response.data)
      if (response.data) {
        dispatch(
          setChannels(
            channels.map((channel) =>
              channel.id === editingChannel.id ? { ...channel, name: values.name } : channel
            )
          )
        );
        toast.success(t('toast.channelRenamed')); 
        handleCloseEditModal(); 
      } else {
        throw new Error('Error editing the channel.');
      }
    } catch (err) {
      // Handle any errors during channel edit
      console.error('Error editing the channel:', err);
      setError(err.response ? err.response.data.message : t('error.editChannelFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  // Render management buttons (delete, rename) for each channel if the user has permissions
  const renderManagementButton = (channel) => {
    if (channel.removable) {
      return (
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="link"
            id={`dropdown-${channel.id}`}
            className="btn btn-anthracite"
          >
            <span className="visually-hidden">{t('channel.management')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              as="button"
              onClick={() =>
                handleDeleteChannel(channel.id, dispatch, channels, user?.token, setError, t)
              }
            >
              {t('channels.modal.delete')}
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => handleOpenEditModal(channel)}>
              {t('channels.modal.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
    return null;
  };

  // Render loading or error messages based on component state
  const renderLoadingOrError = () => {
    if (loading) return <LoadingBar t={t} />; 
    if (error) return <div>{error}</div>;
    return null;
  };

  return (
    <>
      <Container className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.title')}</b> 
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={handleOpenModal}
        >
          <img src={addSymbol} className="rounded-circle" alt="Add channel" width="20px" height="20px" />
          <span className="visually-hidden">+</span> {/* Add channel button */}
        </button>
      </Container>

      {renderLoadingOrError()} {/* Display loading or error message */}

      <ListGroup
        as="ul"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block position-relative"
      >
        {channels.map((channel) => (
          <ListGroup.Item as="li" className="nav-item w-100" key={channel.id}>
            <div className="d-flex justify-content-between align-items-center w-100">
              <button
                type="button"
                className={c('w-100 rounded-0 text-start btn', {
                  'btn-secondary': activeChannel === channel.id, // Highlight active channel
                  'btn-light': activeChannel !== channel.id,
                })}
                onClick={() => handleChannelClick(channel)} 
              >
                <span className="me-1">#</span>
                {channel.name}
              </button>

              {renderManagementButton(channel)} {/* Render management buttons, i.e. delete or rename channel */}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Modal for adding channel */}
      <AddChannelModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        channels={channels}
        dispatch={dispatch}
        setError={setError}
        token={token}
      />

      {/* Modal for editing channel */}
      <EditChannelModal
        isEditModalOpen={isEditModalOpen}
        handleCloseEditModal={handleCloseEditModal}
        editingChannel={editingChannel}
        handleEditChannel={handleEditChannel}
      />
    </>
  );
};

export default Channels;
