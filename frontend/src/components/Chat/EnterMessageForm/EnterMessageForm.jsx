import { sendButton } from './Buttons.jsx'

const EnterMessageForm = () => {
  return (
    <form novalidate="" className="py-1 border rounded-2">
      <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" value="" />
      
    </form>
  )
};

export default EnterMessageForm;
