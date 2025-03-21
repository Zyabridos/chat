import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { closeModal } from '../../../store/slices/modalSlice';
import { deleteChannelAPI } from '../../../API/channelsAPI';

const DeleteChannelModal = ({ channelId, channelName }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;
  const channels = useSelector((state) => state.channelsInfo.channels);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDeleteChannel = async () => {
    if (!token) {
      setError(t('error.tokenNotFound'));
      return;
    }

    setIsSubmitting(true);

    try {
      await deleteChannelAPI(channelId, token);

      dispatch({
        type: 'channels/setChannels',
        payload: channels.filter((channel) => channel.id !== channelId),
      });

      toast.success(t('toast.channelDeleted'));
      setError(null);
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || t('error.deleteChannelFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('channels.modals.titles.deleteChannel')}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label={t('modals.close')}
            />
          </div>
          <div className="modal-body">
            <p>{t('channels.modals.confirmDeletingChannel', { channelName })}</p>
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              {t('modals.cancel')}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteChannel}
              disabled={isSubmitting}
            >
              {isSubmitting ? t('modals.deleting') : t('modals.delete')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteChannelModal;
