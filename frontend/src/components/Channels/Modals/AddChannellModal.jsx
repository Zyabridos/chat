import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import validationCreateChannel from '../../../validationSchemas/validationCreateChannel.jsx';
import { handleAddChannel } from '../buttonHandlers.js';

const AddChannelModal = ({
  isModalOpen,
  handleCloseModal,
  channels,
  dispatch,
  setError,
  token,
}) => {
  const { t } = useTranslation();

  // If the modal is not open, do not render anything
  if (!isModalOpen) return null;

  return (
    <div className="modal show" style={{ display: 'block' }}>
      {' '}
      {/* Modal display when it's open */}
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('channels.addNewChannel')}</h5> {/* Modal title */}
            <button type="button" className="btn-close" onClick={handleCloseModal} />{' '}
            {/* Close button */}
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{ name: '' }}
              validationSchema={validationCreateChannel(t)}
              onSubmit={(values, actions) =>
                handleAddChannel(
                  values,
                  actions,
                  channels,
                  dispatch,
                  handleCloseModal,
                  setError,
                  token,
                  t
                )
              }
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    {' '}
                    {/* Form group for the channel name field */}
                    <label htmlFor="name" className="form-label">
                      {t('channels.modal.typeChannelName')}
                    </label>{' '}
                    {/* Label for input */}
                    <Field type="text" id="name" className="form-control" name="name" />{' '}
                    {/* Input field for the channel name */}
                    <ErrorMessage name="name" component="div" className="text-danger" />{' '}
                    {/* Error message for the name field */}
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="me-2 btn btn-secondary"
                      onClick={handleCloseModal}
                    >
                      {t('channels.cancel')} {/* Cancel button (translated) */}
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting} // Disable the button while submitting
                    >
                      {t('channels.add')} {/* Submit button to add the channel (translated) */}
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
