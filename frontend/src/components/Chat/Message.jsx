import React from 'react';
import _ from 'lodash'

const Message = ({ userName, message }) => {
  return (
    <div className="text-break mb-2">
      <b>{userName}</b>: {message} {/* Выводим имя пользователя и текст сообщения */}
    </div>
  );
};

export default Message;