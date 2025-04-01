import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';

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

    return res.status(200).json({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      agency: user.agency,
      account: user.account,
    });
  };
}
