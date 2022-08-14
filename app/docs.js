/**
 * @swagger
 * tags:
 *   name: Hello
 *   description: Hello world routes
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a hello world message
 *     tags: [Hello]
 *     responses:
 *       200:
 *         description: hello world message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello world
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Retrievethe body sended
 *     tags: [Hello]
 *     responses:
 *       200:
 *         description: message received returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello world
 */
