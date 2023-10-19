const express = require('express');
const categoryRoutes = require('./routes/CategoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = 3000;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Bem vindo a API de E-commerce do Infnet back-end!');
})

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
    console.log('servidor rodnado em http://localhost:' + port);
})