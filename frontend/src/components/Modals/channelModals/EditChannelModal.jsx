import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { closeModal } from '../../../store/slices/modalSlice';
import routes from '../../../routes';
import { updateChannel } from '../../../store/slices/channelsSlice';

const EditChannelModal = ({ channelId }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;
  const channels = useSelector((state) => state.channelsInfo.channels);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const channelToEdit = channels.find((channel) => channel.id === channelId);
  const initialValues = { name: channelToEdit ? channelToEdit.name : '' };

  const checkDuplicate = (channelName) => {
    return channels.some(
      (channel) => channel.name.trim().toLowerCase() === channelName.trim().toLowerCase()
    );
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleEditChannel = async (values, actions) => {
    const { setSubmitting } = actions;

    if (checkDuplicate(values.name)) {
      setError(t('validationErrors.duplicate'));
      setSubmitting(false);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.patch(
        `${routes.channelsPath()}/${channelId}`,
        { name: values.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        dispatch(updateChannel(response.data));
        toast.success(t('toast.channelRenamed'));
        handleClose();
      } else {
        throw new Error('Error while editing the channel.');
      }
    } catch (err) {
      console.error('Error while editing the channel:', err);
      setError(err.response?.data?.message || t('error.editChannelFailed'));
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
            <h5 className="modal-title">{t('channels.modals.titles.renameChannel')}</h5>
            <button type="button" className="btn-close" onClick={handleClose} />
          </div>
          <div className="modal-body">
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => handleEditChannel(values, actions)}
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
                      placeholder={t('modals.rename')}
                    />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                    {error && <div className="text-danger mt-2">{error}</div>}
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="me-2 btn btn-secondary" onClick={handleClose}>
                      {t('channels.cancel')}
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {t('channels.add')}
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

export default EditChannelModal;
