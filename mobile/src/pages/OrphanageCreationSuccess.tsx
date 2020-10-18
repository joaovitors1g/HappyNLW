import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import successIcon from '../images/success-icon.png';

const OrphanageCreationSuccess: React.FC = () => {
  const { navigate } = useNavigation();

  function handleNavigateBackToOrphanagesMap() {
    navigate('OrphanagesMap');
  }

  return (
    <>
      <StatusBar
        barStyle='dark-content'
        translucent
        backgroundColor='transparent'
      />
      <View style={styles.container}>
        <Image
          source={successIcon}
          style={styles.successIcon}
          resizeMode='contain'
        />
        <Text style={styles.successTitle}>Ebaaa!</Text>
        <Text style={styles.successText}>
          O cadastro deu certo e foi enviado ao administrador para ser aprovado.
          Agora é só esperar :)
        </Text>
        <RectButton
          style={styles.successButton}
          onPress={handleNavigateBackToOrphanagesMap}
        >
          <Text style={styles.successButtonText}>Ok</Text>
        </RectButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#39CC83',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  successIcon: {
    width: 250,
    height: 250,
  },

  successText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 18,
    color: '#fff',
    maxWidth: 280,
    textAlign: 'center',
  },

  successTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 32,
    color: '#fff',
    marginVertical: 16,
  },

  successButton: {
    backgroundColor: '#19C06D',
    width: 100,
    height: 70,
    borderRadius: 20,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  successButtonText: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#fff',
    fontSize: 20,
  },
});

export default OrphanageCreationSuccess;
