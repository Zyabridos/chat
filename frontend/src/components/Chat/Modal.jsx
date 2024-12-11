export const ModalAddChannel = () => {
  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title h4">Добавить канал</div>
          <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close"></button>
        </div>
        <div className="modal-body">
          <form className="">
            <div>
              <input name="name" id="name" className="mb-2 form-control"/>
                <label className="visually-hidden" htmlFor="name">Имя канала</label>
                <div className="invalid-feedback"></div>
                <div className="d-flex justify-content-end">
                  <button type="button" className="me-2 btn btn-secondary">Отменить</button>
                  <button type="submit" className="btn btn-primary" onClick={handleAddChannel}>Отправить</button>
                  </div>
                </div>
          </form>
        </div>
      </div>
    </div>
  )
}