import Header from './Header.jsx';
import EnterMessageForm from '../EnterMessageForm/EnterMessageForm.jsx';

const messageBox = document.querySelector('#messages-box')

const MainWindow = () => {
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <Header />
        <div className="mt-auto px-5 py-3">
          <EnterMessageForm />
        </div>
      </div>
    </div>
  )
};

export default MainWindow;
