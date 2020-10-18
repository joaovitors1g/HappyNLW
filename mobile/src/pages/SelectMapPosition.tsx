import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import mapMarkerImg from '../images/map-marker.png';
import mapOverlayCursor from '../images/mapoverlay-cursor.png';

interface LocationWatcher {
  remove(): void;
}

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [userPosition, setUserPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [
    positionWatcher,
    setPositionWatcher,
  ] = useState<LocationWatcher | null>(null);

  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    async function startWatchingUserLocation() {
      const location = await Location.getCurrentPositionAsync({});
      setUserPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      const watcher = await Location.watchPositionAsync({}, (location) => {
        const {
          coords: { latitude, longitude },
        } = location;
        setUserPosition({
          latitude,
          longitude,
        });
      });

      setPositionWatcher(watcher);
    }
    startWatchingUserLocation();

    return () => {
      positionWatcher?.remove();
    };
  }, []);

  function handleSelectMapPosition(event: MapEvent) {
    setMarkerPosition(event.nativeEvent.coordinate);
  }

  function handleNextStep() {
    navigation.navigate('OrphanageData', {
      position: markerPosition,
    });
  }

  useEffect(() => {
    if (isFirstTime) {
      navigation.setOptions({
        headerShown: false,
      });
    } else {
      navigation.setOptions({
        headerShown: true,
      });
    }
  }, [isFirstTime]);

  if (userPosition.latitude === 0) {
    return <ActivityIndicator />;
  }

  return (
    <>
      {isFirstTime && (
        <>
          <StatusBar
            barStyle='light-content'
            translucent
            backgroundColor='transparent'
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              flex: 1,
              backgroundColor: 'rgba(21, 182, 214, 0.7)',
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
              zIndex: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            activeOpacity={1}
            onPress={() => setIsFirstTime(false)}
          >
            <Image
              source={mapOverlayCursor}
              style={{ width: 120, height: 120 }}
            />
            <Text
              style={{
                fontFamily: 'Nunito_700Bold',
                fontSize: 22,
                color: '#fff',
                maxWidth: 200,
                textAlign: 'center',
                marginTop: 20,
              }}
            >
              Toque no mapa para adicionar um orfanato
            </Text>
          </TouchableOpacity>
        </>
      )}
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: userPosition.latitude,
            longitude: userPosition.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          style={styles.mapStyle}
          onPress={handleSelectMapPosition}
        >
          <Marker
            coordinate={{
              latitude: userPosition.latitude,
              longitude: userPosition.longitude,
            }}
          />
          {markerPosition.latitude !== 0 && (
            <Marker icon={mapMarkerImg} coordinate={markerPosition} />
          )}
        </MapView>
        {markerPosition.latitude !== 0 && (
          <RectButton style={styles.nextButton} onPress={handleNextStep}>
            <Text style={styles.nextButtonText}>Próximo</Text>
          </RectButton>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
});
