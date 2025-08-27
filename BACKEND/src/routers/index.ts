import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/swagger';
import recommendationRouter from './recommendationRouter';
import testRouter from './e2eRouter';

const router = Router({ mergeParams: true });

router.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
router.use('/recommendations', recommendationRouter);

if (process.env.NODE_ENV === 'test') {
  router.use(testRouter);
}

export default router;
