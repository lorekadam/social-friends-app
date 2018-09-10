import io from 'socket.io-client';
import { store } from '../Fstats';
import { main } from '../config/globals';

export let socket = null;

export const initSocket = () => {
  if (socket === null) {
    socket = io(`${main}?_id=${store.getState().user._id}`);
    socket.on('hello', (data) => {
      console.log(data);
    });
  }
};

export const closeSocket = () => {
  socket.emit('manual-disconnect', { socket: socket.id, _id: store.getState().user._id });
  socket.close();
  socket = null;
};
