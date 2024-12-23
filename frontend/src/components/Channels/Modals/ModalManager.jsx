import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../store/slices/modalSlice.js';
import AddChannelForm from './Channels/Modals/AddChannelForm.jsx';
import EditChannelForm from './Channels/Modals/EditChannelForm.jsx';

const ModalManager = () => {
  const dispatch = useDispatch();
  const { isOpen, modalType, modalProps } = useSelector((state) => state.modal);

  if (!isOpen) return null;

  const handleClose = () => dispatch(closeModal());

  const renderModalContent = () => {
    switch (modalType) {
      case 'add':
        return <AddChannelForm {...modalProps} onClose={handleClose} />;
      case 'edit':
        return <EditChannelForm {...modalProps} onClose={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-content">
          {renderModalContent()}
          <button onClick={handleClose} className="close-button">
            ✖
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalManager;
