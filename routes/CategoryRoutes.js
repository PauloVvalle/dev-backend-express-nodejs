const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')

router.get('/', (req, res) => {
    categoryController.getCategories()
    .then((categories) => res.json(categories))
    .catch((error) => res.status(500).send('erro ao obter as categorias'));

    console.log('camada de rotadas')
})

router.post('/', (req, res) => {
    const newCategory = req.body;
    console.log(newCategory);
    categoryController.createCategory(newCategory)
       .then(() => res.status(201).send('categoria criada com sucesso'))
       .catch((error) => res.status(500).send('Erro ao criar a categoria'));

})



module.exports = router;
