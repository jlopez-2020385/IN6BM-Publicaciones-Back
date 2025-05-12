import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: " Publicaciones Baloncest",
            version: "1.0.0",
            description: "API Blog ",
            contact:{
                name: "José Luis Emanuel",
                email: "jlopez-2020385@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/publicationKinal/v1"
            }
        ]
    },
    apis:[
        "./src/post/post.routes.js",
        "./src/comment/comment.routes.js"

    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi }