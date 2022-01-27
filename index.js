const express = require('express')
const app = express();
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const PORT = process.env.PORT || 8081;

app.use(cors())
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Pokemon API Documentation',
            contact: {
                name: 'Lucas Perez'
            }
        }
    },
    apis: ['./controllers/*.js'],
    consumes: [
        "application/json"
    ],
    produces: [
        "application/json"
    ],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

require('./routes/pokemon.routes.js')(app)

//Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor inicializado en puerto ${PORT}`);
});