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

//view all 
const getall = async (req, res) =>{
    Product.find()
    .then(product => res.json(product))
    .catch(err => res.json(err));
}

//view product by id
const getProductbyid = (req, res) => {
    const id = req.params.id;
    Product.findOne({code:id})
    .then(id => res.json(id))
    .catch(err => res.json(err));
}

//update product by id
const updateProductbyid = (req, res) => {
    const id = req.params.code;
    Product.findByIdAndUpdate({_id:id},{
        name: req.body.name,
        code: req.body.code,
        category: req.body.category,
        subcategory: req.body.subcategory,
        brand: req.body.brand,
        size: req.body.size,
        color: req.body.color,
        material: req.body.material,
        price: req.body.price,
        stock: req.body.stock        
    })
    .then(product => res.json(product))
    .catch(err => res.json(err));
}

//delete
const deletestore = (req, res) => {
    const id = req.params.id;
    Admin.findByIdAndDelete({_id:id})
    .then(admin => res.json(admin))
    .catch(err => res.json(err));
}

module.exports = {
    createproduct,
    getall,
    getProductbyid,
    updateProductbyid,
    deletestore
}