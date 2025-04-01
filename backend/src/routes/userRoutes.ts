import express, { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

router.post('/', async function (req: express.Request, res: express.Response) {
  return userController.create(req, res);
});

export default router;
