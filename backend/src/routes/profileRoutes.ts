import express from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import jwt from 'jsonwebtoken';

const router = express.Router();

interface AuthenticatedRequest extends express.Request {
  user?: string | jwt.JwtPayload;
}

router.get('/', authenticate, (req: AuthenticatedRequest, res: express.Response) => {
  return res.status(200).json({
    message: 'Access granted to protected profile route!',
    user: req.user,
  });
});

export default router;
