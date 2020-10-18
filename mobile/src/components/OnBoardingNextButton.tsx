import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import {
  DoneButtonProps,
  NextButtonProps,
} from 'react-native-onboarding-swiper';

const OnBoardingNextButton: React.FC<NextButtonProps | DoneButtonProps> = ({
  onPress,
}) => {
  return (
    <RectButton onPress={onPress} style={styles.nextButton}>
      <Feather name='arrow-right' size={20} color='#15B6D6' />
    </RectButton>
  );
};

const styles = StyleSheet.create({
  nextButton: {
    width: 56,
    height: 56,
    backgroundColor: '#D1EDF2',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 20,
  },
});

export default OnBoardingNextButton;
