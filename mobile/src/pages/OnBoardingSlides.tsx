import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import OnBoardingDot from '../components/OnBoardingDot';
import OnBoardingNextButton from '../components/OnBoardingNextButton';

import childrens from '../images/childrens.png';
import happyEarth from '../images/happy-earth.png';

const OnBoardingSlides: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <Onboarding
      pages={[
        {
          backgroundColor: '#F2F3F5',
          title: 'Leve felicidade para o mundo',
          subtitle: 'Visite orfanatos e mude o dia de muitas crianças.',
          image: (
            <Image
              source={happyEarth}
              style={styles.image}
              resizeMode='contain'
            />
          ),
          titleStyles: styles.titleLeft,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: '#F2F3F5',
          title: 'Escolha um orfanato no mapa e faça uma visita',
          subtitle: '',
          image: (
            <Image
              source={childrens}
              style={styles.image}
              resizeMode='contain'
            />
          ),
          titleStyles: styles.titleRight,
        },
      ]}
      containerStyles={{
        paddingHorizontal: 20,
        alignItems: 'flex-start',
      }}
      imageContainerStyles={{ paddingBottom: 25 }}
      nextLabel='Próximo'
      skipLabel='Pular'
      bottomBarHighlight={false}
      showSkip={false}
      NextButtonComponent={OnBoardingNextButton}
      DotComponent={OnBoardingDot}
      DoneButtonComponent={OnBoardingNextButton}
      onDone={() => navigate('OrphanagesMap')}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
  },

  titleLeft: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 32,
    color: '#0089A5',
    maxWidth: 250,
    textAlign: 'left',
    marginBottom: 20,
  },

  titleRight: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 32,
    color: '#0089A5',
    maxWidth: 280,
    textAlign: 'right',
    marginBottom: 20,
  },

  subtitle: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 20,
    color: '#5C8599',
    marginBottom: 40,
  },
});

export default OnBoardingSlides;
