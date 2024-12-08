const Header = ({ amountOfMessages }) => {
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b># Здесь название канала</b>
      </p>
      <span className="text-muted">Здесь {amountOfMessages} сообщений</span>
    </div>
  )
};

export default Header;