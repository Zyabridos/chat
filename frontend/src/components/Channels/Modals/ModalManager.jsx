import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../../store/slices/modalSlice.js';
import AddChannelModal from './AddChannelModal.jsx';
import EditChannelModal from './EditChannelModal.jsx';
import DeleteChannelModal from './DeleteChannelModal.jsx';

const ModalManager = () => {
  const { isOpen, type, props } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleClose = () => {
    dispatch(closeModal());
  };

  // modalSlice.js, initialState.type
  const renderModalContent = () => {
    switch (type) {
      case 'addChannel':
        return <AddChannelModal {...props} onClose={handleClose} />;
      case 'editChannel':
        return <EditChannelModal {...props} onClose={handleClose} />;
      case 'deleteChannel':
        return <DeleteChannelModal {...props} onClose={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">{renderModalContent()}</div>
    </div>
  );
};

export default ModalManager;
