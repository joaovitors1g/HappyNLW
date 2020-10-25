import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send();
  }

  if (!authHeader.startsWith('Bearer')) {
    return res.status(400).send();
  }

  const [, token] = authHeader.split(' ');
  if (!token) {
    return res.status(400).send();
  }

  const { sub: id } = jwt.verify(token, '123456') as JWTPayload;

  req.user = { id };

  next();
};

interface JWTPayload {
  sub: string;
  iat: number;
  exp: number;
}
