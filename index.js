const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express()

app.use(express.json()); // Able to make it read json
app.use(express.urlencoded({ extended: false })) // Able to read form-data

// C R E A T E ////////////////////////////////////
// create 1 product
app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// R E A D ////////////////////////////////////
// get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// get 1 product
app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// U P D A T E ////////////////////////////////////
// update 1 product
app.put('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// D E L E T E ////////////////////////////////////
// delete 1 product
app.delete('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

mongoose.connect("mongodb+srv://jacintojoshmendoza:rzs3XPvfn91HCPJL@backenddb.5egj3vy.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
    .then(() => {
        console.log("Connected to DB!");
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(() => {
        console.log("Connection failed!");
    })


// mongoDB
// user: jacintojoshmendoza
// password: rzs3XPvfn91HCPJL

// connection string: mongodb+srv://jacintojoshmendoza:<password>@backenddb.5egj3vy.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB