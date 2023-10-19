const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    const IdRecebido = req.params.id;
})


module.exports = router;