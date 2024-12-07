import rightArrow from '../../../assets/right-arrow.png'

export const SendButton = () => {
  return (
    <button type="submit" disabled="" className="btn btn-group-vertical">
      <img src={rightArrow} className="rounded-circle" alt="Добавить канал" width='20px' height='20px'/>
      <span className="visually-hidden">Отправить</span>
    </button>
  )
};
