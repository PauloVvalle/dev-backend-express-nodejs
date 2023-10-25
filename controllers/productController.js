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

const updateProduct = (productId, updateData) => {
    return getProduct()
    .then((productsData) => {
        const productIndex = productsData.findIndex(
            product => product.id === parseInt(productId)
        )
        if(productIndex != -1){
            const existingProduct = productsData[productIndex];

            if(updateData.title != undefined){
                existingProduct.title = updateData.title;
            }

            if(updateData.price != undefined){
                existingProduct.price = updateData.price;
            }
            
            if(updateData.description != undefined){
                existingProduct.description = updateData.description;
            }
            if(updateData.category != undefined){
                existingProduct.category = updateData.category;
            }
            if(updateData.rating.rate != undefined){
                existingProduct.rating.rate = updateData.rating.rate;
            }
            if(updateData.rating.count != undefined){
                if(existingProduct.rating.count != undefined){
                    existingProduct.rating.count += updateData.rating.count;
                } else {
                    existingProduct.rating.count = updateData.rating.count;
                }
            }
            productsData[productIndex] = existingProduct;

            return filesSystem.writeFile(productsFilePath, JSON.stringify(productsData, null, 2), 'utf-8')
                .then(() => {
                    return existingProduct;
                })
                .catch((error) => {
                    throw new Error('Não foi possivel atualizar o produto')
                })

        } else {
            throw new Error('Não foi possivel encontrar produto com esse Id');
        }
    })
    .catch((error) => {
        throw new Error('Não foi possivel ler os produtos');
    })
}


module.exports = {
    getProductById,
    getProduct,
    searchProductByName,
    updateProduct
};