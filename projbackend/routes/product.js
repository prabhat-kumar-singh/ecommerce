const express = require("express");
const router = express.Router();


const { getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories } = require("../controllers/product");
const { getUserById } = require("../controllers/user")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")

//param
router.param("userId", getUserById);
router.param("productId", getProductById);
//router

//read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo)


//create routes
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);

//delete router
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);

//update router
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);

//listing route
router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategories);


module.exports = router;