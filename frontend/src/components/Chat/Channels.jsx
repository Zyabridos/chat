import addSymbol from '../../assets/add-symbol.png'

const Channels = () => {
  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>Каналы</b>
      <button type="button" className="p-0 text-primary btn btn-group-vertical">
        <img src={addSymbol} className="rounded-circle" alt="Добавить канал" width='20px' height='20px'/>
        <span className="visually-hidden">+</span>
      </button>
    </div>
  )
};

export default Channels;
