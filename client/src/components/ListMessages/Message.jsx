import React from 'react';

const Message = ({ msg }) => {
  return (
    <article>
      {msg.content} (({msg.userId.login}))
    </article>
  );
};

export default Message;
