/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - author
 *       properties:
 *         id:
 *           type: number
 *           description: The id of the book
 *         name:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: 1
 *         title: Buch Nr. 1
 *         author: Anna
 */