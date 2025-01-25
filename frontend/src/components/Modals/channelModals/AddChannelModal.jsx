import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { closeModal } from '../../../store/slices/modalSlice';
import createValidationChannelSchema from '../../../validationsSchemas/channelSchema.js';
import { saveActiveChannelToStorage } from '../../../store/slices/channelsSlice.js';
import { useSocket } from '../../../contexts/socketContext.jsx';

const AddChannelModal = () => {
  const { createChannel } = useSocket();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelsInfo.channels);
  const [error, setError] = useState(null);

  const validationSchema = createValidationChannelSchema(t);

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

  const handleAddChannel = async (values, { setSubmitting }) => {
    if (checkDuplicate(values.name)) {
      setError(t('validationErrors.duplicate'));
      setSubmitting(false);
      return;
    }

    const cleanedChannelName = leoProfanity.clean(values.name);

    try {
      const newChannel = { name: cleanedChannelName };
      console.log(cleanedChannelName)
      createChannel(newChannel);

      dispatch(saveActiveChannelToStorage(newChannel.id));

      toast.success(t('toast.channelCreated'));
      handleClose();
    } catch (err) {
      console.error('Error while creating the channel:', err);
      setError(t('error.addChannelFailed'));
    } finally {
      setSubmitting(false);
    }
  };

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
