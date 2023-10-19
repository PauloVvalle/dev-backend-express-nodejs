const filesSystem = require('fs').promises;
const path = require('path');


const categoriesFilePath = path.join(__dirname, '../data/categories.json');

const getCategories = () => {
    return filesSystem.readFile(categoriesFilePath, 'utf-8')
        .then((catetegoriesData) => JSON.parse(catetegoriesData))
        .catch((error) => {
            throw new Error('Não deu para ler');
        });
};

const createCategory = (newCategory) => {
    return getCategories()
    .then((categoriesData) => {
        categoriesData.push({ name: newCategory.name });
        return filesSystem.writeFile(categoriesFilePath, JSON.stringify(categoriesData))
    })
    .catch((error) => {
        throw new Error('não foi criada')
    })
}

module.exports = {
    getCategories, createCategory
};