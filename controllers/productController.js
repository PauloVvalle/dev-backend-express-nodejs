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

const deleteProducts = (productId) => {
    return getProduct()
        .then((productsData) => {
            const productIndex = productsData.findIndex(
                product => product.id === parseInt(productId)
            )

            if(productIndex != -1){

                const updatedProductsData = productsData.filter(
                    product => product.id !== parseInt(productId)
                )

                const deletedProduct = productsData[productIndex];

                return filesSystem.writeFile(productsFilePath, JSON.stringify(updatedProductsData, null, 2), 'utf-8')
                .then(() => {
                    return deletedProduct;
                })
                .catch((error) => {
                    throw new Error('não foi possivel excluir o produto')
                })

            } else {
                throw new Error('Produto não encontrado')
            }

        })
        .catch((error) => {
            throw new Error('não foi ler os produtos')
        })
}

const addProducts = (newProductData) => {
    return getProduct()
    .then((productsData) => {
        let maxProductId = -1;
        productsData.forEach(product => {
            if(product.id > maxProductId){
                maxProductId = product.id;
            }
            
        });

        const newProductId = maxProductId + 1;
        const newProducWithtId = Object.assign({id: newProductId}, newProductData)

        productsData.push(newProducWithtId)

        return filesSystem.writeFile(productsFilePath, JSON.stringify(productsData, null, 2), 'utf-8')
            .then(() => {
                return newProducWithtId;
            })
            .catch((error) => {
                throw new Error('Não foi possivell adicionar o produto');
            })
    })
    .catch((error) => {
        console.error('Não foi possivel ler o arquivo de produtos:' + error)
    })
}

// const applyDiscount = (productId, discount = 0.10) => {
//     return getProduct()
//         .then((productsData) => {
//             const productIndex = productsData.findIndex(
//                 product => product.id === parseInt(productId)
//             )
//             if (productIndex != -1) {
//                 productsData[productIndex].price *= (1 - discount);
                
//                 // Atualiza o produto com desconto no arquivo JSON
//                 filesSystem.readFile(productsFilePath, 'utf8', (err, fileData) => {
//                     if (err) {
//                         console.error('Erro ao ler o arquivo:', err);
//                         return;
//                     }

//                     let obj = JSON.parseInt(fileData); // converte string para objeto
//                     obj[productIndex] = productsData[productIndex]; // atualiza produto no objeto

//                     filesSystem.writeFile(productsFilePath, JSON.stringify(obj), 'utf8', (err) => {
//                         if (err) {
//                             console.error('Erro ao escrever o arquivo:', err);
//                         } else {
//                             console.log('Dados atualizados com sucesso!');
//                         }
//                     });
//                 });

//                 return productsData[productIndex];
//             } else {
//                 throw new Error('Produto não encontrado');
//             }
//         })
//         .catch((error) => {
//             throw new Error('Erro ao aplicar desconto: ' + error.message);
//         })
// }

const applyDiscount = (productId) => {
    return getProduct()
        .then((productsData) => {
            const productIndex = productsData.findIndex(
                product => product.id === parseInt(productId)
            )

            if(productIndex != -1){
                const existingProduct = productsData[productIndex]
                
                existingProduct.price = existingProduct.price * 0.9;
                
                productsData[productIndex] = existingProduct;

                return filesSystem.writeFile(productsFilePath, JSON.stringify(productsData, null, 2), 'utf-8')
                    .then(() => {
                        return existingProduct;
                    })
                    .catch((error) => {
                        throw new Error('Não foi possível aplicar o desconto ao produto!')
                    })
            } else {
                throw new Error('Produto não encontrado')
            }
        })
        .catch((error) => {
            throw new Error('Não possível ler o arquivo de produtos')
        })
}

const updateProductRating = (productId, newRating) => {
    if(newRating < 0 || newRating > 5 ){
        throw new Error('Nota inválida')
    }

    return getProduct()
        .then((productsData) => {
            const productIndex = productsData.findIndex(
                product => product.id === parseInt(productId)
            )

            if(productIndex != -1){
                const existingProduct = productsData[productIndex]

                //jeito mais rápido de fazer atribuições
                //const { rate, count } = existingProduct.rating;

                const rate = existingProduct.rating.rate;
                const count = existingProduct.rating.count;

                existingProduct.rating.rate = (rate * count + newRating) / (count + 1);
                existingProduct.rating.count += 1;

                productsData[productIndex] = existingProduct;

                return filesSystem.writeFile(productsFilePath, JSON.stringify(productsData, null, 2), 'utf-8')
                    .then(() => {
                        return existingProduct;
                    })
                    .catch((error) => {
                        throw new Error('Não foi possível atualizar a nota do produto')
                    })

            } else {
                throw new Error('Produto não encontrado')
            }
        })
        .catch((error) => {
            throw new Error('Não possível ler o arquivo de produtos')
        })
}


module.exports = {
    getProductById,
    getProduct,
    searchProductByName,
    updateProduct,
    deleteProducts,
    addProducts,
    applyDiscount,
    updateProductRating
};