import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../services/api';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Orphanage {
  name: string;
  id: number;
  images: {
    id: number;
    url: string;
  }[];
}

export default function AuthorDetails() {
  const route = useRoute();
  const { user } = route.params as any;
  const [userOrphanages, setUserOrphanages] = useState<Orphanage[]>([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    async function fetchUserOrphanages() {
      const response = await api.get(`users/${user.id}`);
      setUserOrphanages(response.data.orphanages);
    }

    fetchUserOrphanages();
  }, []);

  function handleNavigateToDetails(id: number) {
    navigate('OrphanageDetails', {
      id,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Image
          source={{ uri: `https://ui-avatars.com/api/?name=${user.name}` }}
          style={styles.authorAvatar}
        />
        <Text style={styles.title}>{user.name}</Text>
      </View>
      <FlatList
        data={userOrphanages}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        renderItem={({ item: orphanage }) => (
          <TouchableOpacity
            style={styles.orphanageContainer}
            onPress={() => handleNavigateToDetails(orphanage.id)}
          >
            {orphanage.images.length && (
              <Image
                source={{ uri: orphanage.images[0].url }}
                style={styles.orphanageImage}
              />
            )}
            <Text style={styles.orphanageName}>{orphanage.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },

  detailsContainer: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#4D6F80',
    fontSize: 30,
    fontFamily: 'Nunito_700Bold',
  },

  authorData: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },

  authorAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  authorName: {
    color: '#4D6F80',
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    marginLeft: 15,
  },

  orphanageContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  orphanageImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  orphanageName: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#4D6F80',
    fontSize: 18,
    marginLeft: 10,
  },

  description: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5',
  },

  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  scheduleItem: {
    width: '48%',
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: '#E6F7FB',
    borderWidth: 1,
    borderColor: '#B3DAE2',
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: '#EDFFF6',
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 20,
  },

  scheduleItemRed: {
    backgroundColor: '#FEF6F9',
    borderWidth: 1,
    borderColor: '#FFBCD4',
    borderRadius: 20,
  },

  scheduleText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: '#5C8599',
  },

  scheduleTextGreen: {
    color: '#37C77F',
  },

  scheduleTextRed: {
    color: '#FF6690',
  },

  contactButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  },
});
