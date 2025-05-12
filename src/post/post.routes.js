import { Router } from "express";
import { createPost, getPosts } from "./post.controller.js";
import { createPostValidator } from "../middlewares/post-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

/**
 * @swagger
 * /createPost:
 *   post:
 *     summary: Crear una nueva publicación
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - course
 *               - authorName
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la publicación
 *                 example: "Aprendiendo Node.js"
 *               description:
 *                 type: string
 *                 description: Descripción del contenido
 *                 example: "Una guía básica sobre Node.js"
 *               course:
 *                 type: string
 *                 description: Curso relacionado
 *                 example: "Backend"
 *               authorName:
 *                 type: string
 *                 description: Nombre del autor
 *                 example: "Ana López"
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del perfil del autor
 *               authorPhoto:
 *                 type: string
 *                 format: binary
 *                 description: Foto del autor
 *     responses:
 *       201:
 *         description: Publicación creada exitosamente
 *       400:
 *         description: Faltan campos requeridos
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  "/createPost",
  uploadProfilePicture.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "authorPhoto", maxCount: 1 }
  ]),
  createPostValidator,
  createPost
);

/**
 * @swagger
 * /getPosts:
 *   get:
 *     summary: Obtener todas las publicaciones
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de publicaciones obtenida correctamente
 *       404:
 *         description: No hay publicaciones disponibles
 *       500:
 *         description: Error interno del servidor
 */
router.get("/getPosts", getPosts);

export default router;