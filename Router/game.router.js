import express from 'express';
import { userDataClient } from '../src/utils/prisma/index.js';
import authMiddleware from '../src/middlewares/auth.middleware.js';
import { itemDataClient } from '../src/utils/prisma/index.js';

const router = express.Router();

// 아이템 생성
router.post('/item', (req, res, next) => {
  const { id, name, stat, price } = req.body;

  const isExistitem = itemDataClient.items.findfirst({
    where: { id: +id },
    select: { id },
  });

  if (isExistitem) {
    return res
      .status(400)
      .json({ message: '이미 존재하는 아이템 번호 입니다.' });
  }

  const newitem = itemDataClient.items.create({
    
  })
  try {
  } catch (error) {
    next(err);
  }
});

// 아이템 수정
router.patch('/item/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, stat } = req.body;
});

// 아이템 목록 조회
router.get('/item', (req, res, next) => {});

// 아이템 상세조회
router.get('/item/:id', (req, res, next) => {
  const { itemid } = req.params;
});

// 아이템 구입
router.put('/buy_item/:id', authMiddleware, (req, res, next) => {
  const { charatorid } = req.params;
  const { accountid } = req.account.id;
  const { itemid, count } = req.body;
});

// 아이템 판매
router.put('/sell_item/:id', authMiddleware, (req, res, next) => {
  const { charatorid } = req.params;
  const { accountid } = req.account.id;
  const { itemid, count } = req.body;
});

// 캐릭터 인벤토리 목록
router.get('/inventory/:id', authMiddleware, (req, res, next) => {
  const { accountid } = req.account.id;
  const { charatorid } = req.params;
});

// 캐릭터 장착 장비 목록
router.get('/equipment/:id', (req, res, next) => {
  const { charatorid } = req.params;
});

// 캐릭터 장비 장착 api
router.put('/equip/:id', authMiddleware, (req, res, next) => {
  const { accountid } = req.account.id;
  const { charatorid } = req.params;
  const { itemid } = req.body;
});

// 캐릭터 장비 탈착 api
router.put('/remove/:id', authMiddleware, (req, res, next) => {
  const { accountid } = req.account.id;
  const { charatorid } = req.params;
  const { itemid } = req.body;
});

// 캐시 충전 api
router.put('/cash/:id', authMiddleware, (req, res, next) => {
  const { accountid } = req.account.id;
  const { charatorid } = req.params;
});
