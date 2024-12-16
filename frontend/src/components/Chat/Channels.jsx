import React, { useState, useEffect } from 'react';
import addSymbol from '../../assets/add-symbol.png';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import c from 'classnames';
import axios from 'axios';
import { useDispatch } from 'react-redux'; 
import { setChannels } from '../../slices/channelsSlice';
import { useTranslation } from 'react-i18next';
import routes from '../../routes';
import { Dropdown } from 'react-bootstrap';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [channels, setChannelsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChannel, setActiveChannel] = useState(1);  // "general" активный по умолчанию
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingChannel, setEditingChannel] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (!token) {
      setError(t('error.tokenNotFound'));
      setLoading(false);
      return;
    }

    // Запрос для получения каналов
    const fetchChannels = async () => {
      try {
        const response = await axios.get(routes.channelsPath(), {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Ответ от сервера:', response);

        if (response.data) {
          setChannelsState(response.data);  
          dispatch(setChannels(response.data));  
        } else {
          throw new Error('Невозможно загрузить каналы. Ответ не содержит данных.');
        }
      } catch (err) {
        console.error('Ошибка при запросе каналов:', err); 
        setError(err.response ? err.response.data.message : t('error.fetchChannels'));
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, [dispatch, t]);

  // Обработчик клика на канал
  const handleChannelClick = (channel) => {
    setActiveChannel(channel.key);
  };

  // Обработчик открытия модального окна для создания нового канала
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Обработчик закрытия модального окна для создания нового канала
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewChannelName(''); 
  };

  // Обработчик открытия модального окна для редактирования канала
  const handleOpenEditModal = (channel) => {
    setEditingChannel(channel);
    setNewChannelName(channel.name);
    setIsEditModalOpen(true);
  };

  // Обработчик закрытия модального окна для редактирования канала
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingChannel(null);
    setNewChannelName('');
  };

  const handleChangeNewChannelName = (e) => {
    setNewChannelName(e.target.value);
  };

  const handleAddChannel = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (!newChannelName.trim()) {
      setError(t('error.emptyChannelName'));
      return;
    }

    try {
      const response = await axios.post(
        routes.channelsPath(),
        { name: newChannelName },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      console.log('Ответ от сервера после добавления канала:', response);

      if (response.data) {
        setChannelsState((prevChannels) => [
          ...prevChannels,
          response.data,
        ]);
        dispatch(setChannels([...channels, response.data])); 
        handleCloseModal();
      } else {
        throw new Error('Ошибка при создании канала. Ответ не содержит данных.');
      }
    } catch (err) {
      console.error('Ошибка при добавлении канала:', err); 
      setError(err.response ? err.response.data.message : t('error.addChannelFailed')); 
    }
  };

  const handleDeleteChannel = async (channelId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (!token) {
      setError(t('error.tokenNotFound'));
      return;
    }

    try {
      const response = await axios.delete(`${routes.channelsPath()}/${channelId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setChannelsState((prevChannels) => prevChannels.filter((channel) => channel.id !== channelId));
        dispatch(setChannels(channels.filter((channel) => channel.id !== channelId))); // Удаляем из глобального состояния
        setError(null);
      } else {
        throw new Error('Ошибка при удалении канала');
      }
    } catch (err) {
      console.error('Ошибка при удалении канала:', err);
      setError(err.response ? err.response.data.message : t('error.deleteChannelFailed'));
    }
  };

  const handleEditChannel = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (!newChannelName.trim()) {
      setError(t('error.emptyChannelName'));
      return;
    }

    try {
      const response = await axios.put(
        `${routes.channelsPath()}/${editingChannel.id}`,
        { name: newChannelName },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      console.log('Ответ от сервера после редактирования канала:', response);

      if (response.data) {
        setChannelsState((prevChannels) => 
          prevChannels.map((channel) =>
            channel.id === editingChannel.id ? { ...channel, name: newChannelName } : channel
          )
        );
        dispatch(setChannels(channels.map((channel) =>
          channel.id === editingChannel.id ? { ...channel, name: newChannelName } : channel
        )));
        setError(null);
        handleCloseEditModal();
      } else {
        throw new Error('Ошибка при редактировании канала');
      }
    } catch (err) {
      console.error('Ошибка при редактировании канала:', err);
      setError(err.response ? err.response.data.message : t('error.editChannelFailed'));
    }
  };

  const renderLoadingOrError = () => {
    if (loading) return <div>{t('loading.loadingChannels')}</div>;
    if (error) return <div>{error}</div>;
    return null;
  };

  const renderManagementButton = (channel) => {
    if (channel.removable) {
      return (
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="link"
            id={`dropdown-${channel.id}`}
            className="flex-grow-0 dropdown-toggle-split btn btn-secondary"
          >
            <span className="visually-hidden">{t('Управление каналом')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as="button" onClick={() => handleDeleteChannel(channel.id)}>
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

  return (
    <>
      <Container className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.title')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={handleOpenModal}
        >
          <img src={addSymbol} className="rounded-circle" alt="Добавить канал" width="20px" height="20px" />
          <span className="visually-hidden">+</span>
        </button>
      </Container>

      {/* Индикатор загрузки или ошибки */}
      {renderLoadingOrError()}

      {/* Список каналов */}
      <ListGroup as="ul" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <ListGroup.Item as="li" className="nav-item w-100" key={channel.id}>
            <button
              type="button"
              className={c('w-100 rounded-0 text-start btn', {
                'btn-secondary': activeChannel === channel.key, 
                'btn-light': activeChannel !== channel.key, 
              })}
              onClick={() => handleChannelClick(channel)}
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>

            {/* Если канал может быть удален, показываем кнопку "Управление каналом" */}
            {renderManagementButton(channel)}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Модальное окно для добавления нового канала */}
      {isModalOpen && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t('channels.addNewChannel')}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddChannel}>
                  <div className="mb-3">
                    <label htmlFor="channelName" className="form-label">{t('channels.modal.typeChannelName')}</label>
                    <input
                      type="text"
                      id="channelName"
                      className="form-control"
                      value={newChannelName}
                      onChange={handleChangeNewChannelName}
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="me-2 btn btn-secondary" onClick={handleCloseModal}>
                      {t('channels.cancel')}
                    </button>
                    <button type="submit" className="btn btn-primary">{t('channels.add')}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно для редактирования канала */}
      {isEditModalOpen && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t('channels.modal.renameChannel')}</h5>
                <button type="button" className="btn-close" onClick={handleCloseEditModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEditChannel}>
                  <div className="mb-3">
                    <label htmlFor="channelName" className="form-label">{t('channels.modal.typeNewChannelName')}</label>
                    <input
                      type="text"
                      id="channelName"
                      className="form-control"
                      value={newChannelName}
                      onChange={handleChangeNewChannelName}
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="me-2 btn btn-secondary" onClick={handleCloseEditModal}>
                      {t('channels.cancel')}
                    </button>
                    <button type="submit" className="btn btn-primary">{t('channels.modal.rename')}</button>
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
