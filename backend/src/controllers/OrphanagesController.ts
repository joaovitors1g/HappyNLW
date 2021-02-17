import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import orphanageView from '../views/orphanages_view';
import Orphanage from '../models/Orphanage';
import { Server } from 'socket.io';

export default {
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images', 'user'],
    });

    return res.json(orphanageView.renderMany(orphanages));
  },

  async show(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(req.params.id, {
      relations: ['images', 'user'],
    });

    return res.json(orphanageView.render(orphanage, true));
  },

  async create(req: Request, res: Response) {
    console.log(req);
    const files = req.files as Express.Multer.File[];

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    const orphanagesRepository = getRepository(Orphanage);

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images: files.map((image) => ({
        path: image.filename,
      })),
      user_id: Number(req.user.id),
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    const io = req.io as Server;

    io.emit('new-orphanage', orphanage);

    return res.status(201).json(orphanageView.render(orphanage, true));
  },
};
