import 'dotenv/config';
import './database/connection';

import app from './app';

import WebSocket from './socket';

new WebSocket(app);

app.listen(3333, () => {
   console.log('App listening at port 3333 🚀');
});
