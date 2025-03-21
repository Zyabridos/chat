import React from 'react';

const Message = ({ id, userName, message }) => (
  <div className="text-break mb-2" key={id}>
    <b>{userName}</b>
    :
    {message}
  </div>
);

export default Message;
