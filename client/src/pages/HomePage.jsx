import React from 'react';
import { useSelector } from 'react-redux';

import ListMessages from '../components/ListMessages';
import MessageForm from '../components/forms/MessageForm';
import UserForm from '../components/forms/UserForm';

const HomePage = () => {
  const { user } = useSelector((store) => store.user);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <ListMessages />
        {user && <MessageForm />}
      </div>
      <div>
        {!user && <UserForm />}
        {user && <span>hi, {user.login}!</span>}
        {user && <button style={{ marginLeft: '12px' }}>log out</button>}
      </div>
    </div>
  );
};

export default HomePage;
