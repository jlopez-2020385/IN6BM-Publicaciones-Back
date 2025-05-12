'use strict'

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import { swaggerDocs, swaggerUi } from "./swagger.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import postRoutes from "../src/post/post.routes.js"
import commentRoutes from "../src/comment/comment.routes.js"

const middlewares = (app) => {
    app.use('/public', express.static('public'));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apiLimiter);
};

const routes = (app) => {
    app.use("/publicationKinal/v1/post", postRoutes);
    app.use("/publicationKinal/v1/comment", commentRoutes);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

};

const conectarDB = async () => {
    try {
        await dbConnection();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        routes(app);
        app.listen(process.env.PORT);
        console.log(`Server running on port ${process.env.PORT}`);
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};