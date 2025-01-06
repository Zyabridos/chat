import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { closeModal } from '../../../store/slices/modalSlice';
import { setActiveChannel } from '../../../store/slices/channelsSlice';
import createValidationChannelSchema from '../../../validationsSchemas/channelSchema.js';
import { addChannelAPI } from '../../../API/channelsAPI.js';

const AddChannelModal = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;
  const channels = useSelector((state) => state.channelsInfo.channels);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isSubmittingState, setIsSubmittingState] = useState(false);
  const [error, setError] = useState(null);

  const validationSchema = createValidationChannelSchema(t);

  const checkDuplicate = (channelName) => {
    const normalizedChannelName = channelName.trim().toLowerCase();
    return channels.some(
      (channelItem) => channelItem.name.trim().toLowerCase() === normalizedChannelName,
    );
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const initialValues = { name: '' };

  const handleAddChannel = async (values, { setSubmitting }) => {
    if (checkDuplicate(values.name)) {
      setError(t('validationErrors.duplicate'));
      setSubmitting(false);
      setIsSubmittingState(false);
      return;
    }

    const cleanedChannelName = leoProfanity.clean(values.name);

    setIsSubmittingState(true);

    try {
      const newChannel = await addChannelAPI({ name: cleanedChannelName }, token);

      dispatch(setActiveChannel(newChannel.id));
      localStorage.setItem('activeChannelId', newChannel.id);

      toast.success(t('toast.channelCreated'));
      handleClose();
    } catch (err) {
      console.error('Error while creating the channel:', err);
      setError(err.response?.data?.message || t('error.addChannelFailed'));
    } finally {
      setIsSubmittingState(false);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setIsSubmittingState(false);
  }, [channels]);

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('channels.modals.titles.addChannel')}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label={t('modals.close')}
            />
          </div>
          <div className="modal-body">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleAddChannel}
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
