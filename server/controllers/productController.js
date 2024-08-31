const Product = require('../model/Product');

//create a product
const createproduct = async(req, res) => {
    try {
        const { name, code, category, subcategory, brand, size, color, material, price, stock } = req.body;

        const product = await Product.create({
            name,
            code,
            category,
            subcategory,
            brand,
            size,
            color,
            material,
            price,
            stock
            
        });

        return res.json({
            product
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createproduct
}