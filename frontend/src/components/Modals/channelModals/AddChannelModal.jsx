/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import * as yup from 'yup';
import { closeModal } from '../../../store/slices/modalSlice';
import routes from '../../../routes';
import { setActiveChannel, addChannel } from '../../../store/slices/channelsSlice';
import useSocket from '../../../hooks/useSocket.jsx';

const AddChannelModal = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;
  const channels = useSelector((state) => state.channelsInfo.channels);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validationChannelSchema = yup.object({
    name: yup
      .string()
      .min(3, t('validationErrors.from3To20'))
      .max(20, t('validationErrors.from3To20'))
      .required(t('validationErrors.required')),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const socket = useSocket(); // Access the socket instance

  const checkDuplicate = (channelName) => {
    const normalizedChannelName = channelName.trim().toLowerCase();
    return channels.some(
      (channelItem) => channelItem.name.trim().toLowerCase() === normalizedChannelName
    );
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const initialValues = { name: '' };

  const handleAddChannel = async (values, actions) => {
    const { setSubmitting } = actions;

    if (checkDuplicate(values.name)) {
      setError(t('validationErrors.duplicate'));
      setSubmitting(false);
      setIsSubmitting(false);
      return;
    }

    const cleanedChannelName = leoProfanity.clean(values.name); // Clean the name from profanities

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        routes.channelsPath(),
        { name: cleanedChannelName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data) {
        const newChannel = response.data;
        dispatch(addChannel(newChannel)); // Add the new channel to Redux
        socket.emit('newChannel', newChannel); // Emit the new channel event via WebSocket

        // Switch to the new channel only for the current user
        if (newChannel.createdBy === user.id) {
          // Set it as the active channel for the current user
          dispatch(setActiveChannel(newChannel.id));
          localStorage.setItem('activeChannelId', newChannel.id); // Save active channel ID
        }

        toast.success(t('toast.channelCreated'));
        handleClose();
      } else {
        throw new Error('Error while creating the channel.');
      }
    } catch (err) {
      console.error('Error while creating the channel:', err);
      setError(err.response?.data?.message || t('error.addChannelFailed'));
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setIsSubmitting(false);
  }, [channels]);

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('channels.modals.titles.addChannel')}</h5>
            <button type="button" className="btn-close" onClick={handleClose} />
          </div>
          <div className="modal-body">
            <Formik
              initialValues={initialValues}
              validationSchema={validationChannelSchema}
              onSubmit={(values, actions) => handleAddChannel(values, actions)}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      {t('channels.modals.labels.typeNewChannelName')}
                    </label>
                    <Field
                      type="text"
                      id="name"
                      className="form-control"
                      name="name"
                      placeholder={t('channels.channelNamePlaceholder')}
                    />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                    {error && <div className="text-danger mt-2">{error}</div>}
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="me-2 btn btn-secondary" onClick={handleClose}>
                      {t('modals.cancel')}
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {t('modals.add')}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChannelModal;
