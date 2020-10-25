import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }: any) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, '/sessions', { email, password });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (error) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique suas credenciais'
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }: any) {
  try {
    const { name, email, password, confirmPassword } = payload;

    yield call(api.post, '/users', {
      name,
      email,
      password,
      confirm_password: confirmPassword,
    });
  } catch (error) {
    Alert.alert(
      'Falha no cadastro',
      'Houve um erro no cadastro, verifique seus dados'
    );

    yield put(signFailure());
  }
}

export function setToken({ payload }: any) {
  if (!payload) return;
  api.defaults.headers.Authorization = `Bearer ${payload.auth.token}`;
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
