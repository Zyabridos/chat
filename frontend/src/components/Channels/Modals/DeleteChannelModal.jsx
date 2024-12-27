import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../../store/slices/modalSlice';
// надо все handleAdd/Delete/EditChannel перенести в ../../API/channels
import { handleDeleteChannel } from '../buttonHandlers.js';

const DeleteChannelModal = ({ channelId, channelName, channels, token, setError }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      await handleDeleteChannel(channelId, dispatch, channels, token, setError, t);
      handleClose(); // close modal after deletin
    } catch (error) {
      console.error('Error deleting channel:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('modals.delete')}</h5>
            <button type="button" className="btn-close" onClick={handleClose} />
          </div>
          <div className="modal-body">
            <p>
              {t('channels.modals.confirmDeletingChannel', { channelName })}{' '}
              {/* Confirm deleting */}
            </p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              {t('modals.cancel')}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onSubmit}
              disabled={isSubmitting} // Disable the button while submitting
            >
              {t('modals.delete')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteChannelModal;
