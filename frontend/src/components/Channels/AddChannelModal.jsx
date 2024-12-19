import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import leoProfanity from 'leo-profanity';
import { setChannels } from '../../slices/channelsSlice';

const validationSchema = (t) => yup.object({
  channelName: yup.string()
    .min(6, t('validationErrors.min6'))
    .max(20, t('validationErrors.max20'))
    .required(t('validationErrors.required'))
    .test('is-unique', t('validationErrors.channelAlreadyExists'), function(value) {
      const { channels } = this.options.context || {};
      return !channels.some(channel => channel.name === value);
    })
});

const AddChannelModal = ({ isModalOpen, handleCloseModal, t, channels, handleAddChannel }) => {
  const formik = useFormik({
    initialValues: { channelName: '' },
    validationSchema: validationSchema(t),
    onSubmit: handleAddChannel,
    validateOnChange: true,
    context: { channels },
  });

  return (
    <>
      {isModalOpen && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t('channels.addNewChannel')}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="channelName" className="form-label">{t('channels.modal.typeChannelName')}</label>
                    <input
                      type="text"
                      id="channelName"
                      className="form-control"
                      value={formik.values.channelName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.errors.channelName && formik.touched.channelName && (
                    <div className="text-danger">{formik.errors.channelName}</div>
                  )}
                  <div className="d-flex justify-content-end">
                    <button type="button" className="me-2 btn btn-secondary" onClick={handleCloseModal}>
                      {t('channels.cancel')}
                    </button>
                    <button type="submit" className="btn btn-primary">{t('channels.add')}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddChannelModal;
