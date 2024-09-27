import express from 'express';
import { userDataClient } from '../src/utils/prisma/index.js';
import authMiddleware from '../src/middlewares/auth.middleware.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/sign-in', authMiddleware, async (req, res, next) => {
  try {
    const { account, password, passwordCheck, name } = req.body;

    const isExistAccount = await userDataClient.users.findfirst({
        where
    })
  } catch (error) {}
});
