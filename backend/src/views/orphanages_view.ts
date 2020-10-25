import Orphanage from '../models/Orphanage';
import imagesView from './images_view';

export default {
  render(orphanage: Orphanage, withUser: boolean) {
    const {
      id,
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
      user,
    } = orphanage;

    let orphanageView = {
      id,
      name,
      latitude: Number(latitude),
      longitude: Number(longitude),
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images: imagesView.renderMany(images),
    };

    if (user && withUser) {
      orphanageView = Object.assign(orphanageView, { user });
    }

    return orphanageView;
  },
  renderMany(orphanages: Orphanage[], withUser = false) {
    return orphanages.map((orphanage) => this.render(orphanage, withUser));
  },
};
