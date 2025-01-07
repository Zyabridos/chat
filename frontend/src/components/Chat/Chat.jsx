const Chat = () => (
  <>
    <Navbar />
    <div className="d-flex h-100 overflow-hidden">
      <div className="col-12 col-md-3 col-lg-2 border-end px-0 bg-light d-flex flex-column">
        <Channels />
      </div>
      <div className="flex-grow-1 d-flex flex-column p-0">
        <MessagesContainer />
      </div>
    </div>
  </>
);
