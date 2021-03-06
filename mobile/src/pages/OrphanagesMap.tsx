import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import * as Location from 'expo-location';

import api from '../services/api';

import mapMarker from '../images/map-marker.png';
import { getSocket } from '../services/socket';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  async function fetchOrphanages() {
    const response = await api.get('orphanages');

    setOrphanages(response.data);
  }

  async function getUserPosition() {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      alert(
        'Ops, precisamos da sua localização para mostrar orfanatos próximos a você.'
      );
      return;
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({
      mayShowUserSettingsDialog: true,
    });

    setLocation({
      latitude,
      longitude,
    });
  }
  useEffect(() => {
    getUserPosition();
  }, []);

  const focusEffectCallback = useCallback(() => {
    fetchOrphanages();
  }, []);

  useFocusEffect(focusEffectCallback);

  const { navigate } = useNavigation();

  function handleNavigateToDetails(id: number) {
    navigate('OrphanageDetails', {
      id,
    });
  }

  function handleNavigateToCreateOrphanage() {
    navigate('SelectMapPosition');
  }

  useEffect(() => {
    const socket = getSocket();
    const listener = (orphanage: Orphanage) => {
      setOrphanages((oldOrphanages) => [...oldOrphanages, orphanage]);
    };

    socket?.on('new-orphanage', listener);

    return () => {
      socket?.off('new-orphanage', listener);
    };
  }, []);

  if (location.latitude === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color='#15C3D6' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
        {orphanages.map((orphanage) => (
          <Marker
            icon={mapMarker}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
            calloutAnchor={{
              x: 2.4,
              y: 0.8,
            }}
            key={orphanage.id}
          >
            <Callout
              tooltip
              onPress={() => handleNavigateToDetails(orphanage.id)}
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanatos encontrados
        </Text>
        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather name='plus' size={20} color='#fff' />
        </RectButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3',
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrphanagesMap;
