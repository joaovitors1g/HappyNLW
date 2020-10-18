import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DotProps } from 'react-native-onboarding-swiper';

const OnBoardingDot: React.FC<DotProps> = ({ selected }) => {
  return (
    <View
      style={[styles.dotStyle, selected ? styles.dotStyleActive : null]}
    ></View>
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
