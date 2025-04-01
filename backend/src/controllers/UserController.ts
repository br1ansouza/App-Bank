import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User';
import { generateAgency, generateAccount } from '../utils/generateAccount';
import bcrypt from 'bcryptjs';

export class UserController {
    create = async (req: Request, res: Response) => {
        const { full_name, email, password } = req.body;

        const userRepo = AppDataSource.getRepository(User);

        const existing = await userRepo.findOneBy({ email });
        if (existing) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const agency = generateAgency();
        const account = generateAccount();

        const user = userRepo.create({
            full_name,
            email,
            password: hashedPassword,
            agency,
            account,
        });

        await userRepo.save(user);

        return res.status(201).json({
            full_name: user.full_name,
            email: user.email,
            agency: user.agency,
            account: user.account,
        });
    }
}
