import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Routes from './routes';
import { connectSocket } from './services/socket';

export default function AppIndex() {
  useEffect(() => {
    connectSocket();
  }, []);

  const signed = useSelector<{ auth: { signed: boolean } }, boolean>(
    (state) => state.auth.signed
  );

  return <Routes isSigned={signed} />;
}
