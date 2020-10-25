import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../config/auth';

export default {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send();
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).send();
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(404).send();
    }

    const token = jwt.sign({}, auth.secret as string, {
      expiresIn: auth.expiresIn,
      subject: user.id.toString(),
    });

    return res.status(201).json({
      token,
      user,
    });
  },
};
