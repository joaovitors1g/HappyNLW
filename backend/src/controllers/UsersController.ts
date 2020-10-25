import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import user_view from '../views/user_view';

export default {
  async index(req: Request, res: Response) {
    const users = await User.find({
      relations: ['orphanages', 'orphanages.images'],
    });

    return res.json(user_view.renderMany(users, true));
  },

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return;
    }

    const user = User.create({
      name,
      email,
      password,
      avatar_url: 'https://localhost:3333/avatars/test123.png',
    });

    await user.save();

    return res.status(201).json(user);
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send();
    }

    const user = await User.findOne(id, {
      relations: ['orphanages', 'orphanages.images'],
    });

    if (!user) {
      return res.status(404).send();
    }

    return res.json(user_view.render(user, true));
  },
};
