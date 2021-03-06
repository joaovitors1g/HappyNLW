import React, { useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Image,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import happyLogo from '../images/map-marker.png';
import {
  BorderlessButton,
  RectButton,
  TextInput,
} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
import { useDispatch } from 'react-redux';
import { signInRequest } from '../store/modules/auth/actions';

const Login: React.FC = () => {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef<any>(null);
  const dispatch = useDispatch();

  async function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <LinearGradient colors={['#2AB5D1', '#00C7C7']} style={styles.container}>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={-200}>
        <View style={styles.logoContainer}>
          <Image source={happyLogo} />
        </View>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          returnKeyType='next'
          autoCapitalize='none'
          autoCorrect={false}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          ref={passwordRef}
          onSubmitEditing={handleSubmit}
        />
        <BorderlessButton onPress={() => navigate('SignUp')}>
          <Text style={styles.createAccountText}>Não possuo uma conta</Text>
        </BorderlessButton>
        <RectButton style={styles.enterButton} onPress={handleSubmit}>
          <Text style={styles.enterButtonText}>Entrar</Text>
        </RectButton>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
  },

  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },

  label: {
    color: '#ffffff',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
    fontFamily: 'Nunito_600SemiBold',
    color: '#5C8599',
  },

  createAccountText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 14,
    color: '#fff',
  },

  enterButton: {
    backgroundColor: '#37C77F',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  enterButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
});

export default Login;
