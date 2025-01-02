import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import c from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';
import axios from 'axios';
import addSymbol from '../../../assets/add-symbol.png';
import fetchChannels from '../../../API/fetchChannels.js';
import { setChannels, setActiveChannel } from '../../../store/slices/channelsSlice';
import { openModal } from '../../../store/slices/modalSlice';
import routes from '../../../routes';
import forbiddenWords from '../../../dictionary';
import { LoadingBar } from '../../Attachments';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channels = useSelector((state) => state.channelsInfo.channels); // channels from Redux
  const activeChannel = useSelector((state) => state.channelsInfo.activeChannel);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (!token) {
      setError(t('error.tokenNotFound'));
      setLoading(false);
      return;
    }

    const loadChannels = async () => {
      try {
        const data = await fetchChannels(token); // Fetch channels
        dispatch(setChannels(data)); // Save to Redux
      } catch (err) {
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

  // Восстановление активного канала из localStorage
  useEffect(() => {
    const storedChannelId = localStorage.getItem('activeChannelId');
    if (storedChannelId) {
      dispatch(setActiveChannel(storedChannelId));
    }
  }, [dispatch]);

  const handleChannelClick = (channel) => {
    dispatch(setActiveChannel(channel.id));
    localStorage.setItem('activeChannelId', channel.id); // Save active channel ID
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const handleDeleteChannel = async (channelId) => {
    try {
      await axios.delete(`${routes.channelsPath()}/${channelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setChannels(channels.filter((channel) => channel.id !== channelId)));
      toast.success(t('toast.channelDeleted'));
    } catch (err) {
      setError(err.response ? err.response.data.message : t('error.deleteChannelFailed'));
    }
  };

  const renderManagementButton = (channel) => {
    if (channel.removable) {
      return (
        <Dropdown align="end">
          <Dropdown.Toggle variant="outline-dark" id={`dropdown-${channel.id}`}>
            <span className="visually-hidden">{t('channels.modals.managment')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              as="button"
              onClick={() =>
                dispatch(
                  openModal({
                    type: 'deleteChannel',
                    props: { channelId: channel.id, handleDeleteChannel },
                  })
                )
              }
            >
              {t('modals.delete')}
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() =>
                dispatch(
                  openModal({
                    type: 'editChannel',
                    props: { channelId: channel.id, channelName: channel.name },
                  })
                )
              }
            >
              {t('modals.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
    return null;
  };

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
          onClick={() =>
            dispatch(
              openModal({
                type: 'addChannel',
                props: { channels, token },
              })
            )
          }
        >
          <img
            src={addSymbol}
            className="rounded-circle"
            alt="Add channel"
            width="20px"
            height="20px"
          />
          <span className="visually-hidden">+</span>
        </button>
      </Container>
      {renderLoadingOrError()}
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
                  'btn-secondary': activeChannel.id === channel.id,
                  'btn-light': activeChannel.id !== channel.id,
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
    </>
  );
};

export default Channels;
