import { body } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-erros.js";

export const createPostValidator = [
    body("title").notEmpty().withMessage("El título es requerido"),
    body("description").notEmpty().withMessage("La descripción es requerida"),
    body("course").notEmpty().withMessage("El curso es requerido"),
    validarCampos,
    handleErrors
];