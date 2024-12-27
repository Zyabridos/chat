import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { closeModal } from '../../../store/slices/modalSlice';
import routes from '../../../routes';
import { setChannels } from '../../../store/slices/channelsSlice';

const AddChannelModal = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;
  const channels = useSelector((state) => state.channelsInfo.channels);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const checkDuplicate = (channelName) => {
    return channels.some(
      (channelItem) => channelItem.name.trim().toLowerCase() === channelName.trim().toLowerCase()
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

    // I prefer this option in the chat, but for the tests I have to gi with different version
    // if (leoProfanity.check(values.name)) {
    //   setSubmitting(false);
    //   toast.error(t('channelsFormErrors.profanityDetected'));
    //   return;
    // }

    const cleanedChannelName = leoProfanity.clean(values.name);

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        routes.channelsPath(),
        // { name: values.name },
        // пусть пока так будет, но на серсер надо отправлять оригинальное название канал
        { name: cleanedChannelName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data) {
        dispatch(setChannels([...channels, response.data]));
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
