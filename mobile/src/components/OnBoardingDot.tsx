import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DotProps } from 'react-native-onboarding-swiper';

const OnBoardingDot: React.FC<DotProps> = ({ selected }) => {
  return (
    <TouchableOpacity
      style={[styles.dotStyle, selected ? styles.dotStyleActive : null]}
      onPress={() => {}}
    ></TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dotStyle: {
    width: 8,
    height: 3,
    borderRadius: 4,
    backgroundColor: '#BECFD8',
    marginLeft: 5,
  },

  dotStyleActive: {
    width: 13,
    backgroundColor: '#FFD152',
  },
});

export default OnBoardingDot;
