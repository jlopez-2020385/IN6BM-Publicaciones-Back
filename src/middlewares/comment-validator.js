import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-erros.js";

export const addCommentValidator = [
    body("post").isMongoId().withMessage("El ID de la publicación no es válido"),
    body("content").notEmpty().withMessage("El contenido del comentario es requerido"),
    body("userName").notEmpty().withMessage("El nombre del usuario es requerido"),
    validarCampos,
    handleErrors
];
