/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../store/slices/modalSlice.js';
import AddChannelModal from './channelModals/AddChannelModal.jsx';
import EditChannelModal from './channelModals/EditChannelModal.jsx';
import DeleteChannelModal from './channelModals/DeleteChannelModal.jsx';

const ModalManager = () => {
  const { isOpen, type, props } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleClose = () => {
    dispatch(closeModal());
  };

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
