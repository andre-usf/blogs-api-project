const express = require('express');
const swagger = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const loginRoute = require('./routes/loginRoute');
const userRoute = require('./routes/userRoute');
const categoriesRoute = require('./routes/categoriesRoute');
const postRoute = require('./routes/postRoute');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/categories', categoriesRoute);
app.use('/post', postRoute);
app.use('/swagger', swagger.serve, swagger.setup(swaggerDocument));

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
