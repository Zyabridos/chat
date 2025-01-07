import React, { useState } from 'react';
import { 
  Formik,
  Field,
  Form,
  ErrorMessage,
} from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { closeModal } from '../../../store/slices/modalSlice';
import { updateChannel } from '../../../store/slices/channelsSlice';
import createValidationChannelSchema from '../../../validationsSchemas/channelSchema.js';
import { updateChannelAPI } from '../../../API/channelsAPI.js';

const EditChannelModal = ({ channelId }) => {
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;
  const channels = useSelector((state) => state.channelsInfo.channels);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const channelToEdit = channels.find((channel) => channel.id === channelId);
  const initialValues = { name: channelToEdit ? channelToEdit.name : '' };
  const validationSchema = createValidationChannelSchema(t);

  const checkDuplicate = (channelName) => channels.some(
    (channel) => channel.name.trim().toLowerCase() === channelName.trim().toLowerCase(),
  );

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleEditChannel = async (values, { setSubmitting }) => {
    if (checkDuplicate(values.name)) {
      setError(t('validationErrors.duplicate'));
      setSubmitting(false);
      return;
    }

    const cleanedChannelName = leoProfanity.clean(values.name);

    try {
      const updatedChannel = await updateChannelAPI(channelId, { name: cleanedChannelName }, token);
      dispatch(updateChannel(updatedChannel));
      toast.success(t('toast.channelRenamed'));
      handleClose();
    } catch (err) {
      console.error('Error while editing the channel:', err);
      setError(err.response?.data?.message || t('error.editChannelFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('channels.modals.titles.renameChannel')}</h5>
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
              onSubmit={handleEditChannel}
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
