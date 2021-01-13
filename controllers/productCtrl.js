const Products = require('../models/productModels');

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            
            const products = await Products.find()

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            
            const {product_id, title, price, description, content, category} = req.body;

            const product = await Products.findOne({ product_id })

            if(product) return res.status(400).json({ msg: 'This product already exists.' })

            const newProduct = new Products({
                product_id, title: title.toLowerCase(), price, description, content, category
            })

            await newProduct.save()

            res.json({ msg: 'Created a product' })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            
            await Products.findByIdAndDelete(req.params.id)

            res.json({ msg: 'Deleted a Product' })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            
            const { title, price, description, content, category } = req.body;

            await Products.findOneAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(), price, description, content, category
            })

            res.json({ msg: 'Updated a Product' })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
}

module.exports = productCtrl