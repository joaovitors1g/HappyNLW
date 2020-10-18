import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { TextInputMask } from 'react-native-masked-text';

import api from '../services/api';
import { LinearGradient } from 'expo-linear-gradient';
import CancelCreateOrphanageForm from './CancelCreateOrphanageForm';
import Header from '../components/Header';

interface OrphanageDataRouteParams {
  position: {
    latitude: number;
    longitude: number;
  };
}

interface ImagePickerImage {
  size?: number;
  uri: string;
}

export default function OrphanageData() {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [whatsapp, setWhatsapp] = useState('');
  const [images, setImages] = useState<ImagePickerImage[]>([]);
  const [formStepIndex, setFormStepIndex] = useState(0);
  const [isCancelling, setIsCancelling] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  const route = useRoute();
  const { position } = route.params as OrphanageDataRouteParams;

  const navigation = useNavigation();

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      alert('Eita, precisamos de acesso a suas fotos...');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const info = await FileSystem.getInfoAsync(result.uri);
    const newImage = {
      size: info.size,
      uri: result.uri,
    };

    setImages((oldImages) => [...oldImages, newImage]);
  }

  async function handleCreateOrphanage() {
    const { latitude, longitude } = position;

    const fd = new FormData();

    fd.append('name', name);
    fd.append('about', about);
    fd.append('instructions', instructions);
    fd.append('latitude', String(latitude));
    fd.append('longitude', String(longitude));
    fd.append('opening_hours', opening_hours);
    fd.append('open_on_weekends', String(open_on_weekends));

    images.forEach((image, index) => {
      fd.append('images', {
        type: 'image/jpg',
        uri: image,
        name: `image_${index}.jpg`,
      } as any);
    });

    await api.post('orphanages', fd);

    navigation.navigate('OrphanagesMap');
  }

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title='Informe os dados'
          onButtonXTap={() => setIsCancelling(true)}
        />
      ),
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: !isCancelling,
    });
  }, [isCancelling]);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      y: 0,
    });
  }, [formStepIndex]);

  if (isCancelling) {
    return (
      <CancelCreateOrphanageForm
        onButtonNoTap={() => setIsCancelling(false)}
        onButtonYesTap={() => navigation.navigate('OrphanagesMap')}
      />
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
      ref={scrollViewRef}
    >
      <View style={styles.formTopContainer}>
        <Text style={styles.title}>
          {formStepIndex === 0 ? 'Dados' : 'Visitação'}
        </Text>
        <View style={styles.formStepsContainer}>
          <BorderlessButton onPress={() => setFormStepIndex(0)}>
            <Text
              style={[
                styles.formStepText,
                formStepIndex === 0 ? styles.formStepTextActive : null,
              ]}
            >
              01
            </Text>
          </BorderlessButton>
          <Text style={styles.formStepText}> - </Text>
          <BorderlessButton onPress={() => setFormStepIndex(1)}>
            <Text
              style={[
                styles.formStepText,
                formStepIndex === 1 ? styles.formStepTextActive : null,
              ]}
            >
              02
            </Text>
          </BorderlessButton>
        </View>
      </View>

      {formStepIndex === 0 ? (
        <>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            autoCorrect={false}
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Sobre</Text>
          <TextInput
            style={[styles.input, { height: 110 }]}
            multiline
            value={about}
            onChangeText={setAbout}
          />

          <Text style={styles.label}>Whatsapp</Text>
          <TextInputMask
            type={'cel-phone'}
            value={whatsapp}
            onChangeText={setWhatsapp}
            style={styles.input}
          />

          <Text style={styles.label}>Fotos</Text>
          <View style={styles.uploadedImagesContainer}>
            {images.map((image) => (
              <LinearGradient
                colors={[
                  'rgba(237, 255, 246, 0.5)',
                  'rgba(252, 240, 244, 0.5)',
                ]}
                key={image.uri}
                style={styles.uploadedImageContainer}
                start={{
                  x: -0.1,
                  y: 0.2,
                }}
                end={{
                  x: 1,
                  y: 0.5,
                }}
              >
                <View style={styles.uploadedImageData}>
                  <Image
                    source={{ uri: image.uri }}
                    style={styles.uploadedImage}
                  />
                  <View style={styles.uploadedImageDataWrapper}>
                    <Text style={styles.uploadedImageDataSize}>
                      {image.size ? Math.round(image.size / 1000) : 0}kbs
                    </Text>
                  </View>
                </View>
                <Feather name='x' color='#FF669D' size={20} />
              </LinearGradient>
            ))}
          </View>
          <TouchableOpacity
            style={styles.imagesInput}
            onPress={handleSelectImages}
          >
            <Feather name='plus' size={24} color='#15B6D6' />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Instruções</Text>
          <TextInput
            style={[styles.input, { height: 110 }]}
            multiline
            value={instructions}
            onChangeText={setInstructions}
          />

          <Text style={styles.label}>Horario de visitas</Text>
          <TextInput
            style={styles.input}
            value={opening_hours}
            onChangeText={setOpeningHours}
          />

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Atende final de semana?</Text>
            <Switch
              thumbColor='#fff'
              trackColor={{ false: '#ccc', true: '#39CC83' }}
              value={open_on_weekends}
              onValueChange={setOpenOnWeekends}
            />
          </View>
        </>
      )}

      <RectButton
        style={styles.nextButton}
        onPress={() => {
          if (formStepIndex === 0) {
            setFormStepIndex(1);
          } else {
            handleCreateOrphanage();
          }
        }}
      >
        <Text style={styles.nextButtonText}>
          {formStepIndex === 0 ? 'Próximo' : 'Cadastrar'}{' '}
        </Text>
      </RectButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  formTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    paddingBottom: 24,

    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6',
  },

  formStepsContainer: {
    flexDirection: 'row',
  },

  formStepText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 12,
    color: '#8FA7B3',
  },

  formStepTextActive: {
    fontFamily: 'Nunito_800ExtraBold',
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
    fontFamily: 'Nunito_600SemiBold',
    color: '#5C8599',
  },

  uploadedImagesContainer: {},

  uploadedImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 15,
    // borderWidth: 1,
    // borderColor: '#EDFFF6',
    borderRadius: 20,
    padding: 8,
  },

  uploadedImageData: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    // marginBottom: 32,
    marginRight: 8,
  },

  uploadedImageDataWrapper: {
    marginLeft: 10,
  },

  uploadedImageDataName: {
    fontFamily: 'Nunito_700Bold',
    color: '#37C77F',
    fontSize: 14,
  },

  uploadedImageDataSize: {
    fontFamily: 'Nunito_700Bold',
    color: '#8FA7B2',
    fontSize: 14,
    marginTop: 5,
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
});
