const filesSystem = require('fs').promises;
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/products.json');

const getProduct = () => {
    return filesSystem.readFile(productsFilePath, 'utf-8')
        .then((productsData) => JSON.parse(productsData))
        .catch((error) => {
            throw new Error('não foi possivel ler o arquivo de produto')
    });
};


const getProductById = (productId) => {
    return getProduct()
        .then((allProducts) => allProducts.find(
            product => product.id === parseInt(productId)
        
        ))
        .catch ((error) => {
            throw new Error('não foi possive encontrar o produto')
        })
};

const searchProductByName = (productName) => {
    return getProduct()
        .then((productsData) => {
            const filtredProps = productsData.filter((product) => 
                product.title.toLowerCase().includes(productName.toLowerCase())
            )
            return filtredProps;
        })
        .catch((error) => {
            throw new Error('não foi possivel encontrar produtos pelo name')
        })
};



module.exports = {
    getProductById,
    getProduct,
    searchProductByName
};