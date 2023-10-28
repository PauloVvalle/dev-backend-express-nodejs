const express = require('express');
const categoryRoutes = require('./routes/CategoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors')
const redirectMiddlewares = require('./middlewares/redirectMiddlewares');
const logMiddleware = require('./middlewares/logMiddleware');
const rateLimit = require('./middlewares/rateLimitMiddleware');

const app = express();
const port = 3000;


app.use(express.json())
app.use(cors())
app.use(redirectMiddlewares);
app.use(logMiddleware);
// app.use(rateLimit);

app.get('/', (req, res) => {
    res.send('Bem vindo a API de E-commerce do Infnet back-end!');
})

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
    console.log('servidor rodnado em http://localhost:' + port);
})