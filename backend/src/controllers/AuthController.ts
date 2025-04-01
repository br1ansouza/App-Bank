import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class AuthController {
  login = async (req: Request, res: Response): Promise<Response> => {
    const { agency, account, password } = req.body;

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ agency, account });

    if (!user) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.status(500).json({ message: 'JWT_SECRET not defined' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      jwtSecret,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
      } as jwt.SignOptions
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        agency: user.agency,
        account: user.account,
      },
    });
  };
}
