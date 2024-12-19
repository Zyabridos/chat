import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import validationCreateChannel from '../../../validationSchemas/validationCreateChannel.jsx';

const EditChannelModal = ({ isEditModalOpen, handleCloseEditModal, editingChannel, handleEditChannel }) => {
  const { t } = useTranslation();

  if (!isEditModalOpen) return null;

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('channels.modal.renameChannel')}</h5>
            <button type="button" className="btn-close" onClick={handleCloseEditModal}></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{ name: editingChannel?.name || '' }}
              validationSchema={validationCreateChannel(t)}
              onSubmit={handleEditChannel}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">{t('channels.modal.typeNewChannelName')}</label>
                    <Field
                      type="text"
                      id="name"
                      className="form-control"
                      name="name"
                    />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="me-2 btn btn-secondary" onClick={handleCloseEditModal}>
                      {t('channels.cancel')}
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {t('channels.modal.rename')}
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
