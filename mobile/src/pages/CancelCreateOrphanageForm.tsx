import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';

const CancelCreateOrphanageForm: React.FC = () => {
  return (
    <>
      <StatusBar
        barStyle='dark-content'
        translucent
        backgroundColor='transparent'
      />
      <View style={styles.container}>
        <View style={styles.cancelTopIconContainer}>
          <Feather name='x' size={32} color='#FF669D' />
        </View>
        <Text style={styles.cancellationTitle}>Cancelar cadastro</Text>
        <Text style={styles.cancellationText}>
          Tem certeza que quer cancelar esse cadastro?
        </Text>
        <View style={styles.cancelButtonsContainer}>
          <TouchableOpacity style={styles.cancelButtonNot}>
            <Text style={styles.cancelButtonNotText}>Não</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButtonYes}>
            <Text style={styles.cancelButtonNotText}>Sim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF669D',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelTopIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancellationTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 32,
    color: '#fff',
    marginTop: 20,
  },

  cancellationText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    maxWidth: 250,
    marginTop: 30,
  },

  cancelButtonsContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },

  cancelButtonNot: {
    width: 128,
    height: 56,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D6487B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  cancelButtonYes: {
    width: 128,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#D6487B',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelButtonNotText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 20,
    color: '#fff',
  },
});

export default CancelCreateOrphanageForm;
