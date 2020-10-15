import multer from 'multer';
import path from 'path';
import { randomBytes } from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename(req, file, cb) {
      const hash = randomBytes(8).toString('hex');
      const filename = `${hash}-${file.originalname}`;

      cb(null, filename);
    },
  }),
};
