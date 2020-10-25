import User from '../models/User';
import orphanages_view from './orphanages_view';

export default {
  render(user: User, withOrphanages = false) {
    const { id, name, email, avatar_url, orphanages } = user;

    let userView = {
      id,
      name,
      email,
      avatar_url,
    };

    if (withOrphanages) {
      userView = Object.assign(userView, {
        orphanages: orphanages_view.renderMany(orphanages, false),
      });
    }
    return userView;
  },
  renderMany(users: User[], withOrphanages = false) {
    return users.map((user) => this.render(user, withOrphanages));
  },
};
