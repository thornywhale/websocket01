import axios from 'axios';
import io from 'socket.io-client';
import store from '../store';

import { WEBSOCKET_EVENTS, BASE_URL } from '../constants';
import { addMessage, errMessage } from '../store/chatSlice';

const httpClient = axios.create({
  baseURL: `http://${BASE_URL}`,
});

const socket = io(`ws://${BASE_URL}`);

export const getAllMessages = httpClient.get('/');
export const createUser = (values) => httpClient.post('/users', values);
export const createMessage = (message) =>
  socket.emit(WEBSOCKET_EVENTS.NEW_MESSAGE, message);

socket.on(WEBSOCKET_EVENTS.NEW_MESSAGE, (message) => {
  alert('new message');
  store.dispatch(addMessage(message));
});
socket.on(WEBSOCKET_EVENTS.ERROR_MESSAGE, (error) => {
  alert('error');
  store.dispatch(errMessage(error));
});
