/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a file
 *     description: Upload a file with associated metadata like title, author, and categories.
 *     tags:
 *       - File Operations
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               userId:
 *                 type: integer
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: File uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Success status of the upload
 *                   example: true
 *                 document:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     author:
 *                       type: string
 *       400:
 *         description: Missing required parameters or invalid data.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/download/{fileId}:
 *   get:
 *     summary: Download a file
 *     description: Download a file by its unique ID.
 *     tags:
 *       - File Operations
 *     parameters:
 *       - name: fileId
 *         in: path
 *         required: true
 *         description: ID of the file to download.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: File downloaded successfully.
 *       400:
 *         description: Missing required parameters.
 *       403:
 *         description: Unauthorized access.
 *       404:
 *         description: File not found.
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all file categories.
 *     tags:
 *       - File Operations
 *     responses:
 *       200:
 *         description: List of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */

/**
 * @swagger
 * /api/files:
 *   get:
 *     summary: Search all files
 *     description: Search and retrieve all files.
 *     tags:
 *       - File Operations
 *     responses:
 *       200:
 *         description: List of all files.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 */

/**
 * @swagger
 * /api/by-id/{fileId}:
 *   get:
 *     summary: Search a file by ID
 *     description: Retrieve a file by its unique ID.
 *     tags:
 *       - File Operations
 *     parameters:
 *       - name: fileId
 *         in: path
 *         required: true
 *         description: ID of the file to search.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: File details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *       404:
 *         description: File not found.
 */

/**
 * @swagger
 * /api/by-title/{title}:
 *   get:
 *     summary: Search files by title
 *     description: Search for files by their title.
 *     tags:
 *       - File Operations
 *     parameters:
 *       - name: title
 *         in: path
 *         required: true
 *         description: Title of the file.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of files with the specified title.
 *       404:
 *         description: No files found with that title.
 */

/**
 * @swagger
 * /api/by-author/{author}:
 *   get:
 *     summary: Search files by author
 *     description: Search for files by their author.
 *     tags:
 *       - File Operations
 *     parameters:
 *       - name: author
 *         in: path
 *         required: true
 *         description: Author of the file.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of files by the specified author.
 *       404:
 *         description: No files found by that author.
 */

/**
 * @swagger
 * /api/connect/{userId}/{fileId}:
 *   get:
 *     summary: Connect a file to a user
 *     description: Add a file to a user's personal collection.
 *     tags:
 *       - User Operations
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: integer
 *       - name: fileId
 *         in: path
 *         required: true
 *         description: ID of the file to connect.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: File successfully added to the user's collection.
 *       403:
 *         description: User not authorized.
 */

/**
 * @swagger
 * /api/disconnect/{userId}/{fileId}:
 *   get:
 *     summary: Disconnect a file from a user
 *     description: Remove a file from a user's personal collection.
 *     tags:
 *       - User Operations
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user.
 *         schema:
 *           type: integer
 *       - name: fileId
 *         in: path
 *         required: true
 *         description: ID of the file to disconnect.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: File successfully removed from the user's collection.
 *       403:
 *         description: User not authorized.
 */

/**
 * @swagger
 * /api/generate:
 *   post:
 *     summary: Generate using RAG agent
 *     description: Use the RAG agent to generate a response based on a user's prompt.
 *     tags:
 *       - RAG Agent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               prompt:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful generation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing required parameters.
 *       500:
 *         description: Internal server error.
 */
