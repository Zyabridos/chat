import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import validationCreateChannel from '../../../validationSchemas/validationCreateChannel.jsx';
import { handleAddChannel } from '../buttonHandlers.js';

const AddChannelModal = ({ isModalOpen, handleCloseModal, channels, dispatch, setError, token }) => {
  const { t } = useTranslation();

  if (!isModalOpen) return null;

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('channels.addNewChannel')}</h5>
            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{ name: '' }}
              validationSchema={validationCreateChannel(t)}
              onSubmit={(values, actions) => handleAddChannel(values, actions, channels, dispatch, handleCloseModal, setError, token, t)}
              context={{ channels }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">{t('channels.modal.typeChannelName')}</label>
                    <Field
                      type="text"
                      id="name"
                      className="form-control"
                      name="name"
                    />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="me-2 btn btn-secondary" onClick={handleCloseModal}>
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

export default AddChannelModal;
