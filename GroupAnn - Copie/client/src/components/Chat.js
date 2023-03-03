import { useState, useEffect, useRef } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const ENDPOINT = 'localhost:5000';

  const socketRef = useRef();

  useEffect(() => {
    const { name, room } = queryString.parse((location.search || ''));
    socketRef.current = io(ENDPOINT);

    setRoom(room);
    setName(name);

    console.log(socketRef.current);

    socketRef.current.emit('join', { name, room }, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }, [location.search]);

  return (
    <div>
      <h2>Welcome, {name}!</h2>
      <p>You are in the {room} room.</p>
    </div>
  );
}

export default Chat;
