import express from 'express';
import { userDataClient } from '../src/utils/prisma/index.js';
import authMiddleware from '../src/middlewares/auth.middleware.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/sign-up', async (req, res, next) => {
  const { account, password, passwordCheck } = req.body;

  try {
    const isExistAccount = await userDataClient.users.findfirst({
      where: {
        account,
      },
    });

    // 아이디가 유효한지 확인하는 함수 - joi 활용으로 바꿔보기, 정규식 안쓰고.
    function isValidId(account) {
      // 영어 소문자와 숫자만 허용
      const regex = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{1,15}$/;
      return regex.test(account);
    }

    if (isExistAccount) {
      return res.status(400).json({ message: '이미 존재하는 아이디입니다.' });
    }

    // 아이디가 isValidId함수를 통과하지 못했을때 (올바르지 않을때) 발생하는 오류
    if (!isValidId(account)) {
      return res.status(400).json({ message: '잘못된 아이디입니다.' });
    }

    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ message: '비밀번호와 비밀번호 확인이 다릅니다.' });
    }

    if (password.length < 4) {
      return res
        .status(400)
        .json({ message: '비밀번호는 5자리 이상이여야 합니다.' });
    }

    // 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userDataClient.account.create({
      data: {
        account,
        password: hashedPassword,
      },
    });
  } catch (error) {
    next(err);
  }
});

router.post('/sign-in', async (req, res, next) => {
  const { account, password } = req.body;

  try {
    const user = await userDataClient.accounts.findfirst({
      where: { account: account },
    });

    if (!user) {
      return res.status(404).json({ message: '존재하지 않는 아이디입니다.' });
    }

    // 비밀번호가 일치하지 않을때 발생하는 오류
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: '비밀번호가 일치하지 않습니다' });
    }

    // 사용자 정보를 JWT로 생성
    const userJWT = jwt.sign(user, 'ex');
    res.header('authorization', `Bearer ${userJWT}`);

    return res.status(200).json({ message: '로그인에 성공했습니다.' });
  } catch (error) {
    next(err);
  }
});

router.post('/charators', authMiddleware, async (req, res, next) => {
  const { name } = req.body;
  const accountid = req.account.id;

  try {
    const isExistCharator = await userDataClient.charators.findfirst({
      where: { name: name },
    });

    if (isExistCharator) {
      return res
        .status(400)
        .json({ message: '이미 존재하는 캐릭터 이름입니다.' });
    }

    const charator = await userDataClient.charators.create({
      data: { name: name, accountid: accountid },
    });

    return res
      .status(200)
      .json({ message: '캐릭터가 성공적으로 생성되었습니다.' });
  } catch (error) {
    next(err);
  }
});

router.delete('/charator/:id', authMiddleware, async (req, res, next) => {
  const accountid = req.account.id;
  const { charatorid } = req.params;

  const deletecharator = await userDataClient.charators.findfirst({
    where: { id: +charatorid },
    select: { accountid: true },
  });

  if (deletecharator.accountid !== accountid) {
    return res
      .status(400)
      .json({ message: '해당 사용자의 캐릭터가 아닙니다.' });
  }

  if (!deletecharator) {
    return res.status(404).json({ message: '캐릭터가 존재하지 않습니다.' });
  }

  await userDataClient.charators.delete({
    where: { id: +charatorid },
  });

  return res.status(200).json({ message: '캐릭터가 삭제되었습니다' });
});

router.get('charators/:id', authMiddleware, async (req, res, next) => {
  const accountid = req.account.id;
  const { charatorid } = req.params;

  try {
    const findcharator = await userDataClient.charators.findfirst({
      where: { id: charatorid },
      select: {
        name: true,
        hp: true,
        atk: true,
        accountid: true,
      },
    });

    if (!findcharator) {
      return res.status(404).json({ message: '캐릭터가 존재하지 않습니다.' });
    }

    if (findcharator.accountid === accountid) {
      const charator = await userDataClient.charators.findfirst({
        where: { id: charatorid },
        select: {
          name: true,
          hp: true,
          atk: true,
          money: true,
        },
      });

      return res.status(200).json({ message: `${charator}` });
    }

    const charator = await userDataClient.charators.findfirst({
      where: { id: charatorid },
      select: {
        name: true,
        hp: true,
        atk: true,
      },
    });

    return res.status(200).json({ message: `${charator}` });
  } catch (error) {
    next(err);
  }
});
