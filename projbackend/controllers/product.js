const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

//get product
exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, prod) => {
        if(err){
            return res.status(400).json({
                error:"Product is not available"
            })
        }

        req.product = prod;
        next();
    })
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product);
}

exports.photo = (req, res, next) =>{
    if(req.product.photo.data){
        res.set("Contenet-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }

    next();
}

exports.getAllUniqueCategories = (req, res) =>{
    Product.distinct("category", {}, (err, category)=>{
        if(err){
            return res.status(400).json({
                error:"No category found"
            })
        }

        res.json(category);
    })
}

exports.createProduct = (req, res) => {
    
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            })
        }

        //destructure the field
        const { name, description, price, category, stock } = fields;

        //restriction of field
        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                error:"Please include all fields"
            })
        }


        let product = new Product(fields);

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"File size too big"
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //save to the DB
        product.save((err, prod)=>{
            if(err){
                res.status(400).json({
                    error:"Saving tshirt in DB failed"
                })
            }

            res.json(product);
        })
        
    })
}

exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                error:"Failed to delete the product"
            })
        }

        res.json({
            message:"Successfully Deleted"
        })
    })
}

exports.updateProduct = (req, res) =>  {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            })
        }

        //updating product
        let product = req.product;
        product = _.extend(product, fields);

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"File size too big"
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //save to the DB
        product.save((err, prod)=>{
            if(err){
                res.status(400).json({
                    error:"Unable to update the product details"
                })
            }

            res.json(product);
        })
        
    }) 
}

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products)=>{
        if(err){
            return res.status(400).json({
                error:"No product found"
            })
        }

        res.json(products);
    })
}

exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne:{
                filter:{_id: prod._id},
                update:{$inc:{stock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products)=>{
        if(err){
            return res.status(400).json({
                error:"Bulk operation failed"
            })
        }

        next();
    })
}

