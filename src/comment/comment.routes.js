import { Router } from "express";
import { addComment, getComment } from "./comment.controller.js";
import { addCommentValidator } from "../middlewares/comment-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

/**
 * @swagger
 * /addComment:
 *   post:
 *     summary: Agrega un nuevo comentario a una publicación
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - content
 *               - post
 *             properties:
 *               userName:
 *                 type: string
 *                 description: Nombre del usuario que comenta
 *                 example: "Carlos Ruiz"
 *               content:
 *                 type: string
 *                 description: Contenido del comentario
 *                 example: "Muy útil esta publicación, gracias!"
 *               post:
 *                 type: string
 *                 description: ID de la publicación a la que pertenece el comentario
 *                 example: "663f78f12d87c2e98a5eae12"
 *               userPhoto:
 *                 type: string
 *                 format: binary
 *                 description: Foto del usuario que comenta
 *     responses:
 *       201:
 *         description: Comentario agregado correctamente
 *       400:
 *         description: Faltan campos requeridos
 *       404:
 *         description: Publicación no encontrada
 *       500:
 *         description: Error al agregar comentario
 */
router.post(
  "/addComment",
  uploadProfilePicture.fields([{ name: "userPhoto", maxCount: 1 }]),
  addCommentValidator,
  addComment
);

/**
 * @swagger
 * /getComment:
 *   get:
 *     summary: Obtener todos los comentarios con información de la publicación
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida correctamente
 *       500:
 *         description: Error al obtener comentarios
 */
router.get("/getComment", getComment);

export default router;