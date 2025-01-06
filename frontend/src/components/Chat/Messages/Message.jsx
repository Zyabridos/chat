/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-trailing-spaces */
import React from 'react';

const Message = ({ id, userName, message }) => {
  return (
    <div className="text-break mb-2" key={id}>
      <b>{userName}</b>
      :
      {message}
    </div>
  );
};

export default Message;
