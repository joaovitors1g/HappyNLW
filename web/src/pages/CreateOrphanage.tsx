import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MapContainer, Marker, TileLayer, MapConsumer } from 'react-leaflet';
import { FiPlus } from 'react-icons/fi';
import { LeafletMouseEvent, Map } from 'leaflet';

import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';

import '../styles/pages/create-orphanage.css';
import api from '../services/api';

export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>();
  const [leafletMap, setLeafletMap] = useState<Map>();

  function handleMapClick(event: LeafletMouseEvent) {
    setPosition({
      latitude: event.latlng.lat,
      longitude: event.latlng.lng,
    });
  }

  useEffect(() => {
    if (leafletMap) {
      leafletMap.addEventListener('click', handleMapClick);
    }
  }, [leafletMap]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const fd = new FormData();

    fd.append('name', name);
    fd.append('about', about);
    fd.append('instructions', instructions);
    fd.append('latitude', String(latitude));
    fd.append('longitude', String(longitude));
    fd.append('opening_hours', opening_hours);
    fd.append('open_on_weekends', String(open_on_weekends));

    images.forEach((image) => {
      fd.append('images', image);
    });

    await api.post('orphanages', fd);

    alert('Cadastro realizado com sucesso');

    history.push('/orphanages');
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  return (
    <div id='page-create-orphanage'>
      <Sidebar />

      <main>
        <form className='create-orphanage-form' onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <MapContainer
              center={[-27.2092052, -49.6401092]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              <MapConsumer>
                {(map) => {
                  setLeafletMap(map);
                  return null;
                }}
              </MapConsumer>

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </MapContainer>

            <div className='input-block'>
              <label htmlFor='name'>Nome</label>
              <input
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='about'>
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id='name'
                maxLength={300}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='images'>Fotos</label>

              <div className='images-container'>
                {previewImages?.map((image) => (
                  <img src={image} alt={name} key={image} />
                ))}
                <label htmlFor='image[]' className='new-image'>
                  <FiPlus size={24} color='#15b6d6' />
                </label>
              </div>

              <input
                multiple
                onChange={handleSelectImages}
                type='file'
                id='image[]'
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className='input-block'>
              <label htmlFor='instructions'>Instruções</label>
              <textarea
                id='instructions'
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='opening_hours'>Horário de funcionamento</label>
              <input
                id='opening_hours'
                value={opening_hours}
                onChange={(e) => setOpeningHours(e.target.value)}
              />
            </div>

            <div className='input-block'>
              <label htmlFor='open_on_weekends'>Atende fim de semana</label>

              <div className='button-select'>
                <button
                  type='button'
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type='button'
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className='confirm-button' type='submit'>
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
