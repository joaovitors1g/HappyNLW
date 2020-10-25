import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';
import SelectMapPosition from './pages/SelectMapPosition';
import OrphanageData from './pages/OrphanageData';
import OrphanageCreationSuccess from './pages/OrphanageCreationSuccess';
import CancelCreateOrphanageForm from './pages/CancelCreateOrphanageForm';
import OnBoardingSlides from './pages/OnBoardingSlides';
import AuthorDetails from './pages/AuthorDetails';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Header from './components/Header';

const { Navigator, Screen } = createStackNavigator();

interface RoutesProps {
  isSigned: boolean;
}

const Routes: React.FC<RoutesProps> = ({ isSigned }) => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: '#f2f3f5',
          },
        }}
        initialRouteName={isSigned ? 'OrphanagesMap' : 'SignIn'}
      >
        {isSigned ? (
          <>
            <Screen name='OnBoardingSlides' component={OnBoardingSlides} />
            <Screen name='OrphanagesMap' component={OrphanagesMap} />
            <Screen
              name='OrphanageDetails'
              options={{
                headerShown: true,
                header: () => <Header showCancel={false} title='Orfanato' />,
              }}
              component={OrphanageDetails}
            />
            <Screen
              name='SelectMapPosition'
              options={{
                headerShown: true,
                header: () => <Header title='Selecione no mapa' />,
              }}
              component={SelectMapPosition}
            />
            <Screen
              name='OrphanageData'
              options={{
                headerShown: true,
                header: () => <Header title='Informe os dados' />,
              }}
              component={OrphanageData}
            />
            <Screen
              name='OrphanageCreationSuccess'
              component={OrphanageCreationSuccess}
            />
            <Screen
              name='CancelCreateOrphanageForm'
              component={CancelCreateOrphanageForm}
            />
            <Screen name='AuthorDetails' component={AuthorDetails} />
          </>
        ) : (
          <>
            <Screen name='SignIn' component={SignIn} />
            <Screen name='SignUp' component={SignUp} />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
