import express from 'express';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();

router.post('/sign-in', async (req, res, next) => {
  try {
    prisma.accounts.create({
      // id
      // pw
      // pwcheck
    });

    res.status(200).json({ Massage: '아이디가 성공적으로 생성되었습니다' });
  } catch (error) {
    next(error);
  }
});

router.get(); // 캐릭터 정보 획득

router.delete(); // 캐릭터 삭제하기

router.patch() // 아이템 정보 변경

// 아무거나 수정해두기


export default router;
