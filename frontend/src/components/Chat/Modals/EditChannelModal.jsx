import React from 'react';
import { useTranslation } from 'react-i18next';

const EditChannelModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  newChannelName, 
  onChange, 
  emptyChannelNameError 
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null; // Если модальное окно не открыто, не рендерим

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('channels.modal.renameChannel')}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="channelName" className="form-label">{t('channels.modal.typeNewChannelName')}</label>
                <input
                  type="text"
                  id="channelName"
                  className="form-control"
                  value={newChannelName}
                  onChange={onChange}
                />
              </div>
              {emptyChannelNameError && <div className="text-danger">{emptyChannelNameError}</div>} {/* Выводим ошибку */}
              <div className="d-flex justify-content-end">
                <button type="button" className="me-2 btn btn-secondary" onClick={onClose}>
                  {t('channels.cancel')}
                </button>
                <button type="submit" className="btn btn-primary">{t('channels.modal.rename')}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditChannelModal;
