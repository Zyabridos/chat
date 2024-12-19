// EditChannelModal.jsx
import React, { useState, useEffect } from 'react';

const EditChannelModal = ({
  isEditModalOpen,
  handleCloseEditModal,
  t,
  editingChannel,
  handleEditChannel
}) => {
  const [newChannelName, setNewChannelName] = useState('');

  // Обновляем название канала, когда изменяется объект editingChannel
  useEffect(() => {
    if (editingChannel) {
      setNewChannelName(editingChannel.name);
    }
  }, [editingChannel]);

  // Если нет editingChannel, то не рендерим модальное окно
  if (!editingChannel) return null;

  return (
    <div className={`modal ${isEditModalOpen ? 'show' : ''}`} style={{ display: isEditModalOpen ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('channels.modal.renameChannel')}</h5>
            <button type="button" className="btn-close" onClick={handleCloseEditModal}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleEditChannel}>
              <div className="mb-3">
                <label htmlFor="channelName" className="form-label">{t('channels.modal.typeNewChannelName')}</label>
                <input
                  type="text"
                  id="channelName"
                  className="form-control"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-end">
                <button type="button" className="me-2 btn btn-secondary" onClick={handleCloseEditModal}>
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
