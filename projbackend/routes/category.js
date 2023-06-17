const express = require("express");
const router = express.Router();

const { getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, deleteCategory } = require("../controllers/category");
const { isAuthenticated, isAdmin, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user")

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);


//actual routers
//read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory)

//create
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);

//update
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);

//delete
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteCategory);




module.exports = router;