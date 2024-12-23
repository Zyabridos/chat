import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import validationCreateChannel from '../../../validationSchemas/validationCreateChannel.jsx';

const EditChannelModal = ({ isEditModalOpen, handleCloseEditModal, editingChannel, handleEditChannel }) => {
  const { t } = useTranslation();

  // If the modal is not open, do not render anything
  if (!isEditModalOpen) return null;

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered"> 
        <div className="modal-content"> {/* Modal content */}
          <div className="modal-header"> {/* Modal header */}
            <h5 className="modal-title">{t('channels.modal.renameChannel')}</h5> {/* Modal title */}
            <button type="button" className="btn-close" onClick={handleCloseEditModal}></button> {/* Close button */}
          </div>
          <div className="modal-body"> {/* Modal body containing the form */}
            <Formik
              initialValues={{ name: editingChannel?.name || '' }}
              validationSchema={validationCreateChannel(t)}
              onSubmit={handleEditChannel} 
            >
              {({ isSubmitting }) => ( 
                <Form> 
                  <div className="mb-3"> 
                    <label htmlFor="name" className="form-label">{t('channels.modal.typeNewChannelName')}</label> {/* Label for input */}
                    <Field
                      type="text" 
                      id="name" 
                      className="form-control" 
                      name="name" 
                    /> {/* Input field for new channel name */}
                    <ErrorMessage name="name" component="div" className="text-danger" /> {/* Validation error message */}
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="me-2 btn btn-secondary" onClick={handleCloseEditModal}>
                      {t('channels.cancel')} {/* Cancel button to close modal */}
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {t('channels.modal.rename')} {/* Submit button for renaming the channel */}
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
