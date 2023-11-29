import React from 'react';

import ListMessages from '../components/forms/ListMessages';
import MessageForm from '../components/forms/MessageForm';
import UserForm from '../components/forms/UserForm';

const HomePage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <ListMessages />
        <MessageForm />
      </div>
      <div>
        <UserForm />
      </div>
    </div>
  );
};

export default HomePage;
