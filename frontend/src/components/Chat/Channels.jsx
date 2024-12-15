import React, { useState, useEffect, useRef } from "react";
import addSymbol from '../../assets/add-symbol.png';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux'; 
import c from "classnames";
import axios from 'axios';
import { io } from 'socket.io-client'; 
import routes from "../../routes";
import { setChannels, addChannel, setError, setLoading } from '../../slices/channelsSlice';
import _ from 'lodash';
import { handleAxiosError } from "./utils";
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import validationCreateChannel from '../../validationSchemas/validationCreateChannel.jsx';
import { FieldError } from "../Login/styles.jsx";

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels, loading, error } = useSelector((state) => state.channelsInfo);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState('general');

  const socket = useRef(null);
  const containerRef = useRef(null);

  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(setError(t('error.tokenNotFound')));
    return;
  }
  

  const axiosInstance = axios.create({
    baseURL: routes.apiBaseURL,
    headers: {
      'Content-Type': 'application/json', 
      Authorization: `Bearer ${token}`,
    },
  });


  useEffect(() => {
    const fetchChannels = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.get(routes.channelsPath());
        dispatch(setChannels(response.data)); // Обновляем каналы в Redux
        dispatch(setLoading(false)); 
      } catch (error) {
        dispatch(setError(t('error.fetchChannels'))); 
        dispatch(setLoading(false)); // Снимаем статус загрузки
        console.error('Error fetching channels:', error);
      }
    };

    fetchChannels();

    // Устанавливаем WebSocket подключение с токеном
    socket.current = io(routes.socketURL, {
      query: { token }, // Отправляем токен в query параметры
    });

    // Слушаем события от сервера
    socket.current.on('newChannel', (channel) => {
      dispatch(addChannel(channel)); 
    });

    return () => {
      socket.current.disconnect(); 
    };
  }, [dispatch, t]); 

  
  // Обработчик для добавления нового канала
  const handleAddChannel = async (values) => {
     if (values.channelName.trim()) {
    try {
      const response = await axiosInstance.post('/api/channels', { name: values.channelName });
      // console.log('Status:', response.status); 
      // console.log('Response body:', response.data);
      const newChannel = response.data;

      socket.current.emit('createChannel', newChannel);

      dispatch(addChannel(newChannel)); 
      formik.resetForm(); 
      setIsModalOpen(false); 
    } catch (error) {
      handleAxiosError(error);
      dispatch(setError(t('error.addChannel'))); // Use i18n translation
      console.error('Error adding channel:', error);
    }
    }
  };

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: validationCreateChannel,
    onSubmit: async (formikValues) => handleAddChannel(formikValues),
  });

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

  const handleChannelClick = (channelName) => {
    setActiveChannel(channelName);
  };

  // Индикатор загрузки или ошибки
  const renderLoadingOrError = () => {
    if (loading) return <div>{t('loading.loadingChannels')}</div>;
    if (error) return <div>{error}</div>;
    return null;
  };

  // console.log(channels)
  return (
    <>
      <Container className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.title')}</b>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleOpen}>
          <img src={addSymbol} className="rounded-circle" alt={t('channels.addChannel')} width='20px' height='20px'/>
          <span className="visually-hidden">+</span>
        </button>
      </Container>

      {/* Отображение ошибки или индикатора загрузки */}
      {renderLoadingOrError()}

      <ListGroup as="ul" key={_.uniqueId()} ref={containerRef} id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <ListGroup.Item as="li" className="nav-item w-100" key={channel.key}>
            <button
              type="button"
              className={c("w-100 rounded-0 text-start btn", {
                'btn-secondary': activeChannel === channel.name, 
                'btn-light': activeChannel !== channel.name, 
              })}
              onClick={() => handleChannelClick(channel.name)} 
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {isModalOpen && (
        <div className="modal show" tabIndex="-1" aria-hidden="true" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title h4">{t('channels.addChannel')}</div>
                <button type="button" aria-label="Close" data-bs-dismiss="modal" onClick={handleClose} className="btn btn-close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <input
                      name="channelName"
                      id="channelName"
                      className="mb-2 form-control"
                      placeholder={t('channels.enterChannelName')}
                      value={formik.values.channelName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.channelName && formik.errors.channelName && (
                      <FieldError>{formik.errors.channelName}</FieldError>
                    )}
                    <div className="invalid-feedback"></div>
                    <div className="d-flex justify-content-end">
                      <button type="button" className="me-2 btn btn-secondary" onClick={handleClose}>{t('channels.cancel')}</button>
                      <button type="submit" className="btn btn-primary">{t('channels.add')}</button>
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
