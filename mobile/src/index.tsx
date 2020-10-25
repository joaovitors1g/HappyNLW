import React from 'react';
import { useSelector } from 'react-redux';
import Routes from './routes';

export default function AppIndex() {
  const signed = useSelector<{ auth: { signed: boolean } }, boolean>(
    (state) => state.auth.signed
  );

  return <Routes isSigned={signed} />;
}
