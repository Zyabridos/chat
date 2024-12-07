const ChannelBox = (channelNames) => {
  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {/* тут, понятно, переделаем на пропсы и на дефолтные пропсы (каналы general и random)
      класс Secondary присваивается тому каналу, который открыт
       */}
      <li className="nav-item w-100">
        <button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
          <span className="me-1">#</span>
          general
        </button>
      </li>
      <li className="nav-item w-100">
        <button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
          <span className="me-1">#</span>
          random
        </button>
      </li>
    </ul>
  )
};

export default ChannelBox;
