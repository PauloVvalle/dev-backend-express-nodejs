const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/', (req, res) => {
    productController.getProduct()
        .then((productData) => res.json(productData))
        .catch((error) => res.status(500).send('error ao obter produtos'))
})

router.get('/:id', (req, res) => {
    const idRecebido = req.params.id;
    productController.getProductById(idRecebido)
        .then((productRecebido) => {
            if(productRecebido){
                res.status(200).json(productRecebido)
            } else {
                res.status(404).send('produto não encontrado')
            }
        })
        .catch((error) => res.status(500).send())
})

router.get('/search/:name', (req, res) => {
    const productName = req.params.name;
    productController.searchProductByName(productName)
        .then((products) => {
            if(products){
                res.status(200).send(products)
            } else {
                res.status(404).send()
            }
        })
        .catch((error) => res.status(500).send())
})

router.put('/:id', (req, res) => {
    const idRecebido = req.params.id;
    const updateData = req.body;

    productController.updateProduct(idRecebido, updateData)
        .then(() => {
            res.status(200).send('produto atualizado com sucesso')
        })
        .catch((error) => {
            res.send(error);
        })
})

module.exports = router;