import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getChat } from '../../store/chatSlice';
import Message from './Message';

const ListMessages = () => {
  const { messages, error, isFetching } = useSelector((store) => store.chat);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChat());
  }, [dispatch]);
  const showList = (msg) => <Message key={msg._id} msg={msg} />;
  return (
    <section>
      <h2>MESSAGES</h2>
      {isFetching && <h3>Loading...</h3>}
      {error && <h3>ERROR</h3>}
      {messages.length === 0 ? (
        <h3>No messages yet</h3>
      ) : (
        messages.map(showList)
      )}
    </section>
  );
};

export default ListMessages;
