import { Router } from 'express';
import recommendationRouter from './recommendationRouter';
import testRouter from './e2eRouter';

const router = Router({ mergeParams: true });

router.use('/recommendations', recommendationRouter);

if (process.env.NODE_ENV === 'test') {
  router.use(testRouter);
}

export default router;
