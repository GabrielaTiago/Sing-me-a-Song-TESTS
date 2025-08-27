import { Router } from 'express';
import { recommendationController } from '../controllers/recommendationController';

const recommendationRouter = Router();

/**
 * @swagger
 * /recommendations:
 *   post:
 *     tags: [Recommendations]
 *     summary: Create a new song recommendation
 *     description: Create a new song recommendation with a name and YouTube link.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewRecommendation'
 *           example:
 *             name: "I Drink Wine"
 *             youtubeLink: "https://www.youtube.com/watch?v=jDvYDzFOK9A"
 *     responses:
 *       201:
 *         description: Recommendation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Created"
 *       422:
 *         description: Unprocessable Entity - Invalid input data
 *       409:
 *         description: Conflict - Recommendation with the same name already exists
 *         content:
 *           application/json:
 *             schema:
 *              type: string
 *              example: "Recommendations names must be unique"
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *            schema:
 *             type: object
 *             properties:
 *              message:
 *               type: string
 *               example: "Internal Server Error"
 */
recommendationRouter.post('/', recommendationController.insert);

/**
 * @swagger
 * /recommendations:
 *   get:
 *     tags: [Recommendations]
 *     summary: Get all song recommendations
 *     description: Retrieve a list of all song recommendations.
 *     responses:
 *       200:
 *         description: A list of song recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recommendation'
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *             message:
 *              type: string
 *              example: "Internal Server Error"
 */
recommendationRouter.get('/', recommendationController.get);

/**
 * @swagger
 * /recommendations/{id}:
 *   get:
 *     tags: [Recommendations]
 *     summary: Get a song recommendation by ID
 *     description: Retrieve a specific song recommendation by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the recommendation to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A song recommendation
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Recommendation'
 *       404:
 *         description: Not Found - Recommendation with the specified ID does not exist
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *             message:
 *              type: string
 *              example: "Internal Server Error"
 */
recommendationRouter.get('/:id', recommendationController.getById);

/**
 * @swagger
 * /recommendations/{id}/upvote:
 *   post:
 *     tags: [Recommendations]
 *     summary: Upvote a song recommendation
 *     description: Increase the score of a specific song recommendation by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the recommendation to upvote
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Recommendation upvoted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "OK"
 *       404:
 *         description: Not Found - Recommendation with the specified ID does not exist
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *             message:
 *              type: string
 *              example: "Internal Server Error"
 */
recommendationRouter.post('/:id/upvote', recommendationController.upvote);

/**
 * @swagger
 * /recommendations/{id}/downvote:
 *   post:
 *     tags: [Recommendations]
 *     summary: Downvote a song recommendation
 *     description: Decrease the score of a specific song recommendation by its ID. If the score drops below -5, the recommendation will be removed.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the recommendation to downvote
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Recommendation downvoted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "OK"
 *       404:
 *         description: Not Found - Recommendation with the specified ID does not exist
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *             message:
 *              type: string
 *              example: "Internal Server Error"
 */
recommendationRouter.post('/:id/downvote', recommendationController.downvote);

/**
 * @swagger
 * /recommendations/random:
 *   get:
 *     tags: [Recommendations]
 *     summary: Get a random song recommendation
 *     description: Retrieve a random song recommendation from the list.
 *     responses:
 *       200:
 *         description: A random song recommendation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recommendation'
 *       404:
 *        description: Not Found - No recommendations available
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *             message:
 *              type: string
 *              example: "Internal Server Error"
 */
recommendationRouter.get('/random', recommendationController.random);

/**
 * @swagger
 * /recommendations/top/{amount}:
 *   get:
 *     tags: [Recommendations]
 *     summary: Get top song recommendations
 *     description: Retrieve the top song recommendations ordered by the hightest scores.
 *     parameters:
 *       - in: path
 *         name: amount
 *         description: The number of top recommendations to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: A list of song recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recommendation'
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *             message:
 *              type: string
 *              example: "Internal Server Error"
 */
recommendationRouter.get('/top/:amount', recommendationController.getTop);

export default recommendationRouter;
